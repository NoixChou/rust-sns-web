<template>
    <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
            <v-list-item
                v-on="on"
                v-bind="attrs"
                :to="to"
                @click.stop="onClick"
                router
                exact
            >
                <v-list-item-action>
                    <v-icon>{{ icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>{{ text }}</v-list-item-content>
            </v-list-item>
        </template>
        {{ text }}
    </v-tooltip>
</template>
<script>
export default {
    name: 'NavListItemWithTooltip',
    props: {
        to: String,
        icon: String,
        text: String,
    },
    methods: {
        onClick() {
            this.$emit('on');
        }
    }
}
</script>
