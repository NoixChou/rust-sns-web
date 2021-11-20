<template>
    <div>
        <Post
            v-for="(post, i) in posts"
            :prefetched_post="post.post"
            :prefetched_user="post.user"
            :header_divide="i !== 0"
        />
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
