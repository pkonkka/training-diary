import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { CategoryService } from '../../shared/model/category.service';
import { Category } from '../../shared/model/category';

import * as _ from 'lodash';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, OnDestroy {

  allCategories: Category[] = [];

  categorySub: Subscription;

  // --------------------------------------------------------------------------
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {

    this.categorySub = this.categoryService.findAllCategories()
      .subscribe(
        categories => { 
          this.allCategories = categories;
          this.allCategories =  _.sortBy(this.allCategories, [function(o) { return o.name; }]);
        }
      );

  }

  // --------------------------------------------------------------------------
  ngOnDestroy() {
    this.categorySub.unsubscribe();
  }

}
