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
        return this.instructors.concat(this.students);
    }
    
    hasUser(id) {
        return this.instructors.indexOf(id) >= 0 || this.students.indexOf(id) >= 0;
    }
}