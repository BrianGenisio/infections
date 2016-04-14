
function union(sets) {
    return sets.reduce((result, s) => new Set([...result, ...s]), new Set());
}

function difference(lhs, rhs) {
    return new Set([...lhs].filter(x => !rhs.has(x)));
}

export class Infections {
    constructor(classStore) {
        this.classStore = classStore;
    }
    
    fromUser(id) {
        return this.fromUsers([id]);
    }
    
    fromUsers(ids) {
        let currentGeneration = new Set(ids);
        let nextGeneration = this.connections(currentGeneration);
        
        while(nextGeneration.size > currentGeneration.size) {
            const newItems = difference(nextGeneration, currentGeneration);
            currentGeneration = nextGeneration;
            nextGeneration = union([currentGeneration, this.connections(newItems)]);
        }
        
        return currentGeneration;
    }
    
    directConnections(id) {
        const classes = this.classStore.classesForUser(id);
        return union(classes.map(c => c.allUsers));
    }
    
    connections(ids) {
        const sets = Array.from(ids).map(id => this.directConnections(id));
        return union(sets);
    }
}