import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
// import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FirebaseListFactoryOpts } from 'angularfire2/interfaces';

// import 'rxjs/add.operator/map';
// import 'rxjs/add.operator/do';


import { Workout } from './workout';
import { Exercise } from './exercise';

@Injectable()
export class WorkoutService {

    private workouts$: FirebaseListObservable<Workout[]>;

    // -------------------------------------------------------------------------------------------------
    constructor(private db: AngularFireDatabase) {

        this.workouts$ = this.db.list('workouts');

    }

    // -------------------------------------------------------------------------------------------------
    //  Get all workouts from the database
    // -------------------------------------------------------------------------------------------------    
    findAllWorkouts(): Observable<Workout[]> {

        return this.workouts$.map(Workout.fromJsonArray);

        // return this.db.list('workouts').map(Workout.fromJsonArray);

    }

    // -------------------------------------------------------------------------------------------------
    //  Get five first workouts, ordered by url
    // -------------------------------------------------------------------------------------------------    
    loadFirstWorkoutsPage(pageSize = 5): Observable<Workout[]> {

        this.workouts$ = this.db.list('workouts', {
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
        return this.db.list('workouts', {
            query: {
                orderByChild: 'url',
                equalTo: workoutUrl
            }
        })
        .do(val => console.log('workout service: ', val))
        .map(results => results[0])
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    // -------------------------------------------------------------------------------------------------
    //  Get the exercise keys per workout url
    // -------------------------------------------------------------------------------------------------    
    findExerciseKeysPerWorkoutUrl(workoutUrl: string,
                                  query: FirebaseListFactoryOpts = {}): Observable<string[]> {

        return this.findWorkoutByUrl(workoutUrl)
            // .do(val => console.log('workout', val))
            .filter(workout => !!workout)
            .switchMap(workout => this.db.list(`exercisesPerWorkout/${workout.$key}`, query))
            .map( lspc => lspc.map(lpc => lpc.$key) );

    }

    // -------------------------------------------------------------------------------------------------
    //  Get an exercise based an exercise key
    // -------------------------------------------------------------------------------------------------    
    findExercisesForExerciseKeys(exerciseKeys$: Observable<string[]>): Observable<Exercise[]> {
        return exerciseKeys$
            .map(lspc => lspc.map(exerciseKey => this.db.object('exercises/' + exerciseKey)) )
            .flatMap(fbojs => Observable.combineLatest(fbojs) );

    }

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
    createWorkout(data: {}): firebase.Promise<any> {
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
        let item = this.db.list(`exercisesPerWorkout/${workout.$key}`);
        item.remove();

        return this.workouts$.remove(workout.$key);
    }

    // -------------------------------------------------------------------------------------------------
    //  Update a workout
    // -------------------------------------------------------------------------------------------------    
    updateWorkout(workout: Workout, changes: any): firebase.Promise<any> {

        return this.workouts$.update(workout.$key, changes);

    }


}
