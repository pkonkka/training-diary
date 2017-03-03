import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
// import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FirebaseListFactoryOpts } from 'angularfire2/interfaces';

// import * as _ from 'lodash';
import * as moment from 'moment';

// import 'rxjs/add.operator/map';
// import 'rxjs/add.operator/do';


import { Workout } from './workout';
import { Exercise } from './exercise';
import { AuthService } from '../security/auth.service';
import { AuthInfo } from '../security/auth-info';

@Injectable()
export class WorkoutService {


    private workouts$: FirebaseListObservable<Workout[]>;
    private authInfo: AuthInfo;
    private userUrl;
    private workoutUrl;

    // -------------------------------------------------------------------------------------------------
    constructor(private db: AngularFireDatabase, private authService: AuthService) {
        this.authService.authInfo$.subscribe(authInfo => this.authInfo = authInfo);
        this.setPaths();
    }

    // -------------------------------------------------------------------------------------------------
    //  Set paths
    // -------------------------------------------------------------------------------------------------    
    private setPaths() {
        this.userUrl = 'users/' + this.authInfo.$uid + '/';
        this.workoutUrl = this.userUrl + 'workouts';
        this.workouts$ = this.db.list(this.workoutUrl);
    }

    // -------------------------------------------------------------------------------------------------
    //  Get all workouts from the database
    // -------------------------------------------------------------------------------------------------    
    findAllWorkouts(): Observable<Workout[]> {

        return this.workouts$.map(Workout.fromJsonArray);

    }

    // -------------------------------------------------------------------------------------------------
    //  Get five first workouts, ordered by url
    // -------------------------------------------------------------------------------------------------    
    loadFirstWorkoutsPage(pageSize = 5): Observable<Workout[]> {

        this.workouts$ = this.db.list(this.workoutUrl, {
            query: {
                orderByChild: 'url',
                limitToFirst: pageSize
            }
        });
        return this.workouts$.map(Workout.fromJsonArray);

    }
    

    // -------------------------------------------------------------------------------------------------
    //  Get a workout by an url
    // -------------------------------------------------------------------------------------------------    
    findWorkoutByUrl(workoutUrl: string): Observable<Workout> {
        return this.db.list(this.workoutUrl, {
            query: {
                orderByChild: 'url',
                equalTo: workoutUrl
            }
        })
        .map(results => results[0])
        .do(console.log)
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    // -------------------------------------------------------------------------------------------------
    //  Get the exercise keys per workout url
    // -------------------------------------------------------------------------------------------------    
    // findExerciseKeysPerWorkoutUrl(workoutUrl: string,
    //                               query: FirebaseListFactoryOpts = {}): Observable<string[]> {

    //     return this.findWorkoutByUrl(workoutUrl)
    //         .do(val => console.log('workout', val))
    //         .filter(workout => !!workout)
    //         .switchMap(workout => this.db.list(`${this.userUrl}/exercisesPerWorkout/${workout.$key}`, query))
    //         .map( lspc => lspc.map(lpc => lpc.$key) );

    // }

    // -------------------------------------------------------------------------------------------------
    //  Get the exercise keys per workout url
    // -------------------------------------------------------------------------------------------------    
    findExerciseKeysPerWorkoutUrl(
        workoutUrl: string,
        query: FirebaseListFactoryOpts = {}): Observable<string[]> {
            return this.findWorkoutByUrl(workoutUrl)
                .filter(workout => !!workout)
                .switchMap(workout => this.db.list(`${this.workoutUrl}/${workout.$key}/exercises`, query))
                .map(lspc => lspc.map(lpc => lpc.$key));
                // .do(console.log);
        }

    // -------------------------------------------------------------------------------------------------
    //  Get an exercise based an exercise key
    // -------------------------------------------------------------------------------------------------    
    findExercisesForExerciseKeys(exerciseKeys$: Observable<string[]>): Observable<Exercise[]> {
        return exerciseKeys$
            .map(lspc => lspc.map(exerciseKey => this.db.object(this.userUrl + 'exercises/' + exerciseKey)) )
            .flatMap(fbojs => Observable.combineLatest(fbojs));
            // .do(console.log);

    }


    // -------------------------------------------------------------------------------------------------
    //  Get all exercises for a workout
    // -------------------------------------------------------------------------------------------------    
    // findAllExercisesForWorkout(workoutUrl: string): Observable<Exercise[]> {
    //     return this.findExercisesForExerciseKeys(this.findExerciseKeysPerWorkoutUrl(workoutUrl));
    // }

    // -------------------------------------------------------------------------------------------------
    //  Get all exercises for a workout
    // -------------------------------------------------------------------------------------------------    
    findAllExercisesForWorkout(workoutUrl: string): Observable<Exercise[]> {

        return this.findExercisesForExerciseKeys(this.findExerciseKeysPerWorkoutUrl(workoutUrl));

    }




    // -------------------------------------------------------------------------------------------------
    //  Get only the first page
    // -------------------------------------------------------------------------------------------------
    loadFirstExercisesPage(workoutUrl: string, pageSize: number): Observable<Exercise[]> {

        const firstPageExerciseKeys$ = this.findExerciseKeysPerWorkoutUrl(workoutUrl,
            {
                query: {
                    limitToFirst: pageSize
                }
            });

        return this.findExercisesForExerciseKeys(firstPageExerciseKeys$);
    }


    // -------------------------------------------------------------------------------------------------
    //  Get next page
    // -------------------------------------------------------------------------------------------------    
    loadNextPage(workoutUrl: string, exerciseKey: string, pageSize: number): Observable<Exercise[]> {

        const exerciseKeys$ = this.findExerciseKeysPerWorkoutUrl(workoutUrl,
            {
                query: {
                    orderByKey: true,
                    startAt: exerciseKey,
                    limitToFirst: pageSize + 1
                }
            });

        return this.findExercisesForExerciseKeys(exerciseKeys$)
            .map(exercises => exercises.slice(1, exercises.length));
    }

    // -------------------------------------------------------------------------------------------------
    //  Get previous page
    // -------------------------------------------------------------------------------------------------    
    loadPreviousPage(workoutUrl: string, exerciseKey: string, pageSize: number): Observable<Exercise[]> {


        const exerciseKeys$ = this.findExerciseKeysPerWorkoutUrl(workoutUrl,
            {
                query: {
                    orderByKey: true,
                    endAt: exerciseKey,
                    limitToLast: pageSize + 1
                }
            });

        return this.findExercisesForExerciseKeys(exerciseKeys$)
            .map(exercises => exercises.slice(0, exercises.length - 1));

    }


    // -------------------------------------------------------------------------------------------------
    //  Create new workout item
    // -------------------------------------------------------------------------------------------------    
    createWorkout(data): firebase.Promise<any> {
        data.modifiedAt = data.createdAt = moment().format();
        return this.workouts$.push(data);
    }
    // createWorkout(data: {}): Observable<Workout> {
    //     return this.workouts$.push(data)
    //         // .map((res: Response) => res.json())
    //         .do(console.log)
    //         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    // }


    // -------------------------------------------------------------------------------------------------
    //  Remove a workout from the database
    // -------------------------------------------------------------------------------------------------    
    removeWorkout(workout: Workout): firebase.Promise<any> {
        // let item = this.db.list(`exercisesPerWorkout/${workout.$key}`);
        // item.remove();

        return this.workouts$.remove(workout.$key);
    }

    // -------------------------------------------------------------------------------------------------
    //  Update a workout
    // -------------------------------------------------------------------------------------------------    
    updateWorkout(workout: Workout, changes: any): firebase.Promise<any> {
        changes.modifiedAt = moment().format();
        return this.workouts$.update(workout.$key, changes);

    }


}
