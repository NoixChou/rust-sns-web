import {axios} from '../index';

export default {
    async createPost(content, is_publish) {
        return await axios.$post('/api/posts', {
            content: content,
            is_publish: is_publish
        })
    },
    async fetchPost(id) {
        return await axios.$get('/api/posts/' + id)
    },
    async fetchPostsByUser(user_id, pagination) {
        return await axios.$get('/api/users/' + user_id + '/posts', {
            params: pagination
        })
    }
}
