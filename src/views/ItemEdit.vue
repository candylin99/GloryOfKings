<template>
 <div>
<h1>{{id?'编辑':'新建'}}物品</h1>
<!-- native表示原生表单，prevent表示阻止默认行为 -->
<el-form label-width="120px" @submit.native.prevent='save'>
   <el-form-item label='名称'> 
    <el-input v-model="model.name"></el-input>
  </el-form-item>
   <!-- action上传到哪去 记得加：因为的动态绑定 -->
   <!-- 在这个element ui里面没有发起axios请求的地方 -->
   <!-- 把它放进main.js里面，方便使用，注意uploadUrl是一个属性，在computed里的，而getAuthHeaders是一个methods -->
   <el-form-item label='图标'> 
      <el-upload 
      class="avatar-uploader"
      :action="uploadUrl"
      :headers="getAuthHeaders()"
      :show-file-list="false"
      :on-success="handleAvatarSuccess">
      <img v-if="model.icon" :src="model.icon" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
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
    id:{}
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
      res = await this.$http.put(`rest/items/${this.id}`,this.model)
    }else{
      //把异步的回调函数的方法换成类似同步的
        res = await this.$http.post('rest/items',this.model)
    }
     //获取到之后就跳转过去
   this.$router.push('/items/list')
   //这个方法是elementui提供的方法
   this.$message({
     type:'sucess',
     message:'保存成功'
   })
   },
   async fetch(){
     const res = await this.$http.get(`rest/items/${this.id}`)
     this.model = res.data
   },
  //上传图片
   handleAvatarSuccess(res, file) {
      this.$set(this.model,'icon',this.url)
        this.model.icon = res.url;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }

 },
 created() {
   //获取数据，记得要判断一下 这里是用&& 意思是前面的条件是true才执行后面的
   this.id && this.fetch()
 },
}
</script>

<style>

</style>