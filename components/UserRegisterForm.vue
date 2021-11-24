<template>
    <v-dialog
        v-model="is_open"
        width="100%"
        max-width="1200px"
        :fullscreen="fullscreen"
        :persistent="4 > step && step > 1"
        transition="dialog-bottom-transition"
    >
        <v-stepper v-model="step" height="100%">
            <v-stepper-header class="px-3">
                <v-stepper-step
                    :complete="step > 1"
                    step="1"
                >
                    {{ $t('account.create') }}
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                    :complete="step > 2"
                    step="2"
                >
                    {{ $t('account.input_profile') }}
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                    :complete="step > 3"
                    step="3"
                >
                    {{ $t('account.input_additional_profile') }}
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                    step="4"
                >
                    {{ $t('general.complete') }}
                </v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-form
                        ref="create_account_form"
                        v-model="create_account.is_valid"
                        :disabled="create_account.on_creation"
                        @submit.prevent="accountRegistration"
                    >
                        <v-container>
                            <v-row justify="center" align="center">
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model="create_account.user.email"
                                        prepend-icon="mdi-email"
                                        :label="$t('account.email')"
                                        :rules="create_account.validation.email"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row justify="center" align="center">
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model="create_account.user.password"
                                        type="password"
                                        prepend-icon="mdi-lock"
                                        :label="$t('account.password')"
                                        :rules="create_account.validation.password"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model="create_account.user.confirm_password"
                                        type="password"
                                        prepend-icon="mdi-lock-check"
                                        :label="$t('account.password_confirm')"
                                        :rules="create_account.validation.confirm_password"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row justify="center" align="center">
                                <v-col cols="2">
                                    <v-btn
                                        :disabled="create_account.on_creation"
                                        text
                                        block
                                        @click="is_open = false"
                                    >
                                        {{ $t('general.cancel') }}
                                    </v-btn>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col cols="4">
                                    <v-btn
                                        :disabled="!create_account.is_valid || create_account.on_creation"
                                        color="primary"
                                        block
                                        type="submit"
                                        :loading="create_account.on_creation"
                                    >
                                        {{ $t('general.create') }}
                                    </v-btn>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                            </v-row>
                        </v-container>
                    </v-form>


                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-form
                        ref="create_profile_form"
                        v-model="create_profile.is_valid"
                        :disabled="create_profile_additional.on_creation"
                        @submit.prevent="step = 3"
                    >
                        <v-container>
                            <v-row justify="center" align="center">
                                <v-col cols="12" md="6">
                                    <v-text-field
                                        v-model="create_profile.profile.display_name"
                                        :label="$t('profile.display_name')"
                                        :rules="create_profile.validation.display_name"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field
                                        v-model="create_profile.profile.id_name"
                                        :label="$t('profile.id_name')"
                                        prefix="@"
                                        :rules="create_profile.validation.id_name"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row justify="center" align="center">
                                <v-col cols="12">
                                    <v-textarea
                                        v-model="create_profile.profile.description"
                                        :label="$t('profile.description')"
                                        counter
                                        auto-grow
                                        :rules="create_profile.validation.description"
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                            <v-row justify="center" align="center">
                                <v-col cols="4">
                                    <v-btn
                                        :disabled="!create_profile.is_valid"
                                        color="primary"
                                        block
                                        type="submit"
                                    >
                                        {{ $t('general.next') }}
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>


                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-form
                        ref="create_profile_additional_form"
                        v-model="create_profile_additional.is_valid"
                        :disabled="create_profile_additional.on_creation"
                        @submit.prevent="profileCreation"
                    >
                        <v-container>
                            <v-row justify="center" align="center">
                                <v-col cols="12" md="6">
                                    <v-menu
                                        ref="create_profile_additional.birthday_picker"
                                        v-model="create_profile_additional.birthday_picker"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        max-width="290px"
                                        min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-row>
                                                <v-checkbox
                                                    v-model="create_profile.profile.input_birthday"
                                                    hide-details
                                                    class="shrink"
                                                ></v-checkbox>
                                                <v-text-field
                                                    v-model="create_profile.profile.birthday"
                                                    :disabled="!create_profile.profile.input_birthday"
                                                    :label="$t('profile.birthday')"
                                                    prepend-icon="mdi-cake-variant"
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    readonly
                                                    :rules="create_profile.validation.birthday"
                                                ></v-text-field>
                                            </v-row>
                                        </template>
                                        <v-date-picker
                                            v-model="create_profile.profile.birthday"
                                            locale="ja-jp"
                                            :day-format="date => new Date(date).getDate()"
                                            :max="new Date(Date.now()).toISOString()"
                                            @input="create_profile_additional.birthday_picker = false"
                                        ></v-date-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            <v-row justify="center" align="center">
                                <v-col cols="12" md="6">
                                    <v-text-field
                                        v-model="create_profile.profile.website"
                                        :label="$t('profile.website')"
                                        :rules="create_profile.validation.website"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row justify="center" align="center">
                                <v-col cols="12" md="6">
                                    <v-checkbox
                                        v-model="create_profile.profile.is_private"
                                        :label="$t('profile.private')"
                                        :hint="create_profile.profile.is_private ? $t('profile.private_description') : $t('profile.public_description')"
                                        persistent-hint
                                    ></v-checkbox>
                                </v-col>
                            </v-row>
                            <v-row justify="center" align="center">
                                <v-col cols="2">
                                    <v-btn
                                        :disabled="create_profile_additional.on_creation"
                                        text
                                        block
                                        @click="step = 2"
                                    >
                                        {{ $t('general.back') }}
                                    </v-btn>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col cols="4">
                                    <v-btn
                                        :disabled="!create_profile_additional.is_valid || create_profile_additional.on_creation"
                                        color="primary"
                                        block
                                        type="submit"
                                        :loading="create_profile_additional.on_creation"
                                    >
                                        {{ $t('general.complete') }}
                                    </v-btn>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                            </v-row>
                        </v-container>
                    </v-form>

                </v-stepper-content>

                <v-stepper-content step="4">
                    <v-container>
                        <v-row justify="center" align="center">
                            <v-icon x-large>mdi-check-circle</v-icon>
                        </v-row>
                        <v-row justify="center" align="center">
                            <h2>{{ $t('general.completed') }}</h2>
                        </v-row>
                    </v-container>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-dialog>
</template>

<script>

import authApi from '@/plugins/axios/modules/auth'
import userApi from '@/plugins/axios/modules/user'

export default {
    name: "UserRegisterForm",
    props: {
        value: Boolean,
        fullscreen: Boolean,
        step_begin: {
            type: Number,
            default: 1
        },
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
            step: this.step_begin,
            create_account: {
                is_valid: false,
                on_creation: false,
                user: {
                    email: '',
                    password: '',
                    confirm_password: '',
                },
                validation: {
                    email: [
                        v => this.required(v),
                        v => /.+@.+\..+/.test(v) || this.$t('general.messages.validation.invalid_email'),
                    ],
                    password: [
                        v => this.required(v),
                        v => this.minLength(v, 8)
                    ],
                    confirm_password: [
                        v => this.required(v),
                        v => (this.create_account.user.password === v) || this.$t('general.messages.validation.password_mismatch')
                    ]
                }
            },
            create_profile: {
                is_valid: false,
                profile: {
                    id_name: '',
                    display_name: '',
                    description: '',
                    input_birthday: false,
                    birthday: (new Date(Date.parse("1920-01-01"))).toISOString().substr(0, 10),
                    website: '',
                    is_private: false,
                },
                validation: {
                    id_name: [
                        v => this.required(v),
                        v => this.minLength(v, 3),
                        v => this.maxLength(v, 20)
                    ],
                    display_name: [
                        v => this.required(v),
                        v => this.minLength(v, 1),
                        v => this.maxLength(v, 100)
                    ],
                    description: [
                        v => this.maxLength(v, 300)
                    ],
                    birthday: [
                        v => (!this.create_profile.profile.input_birthday || (new Date(Date.parse(v))) < (new Date(Date.now()))) || this.$t('general.messages.validation.future_birthday'),
                    ],
                    website: [
                        v => this.maxLength(v, 100)
                    ]
                }
            },
            create_profile_additional: {
                is_valid: false,
                on_creation: false,
                birthday_picker: false,
            }
        }
    },
    methods: {
        async accountRegistration() {
            this.create_account.on_creation = true;
            if (!this.$refs.create_account_form.validate()) {
                this.create_account.on_creation = false;
                return;
            }

            await authApi.registerAccount(this.create_account.user.email, this.create_account.user.password)
                .then(async () => {
                    await this.$auth.loginWith('local', {
                        data: {
                            email: this.create_account.user.email,
                            password: this.create_account.user.password
                        }
                    }).then(() => {
                        this.step++;
                    }).catch(e => {
                        console.log(e);
                    });
                }).catch(e => {
                    console.log(e);
                });

            this.create_account.on_creation = false;
        },

        async profileCreation() {
            this.create_profile_additional.on_creation = true;
            if (!this.$refs.create_profile_form.validate()) {
                this.create_profile_additional.on_creation = false;
                this.step = 2;
                return;
            }
            if (!this.$refs.create_profile_additional_form.validate()) {
                this.create_profile_additional.on_creation = false;
                return;
            }

            const profile = this.create_profile.profile;

            await userApi.create(
                profile.id_name,
                profile.display_name,
                profile.description,
                profile.input_birthday ? profile.birthday : null,
                profile.website,
                profile.is_private
            )
                .then(async () => {
                    this.step++;
                    setTimeout(() => {
                        this.is_open = false;
                    }, 2000);
                }).catch(e => {
                    console.log(e);
                });

            this.create_profile_additional.on_creation = false;
        },
        required(v) {
            return !!v || this.$t('general.messages.validation.required');
        },
        minLength(v, min) {
            return v.length >= min || this.$t('general.messages.validation.min_length', [min]);
        },
        maxLength(v, max) {
            return v.length <= max || this.$t('general.messages.validation.max_length', [max]);
        }
    }
}
</script>

<style scoped>

</style>
