
import {union, difference} from '../utility/sets';

function directConnections(id, classStore) {
    const classes = classStore.classesForUser(id);
    return union(classes.map(c => c.allUsers));
}
    
function connections(ids, classStore) {
    const sets = Array.from(ids).map(id => directConnections(id, classStore));
    return union(sets);
}

function withinLimit(nextGeneration, currentGeneration, limit) {
    if(!limit) return true;
    
    const all = union([nextGeneration, currentGeneration]);
    
    return all.size <= limit;
}

export class Infections {
    constructor(classStore) {
        this.classStore = classStore;
        this.limit = 0;
    }
    
    updateLimit(limit) {
        this.limit = limit;
    }
    
    fromUser(id) {
        return this.fromUsers([id]);
    }
    
    fromUsers(ids) {
        let currentGeneration = new Set(ids);
        let nextGeneration = connections(currentGeneration, this.classStore);
        
        while(nextGeneration.size > currentGeneration.size && withinLimit(nextGeneration, currentGeneration, this.limit)) {
            const newItems = difference(nextGeneration, currentGeneration);
            currentGeneration = nextGeneration;
            nextGeneration = union([currentGeneration, connections(newItems, this.classStore)]);
        }
        
        return currentGeneration;
    }
}