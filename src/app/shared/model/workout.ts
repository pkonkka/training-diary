
import { Exercise, ExerciseKey } from './exercise';

export class WorkoutKey {
    constructor(
        public id: string,
        public status: boolean
    )
    {

    }
}


export class Workout {

    constructor(
        public $key: string,        
        public name: string, 
        public description: string,
        public url: string,
        public exercises: Exercise[],
        public createdAt: string,
        public modifiedAt: string) {
        }

        static fromJson({$key, name, description, url, exercises, createdAt, modifiedAt}): Workout {
            return new Workout($key, name, description, url, exercises, createdAt, modifiedAt);
        }

        static fromJsonArray(json: any[]): Workout[] {
            return json.map(Workout.fromJson);
        }
}



