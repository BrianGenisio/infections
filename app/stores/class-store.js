import {Class} from '../models/class';

export class ClassStore {
    constructor(primingData) {
        if(primingData) {
            this._classes = primingData.map(Class.fromJson);
        }
    }
    
    get classes() {
        return this._classes || [];
    }
    
    fetch() {
        return Promise.resolve(this.classes);
    }
    
    classesForUser(id) {
        return Promise.resolve(this.classes.filter(c => c.hasUser(id)));
    }
};