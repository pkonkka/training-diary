import { Location} from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { Category } from '../../shared/model/category';
import { CategoryService } from '../../shared/model/category.service';
import { ExerciseService } from '../../shared/model/exercise.service';
import { Exercise } from '../../shared/model/exercise';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit, OnDestroy {

  category:           Category;
  categoryForm:       FormGroup;
  categoryUrl:        string;
  categoryName:       string;
  categoryExercises:  Exercise[];

  paramsSub:    Subscription;
  exerciseSub:  Subscription;

  // -------------------------------------------------------------------------
  constructor(
    private route: ActivatedRoute, 
    private categoryService: CategoryService,
    private exerciseService: ExerciseService, 
    private router: Router, 
    private formBuilder: FormBuilder,
    private location: Location) { 

    this.categoryForm = this.formBuilder.group({
      name: ['']
     });

    }


  // -------------------------------------------------------------------------
  ngOnInit() {

    this.categoryUrl = this.route.snapshot.params['id'];

    this.paramsSub = this.route.queryParams.subscribe(
      params => {
        this.categoryName = params['name'];
      }
    );

    this.exerciseSub = this.exerciseService.findAllExercisesForCategory(this.categoryUrl)
      .subscribe(
        exercises => this.categoryExercises = exercises
      );

  }

  // -------------------------------------------------------------------------
  onEdit() {
    this.router.navigate(['/categories', this.categoryUrl, 'edit']);
  }

  // -------------------------------------------------------------------------
  onCancel() {
    this.location.back();
  }

  // -------------------------------------------------------------------------
  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    if (this.exerciseSub) { this.exerciseSub.unsubscribe(); }
  }

}
