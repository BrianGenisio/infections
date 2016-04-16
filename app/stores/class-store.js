import {union} from '../utility/sets';
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
        return this.classes;
    }
    
    classesForUser(id) {
        return this.classes.filter(c => c.hasUser(id));
    }
    
    classesForUsers(ids) {
        return union(ids.map(id => this.classesForUser(id)));
    }
};