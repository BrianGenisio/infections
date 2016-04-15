
import $ from 'jquery';
import vis from 'vis';

import template from './index.html';
import {stubUsers, stubClasses} from './stub-data';

import {UserStore} from './stores/user-store';
import {ClassStore} from './stores/class-store';
import {Graphs} from './engine/graphs';

const userStore = new UserStore(stubUsers);
const classStore = new ClassStore(stubClasses);

const graphEngine = new Graphs(userStore, classStore);

$('body').append(template);

$('#main #get-infections').on('click', () => {
    try {
        drawUniverse();
    } catch(e) {}
    
    return false;
});

$(drawUniverse);

function drawUniverse() {
    const universeGraph = graphEngine.getUniverse();
    drawGraph(universeGraph);
}

function drawGraph(graph) {
    const container = $('#main .visualization')[0];
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
    
    const network = new vis.Network(container, {nodes, edges}, options);
}
