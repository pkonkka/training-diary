
import { Directive, forwardRef } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2';

import { generateUrl } from '../shared/space-to-dash';
import { WorkoutService } from '../shared/model/workout.service';
import { Workout } from '../shared/model/workout';


function validateWorkoutName(workoutService: WorkoutService) {
    const valid = false;

    // console.log('validateWorkoutName: ', workouts);

    return (c: FormControl) => {
        return c.value === 'AA' ? null : {
            validateWorkoutName: {
                valid: false
            }
        }
    }
}



// ===================================================================
export class WorkoutNameValidator {

    validator: Function;
    allWorkouts: Workout[];

    // ----------------------------------------------------
    constructor(private workoutService: WorkoutService) {
        console.log('validator constructor');

        console.log(workoutService);

        // get all existing workouts
        // workoutService.findAllWorkouts()
        //     .subscribe(
        //         workouts => this.allWorkouts = workouts
        //     );


        // this.validator = validateWorkoutName(this.allWorkouts);
        this.validator = validateWorkoutName(workoutService);

    }

    // ----------------------------------------------------
    validate(ctrl: FormControl) {
        console.log('validate');
        return this.validator(ctrl);
    }    

}


export function validate2(ctrl: FormControl, workoutService: WorkoutService) {

    const valid = false;
    let found = false;
    let a: Workout;
    

    workoutService.findWorkoutByUrl(generateUrl(ctrl.value))
        .toPromise()
        .then((workout) => console.log(workout.name));
    
    
    // workoutSub.unsubscribe();
    console.log('a >>>>: ',a);
    return typeof a === 'undefined' ? null : {
        validate2: {
            valid: false
        }
    };

        // return ctrl.value === 'AA' ? null : {
        //     validate2: {
        //         valid: false
        //     }
        // }

    // return !found ? null : {
    //     validate2: {
    //         valid: false
    //     }
    // };
    
/*
    console.log('ctrl value: ', ctrl.value);
    console.log(workoutService);
    // return false;
    workoutService.findWorkoutByUrl(generateUrl(ctrl.value))
        .do(
            workout => { 
                a = workout;
                if ( typeof a !== 'undefined') {
                    found = true;
                    console.log('FOUND !!!');
                    return { validate2: { valid: false }};
    // return !found ? null : {
    //     validate2: {
    //         valid: false
    //     }
    // };
                    
                } else {
                    console.log('NOT FOUND !!!');
                    found = false;
                    return null;
    // return !found ? null : {
    //     validate2: {
    //         valid: false
    //     }
    // };
                    
                }
            }
        )
        .subscribe();

    // return !found ? null : {
    //     validate2: {
    //         valid: false
    //     }
    // };

        // return ctrl.value === 'AA' ? null : {
        //     validate2: {
        //         valid: false
        //     }
        // };
    */

}

    // this.workoutSub = this.workoutService.findAllWorkouts()
    //   .subscribe( 
    //     workouts => {
    //       this.allWorkouts = this.filtered = workouts;
    //       this.sortByTime();
    //       this.pages = _.chunk(this.allWorkouts, 5);

    //     }
    //   );



    // this.filtered = this.allWorkouts.filter(function (workout) {

    //   let description = workout.description.toLowerCase();
    //   let name = workout.name.toLowerCase();
    //   search = search.toLowerCase();
    //   let retval = name.includes(search) || description.includes(search);

    //   return retval;
    // });



    export function validate3(ctrl: FormControl) {

        const valid = false;

        


        return ctrl.value === 'AA' ? null : {
            validate3: {
                valid: false
            }
        }

    }