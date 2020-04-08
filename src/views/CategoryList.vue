<template>
 <div>
   <h1>分类列表</h1>

      <el-table :data="items"  style="width: 100%">
        <el-table-column prop="_id" label="ID" width="240"></el-table-column>
        <!-- 这个parent是属于 categories的parent关联查询对象-->
        <!-- 后端接口那里用populate 表示关联取出，parent会变成一个关联查询的对象 -->
        <el-table-column prop="parent.name" label='上级分类'></el-table-column>
       <el-table-column prop="name" label='分类名称'></el-table-column>
       
       <el-table-column
      fixed="right"
      label="操作"
      width="180">
      <template slot-scope="scope">
        <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
        <!-- 跳转页面 ``是模板字符串  ${scope.row._id}的row表示本行 .id -->
        <el-button type="primary" size="small" @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
        <!-- 记得删除这里要把scopr.row传给它 -->
        <el-button type="primary" size="small" @click="remove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
      </el-table>
 </div>
</template>

<script>
export default {

  data() {
    return {
      items:[]
    }
  },
  methods: {
    async fetch(){
      //!!!!!这里记得加await
      const res = await this.$http.get('rest/categories')
      //取过来放到items里 
      this.items = res.data
    },
    async remove(row){
      this.$confirm(`是不是真的要删除"${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const res = await this.$http.delete(`rest/categories/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch()
        })        
    }
  },
  created() {
    this.fetch()
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
