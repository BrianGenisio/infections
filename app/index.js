
import $ from 'jquery';
import vis from 'vis';

import template from './index.html';
import {stubUsers, stubClasses} from './stub-data';

import {UserStore} from './stores/user-store';
import {ClassStore} from './stores/class-store';
import {Graphs} from './engine/graphs';
import {Infections} from './engine/infections';

const userStore = new UserStore(stubUsers);
const classStore = new ClassStore(stubClasses);

const graphEngine = new Graphs(userStore, classStore);
const infectionEngine = new Infections(classStore);

$('body').append(template);

$('#main #get-infections').on('click', () => {
    try {
        const userId = parseInt($('#main #user-id').val());
        
        if(!userId) {
            alert('Invalid user id');
            return false;
        }
        
        drawInfectedUsers(userId);
    } catch(e) {}
    
    return false;
});

$(drawUniverse);

function drawInfectedUsers(userId) {
    const infectedUserIds = [...infectionEngine.fromUser(userId)];
    const infectedUsers = userStore.fetchUsers(infectedUserIds);
    const infectedClasses = [...classStore.classesForUsers(infectedUserIds)];
    const infectedGraph = graphEngine.getGraph(infectedUsers, infectedClasses);
    drawGraph(infectedGraph);
}

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
