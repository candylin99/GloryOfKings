<template>
 <div>
<h1>{{id?'编辑':'新建'}}管理员分类</h1>
<!-- native表示原生表单，prevent表示阻止默认行为 -->
<el-form label-width="120px" @submit.native.prevent='save'>
  
   <el-form-item label='用户名'> 
    <el-input v-model="model.username"></el-input>
  </el-form-item>
  <el-form-item label='密码'> 
    <el-input v-model="model.password" type="password"></el-input>
  </el-form-item>
  <el-form-item> 
    <!-- 红色按钮，提交按钮 -->
    <el-button type="primary" native-type="submit">保存</el-button>
  </el-form-item>
</el-form>
 </div>
</template>

<script>
export default {
   props:{
    id:{}//这个页面可以和这个页面尽可能的解耦
  },
 data() {
   return {
      model:{},
      
   }
 },
 
 methods: {
   async save(){
     //这里的保存加了判断，如果是编辑那就会传id，点击保存后就会跳转到相关的id界面
     //如果是新增，就直接跳转到list界面
    let res
    if(this.id){
      //put是替换
      res = await this.$http.put(`rest/admin_user/${this.id}`,this.model)
    }else{
      //把异步的回调函数的方法换成类似同步的
        res = await this.$http.post('rest/admin_user',this.model)
    }
     //获取到之后就跳转过去
   this.$router.push('/admin_user/list')
   //这个方法是elementui提供的方法
   this.$message({
     type:'sucess',
     message:'保存成功'
   })
   },
   async fetch(){
     const res = await this.$http.get(`rest/admin_user/${this.id}`)
     this.model = res.data
   },
  
 },
 created() {
   //获取数据，记得要判断一下 这里是用&& 意思是前面的条件是true才执行后面的
   this.id && this.fetch()
 },
}
</script>

<style scoped>

</style>
