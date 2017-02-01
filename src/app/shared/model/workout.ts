
export class Workout {

    constructor(
        public $key: string,        
        public name: string, 
        public description: string,
        public url: string) {
        }

        static fromJson({$key, name, description, url}): Workout {
            return new Workout($key, name, description, url);
        }

        static fromJsonArray(json: any[]): Workout[] {
            return json.map(Workout.fromJson);
        }
}



