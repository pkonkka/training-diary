import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FirebaseListFactoryOpts } from 'angularfire2/interfaces';

import * as _ from 'lodash';


import { Category } from './category';
import { Exercise } from './exercise';

import { AuthService } from '../security/auth.service';
import { AuthInfo } from '../security/auth-info';

@Injectable()
export class ExerciseService {

    private exercises$: FirebaseListObservable<Exercise[]>;
    private authInfo: AuthInfo;
    private userUrl;
    private exerciseUrl;

    // -------------------------------------------------------------------------------------------------
    constructor(private db: AngularFireDatabase, private authService: AuthService) {

        this.authService.authInfo$.subscribe(authInfo => this.authInfo = authInfo);
        this.userUrl = 'users/' + this.authInfo.$uid + '/';
        this.exerciseUrl = this.userUrl + 'exercises';

        this.exercises$ = this.db.list(this.exerciseUrl);
        
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
        return this.db.list(this.exerciseUrl, {
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
        return this.db.list(this.userUrl + 'categories', {
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
            .filter(category => !!category)
            .switchMap(category => this.db.list(`${this.userUrl}/exercisesPerCategory/${category.$key}`, query))
            .map( lspc => lspc.map(lpc => lpc.$key) );

    }




    // -------------------------------------------------------------------------------------------------
    findExercisesForExerciseKeys(exerciseKeys$: Observable<string[]>): Observable<Exercise[]> {
        return exerciseKeys$
            .map(lspc => lspc.map(exerciseKey => this.db.object(this.exerciseUrl + exerciseKey)) )
            .flatMap(fbojs => Observable.combineLatest(fbojs) );

    }

    // -------------------------------------------------------------------------------------------------
    //  Create new exercise item
    // -------------------------------------------------------------------------------------------------    
    createExercise(data): firebase.Promise<any> {
        data.modifiedAt = data.createdAt = _.now();
        return this.exercises$.push(data);
    }


    // -------------------------------------------------------------------------------------------------
    //  Remove a exercise from the database
    // - exercises
    // - exercisesPerWorkout
    // - exercisesPerCategory
    // -------------------------------------------------------------------------------------------------    
    removeExercise(exercise: Exercise): firebase.Promise<any> {

        
        return this.db.list(this.exerciseUrl).remove(exercise.$key);


        // return this.exercises$.remove(exercise.$key);
    }

    // -------------------------------------------------------------------------------------------------
    //  Update a exercise
    // -------------------------------------------------------------------------------------------------    
    updateExercise(exercise: Exercise, changes: any): firebase.Promise<any> {
        changes.modifiedAt = _.now();
        return this.exercises$.update(exercise.$key, changes);
    }

}