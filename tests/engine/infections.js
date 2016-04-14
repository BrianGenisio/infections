import {Infections} from '../../app/engine/infections';
import {ClassStore} from '../../app/stores/class-store';
import {Class} from '../../app/models/class';

describe('Infections', () => {
   describe('coach with single class', () => {
       it('gets all users', () => {
           const classStore = new ClassStore([{instructors: [1], students: [2,3,4]}]);
           const infections = new Infections(classStore);
      
           const allUsers = infections.fromUser(1);
           
           expect(Array.from(allUsers)).toEqual([1,2,3,4]);
       });
   });
   
   describe('coach with two classes', () => {
       it('gets users from both classes', () => {
           const classStore = new ClassStore([
               {instructors: [1], students: [2,3,4]},
               {instructors: [1], students: [4,5,6]}
           ]);
           const infections = new Infections(classStore);
           
           const allUsers = infections.fromUser(1);
           
           expect(Array.from(allUsers)).toEqual([1,2,3,4,5,6]); 
       });
   })
   
   describe('coach tree two deep', () => {
      it('traverses the tree', () => {
          const classStore = new ClassStore([
               {instructors: [1], students: [2,3,4]},
               {instructors: [2], students: [5,6]}
           ]);
           const infections = new Infections(classStore);
           
           const allUsers = infections.fromUser(1);
           
           expect(Array.from(allUsers)).toEqual([1,2,3,4,5,6]); 
      }) 
   });
});