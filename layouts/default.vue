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
                            :to="item.to"
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
                            <v-list-item-content>Setting</v-list-item-content>
                        </v-list-item>
                    </template>
                    Setting
                </v-tooltip>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
            fixed
            app
            :style="onMobile ? 'left: 0' : ''"
        >
            <v-toolbar-title v-text="title"/>
            <v-spacer/>
            <v-btn
                outlined
                @click.stop="login_panel = !login_panel"
            >
                ログイン
            </v-btn>
            <v-btn
                class="ml-2"
                color="primary"
                @click.stop="register_panel = !register_panel"
            >
                新規登録
            </v-btn>
        </v-app-bar>
        <v-main
            :style="onMobile ? 'padding-left: 0' : ''"
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
        <v-dialog
            v-model="login_panel"
            hide-overlay
            transition="dialog-bottom-transition"
        >

        </v-dialog>
        <v-footer
            app
        >
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    icon: 'mdi-apps',
                    title: 'Welcome',
                    to: '/'
                },
                {
                    icon: 'mdi-chart-bubble',
                    title: 'Inspire',
                    to: '/inspire'
                },
                {
                    icon: 'mdi-account',
                    title: 'プロフィール',
                    to: '/user/f48f1320-38ad-4bc6-95fe-4d6a1f0f5153'
                }
            ],
            settings_panel: false,
            login_panel: false,
            register_panel: false,
            title: 'rust-sns',
            onMobile: this.isMobileWidth(window.innerWidth),
        }
    },
    methods: {
        onResize() {
            this.onMobile = this.isMobileWidth(window.innerWidth);
        },
        isMobileWidth(width) {
            return width < 960;
        }
    },
    mounted() {
        window.addEventListener('resize', this.onResize)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
    }
}
</script>
