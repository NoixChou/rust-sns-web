<template>
    <v-container>
        <v-row justify="center" align="center">
            <v-col cols="12" md="10" lg="6">
                <Post
                    :post_id="$route.params.post_id"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "post_id"
}
</script>

<style scoped>

</style>
