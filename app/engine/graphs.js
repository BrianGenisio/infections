
function flatten(arrays) {
    return arrays.reduce((all, a) => all.concat(a), []);
}

function edgesForClass(c) {
    return flatten(
        c.instructors.map(i => {
            return c.students.map(c => ({from: i, to: c})); 
        })
    );
}

export class Graphs {
    constructor(userStore, classStore) {
        this.userStore = userStore;
        this.classStore = classStore;
    }
    
    getUniverse() {
        const allUsers = this.userStore.fetch();
        const allClasses = this.classStore.fetch();
        
        return this.getGraph(allUsers, allClasses);
    }
    
    getGraph(users, classes) {
        const nodes = users.map(u => ({id: u.id, label: `${u.first} ${u.last}`}));
        const edges = flatten(classes.map(edgesForClass));
        
        return {nodes, edges};
    }
}