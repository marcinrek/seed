import { h, app } from 'hyperapp';
import { default as state } from 'app_state';
import { default as app_view } from 'app_view';
import { default as down } from 'action_down';
import { default as up } from 'action_up';

const actions = {
    down,
    up
}

app({
    state,
    view: app_view,
    actions
},
    document.getElementById("app")
); 
    