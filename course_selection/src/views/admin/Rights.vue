<template>
    <div>
    <el-card>

    </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            queryinfo: {
            query: ''
        },
            rights: []
        }
        },
    created() {
        this.getRights()
    },
    methods: {
        async getRights () {
        const { data: res } = await 
        this.$http.get('/api/user/showrights',
        { params: this.queryinfo })
        this.stuList = res
    },
    }
}

</script>