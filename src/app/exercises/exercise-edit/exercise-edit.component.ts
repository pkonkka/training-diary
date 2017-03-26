import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location} from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { ExerciseService } from '../../shared/model/exercise.service';
import { WorkoutService } from '../../shared/model/workout.service';

import { Exercise } from '../../shared/model/exercise';
import { generateUrl } from '../../shared/space-to-dash';

import * as _ from 'lodash';


@Component({
  selector: 'app-exercise-edit',
  templateUrl: './exercise-edit.component.html',
  styleUrls: ['./exercise-edit.component.css']
})
export class ExerciseEditComponent implements OnInit, OnDestroy {
  exerciseForm: FormGroup;
  private exerciseIndex: number;
  private exercise: Exercise = null;
  private isNew = true;
  
  private exerciseSub: Subscription;
  private paramsSub: Subscription;
  
  private exerciseUrl: string;


  // ---------------------------------------------------------------------
  constructor(private route: ActivatedRoute,
              private exerciseService: ExerciseService,
              private workoutService: WorkoutService,
              private formBuilder: FormBuilder,
              private router: Router,
              private location: Location) { 

              }

  // ---------------------------------------------------------------------
  ngOnInit() {

    this.exerciseForm = this.formBuilder.group({
       name: [''],
       note: [''],
    });

    this.paramsSub = this.route.params.subscribe(
      params => {
        if (params.hasOwnProperty('id')) {
          this.isNew = false;
          this.exerciseUrl = params['id'];
        }
      }
    );

    if (this.isNew === false) {
      this.exerciseSub = this.exerciseService.findExerciseByUrl(this.exerciseUrl)
        .subscribe(
          exercise => {
            this.exercise = exercise;
            this.initForm();
          }
        );
    } else {
      this.initForm();
    }

  }

  // ------------------------------------------------------------------------------
  onSubmit() {
    const newExercise = this.exerciseForm.value;
    newExercise.url = generateUrl(newExercise.name);

    if (this.isNew) {
      this.exerciseService.createExercise(newExercise);
    } else {
      this.exerciseService.updateExercise(this.exercise.$key, newExercise);
    }
    this.navigateBack();
  }

  // ------------------------------------------------------------------------------
  // 1. Update related workouts and save updated workouts to the DB
  // 2. Update related categories and save updated categories to the DB  
  // 3. remove exercise
  // ---------------------------------------------------------------------------------  
  onRemove() {

    console.log('this.exercise: ', this.exercise);
    console.log('this.exercise.key: ', this.exercise.$key);
    this.exercise.workouts[9][0] = false;

    const myPromise = this.exerciseService.findAllWorkoutsForExercise(this.exerciseUrl)
      .map(workouts => workouts.map(workout => {
        // workout.exercises[this.exercise.$key] = 'jee'
        console.log('workout.exercises: ', workout.exercises);
        console.log(this.exercise.$key, ' ', workout.exercises[this.exercise.$key]);
        console.log('workout.exercises: ', workout.exercises);
      }))
      .first()
      .toPromise();


    myPromise.then(() => {
      // this.exerciseService.removeExercise(this.exercise);
      console.log('removing exercise....');
      this.router.navigate(['/exercises']);
    });


  }

  // ------------------------------------------------------------------------------
  onCancel() {
    this.navigateBack();
  }

  // ------------------------------------------------------------------------------
  private navigateBack() {
    this.location.back();
  }


  // ------------------------------------------------------------------------------
  private initForm() {
    let exerciseName = '';
    let exerciseNote = '';
    // let workoutExercises: FormArray = new FormArray([]);

     if  (!this.isNew && this.exercise) {

  //     if (this.workout.hasOwnProperty('exercises')) {
  //       for (let i = 0; i < this.workout.exercises.length; i++) {
  //         workoutExercises.push(
  //           new FormGroup({
  //             name: new FormControl(this.workout.exercises[i].name, Validators.required)
  //           })
  //         );
  //       }
  //     }
       exerciseName = this.exercise.name;
       exerciseNote = this.exercise.note;
     }
     this.exerciseForm = this.formBuilder.group({
       name: [exerciseName, Validators.required],
       note: [exerciseNote],
    });
   }

  // ------------------------------------------------------------------------------
  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    if (this.exerciseSub) { this.exerciseSub.unsubscribe(); }
  }

}
