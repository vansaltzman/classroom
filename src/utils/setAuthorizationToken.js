import axios from 'axios';

export default function setAuthorizationToken ( token ) {
    // var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFzcyI6InRlYWNoZXIiLCJpYXQiOjE1MjE1NjA5NzJ9.-Ayjfnikn5JNN3Hy2RaCoL0BS2ej-A623gJs_x4mFY4'
    
    var token = JSON.stringify(token);
    if(token) {
        console.log('set auth token is true ', token );
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.toString()}`;
        
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}