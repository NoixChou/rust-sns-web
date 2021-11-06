<template>
    <v-row justify="center" align="center">
        <v-col cols="12" md="10" lg="6">
            <UserProfile v-if="status === 0 || status === 200" :profile="profile.user"/>
            <v-card v-else-if="status === 404">
                <v-card-title>Not Found</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row justify="center">
                            <h3>ユーザーが見つかりませんでした。検索してみてください。</h3>
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
            <v-card v-else>
                <v-card-title>Error</v-card-title>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import axios from 'axios'

export default {
    name: "user",
    data() {
        return {
            status: 0,
            profile: {},
        }
    },
    async fetch() {
        return await axios.get(process.env.API_BASE_URL + '/users/' + this.$route.params.user_id)
            .then(response => {
                this.status = response.status;
                this.profile = response.data;
            }).catch(e => {
                this.status = e.response.status;
                this.profile = 'API Error';
            })
    },
    async mounted() {
    }
}
</script>

<style scoped>

</style>
