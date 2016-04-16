import {User} from '../models/user';

export class UserStore {
    constructor(primingData) {
        if(primingData) {
            this._users = primingData.map(User.fromJson);
        }
    }
    
    get users() {
        return this._users || [];
    }
    
    fetch() {
        return this.users;
    }
    
    fetchUser(id) {
        return this.users.find(u => u.id === id);
    }
    
    fetchUsers(ids) {
        return ids.map(id => this.fetchUser(id));
    }
};