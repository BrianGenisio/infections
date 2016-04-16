import vis from 'vis';

export class ViewEngine {
    constructor(container, userStore, classStore, graphEngine, infectionEngine) {
        this._container = container;
        this._userStore = userStore;
        this._classStore = classStore;
        this._graphEngine = graphEngine;
        this._infectionEngine = infectionEngine;
    }

    drawInfectedUsers(userId) {
        const infectedUserIds = [...this._infectionEngine.fromUser(userId)];
        const universeGraph = this._graphEngine.getUniverse();
        this.drawGraph(universeGraph, userId, infectedUserIds);
    }

    drawUniverse() {
        const universeGraph = this._graphEngine.getUniverse();
        this.drawGraph(universeGraph);
    }

    drawGraph(graph, userId, infectedUserIds) {
        if(infectedUserIds) {
            infectedUserIds.forEach(id => {
                let node = graph.nodes.find(n => n.id === id);
                if(node) {
                    node.color = '#D2E5FF';
                }
            })
        }
        
        if(userId) {
            const node = graph.nodes.find(n => n.id === userId);
            if(node) {
                node.color = "#B2C5DF";
                node.label = `* ${node.label} *`;
                node.labelHighlightBold = true;
            }
        }
        
        const nodes = new vis.DataSet(graph.nodes);
        const edges = new vis.DataSet(graph.edges);
        
        const options = {
            layout: {
                hierarchical: true
            },
            edges: {
                arrows: 'to'
            },
            nodes: {
                color: "#DDD"
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