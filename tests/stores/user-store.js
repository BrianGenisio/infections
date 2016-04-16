import {User} from '../../app/models/user';
import {UserStore} from '../../app/stores/user-store';

describe('UserStore', () => {
    describe('fetch', () => {
        it('fetches users', () => {
            const subject = new UserStore([{ first: "brian", last: "genisio", version: 42 }]);
            
            const users = subject.fetch();
               
            expect(users[0].first).toBe('brian');
            expect(users[0].last).toBe('genisio');
            expect(users[0].version).toBe(42);
            expect(users[0] instanceof User).toBeTruthy();
        }); 
    });
});