<template>
    <v-container class="pa-0">
        <v-divider v-if="header_divide"></v-divider>

        <v-card elevation="0">
            <v-card-title class="text-body-1">
                <NuxtLink :to="`/user/` + user.id" tag="div" class="user-link">
                    <span class="font-weight-bold">{{ user.display_name }}</span>
                    <span class="text--secondary">@{{ user.id_name }}</span>
                </NuxtLink>
                <v-spacer></v-spacer>
                <span class="text-body-2 text--secondary">{{ this.$format_date(post.published_at) }}</span>
            </v-card-title>
            <v-card-text class="text-body-1 text--primary">
                {{ post.content }}
            </v-card-text>
            <v-card-actions>
                <v-row justify="center" align="center" class="text-center">
                    <v-col>
                        <v-btn icon>
                            <v-icon>mdi-reply</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn icon>
                            <v-icon>mdi-heart</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn icon>
                            <v-icon>mdi-dots-horizontal</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import postApi from "@/plugins/axios/modules/post";

export default {
    name: "Post",
    data() {
        return {
            status: 0,
            post: {},
            user: {}
        }
    },
    props: {
        post_id: String,
        prefetched_post: {},
        prefetched_user: {},
        header_divide: Boolean,
    },
    async fetch() {
        if (!!this.prefetched_post) {
            this.post = this.prefetched_post;
            this.user = this.prefetched_user;
            return;
        }

        await postApi.fetchPost(this.post_id)
            .then(response => {
                this.status = 200;
                this.post = response.post;
            }).catch(e => {
                this.status = e.response.status;
                this.post = 'API Error';
            });
    },
}
</script>

<style scoped>
.user-link {
    cursor: pointer;
}
.user-link:hover {
    text-decoration: underline;
}
</style>
