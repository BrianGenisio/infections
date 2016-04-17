
import $ from 'jquery';

import 'es6-shim';

import template from './index.html';
import {stubUsers, stubClasses} from './stub-data';

import {UserStore} from './stores/user-store';
import {ClassStore} from './stores/class-store';

import {Graphs} from './engine/graphs';
import {Infections} from './engine/infections';
import {ViewEngine} from './engine/view';

const userStore = new UserStore(stubUsers);
const classStore = new ClassStore(stubClasses);

$('body').append(template);

const graphEngine = new Graphs(userStore, classStore);
const infectionEngine = new Infections(classStore);
const viewEngine = new ViewEngine($('#main .visualization')[0], userStore, classStore, graphEngine, infectionEngine);

$('#main #get-infections').on('click', () => {
    const userId = parseInt($('#main #user-id').val());    
    if(!userId) return alert('Invalid user id');
    viewEngine.drawInfectedUsers(userId);
});

$('#main #apply-limit').on('click', () => {
   const limit = parseInt($('#main #infection-limit').val());
   infectionEngine.updateLimit(limit || 0);
   $('#main #infection-limit').val('');
   $('#main #apply-limit')[0].innerHTML = `Limit Infections (${limit})`;
});

$(() => viewEngine.drawUniverse());


