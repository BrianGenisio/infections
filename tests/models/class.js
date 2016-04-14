import {Class} from '../../app/models/class';

describe('Class', () => {
    let test = {};
    
    beforeEach(() => {
        test.subject = new Class('Math 101', [1], [2,3,4]);
    })
    
    describe('Constructor', () => {
        it('sets properties', () => {
            expect(test.subject.name).toBe('Math 101');
            expect(test.subject.instructors).toEqual([1]);
            expect(test.subject.students).toEqual([2,3,4]);
        }); 
    });
    
    describe("#allUsers", () => {
       it('gets set of instructors and students', () => {
           const allUsers = Array.from(test.subject.allUsers);
           expect(allUsers).toEqual([1,2,3,4]);
       });
    });
    
    describe("#hasUser", () => {
       it('is true when a class includes an instructor', () => {
           expect(test.subject.hasUser(1)).toBeTruthy();
       });
       
       it('is true when a class includes a student', () => {
           expect(test.subject.hasUser(2)).toBeTruthy();
       });
       
       it('is false when a class doesnt have a user', () => {
           expect(test.subject.hasUser(5)).toBeFalsy();
       });
    });
});