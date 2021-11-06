import colors from 'vuetify/es5/util/colors'

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - rust-sns-web',
        title: 'rust-sns-web',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''},
            {name: 'format-detection', content: 'telephone=no'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },

    ssr: false,
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '@/plugins/axios/index'
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        '@nuxtjs/auth',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        proxy: true,
    },

    proxy: {
        '/api/': {
            target: process.env.API_BASE
        }
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en'
        }
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: true,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                },
                light: {
                    primary: colors.blue.lighten2,
                    accent: colors.grey.lighten3,
                    secondary: colors.amber.lighten3,
                    info: colors.teal.darken1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            },
            options: {
                customProperties: true
            }
        }
    },

    auth: {
        redirect: {
            home: false,
        },
        strategies: {
            local: {
                endpoints: {
                    login: {url: 'api/auth/login', method: 'post', propertyName: 'token'},
                    user: {url: 'api/auth/me', method: 'get', propertyName: 'credential'},
                    logout: false
                },
            }
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    env: {
        API_BASE: process.env.API_BASE,
    }
}
