
import $ from 'jquery';
import vis from 'vis';

import template from './index.html';

$('body').append(template);

$('#main #get-infections').on('click', () => {
    const container = $('#main .visualization')[0];

    var nodes = new vis.DataSet([
        {id: 1, label: 'Node 1'},
        {id: 2, label: 'Node 2'},
        {id: 3, label: 'Node 3'},
        {id: 4, label: 'Node 4'},
        {id: 5, label: 'Node 5'}
    ]);

    var edges = new vis.DataSet([
        {from: 1, to: 3},
        {from: 1, to: 2},
        {from: 2, to: 4},
        {from: 2, to: 5}
    ]);

    var network = new vis.Network(container, {nodes, edges}, {});
    return false;
});
