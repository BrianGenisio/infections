import {Class} from '../models/class';

export class ClassStore {
    constructor(primingData) {
        if(primingData) {
            this.classes = primingData.map(Class.fromJson);
        }
    }
    
    fetch() {
        // Make an HTTP call if we had a backend
        return Promise.resolve(this.classes || []);
    }
};