
import $ from 'jquery';

import template from './index.html';
import {stubUsers, stubClasses} from './stub-data';

import {UserStore} from './stores/user-store';
import {ClassStore} from './stores/class-store';

import {ViewEngine} from './engine/view';


const userStore = new UserStore(stubUsers);
const classStore = new ClassStore(stubClasses);

$('body').append(template);

const viewEngine = new ViewEngine($('#main .visualization')[0], userStore, classStore);

$('#main #get-infections').on('click', () => {
    const userId = parseInt($('#main #user-id').val());    
    if(!userId) return alert('Invalid user id');
    viewEngine.drawInfectedUsers(userId);
});

$('#main #show-universe').on('click', () => {
    viewEngine.drawUniverse();
});

$(() => viewEngine.drawUniverse());


