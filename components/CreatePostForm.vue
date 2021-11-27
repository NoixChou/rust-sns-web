<template>
    <v-dialog
        v-model="is_open"
        width="100%"
        max-width="1200px"
        :fullscreen="fullscreen"
        :transition="fullscreen ? `dialog-bottom-transition` : `dialog-top-transition`"
    >
        <v-card>
            <v-toolbar>
                <v-spacer></v-spacer>
                <v-toolbar-title>{{ $t('post.post') }}</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-alert
                v-if="error"
                type="error"
                icon="mdi-alert-circle"
                tile
            >{{ $t(error) }}
            </v-alert>
            <v-form
                ref="post_form"
                :disabled="on_process"
                @submit.prevent="publishPost"
            >
                <v-container>
                    <v-row justify="center" align="center">
                        <v-col cols="11" md="11">
                            <v-textarea
                                v-model="post.content"
                                :label="$t('post.content')"
                                no-resize
                                rows="10"
                                :rules="validation.content"
                                counter="1000"
                            ></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col cols="8" md="6">
                            <v-btn
                                block
                                color="primary"
                                :disabled="!post.content || on_process"
                                type="submit"
                                :loading="on_process"
                            >
                                {{ $t('post.post') }}
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center" v-if="fullscreen">
                        <v-col cols="8" md="6">
                            <v-btn
                                block
                                text
                                @click="is_open = false"
                            >
                                {{ $t('general.cancel') }}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
import postApi from "@/plugins/axios/modules/post";

export default {
    name: "CreatePostForm",
    props: {
        value: Boolean,
        fullscreen: Boolean,
    },
    computed: {
        is_open: {
            get() {
                return this.value;
            },
            set(v) {
                this.$emit('input', v);
            }
        }
    },
    data() {
        return {
            on_process: false,
            error: null,
            post: {
                content: ''
            },
            validation: {
                content: [
                    v => !!v || this.$t('general.messages.validation.required'),
                    v => v.length <= 1000 || this.$t('general.messages.validation.max_length', [1000])
                ]
            }
        }
    },
    methods: {
        async draftPost() {
            await this.createPost(false);
        },
        async publishPost() {
            await this.createPost(true);
        },
        async createPost(is_publish) {
            this.on_process = true;
            this.error = null;

            await postApi.createPost(this.post.content, is_publish)
                .then(() => {
                    this.is_open = false;
                    this.post = {
                        content: ''
                    };
                }).catch(() => {
                    this.error = "general.messages.something_error";
                });

            this.on_process = false;
        },
    }
}
</script>

<style scoped>

</style>
