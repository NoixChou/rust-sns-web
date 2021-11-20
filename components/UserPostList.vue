<template>
    <v-card :loading="status !== 200">
        <v-card-title class="text-body-1">投稿</v-card-title>
        <v-divider></v-divider>
        <PostList
            v-if="posts.length > 0"
            :posts="posts"
        />
        <v-card-text
            v-else-if="status === 200"
        >
            まだ何も投稿していません
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
    },
}
</script>

<style scoped>

</style>
