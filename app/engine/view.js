import vis from 'vis';

import {Graphs} from '../engine/graphs';
import {Infections} from '../engine/infections';

export class ViewEngine {
    constructor(container, userStore, classStore) {
        this._container = container;
        this._userStore = userStore;
        this._classStore = classStore;
        this._graphEngine = new Graphs(userStore, classStore);
        this._infectionEngine = new Infections(classStore);
    }

    drawInfectedUsers(userId) {
        const infectedUserIds = [...this._infectionEngine.fromUser(userId)];
        const infectedUsers = this._userStore.fetchUsers(infectedUserIds);
        const infectedClasses = [...this._classStore.classesForUsers(infectedUserIds)];
        const infectedGraph = this._graphEngine.getGraph(infectedUsers, infectedClasses);
        this.drawGraph(infectedGraph);
    }

    drawUniverse() {
        const universeGraph = this._graphEngine.getUniverse();
        this.drawGraph(universeGraph);
    }

    drawGraph(graph) {
        const nodes = new vis.DataSet(graph.nodes);
        const edges = new vis.DataSet(graph.edges);
        
        const options = {
            layout: {
                hierarchical: true
            },
            edges: {
                arrows: 'to'
            }
        };
        
        const network = new vis.Network(this._container, {nodes, edges}, options);
        network.on('click', (data) => {
            if(data.nodes.length) {
                this.drawInfectedUsers(data.nodes[0]);
            }
        })
    }
}