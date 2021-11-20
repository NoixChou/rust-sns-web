<template>
    <v-container>
        <v-row justify="center" align="center">
            <v-col cols="12" md="10" lg="6">
                <UserProfile :user_id="$route.params.user_id"/>
            </v-col>
        </v-row>
        <v-row justify="center" align="center" class="mt-2">
            <v-col cols="12" md="10" lg="6" class="pt-0">
                <UserPostList :user_id="$route.params.user_id"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "user_id",
}
</script>

<style scoped>

</style>
