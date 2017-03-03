import { Exercise } from './exercise';

export class Category {
    
    constructor(
        public $key,
        public name: string,
        public url: string,
        public exercises: Exercise[],
        public createdAt: string,
        public modifiedAt: string) {
        }

    static fromJson({$key, name, url, exercises, createdAt, modifiedAt}): Category {
        return new Category(
            $key,
            name,
            url,
            exercises,
            createdAt,
            modifiedAt
        );
    }

    static fromJsonArray(json: any[]): Category[] {
        return json.map(Category.fromJson);
    }

}