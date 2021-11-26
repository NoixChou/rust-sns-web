<template>
    <v-app>
        <v-navigation-drawer
            mini-variant
            app
            permanent
            bottom
            class="d-none d-md-flex"
        >
            <v-list nav>
                <NavListItemWithTooltip
                    :to="localePath('/')"
                    icon="mdi-apps"
                    :text="$t('general.home')"
                />
                <NavListItemWithTooltip
                    v-if="this.$auth.loggedIn"
                    :to="localePath('/user/me')"
                    icon="mdi-account"
                    :text="$t('general.profile')"
                />
                <NavListItemWithTooltip
                    @on="settings_panel = !settings_panel"
                    icon="mdi-cog"
                    :text="$t('general.settings.setting')"
                />
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
        <SettingDialog v-model="settings_panel"/>
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
import SettingDialog from "@/layouts/SettingDialog";
import NavListItemWithTooltip from "@/layouts/NavListItemWithTooltip";

export default {
    components: {NavListItemWithTooltip, SettingDialog},
    data() {
        return {
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
