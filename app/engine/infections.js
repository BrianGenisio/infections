
function flatten(sets) {
    return sets.reduce((result, s) => new Set([...result, ...s]), new Set());
}

export class Infections {
    constructor(classStore) {
        this.classStore = classStore;
    }
    
    fromUser(id) {
        return this.classStore.classesForUser(id)
            .then(classes => flatten(classes.map(c => c.allUsers)));
    }
}