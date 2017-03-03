import { Location} from '@angular/common';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { Exercise } from '../../shared/model/exercise';
import { Workout } from '../../shared/model/workout';
import { WorkoutService } from '../../shared/model/workout.service';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.css']
})
export class WorkoutDetailComponent implements OnInit, OnDestroy {

  exercisesSub: Subscription;
  paramsSub:    Subscription;

  // workout: Workout;
  workoutExercises: Exercise[] = [];
  // workoutForm: FormGroup;

  workoutName: string = '';
  workoutUrl: string;

  

  // ------------------------------------------------------------------------------------    
  constructor(
    private route: ActivatedRoute, 
    private workoutService: WorkoutService, 
    private router: Router, 
    private formBuilder: FormBuilder,
    private location: Location) { 


    }

  // ------------------------------------------------------------------------------------    
  ngOnInit() {

    this.paramsSub = this.route.queryParams.subscribe(
      params => {
        this.workoutName = params['name'];
      }
    );

    this.workoutUrl = this.route.snapshot.params['id'];

    this.exercisesSub = this.workoutService.findAllExercisesForWorkout(this.workoutUrl)
      .subscribe(
        exercises => {
          this.workoutExercises = exercises;
        }
      );

  }

  // ------------------------------------------------------------------------------------    
  onEdit() {
    this.router.navigate(['/workouts', this.workoutUrl, 'edit']);
  }


  // ------------------------------------------------------------------------------------    
  onAddExercise() {
  }


  // ------------------------------------------------------------------------------------    
  onCancel() {
    this.location.back();
  }


  // ------------------------------------------------------------------------------------    
  ngOnDestroy() {
    this.exercisesSub.unsubscribe();
    this.paramsSub.unsubscribe();
  }



}

