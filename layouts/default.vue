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
            <v-container class="mb-13 mb-md-0">
                <Nuxt/>
            </v-container>
        </v-main>
        <v-bottom-navigation
            fixed
            shift
            color="primary"
            class="d-flex d-md-none"
            grow
        >
            <v-btn
                :to="localePath('/')"
                exact
            >
                <span>{{$t('general.home')}}</span>
                <v-icon>mdi-apps</v-icon>
            </v-btn>

            <v-btn
                v-if="this.$auth.loggedIn"
                :to="localePath('/user/me')"
            >
                <span>{{ $t('general.profile') }}</span>
                <v-icon>mdi-account</v-icon>
            </v-btn>

            <v-btn
                :value="settings_panel"
                @click.stop="settings_panel = !settings_panel"
            >
                <span>{{$t('general.settings.setting')}}</span>
                <v-icon>mdi-cog</v-icon>
            </v-btn>
        </v-bottom-navigation>
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

<!--suppress CssUnresolvedCustomProperty -->
<style>
@keyframes animate-loading-text-bg {
    0% {
        opacity: 0;
        background-position-x: 100%;
    }
    20% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        background-position-x: -100%;
    }
}

.loading-text * {
    display: inline-block;
    background: linear-gradient(45deg, transparent 40%, var(--v-accent-base) 50%, transparent 60%);
    background-size: 200% 200%;
    background-clip: content-box;
    border: none;
    border-radius: .6rem;
    animation: animate-loading-text-bg 1s linear infinite;
    color: transparent;
}

</style>
