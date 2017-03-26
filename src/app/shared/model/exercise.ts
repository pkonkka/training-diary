import { Workout, WorkoutKey } from './workout';
import { Category } from './category';


export class ExerciseKey {
    constructor(
        public key: string,
        public status: boolean
    )
    {}

}


export class Exercise {
    
    constructor(
        public $key,
        public name: string, 
        public note: string, 
        public url: string,
        public workouts: Workout[],
        public categories: Category[],
        public workoutId: string,
        public createdAt: string,
        public modifiedAt: string) {

        }

    static fromJson({$key, name, note, url, workouts, categories, workoutId, createdAt, modifiedAt}): Exercise {
        return new Exercise(
            $key,
            name,
            note,
            url,
            workouts,
            categories,
            workoutId,
            createdAt,
            modifiedAt
        );
    }

    static fromJsonArray(json: any[]): Exercise[] {
        return json.map(Exercise.fromJson);
    }

}




