import { Component, OnInit, Input } from '@angular/core';

import { Category } from '../../shared/model/category';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {
  @Input() category: Category;
  @Input() categoryId: number;

  constructor() { }

  ngOnInit() {
  }

}
