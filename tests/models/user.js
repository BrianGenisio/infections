import {User} from '../../app/models/user';

describe('User', () => {
    describe('Constructor', () => {
        it('sets properties', () => {
            const subject = new User(1, 'Brian', 'Genisio', 42);
            
            expect(subject.id).toBe(1);
            expect(subject.first).toBe('Brian');
            expect(subject.last).toBe('Genisio');
            expect(subject.version).toBe(42);
        });
    });
});