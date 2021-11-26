<template>
    <v-container class="pa-0">
        <v-divider v-if="header_divide"></v-divider>
        <v-card v-if="status === 0" elevation="0">
            <v-card-title class="text-body-1 loading-text">
                <span class="font-weight-bold">Display name</span>
                <span>@id name</span>
                <v-spacer></v-spacer>
                <span class="text-body-2">0000/00/00</span>
            </v-card-title>
            <v-card-text
                class="text-body-1 loading-text"
            >
                <v-sheet
                    height="3em"
                    width="100%"
                ></v-sheet>
            </v-card-text>
            <v-card-actions>
                <v-row justify="center" align="center" class="text-center">
                    <v-col>
                        <v-btn icon @click.stop disabled>
                            <v-icon>mdi-reply</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn icon @click.stop disabled>
                            <v-icon>mdi-heart</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn icon @click.stop disabled>
                            <v-icon>mdi-dots-horizontal</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
        <NotFoundWithSearch v-else-if="status === 404"/>
        <v-card v-else-if="status !== 200 || !!!post" elevation="0">
            <v-card-title>
                Error
            </v-card-title>
        </v-card>
        <NuxtLink
            v-else
            :to="`/post/` + post.id"
            custom
            v-slot="{ navigate }"
        >
            <v-card elevation="0" @click="navigate">
                <v-card-title class="text-body-1">
                    <NuxtLink :to="`/user/` + user.id" custom v-slot="{ navigate }">
                        <div class="user-link" @click.stop="navigate">
                            <span class="font-weight-bold">{{ user.display_name }}</span>
                            <span class="text--secondary">@{{ user.id_name }}</span>
                        </div>
                    </NuxtLink>
                    <v-spacer></v-spacer>
                    <span class="text-body-2 text--secondary">{{ $format_date(post.published_at) }}</span>
                </v-card-title>
                <v-card-text
                    class="text-body-1 text--primary"
                    style="white-space: pre-wrap;"
                    v-text="post.content"
                >
                </v-card-text>
                <v-card-actions>
                    <v-row justify="center" align="center" class="text-center">
                        <v-col>
                            <v-btn icon @click.stop>
                                <v-icon>mdi-reply</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn icon @click.stop>
                                <v-icon>mdi-heart</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn icon @click.stop>
                                <v-icon>mdi-dots-horizontal</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </NuxtLink>
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
            this.status = 200;
            this.post = this.prefetched_post;
            this.user = this.prefetched_user;
            return;
        }

        await postApi.fetchPost(this.post_id)
            .then(response => {
                this.status = 200;
                this.post = response.post;
                this.user = response.user;
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
