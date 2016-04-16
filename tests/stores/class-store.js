import {Class} from '../../app/models/class';
import {ClassStore} from '../../app/stores/class-store';

describe('ClassStore', () => {
    describe('fetch', () => {
        it('fetches classes', () => {
            const subject = new ClassStore([{ "name": "my class" }]);
            
            const classes = subject.fetch();
            
            expect(classes[0].name).toBe('my class');
            expect(classes[0] instanceof Class).toBeTruthy();
        }); 
    });
    
    describe('#classesForUser', () => {
        const test = {};
        
        beforeEach(() => {
            test.subject = new ClassStore([
                {name: 'math', instructors: [1], students: [2,3,4]},
                {name: 'science', instructors: [5], students: [2,3,4]},
            ]);
        });
       
        it('finds class where users are is instructor', () => {
            const classes = test.subject.classesForUser(1);
            
            expect(classes.length).toBe(1);
            expect(classes[0].name).toBe('math');
        });
    });
});