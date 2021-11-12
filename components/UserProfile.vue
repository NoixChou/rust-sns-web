<template>
    <v-card v-if="profile">
        <v-card-title>
            <span>{{ profile.display_name }}</span>
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
        <v-card-subtitle><span>{{ profile.id_name }}</span></v-card-subtitle>
        <v-divider></v-divider>
        <v-card-text>
            <p>{{ profile.description }}</p>
            <a :href="profile.website" target="_blank" rel="noopener noreferrer">{{ profile.website }}</a>
            <p v-if="profile.birthday" class="text--darken-2">{{ new Date(profile.birthday).toLocaleDateString() }} 生まれ</p>
        </v-card-text>
        <v-card-actions>
            <v-btn :disabled="profile.is_private" plain>{{ 0 }} フォロー</v-btn>
            <v-btn :disabled="profile.is_private" plain>{{ 0 }} フォロワー</v-btn>
        </v-card-actions>
    </v-card>
    <v-card v-else>
        <v-card-title class="loading-text"><span>Display Name</span></v-card-title>
        <v-card-subtitle class="loading-text"><span>Display Id Name</span></v-card-subtitle>
        <v-divider></v-divider>
        <v-card-text class="loading-text">
            <v-sheet
                height="7em"
                width="100%"
            ></v-sheet>
        </v-card-text>
        <v-card-actions>
            <v-btn class="loading-text" disabled plain><span>フォロー</span></v-btn>
            <v-btn class="loading-text" disabled plain><span>フォロワー</span></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "UserProfile",
    props: {
        profile: {},
    },
}
</script>

<!--suppress CssUnresolvedCustomProperty -->
<style scoped>
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
