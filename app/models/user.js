export class User {
    constructor(first, last, version) {
        this.first = first;
        this.last = last;
        this.version = version;
    }
    
    static fromJson(data) {
        return new User(data.first, data.last, data.version);
    }
}