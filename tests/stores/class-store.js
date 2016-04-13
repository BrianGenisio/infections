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
});