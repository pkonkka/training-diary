
export class Workout {

    constructor(
        public $key: string,        
        public name: string, 
        public description: string,
        public url: string,
        public createdAt: string,
        public modifiedAt: string) {
        }

        static fromJson({$key, name, description, url, createdAt, modifiedAt}): Workout {
            return new Workout($key, name, description, url, createdAt, modifiedAt);
        }

        static fromJsonArray(json: any[]): Workout[] {
            return json.map(Workout.fromJson);
        }
}



