import { Location} from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { Category } from '../../shared/model/category';
import { Exercise } from '../../shared/model/exercise';
import { ExerciseService } from '../../shared/model/exercise.service';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.css']
})
export class ExerciseDetailComponent implements OnInit, OnDestroy {

  relatedCategories:  Category[] = [];

  exercise:       Exercise;
  // exerciseForm: FormGroup;
  exerciseName = '';
  exerciseCategory: string[] = [];
  exerciseUrl: string;

  paramsSub: Subscription;
  exerciseSub: Subscription;

  // ---------------------------------------------------------------------------------
  constructor(
    private route: ActivatedRoute, 
    private exerciseService: ExerciseService, 
    private router: Router, 
    private formBuilder: FormBuilder,
    private location: Location) { 


    }

  // ---------------------------------------------------------------------------------
  ngOnInit() {

    this.exerciseUrl = this.route.snapshot.params['id'];

    this.paramsSub = this.route.queryParams.subscribe(
      params => {
        this.exerciseName = params['name'];
      }
    );

    // get related categories
    this.exerciseSub = this.exerciseService.findAllCategoriesForExercise(this.exerciseUrl)
      .subscribe(
        categories => {
          this.relatedCategories = categories;
          if (this.relatedCategories) {
            for (let i = 0; i < this.relatedCategories.length; i++) {
              console.log(this.relatedCategories[i].name);
            }
          }
        }
      );

  }

  // ---------------------------------------------------------------------------------
  onEdit() {
    this.router.navigate(['/exercises', this.exerciseUrl, 'edit']);
  }


  // ---------------------------------------------------------------------------------
  onCancel() {
    this.location.back();
  }

  // ---------------------------------------------------------------------------------
  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.exerciseSub.unsubscribe();
  }

}
