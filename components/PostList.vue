<template>
    <div>
        <div v-for="(post, i) in posts">
            <Post
                :prefetched_post="post.post"
                :prefetched_user="post.user"
                :header_divide="i !== 0"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "PostList",
    props: {
        posts: [],
    }
}
</script>

<style scoped>

</style>
