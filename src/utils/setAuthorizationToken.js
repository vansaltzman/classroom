import axios from 'axios';

export default function setAuthorizationToken ( token ) {
    var token = JSON.stringify(token);
    if(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.toString()}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}