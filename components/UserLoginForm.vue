<template>
    <v-dialog
        v-model="is_open"
        max-width="700px"
        :fullscreen="fullscreen"
        transition="dialog-bottom-transition"
    >
        <v-card>
            <v-toolbar>
                <v-spacer></v-spacer>
                <v-toolbar-title>ログイン</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-alert
                v-if="error"
                type="error"
                icon="mdi-alert-circle"
                tile
            >{{ error }}
            </v-alert>
            <v-form
                ref="login_form"
                :disabled="on_process"
                @submit.prevent="userLogin"
            >
                <v-container>
                    <v-row justify="center" align="center">
                        <v-col
                            cols="10" md="6"
                        >
                            <v-text-field
                                v-model="credentials.email"
                                prepend-icon="mdi-email"
                                label="メールアドレス"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col
                            cols="10" md="6"
                        >
                            <v-text-field
                                v-model="credentials.password"
                                type="password"
                                prepend-icon="mdi-lock"
                                label="パスワード"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col
                            cols="8" md="6"
                        >
                            <v-btn
                                block
                                color="primary"
                                :disabled="!credentials.email || !credentials.password || on_process"
                                type="submit"
                                :loading="on_process"
                            >
                                ログイン
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center" v-if="fullscreen">
                        <v-col
                            cols="8" md="6"
                        >
                            <v-btn
                                block
                                text
                                @click="is_open = false"
                            >
                                キャンセル
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "UserLoginForm",
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
            credentials: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        async userLogin() {
            this.on_process = true;
            this.error = null;

            await this.$auth.loginWith('local', {
                data: {
                    email: this.credentials.email,
                    password: this.credentials.password
                }
            }).then(() => {
                this.is_open = false;
                this.credentials.password = '';
            }).catch(e => {
                if (e.response.status === 401) {
                    this.error = "メールアドレスまたはパスワードが間違っています。";
                } else {
                    this.error = "問題が発生しました。しばらくしてからお試しください。";
                }
            });

            this.on_process = false;
        },
    }

}
</script>

<style scoped>

</style>
