import {Class} from '../../app/models/class';
import {ClassStore} from '../../app/stores/class-store';

describe('ClassStore', () => {
    describe('fetch', () => {
        it('fetches classes', done => {
            const subject = new ClassStore([{ "name": "my class" }]);
            
            subject.fetch().then(classes => {
               expect(classes[0].name).toBe('my class');
               expect(classes[0] instanceof Class).toBeTruthy();
               done();
            });
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
       
        it('finds class where users are is instructor', done => {
            test.subject.classesForUser(1).then(classes => {
                expect(classes.length).toBe(1);
                expect(classes[0].name).toBe('math');
                done(); 
            });
        });
    });
});