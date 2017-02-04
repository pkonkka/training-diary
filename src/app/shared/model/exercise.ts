

export class Exercise {
    
    constructor(
        public $key,
        public name: string, 
        public note: string, 
        public url: string,
        public workoutId: string,
        public createdAt: string,
        public modifiedAt: string) {

        }

    static fromJson({$key, name, note, url, workoutId, createdAt, modifiedAt}): Exercise {
        return new Exercise(
            $key,
            name,
            note,
            url,
            workoutId,
            createdAt,
            modifiedAt
        );
    }

    static fromJsonArray(json: any[]): Exercise[] {
        return json.map(Exercise.fromJson);
    }

}




