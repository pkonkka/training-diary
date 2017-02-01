import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FirebaseListFactoryOpts } from 'angularfire2/interfaces';


import { Category } from './category';
import { Exercise } from './exercise';


@Injectable()
export class ExerciseService {

    private exercises$: FirebaseListObservable<Exercise[]>;

    // -------------------------------------------------------------------------------------------------
    constructor(private db: AngularFireDatabase) {

        this.exercises$ = this.db.list('exercises');
        
    }

    // -------------------------------------------------------------------------------------------------
    //  Get all exercises
    // -------------------------------------------------------------------------------------------------    
    findAllExercises(): Observable<Exercise[]> {
        // return this.db.list('exercises').map(Exercise.fromJsonArray);

        // this.exercises$ = this.db.list('exercises');
        return this.exercises$.map(Exercise.fromJsonArray);
    }


    // -------------------------------------------------------------------------------------------------
    // Find an exercise by an excerise url
    // -------------------------------------------------------------------------------------------------
    findExerciseByUrl(exerciseUrl: string): Observable<Exercise> {
        return this.db.list('exercises', {
            query: {
                orderByChild: 'url',
                equalTo: exerciseUrl
            }
        })
        .map(results => results[0]);
    }


    // -------------------------------------------------------------------------------------------------
    // Find an category by category url
    // -------------------------------------------------------------------------------------------------
    findCategoryByUrl(categoryUrl: string): Observable<Category> {
        return this.db.list('categories', {
            query: {
                orderByChild: 'url',
                equalTo: categoryUrl
            }
        })
        .map(results => results[0]);
    }


    // -------------------------------------------------------------------------------------------------
    findAllExercisesForCategory(categoryUrl: string): Observable<Exercise[]> {
        return this.findExercisesForExerciseKeys(this.findExerciseKeysPerCategoryUrl(categoryUrl));
    }



    // -------------------------------------------------------------------------------------------------
    findExerciseKeysPerCategoryUrl(categoryUrl: string,
                                   query: FirebaseListFactoryOpts = {}): Observable<string[]> {

        return this.findCategoryByUrl(categoryUrl)
            // .do(val => console.log('category', val))
            .filter(category => !!category)
            .switchMap(category => this.db.list(`exercisesPerCategory/${category.$key}`, query))
            .map( lspc => lspc.map(lpc => lpc.$key) );

    }




    // -------------------------------------------------------------------------------------------------
    findExercisesForExerciseKeys(exerciseKeys$: Observable<string[]>): Observable<Exercise[]> {
        return exerciseKeys$
            .map(lspc => lspc.map(exerciseKey => this.db.object('exercises/' + exerciseKey)) )
            .flatMap(fbojs => Observable.combineLatest(fbojs) );

    }

    // -------------------------------------------------------------------------------------------------
    //  Create new exercise item
    // -------------------------------------------------------------------------------------------------    
    createExercise(data: {}): firebase.Promise<any> {
        return this.exercises$.push(data);
    }


    // -------------------------------------------------------------------------------------------------
    //  Remove a exercise from the database
    // - exercises
    // - exercisesPerWorkout
    // - exercisesPerCategory
    // -------------------------------------------------------------------------------------------------    
    removeExercise(exercise: Exercise): firebase.Promise<any> {

        
        return this.db.list('exercises').remove(exercise.$key);


        // return this.exercises$.remove(exercise.$key);
    }

    // -------------------------------------------------------------------------------------------------
    //  Update a exercise
    // -------------------------------------------------------------------------------------------------    
    updateExercise(exercise: Exercise, changes: any): firebase.Promise<any> {
        return this.exercises$.update(exercise.$key, changes);
    }

}