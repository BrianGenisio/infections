import {Class} from '../../app/models/class';

describe('Class', () => {
    describe('Constructor', () => {
        it('sets properties', () => {
            const subject = new Class('Math 101', [1], [2,3,4]);
            
            expect(subject.name).toBe('Math 101');
            expect(subject.instructors).toEqual([1]);
            expect(subject.students).toEqual([2,3,4]);
        }); 
    });
});