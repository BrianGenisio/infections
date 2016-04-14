import {User} from '../models/user';

export class UserStore {
    constructor(primingData) {
        if(primingData) {
            this.users = primingData.map(User.fromJson);
        }
    }
    
    fetch() {
        return this.users || [];
    }
};