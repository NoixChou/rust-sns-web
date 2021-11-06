import {axios} from '../index';

export default {
    async registerAccount(email, password) {
        return await axios.$post('/api/auth/register', {
            email: email,
            password: password
        })
    },
}
