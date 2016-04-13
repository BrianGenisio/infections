export class Class {
    constructor(name, instructors, students) {
        this.name = name;
        this.instructors = instructors;
        this.students = students;
    }
    
    static fromJson(data) {
        return new Class(data.name, data.instructors, data.students);
    }
}