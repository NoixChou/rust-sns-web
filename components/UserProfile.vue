<template>
    <v-card v-if="status === 0">
        <v-card-title class="loading-text"><span>Display Name</span></v-card-title>
        <v-card-subtitle class="loading-text"><span>Display Id Name</span></v-card-subtitle>
        <v-divider></v-divider>
        <v-card-text class="loading-text">
            <v-sheet
                height="5em"
                width="100%"
            ></v-sheet>
        </v-card-text>
        <v-card-actions>
            <v-btn class="loading-text" disabled plain><span>{{ $t('profile.follow') }}</span></v-btn>
            <v-btn class="loading-text" disabled plain><span>{{ $t('profile.follower') }}</span></v-btn>
        </v-card-actions>
    </v-card>
    <NotFoundWithSearch v-else-if="status === 404"/>
    <v-card v-else-if="status !== 200 || !!!profile">
        <v-card-title>Error</v-card-title>
    </v-card>
    <v-card v-else>
        <v-card-title>
            <span v-if="!is_edit">{{ profile.display_name }}</span>
            <span v-if="is_edit">
                <v-text-field
                    v-model="profile.display_name"
                    class="py-0 my-0"
                    hide-details="auto"
                    height="2rem"
                ></v-text-field>
            </span>
            <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon
                        v-if="profile.is_private"
                        v-on="on"
                        v-bind="attrs"
                    >
                        mdi-lock
                    </v-icon>
                </template>
                <span>private</span>
            </v-tooltip>
        </v-card-title>
        <v-card-subtitle>
            <span>{{ profile.id_name }}</span>
        </v-card-subtitle>
        <v-divider></v-divider>
        <v-card-text class="pb-0" style="position: relative;">
            <div v-if="this.$auth.user && profile.id === this.$auth.user.id">
                <v-btn
                    v-if="is_edit"
                    @click.prevent="is_edit = false"
                    color="primary"
                    class="mr-15"
                    absolute
                    top
                    right
                    small
                    fab
                >
                    <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn
                    @click.prevent="is_edit = !is_edit"
                    :color="is_edit ? '' : 'primary'"
                    absolute
                    top
                    right
                    small
                    fab
                >
                    <v-icon>{{ is_edit ? 'mdi-close' : 'mdi-pencil' }}</v-icon>
                </v-btn>
            </div>
            <p v-if="!is_edit" class="mb-6">{{ profile.description }}</p>
            <v-textarea
                v-if="is_edit"
                v-model="profile.description"
                class="mb-6"
                hide-details="auto"
                rows="2"
                auto-grow
            ></v-textarea>
            <p class="mb-1">
                <span v-if="!is_edit && !!profile.website">
                    <v-icon dense left>mdi-home-city</v-icon>
                    <a :href="profile.website" target="_blank" rel="noopener noreferrer">{{ profile.website }}</a>
                </span>
                <v-text-field
                    v-if="is_edit"
                    v-model="profile.website"
                    class="py-0 my-0"
                    prepend-icon="mdi-home-city"
                    dense
                    hide-details="auto"
                    height="2rem"
                ></v-text-field>
            </p>
            <p v-if="profile.birthday" class="mb-0 text--darken-2">
                <v-icon dense left>mdi-cake-variant</v-icon>
                {{ new Date(profile.birthday).toLocaleDateString() }}
            </p>
        </v-card-text>
        <v-card-actions>
            <v-btn :disabled="profile.is_private" plain>{{ 0 }} {{ $t('profile.follow') }}</v-btn>
            <v-btn :disabled="profile.is_private" plain>{{ 0 }} {{ $t('profile.follower') }}</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import userApi from "@/plugins/axios/modules/user";
import NotFoundWithSearch from "@/components/NotFoundWithSearch";

export default {
    name: "UserProfile",
    components: {NotFoundWithSearch},
    data() {
        return {
            is_edit: false,
            profile: {},
            status: 0,
        }
    },
    props: {
        user_id: String,
    },
    async fetch() {
        await userApi.fetchUser(this.user_id)
            .then(response => {
                this.status = 200;
                this.profile = response.user;
            }).catch(e => {
                this.status = e.response.status;
                this.profile = 'API Error';
            });
    },
}
</script>

