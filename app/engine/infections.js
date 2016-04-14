
function flatten(arrays) {
    return [].concat(...arrays);
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