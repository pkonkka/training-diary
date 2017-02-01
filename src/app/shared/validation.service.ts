import { Injectable, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { Workout } from './model/workout';
import { WorkoutService } from './model/workout.service';
import { generateUrl } from './space-to-dash';

@Injectable()
export class ValidationService implements OnDestroy {

  workouts: Workout[];
  workoutSub: Subscription;



  // ----------------------------------------------------------------------
  static nameValidator(control: FormControl) {

    const valid = false;

    return valid ? null : {
        nameValidator : {
            valid: false
        }
    };

  }


  // ----------------------------------------------------------------------
  constructor(private workoutService: WorkoutService) { 

    // this.workoutSub = this.workoutService.findAllWorkouts()
    //   .do(console.log)
    //   .subscribe(
    //     workouts => this.workouts
    //   );

    // this.workoutSub = this.workoutService.findAllWorkouts()
    //   .do(console.log)
    //   .subscribe(
    //     workouts => this.workouts = workouts
    //   );
    

  }







// ----------------------------------------------------------------------
  ngOnDestroy() {
    this.workoutSub.unsubscribe();
  }


}
