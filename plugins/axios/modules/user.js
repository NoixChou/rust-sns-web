import {axios} from '../index';

export default {
    async fetchUser(id) {
        return await axios.$get('/api/users/' + id)
    },

    async fetchMe() {
        return await axios.$get('/api/users/me')
    },

    async create(
        id_name,
        display_name,
        description,
        birthday,
        website,
        is_private
    ) {
        return await axios.$post('/api/users', {
            id_name: id_name,
            display_name: display_name,
            description: description,
            birthday: birthday,
            website: website,
            is_private: is_private
        })
    }
}
