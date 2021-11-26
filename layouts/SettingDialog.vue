<template>
    <v-dialog
        v-model="is_opened"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >
        <v-card>
            <v-toolbar color="primary">
                <v-btn
                    icon
                    @click.stop="is_opened = false"
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
                <v-list-item>
                    <v-select
                        v-model="currentLocale"
                        :items="availableLocales"
                        item-text="name"
                        item-value="code"
                        :value="currentLocale"
                        label="Language"
                        outlined
                    ></v-select>
                </v-list-item>
            </v-list>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: 'SettingDialog',
    props: {
        value: Boolean
    },
    computed: {
        availableLocales() {
            return this.$i18n.locales.map(this.translateLocaleName);
        },
        currentLocale: {
            get() {
                return this.$i18n.locale;
            },
            set(locale) {
                this.$i18n.setLocale(locale)
            }
        },
        is_opened: {
            get() {
                return this.value;
            },
            set(v) {
                this.$emit('input', v);
            }
        }
    },
    methods: {
        translateLocaleName(locale) {
            locale.name = this.$t('general.language.' + locale.code);
            return locale;
        }
    }
}
</script>
