import {User} from '../models/user';

export class UserStore {
    constructor(primingData) {
        if(primingData) {
            this.users = primingData.map(User.fromJson);
        }
    }
    
    fetch() {
        // Make an HTTP call if we had a backend
        return Promise.resolve(this.users || []);
    }
};