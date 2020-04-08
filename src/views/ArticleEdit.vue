<template>
 <div>
<h1>{{id?'编辑':'新建'}}文章</h1>
<!-- native表示原生表单，prevent表示阻止默认行为 -->
<el-form label-width="120px" @submit.native.prevent='save'>
  
  <el-form-item label='所属分类' >  
    <el-select v-model="model.categories" placeholder="请选择" multiple>
    <el-option
      v-for="categories in categories"
      :key="categories._id"
      :label="categories.name"
      :value="categories._id">
    </el-option>
  </el-select>
  </el-form-item>
   <el-form-item label='标题'> 
    <el-input v-model="model.title"></el-input>
  </el-form-item>

  <el-form-item label='详情'> 
    <vue-editor v-model="model.description" useCustomImageHandler @image-added="handleImageAdded"> </vue-editor>
  </el-form-item>
  <el-form-item> 
    <!-- 红色按钮，提交按钮 -->
    <el-button type="primary" native-type="submit">保存</el-button>
  </el-form-item>
</el-form>
 </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
   props:{
    id:{}//这个页面可以和这个页面尽可能的解耦
  },
  components:{
    VueEditor,
  },
 data() {
   return {
      model:{},
      categories:{}
   }
 },
 
 methods: {
   async save(){
     //这里的保存加了判断，如果是编辑那就会传id，点击保存后就会跳转到相关的id界面
     //如果是新增，就直接跳转到list界面
    let res
    if(this.id){
      //put是替换
      res = await this.$http.put(`rest/articles/${this.id}`,this.model)
    }else{
      //把异步的回调函数的方法换成类似同步的
        res = await this.$http.post('rest/articles',this.model)
    }
     //获取到之后就跳转过去
   this.$router.push('/articles/list')
   //这个方法是elementui提供的方法
   this.$message({
     type:'sucess',
     message:'保存成功'
   })
   },
   async fetch(){
     const res = await this.$http.get(`rest/articles/${this.id}`)
     this.model = res.data
   },
   async fetchCategory(){
     //可以自己定义一个路由，但这里直接用现有的后端接口categories里面的parent比较方便
     const res = await this.$http.get(`rest/categories`)
     this.categories = res.data
   },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post('upload',formData)
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
      
  },
 },
 created() {
   this.fetchCategory()
   //获取数据，记得要判断一下 这里是用&& 意思是前面的条件是true才执行后面的
   this.id && this.fetch()
 },
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
