
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2';


import { generateUrl } from '../shared/space-to-dash';
import { WorkoutService } from '../shared/model/workout.service';
import { Workout } from '../shared/model/workout';


// export function validateName(ctrl: FormControl) {
    
//     const valid = false;
    
//     console.log(ctrl.value);


//     return valid ? null : {
//         validateName: {
//             valid: false
//         }
//     };

// }




// ===================================================================
export class WorkoutNameValidator {

    private workout: Workout = null;
    private test: string = 'testing';


    // ----------------------------------------------------
    constructor(private workoutService: WorkoutService) {

        console.log('constructor: ', workoutService);
        console.log(this.test);

    }

    private check() {

    }

    // ----------------------------------------------------
    // checkWorkoutName(ctrl: FormControl) {
        checkWorkoutName() {

        console.log('checkWorkoutName...');
        // return this.checkName(ctrl.value, this.workoutService);

        const valid = false;

        console.log('workout service >>>: ', this.workoutService);
        console.log(this.test);


        // console.log('checking name...', ctrl.value);
        // let url = generateUrl(ctrl.value);
        let url = 'total-body-23A';
        this.workoutService.findWorkoutByUrl(url)
             .do(console.log)
             .subscribe(
                 workout => this.workout = workout
             );

        if (this.workout !== null) { console.log('jee'); }

        return valid ? null : {
            checkName: {
                valid: false
            }
        };


        // return null;
    }


    // ----------------------------------------------------
    // checkName(name: string, workoutService: WorkoutService) {

    //     const valid = false;


    //     console.log('checking name...', name);
    //     console.log(workoutService);


    //     return valid ? null : {
    //         checkName: {
    //             valid: false
    //         }
    //     };


    // }   


}

