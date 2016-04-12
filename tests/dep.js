import {test} from '../app/dep';

describe('basic test', function() {
   it('works', function() {
     expect(true).toBe(true);  
   });
   
   it('can do ES6', () => {
       expect(test).toBe('hello world');
   });
});