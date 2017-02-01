

export class Exercise {
    
    constructor(
        public $key,
        public name: string, 
        public note: string, 
        public url: string,
        public workoutId: string) {

        }

    static fromJson({$key, name, note, url, workoutId}): Exercise {
        return new Exercise(
            $key,
            name,
            note,
            url,
            workoutId
        );
    }

    static fromJsonArray(json: any[]): Exercise[] {
        return json.map(Exercise.fromJson);
    }

}




