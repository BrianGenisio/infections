export class User {
    constructor(id, first, last, version) {
        this.id = id;
        this.first = first;
        this.last = last;
        this.version = version;
    }
    
    static fromJson(data) {
        return new User(data.id, data.first, data.last, data.version);
    }
}