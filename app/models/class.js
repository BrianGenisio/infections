export class Class {
    constructor(name, instructors, students) {
        this.name = name;
        this.instructors = instructors;
        this.students = students;
    }
    
    static fromJson(data) {
        return new Class(data.name, data.instructors, data.students);
    }
    
    get allUsers() {
        return new Set(this.instructors.concat(this.students));
    }
    
    hasUser(id) {
        return  this.allUsers.has(id);
    }
}