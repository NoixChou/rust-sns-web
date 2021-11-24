<template>
    <v-app>
        <v-navigation-drawer
            mini-variant
            app
            permanent
            class="d-none d-md-flex"
        >
            <v-list>
                <v-tooltip
                    v-for="(item, i) in items"
                    :key="i"
                    right
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-list-item
                            v-on="on"
                            v-bind="attrs"
                            :to="localePath(item.to)"
                            router
                            exact
                        >
                            <v-list-item-action>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>{{ item.title }}</v-list-item-content>
                        </v-list-item>
                    </template>
                    {{ item.title }}
                </v-tooltip>
                <v-tooltip right v-if="this.$auth.loggedIn">
                    <template v-slot:activator="{ on, attrs }">
                        <v-list-item
                            v-on="on"
                            v-bind="attrs"
                            :to="localePath('/user/me')"
                            router
                            exact
                        >
                            <v-list-item-action>
                                <v-icon>mdi-account</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>{{ $t('general.profile') }}</v-list-item-content>
                        </v-list-item>
                    </template>
                    {{ $t('general.profile') }}
                </v-tooltip>
                <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                        <v-list-item
                            v-on="on"
                            v-bind="attrs"
                            @click.stop="settings_panel = !settings_panel"
                            router
                            exact
                        >
                            <v-list-item-action>
                                <v-icon>mdi-cog</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>{{ $t('general.settings.setting') }}</v-list-item-content>
                        </v-list-item>
                    </template>
                    {{ $t('general.settings.setting') }}
                </v-tooltip>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
            fixed
            app
            :style="on_mobile ? 'left: 0' : ''"
        >
            <v-toolbar-title v-text="title"/>
            <v-spacer/>
            <v-btn
                outlined
                @click.stop="login_panel = !login_panel"
                v-if="!this.$auth.loggedIn"
            >
                {{ $t('account.login') }}
            </v-btn>
            <v-btn
                class="ml-2"
                color="primary"
                @click.stop="register_panel = !register_panel"
                v-if="!this.$auth.loggedIn"
            >
                {{ $t('account.register') }}
            </v-btn>
            <v-btn
                outlined
                @click.stop="userLogout"
                v-if="this.$auth.loggedIn"
            >
                {{ $t('account.logout') }}
            </v-btn>
        </v-app-bar>
        <v-main
            :style="on_mobile ? 'padding-left: 0' : ''"
        >
            <v-container>
                <Nuxt/>
            </v-container>
        </v-main>
        <v-dialog
            v-model="settings_panel"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar color="primary">
                    <v-btn
                        icon
                        @click.stop="settings_panel = false"
                    >
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-list>
                    <v-list-item>
                        <v-switch
                            v-model="$vuetify.theme.dark"
                            prepend-icon="mdi-white-balance-sunny"
                            append-icon="mdi-moon-waning-crescent"
                            color="white"
                        ></v-switch>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-dialog>
        <UserLoginForm
            v-model="login_panel"
            :fullscreen="on_mobile"
        />
        <UserRegisterForm
            v-model="register_panel"
            :fullscreen="on_mobile"
            :step_begin="this.$auth.loggedIn ? 2 : 1"
        />
    </v-app>
</template>

<script>

import userApi from '@/plugins/axios/modules/user'

export default {
    data() {
        return {
            items: [
                {
                    icon: 'mdi-apps',
                    title: this.$t('general.home'),
                    to: '/',
                },
            ],
            settings_panel: false,
            login_panel: false,
            register_panel: false,
            title: this.$t('general.title'),
            on_mobile: this.isMobileWidth(window.innerWidth),
        }
    },
    async fetch() {
        if (this.$auth.loggedIn) {
            await userApi.fetchMe()
                .catch(() => {
                    this.register_panel = true;
                })
        }
    },
    methods: {
        async userLogout() {
            await this.$auth.logout();
        },
        onResize() {
            this.on_mobile = this.isMobileWidth(window.innerWidth);
        },
        isMobileWidth(width) {
            return width < 960;
        }
    },
    mounted() {
        window.addEventListener('resize', this.onResize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    }
}
</script>
