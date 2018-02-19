import { h, app } from 'hyperapp';

const Calc = ({state, actions}) =>
    <main>
        <input type="text" value={state.count} disabled/>
        <input type="text" value={state.ncount} disabled />
        <button onclick={actions.down}>–</button>
        <button onclick={actions.up}>+</button>
    </main>

const app_view = state => actions =>
    <Calc state={state} actions={actions} />

export default app_view;
