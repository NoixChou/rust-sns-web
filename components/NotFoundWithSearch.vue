<template>
    <v-card>
        <v-card-title>Not Found</v-card-title>
        <v-card-text>
            <v-container>
                <v-row justify="center">
                    <h3>{{ $t('general.messages.not_found_try_search') }}</h3>
                </v-row>
                <v-row justify="center">
                    <v-col cols="6">
                        <v-text-field
                            append-outer-icon="mdi-magnify"
                            @click:append-outer=""
                            clearable
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'NotFoundWithSearch',
}
</script>
