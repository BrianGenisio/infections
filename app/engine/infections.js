
function flatten(sets) {
    return sets.reduce((result, s) => new Set([...result, ...s]), new Set());
}

export class Infections {
    constructor(classStore) {
        this.classStore = classStore;
    }
    
    fromUser(id) {
        const firstGenerationIds = this.singleGeneration(id);
        return this.nextGeneration(firstGenerationIds);
    }
    
    singleGeneration(id) {
        const classes = this.classStore.classesForUser(id);
        return flatten(classes.map(c => c.allUsers));
    }
    
    nextGeneration(ids) {
        const sets = Array.from(ids).map(id => this.singleGeneration(id));
        return flatten(sets);
    }
}