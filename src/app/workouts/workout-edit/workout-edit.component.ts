import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { ExerciseService } from '../../shared/model/exercise.service';
import { WorkoutService } from '../../shared/model/workout.service';
import { ValidationService } from '../../shared/validation.service';
import { Workout } from '../../shared/model/workout';
import { generateUrl } from '../../shared/space-to-dash';
import { WorkoutNameValidator } from '../validate-workout-name';

import * as _ from 'lodash';

// import * as RSVP from 'rsvp';
// declare var RSVP: any;
const RSVP = require('rsvp');

import * as Q from 'q';

@Component({
  selector: 'app-workout-edit',
  templateUrl: './workout-edit.component.html',
  styleUrls: ['./workout-edit.component.css']
})
export class WorkoutEditComponent implements OnInit, OnDestroy {
  workoutForm: FormGroup;
  private workoutIndex: number;
  private workoutUrl: string;
  private workout: Workout = null;
  private isNew = true;
  private paramsSub: Subscription;
  private workoutSub: Subscription;
  private foundWorkout: Workout;

  private remove = false;

  dirty = false;


  // ---------------------------------------------------------------------------------
  constructor(private route: ActivatedRoute,
              private exerciseService: ExerciseService,
              private workoutService: WorkoutService,
              private validationService: ValidationService,
              private formBuilder: FormBuilder,
              private router: Router,
              private location: Location) { 

  }

  // ---------------------------------------------------------------------------------
  ngOnInit() {

    this.workoutForm = this.formBuilder.group({
       name: [''],
       description: [''],
    });


    this.paramsSub = this.route.params.subscribe(
      params => {
        if (params.hasOwnProperty('id')) {
          this.isNew = false;
          this.workoutUrl = params['id'];
        }
      }
    )

    if (this.isNew === false) {
      this.workoutSub = this.workoutService.findWorkoutByUrl(this.workoutUrl)
        .subscribe(
          workout => {
            this.workout = workout;
            this.initForm();
          }
        );
    } else {
      this.initForm();
    }

  }


  // ---------------------------------------------------------------------------------
  onSubmit() {
    this.dirty = false;

    const newWorkout = this.workoutForm.value;
    newWorkout.url = generateUrl(newWorkout.name);
    
    if (this.isNew) {
      // console.log('onSubmit: ', this.validateName());
      this.workoutService.createWorkout(newWorkout);
    } else {
      this.workoutService.updateWorkout(this.workout, newWorkout);
    }
    this.navigateBack();
  }




// ---------------------------------------------------------------------------------
  onRemove() {

    this.remove = true;
    console.log('onRemove');

    const wKey = this.workout.$key;
    console.log('wKey: ', wKey);


    const t = this.workoutService.findAllExercisesForWorkout(this.workout.url)    
      .map(exercises => exercises.map(exercise => {
        // delete exercise.workouts[wKey];
        exercise.workouts[wKey] = false;

        console.log('exercise.workouts: ', exercise.workouts);

          // this.exerciseService.updateExercise(exercise.$key, {'workouts': exercise.workouts});        
        
      }))
      .toPromise();
      // .subscribe();

      console.log('t: ', t);

   t.then(
     function(value) {
       console.log('resolved value: ', value);
     },
     function(reason) {
      console.log('rejected reason: ', reason);
     }
   )   
    
    // this.workoutService.removeWorkout(this.workout);
    this.router.navigate(['/workouts']);

  }

  // ---------------------------------------------------------------------------------
  onRemove2() {

    const wKey = this.workout.$key;
    console.log('wKey: ', wKey);
    
    this.workoutService.findAllExercisesForWorkout(this.workout.url)    
      .map(exercises => exercises.map(exercise => {
        // delete exercise.workouts[wKey];
        exercise.workouts[wKey] = false;

        console.log('exercise.workouts: ', exercise.workouts);

          // this.exerciseService.updateExercise(exercise.$key, {'workouts': exercise.workouts});        
        
      }))
      .subscribe();
    
    // this.workoutService.removeWorkout(this.workout);    
    this.router.navigate(['/workouts']);

  }


  // ---------------------------------------------------------------------------------
  onCancel() {
    this.navigateBack();
  }

  // ---------------------------------------------------------------------------------
  ngOnDestroy() {

    console.log('OnDestroy');    
    if (this.remove) { this.workoutService.removeWorkout(this.workout);}
    
    this.paramsSub.unsubscribe();
    if (this.workoutSub) { this.workoutSub.unsubscribe(); }
  }

  // ---------------------------------------------------------------------------------
  private navigateBack() {
    this.location.back();
  }

  // ---------------------------------------------------------------------------------
  validateName(): boolean {

    this.workoutService.findWorkoutByUrl(generateUrl(this.workoutForm.value.name))
      .subscribe(
        workout => {
          if (typeof workout !== 'undefined') {
            return false;
          } else {
            return true;
          }
        },
        error => console.log(error),
        () => console.log('done')
      );
    

    
    return false;

  }




  // ---------------------------------------------------------------------------------
  private initForm() {

    let workoutName = '';
    let workoutDescription = '';
    // let workoutExercises: FormArray = new FormArray([]);

     if  (!this.isNew && this.workout) {
  //     if (this.workout.hasOwnProperty('exercises')) {
  //       for (let i = 0; i < this.workout.exercises.length; i++) {
  //         workoutExercises.push(
  //           new FormGroup({
  //             name: new FormControl(this.workout.exercises[i].name, Validators.required)
  //           })
  //         );
  //       }
  //     }

       workoutName = this.workout.name;
       workoutDescription = this.workout.description;
     }

    //  let val = new WorkoutNameValidator(this.workoutService);
     this.workoutForm = this.formBuilder.group({
      name: [workoutName, Validators.required],      
       description: [workoutDescription],
    });

    //  let testi = new WorkoutNameValidator(this.workoutService);
    //  console.log(testi.checkWorkoutName());
    
    // this.workoutForm.valueChanges
    this.workoutForm.valueChanges
      .filter(() => this.workoutForm.valid)
      // .map(value => new Workout(value.$key, value.name, value.description, value.url))
      // .do(formValue => console.log('Valid form value: ', formValue))
      .subscribe();

  }

  
}
