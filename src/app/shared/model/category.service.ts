import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { FirebaseListFactoryOpts } from 'angularfire2/interfaces';

import { Observable } from 'rxjs/Rx';

import * as _ from 'lodash';

import { Category } from './category';
import { Exercise } from './exercise';

import { AuthService } from '../security/auth.service';
import { AuthInfo } from '../security/auth-info';

@Injectable()
export class CategoryService {

  private categories$: FirebaseListObservable<Category[]>;
  private authInfo: AuthInfo;

  private userUrl;
  private categoryUrl;

  // -------------------------------------------------------------------------------------------------
  constructor(private db: AngularFireDatabase, private authService: AuthService) {

    this.authService.authInfo$.subscribe(authInfo => this.authInfo = authInfo);

   }


  // -------------------------------------------------------------------------------------------------
  //  Get all categories
  // -------------------------------------------------------------------------------------------------    
  findAllCategories(): Observable<Category[]> {

    this.userUrl = 'users/' + this.authInfo.$uid + '/';
    this.categoryUrl = this.userUrl + 'categories';

    this.categories$ = this.db.list(this.categoryUrl);

    return this.categories$.map(Category.fromJsonArray);

  }

  // -------------------------------------------------------------------------------------------------
  // Find a category by an excerise url
  // -------------------------------------------------------------------------------------------------
  findCategoryByUrl(categoryUrl: string): Observable<Category> {
    return this.db.list(this.categoryUrl, {
      query: {
        orderByChild: 'url',
        equalTo: categoryUrl
      }
    })
    .map(results => results[0]);
  }

  // -------------------------------------------------------------------------------------------------
  //  Get the exercise keys per workout url
  // -------------------------------------------------------------------------------------------------    
  findExerciseKeysPerCategoryUrl(categoryUrl: string, query: FirebaseListFactoryOpts = {}): Observable<string[]> {
    return this.findCategoryByUrl(categoryUrl)
      .filter(category => !!category)
      .switchMap(category => this.db.list(`${this.categoryUrl}/${category.$key}/exercises`, query))
      .map(lspc => lspc.map(lpc => lpc.$key));
  }



    // -------------------------------------------------------------------------------------------------
    //  Get all exercises for a workout
    // -------------------------------------------------------------------------------------------------    
    findAllExercisesForCategory(categoryUrl: string): Observable<Exercise[]> {

        return this.findExercisesForExerciseKeys(this.findExerciseKeysPerCategoryUrl(categoryUrl));

    }


    // -------------------------------------------------------------------------------------------------
    //  Get an exercise based an exercise key
    // -------------------------------------------------------------------------------------------------    
    findExercisesForExerciseKeys(exerciseKeys$: Observable<string[]>): Observable<Exercise[]> {
        return exerciseKeys$
            .map(lspc => lspc.map(exerciseKey => this.db.object(this.userUrl + 'exercises/' + exerciseKey)) )
            .flatMap(fbojs => Observable.combineLatest(fbojs) );

    }


  // -------------------------------------------------------------------------------------------------
  //  Create new category item
  // -------------------------------------------------------------------------------------------------    
  createCategory(data): firebase.Promise<any> {
    data.modifiedAt = data.createdAt = _.now();
    return this.categories$.push(data);
  }


  // -------------------------------------------------------------------------------------------------
  //  Remove a category from the database
  // -------------------------------------------------------------------------------------------------    
  removeCategory(category: Category): firebase.Promise<any> {
    return this.categories$.remove(category.$key);
  }

  // -------------------------------------------------------------------------------------------------
  //  Update a category
  // -------------------------------------------------------------------------------------------------    
  updateCategory(category: Category, changes: any): firebase.Promise<any> {
      changes.modifiedAt = _.now();
      return this.categories$.update(category.$key, changes);
  }

}
