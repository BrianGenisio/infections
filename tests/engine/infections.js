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
   });
   
   describe('coach tree two deep', () => {
      it('traverses the tree', () => {
          const classStore = new ClassStore([
               {instructors: [1], students: [2,3,4]},
               {instructors: [2], students: [10,11]}
           ]);
           const infections = new Infections(classStore);
           
           const allUsers = infections.fromUser(1);
           
           expect(Array.from(allUsers)).toEqual([1, 2,3,4, 10,11]); 
      });
   });
   
   describe('coach tree three deep', () => {
      it('traverses the tree', () => {
          const classStore = new ClassStore([
               {instructors: [1], students: [2,3,4]},
               {instructors: [2], students: [10,11]},
               {instructors: [10], students: [100]},
               {instructors: [11], students: [200]},
           ]);
           const infections = new Infections(classStore);
           
           const allUsers = infections.fromUser(1);
           
           expect(Array.from(allUsers)).toEqual([1, 2,3,4, 10,11, 100, 200]); 
      });
   });
   
   describe('coach tree four deep', () => {
      it('traverses the tree', () => {
          const classStore = new ClassStore([
               {instructors: [1], students: [2,3,4]},
               {instructors: [2], students: [10,11]},
               {instructors: [10], students: [100]},
               {instructors: [11], students: [200]},
               {instructors: [200], students: [1000]},
           ]);
           const infections = new Infections(classStore);
           
           const allUsers = infections.fromUser(1);
           
           expect(Array.from(allUsers)).toEqual([1, 2,3,4, 10,11, 100, 200, 1000]); 
      });
   });
   
   describe('limits', () => {
      it('limits by generation', () => {
          const classStore = new ClassStore([
               {instructors: [1], students: [2,3,4]},
               {instructors: [2], students: [10,11]},
               {instructors: [10], students: [100]},
               {instructors: [11], students: [200]},
               {instructors: [200], students: [1000]},
           ]);
           const infections = new Infections(classStore);
           infections.updateLimit(5);
           
           const allUsers = infections.fromUser(1);
           
           expect(allUsers.size).toEqual(4);
           expect(Array.from(allUsers)).toEqual([1,2,3,4]);
      });
   });
   
});