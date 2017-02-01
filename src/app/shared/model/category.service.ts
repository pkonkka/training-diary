import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Category } from './category';

@Injectable()
export class CategoryService {

  private categories$: FirebaseListObservable<Category[]>;

  constructor(private db: AngularFireDatabase) {

    this.categories$ = this.db.list('categories');

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
    return this.db.list('categories', {
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
