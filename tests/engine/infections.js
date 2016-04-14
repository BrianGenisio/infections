import {Infections} from '../../app/engine/infections';
import {ClassStore} from '../../app/stores/class-store';
import {Class} from '../../app/models/class';

describe('Infections', () => {
   describe('with single class', () => {
       it('gets all users', done => {
           const classStore = new ClassStore([{instructors: [1], students: [2,3,4]}]);
           const infections = new Infections(classStore);
      
           infections.fromUser(1).then(allUsers => {
               expect(Array.from(allUsers)).toEqual([1,2,3,4]);
               done();
           });
       });
   });
});