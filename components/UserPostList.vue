<template>
    <v-card v-if="status === 200 || status === 0" :loading="status !== 200">
        <v-card-title class="text-body-1">{{ $t('post.posts') }}</v-card-title>
        <v-divider></v-divider>
        <div v-if="posts.length > 0" ref="post_list">
            <PostList
                :posts="posts"
            />
            <div v-if="is_loading_older_post" class="text-center">
                <v-divider></v-divider>
                <v-progress-circular
                    indeterminate
                    class="my-6"
                />
            </div>
        </div>
        <v-card-text
            v-else-if="status === 200"
        >
            {{ $t('post.nothing') }}
        </v-card-text>
    </v-card>
</template>

<script>
import postApi from "@/plugins/axios/modules/post";

export default {
    name: "UserPostList",
    data() {
        return {
            status: 0,
            posts: [],
            is_loading_older_post: false,
            is_loaded_oldest_post: false,
            polling_interval_handle: null
        }
    },
    props: {
        user_id: String,
        prefetched_posts: []
    },
    async fetch() {
        if (!!this.prefetched_posts) {
            this.posts = this.prefetched_posts;
            return;
        }

        await postApi.fetchPostsByUser(this.user_id)
            .then(response => {
                this.status = 200;
                this.posts = response.posts;
            }).catch(e => {
                this.status = e.response.status;
            });

        this.polling_interval_handle = setInterval(() => {
            this.fetchNewerPosts()
        }, 5000);
    },
    created() {
        window.addEventListener('scroll', this.onScroll)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll);
        clearInterval(this.polling_interval_handle);
    },
    methods: {
        onScroll() {
            const on_bottom = window.scrollY >= (document.documentElement.offsetHeight - window.innerHeight);
            if (!this.is_loaded_oldest_post && !this.is_loading_older_post && on_bottom) {
                this.is_loading_older_post = true;
                this.fetchOlderPosts();
            }
        },
        async fetchNewerPosts() {
            let latest_id = null;
            if (this.posts.length > 0) {
                latest_id = this.posts[0].post.id;
            }

            postApi.fetchPostsByUser(this.user_id, {latest_post_id: latest_id})
                .then(response => {
                    this.status = 200;
                    if (response.posts.length > 0) {
                        this.posts = response.posts.concat(this.posts);
                    }
                }).catch(e => {
                    this.status = e.response.status;
                }
            );
        },
        async fetchOlderPosts() {
            let oldest_id = null;
            if (this.posts.length > 0) {
                oldest_id = this.posts.lastItem.post.id;
            }
            postApi.fetchPostsByUser(this.user_id, {oldest_post_id: oldest_id})
                .then(response => {
                    this.status = 200;
                    if (response.posts.length > 0) {
                        this.posts = this.posts.concat(response.posts);
                    } else {
                        this.is_loaded_oldest_post = true;
                    }
                    this.is_loading_older_post = false;
                }).catch(e => {
                    this.status = e.response.status;
                    this.is_loading_older_post = false;
                }
            );
        },
    }
}
</script>

<style scoped>

</style>
