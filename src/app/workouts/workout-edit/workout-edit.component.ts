import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { WorkoutService } from '../../shared/model/workout.service';
import { ValidationService } from '../../shared/validation.service';
import { Workout } from '../../shared/model/workout';
import { generateUrl } from '../../shared/space-to-dash';
import { WorkoutNameValidator } from '../validate-workout-name';

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

  dirty = false;


  // ---------------------------------------------------------------------------------
  constructor(private route: ActivatedRoute,
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
      this.workoutService.createWorkout(newWorkout);
    } else {
      this.workoutService.updateWorkout(this.workout, newWorkout);

    }
    this.navigateBack();
  }

  // ---------------------------------------------------------------------------------
  onRemove() {
    this.workoutService.removeWorkout(this.workout);
    this.navigateBack();
  }


  // ---------------------------------------------------------------------------------
  onCancel() {
    this.navigateBack();
  }


  // ---------------------------------------------------------------------------------
  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    if (this.workoutSub) { this.workoutSub.unsubscribe(); }
  }

  // ---------------------------------------------------------------------------------
  private navigateBack() {
    this.location.back();
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

     this.workoutForm = this.formBuilder.group({
      //  name: [workoutName, Validators.compose([Validators.required, Validators.maxLength(20), Validators.apply(validateName)])],
      // name: [workoutName, validateName(name, this.workoutService)],
      name: [workoutName, Validators.required],
      // name: [workoutName, new WorkoutNameValidator(this.workoutService).checkWorkoutName],
       description: [workoutDescription],
    });

     let testi = new WorkoutNameValidator(this.workoutService);
    //  console.log(testi.checkWorkoutName());
    
    // this.workoutForm.valueChanges
    this.workoutForm.valueChanges
      .filter(() => this.workoutForm.valid)
      // .map(value => new Workout(value.$key, value.name, value.description, value.url))
      // .do(formValue => console.log('Valid form value: ', formValue))
      .subscribe();

  }

  
}
