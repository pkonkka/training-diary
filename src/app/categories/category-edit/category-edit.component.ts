import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { CategoryService } from '../../shared/model/category.service';
import { Category } from '../../shared/model/category';
import { generateUrl } from '../../shared/space-to-dash';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit, OnDestroy {

  categoryForm: FormGroup;
  private categoryIndex: number;
  private category: Category;
  private isNew = true;
  private categoriesSub: Subscription;
  private paramsSub: Subscription;

  private categoryUrl: string;

  // -----------------------------------------------------------------------------------------
  constructor(private route: ActivatedRoute,
              private categoryService: CategoryService,
              private formBuilder: FormBuilder,
              private router: Router,
              private location: Location) { 

              }

  // -----------------------------------------------------------------------------------------
  ngOnInit() {

    this.categoryForm = this.formBuilder.group({
       name: [''],
    });


    this.paramsSub = this.route.params.subscribe(
      params => {
        if (params.hasOwnProperty('id')) {
          this.isNew = false;
          this.categoryUrl = params['id'];
        }
      }
    );

    if (this.isNew === false) {
      this.categoriesSub = this.categoryService.findCategoryByUrl(this.categoryUrl)
        .do(console.log)
        .subscribe(
          category => {
            this.category = category;
            this.initForm();
          }
        );
    } else {
      this.initForm();
    }

  }

  // -----------------------------------------------------------------------------------------
  onSubmit() {
    const newCategory = this.categoryForm.value;
    newCategory.url = generateUrl(newCategory.name);
    
    if (this.isNew) {
      this.categoryService.createCategory(newCategory);
      console.log(newCategory);
    } else {
      this.categoryService.updateCategory(this.category, newCategory);
    }
    this.navigateBack();
  }

  // ------------------------------------------------------------------------------
  onRemove() {
    this.categoryService.removeCategory(this.category);
    this.navigateBack();
  }

  // -----------------------------------------------------------------------------------------
  onCancel() {
    this.location.back();
  }

  // -----------------------------------------------------------------------------------------
  private navigateBack() {
    this.location.back();
  }

  // -----------------------------------------------------------------------------------------
  private initForm() {
    let categoryName = '';
    // let workoutExercises: FormArray = new FormArray([]);

     if  (!this.isNew && this.category) {
  //     if (this.workout.hasOwnProperty('exercises')) {
  //       for (let i = 0; i < this.workout.exercises.length; i++) {
  //         workoutExercises.push(
  //           new FormGroup({
  //             name: new FormControl(this.workout.exercises[i].name, Validators.required)
  //           })
  //         );
  //       }
  //     }
       categoryName = this.category.name;
     }
     this.categoryForm = this.formBuilder.group({
       name: [categoryName, Validators.required],
    });
   }

  // -----------------------------------------------------------------------------------------
  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    if (this.categoriesSub) { this.categoriesSub.unsubscribe(); }
  }

}
