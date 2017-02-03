import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Category } from './category';
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
    this.userUrl = 'users/' + this.authInfo.$uid + '/';
    this.categoryUrl = this.userUrl + 'categories';

    this.categories$ = this.db.list(this.categoryUrl);

   }


  // -------------------------------------------------------------------------------------------------
  //  Get all categories
  // -------------------------------------------------------------------------------------------------    
  findAllCategories(): Observable<Category[]> {

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
  //  Create new category item
  // -------------------------------------------------------------------------------------------------    
  createCategory(data: {}): firebase.Promise<any> {
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
      return this.categories$.update(category.$key, changes);
  }

}
