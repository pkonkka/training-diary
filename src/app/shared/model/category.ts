

export class Category {
    
    constructor(
        public $key,
        public name: string,
        public url: string) {
        }

    static fromJson({$key, name, url}): Category {
        return new Category(
            $key,
            name,
            url
        );
    }

    static fromJsonArray(json: any[]): Category[] {
        return json.map(Category.fromJson);
    }

}