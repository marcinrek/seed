import {randomString} from './random_password.string.mod.js';
import {passwordTable} from './random_password.table.mod.js';

const form = document.getElementById('password_form'),
      size = document.getElementById('size'),   
      output = document.getElementById('password');

form.onsubmit = () => {
    let passwd = randomString(size.value);
    passwordTable(passwd);

    output.value = passwd; 
    return false;
}
