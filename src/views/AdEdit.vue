<template>
 <div>
<h1>{{id?'编辑':'新建'}}广告位</h1>
<!-- native表示原生表单，prevent表示阻止默认行为 -->
<el-form label-width="120px" @submit.native.prevent='save'>
   <el-form-item label='名称'> 
    <el-input v-model="model.name"></el-input>
  </el-form-item>

<el-form-item label="广告">
        <el-button size="small" @click="model.items.push({})">
        <i class="el-icon-plus"></i>
        添加技能
      </el-button>

        <el-row type="flex-wrap:wrap">
          <el-col :md="24" v-for="(item,i) in model.items" :key="i">
            <el-form-item label="URL">
              <el-input v-model="item.url"></el-input>
            </el-form-item>

            <el-form-item label="图片" style="margin-top:0.5rem">
                <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false" :on-success="res => $set(item,'image',res.url)">
                  <!-- 显式赋值 -->
                <img v-if="item.image" :src="item.image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            </el-form-item>
            <el-form-item>
              <!-- 要删除的刚好就是i -->
              <el-button size="small" type="danger" @click="model.items.splice(i,1)" >删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        
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
      model:{
        items:[],
      },
   }
 },
 
 methods: {
   async save(){
     //这里的保存加了判断，如果是编辑那就会传id，点击保存后就会跳转到相关的id界面
     //如果是新增，就直接跳转到list界面
    let res
    if(this.id){
      //put是替换
      res = await this.$http.put(`rest/ads/${this.id}`,this.model)
    }else{
      //把异步的回调函数的方法换成类似同步的
        res = await this.$http.post('rest/ads',this.model)
    }
     //获取到之后就跳转过去
   this.$router.push('/ads/list')
   //这个方法是elementui提供的方法
   this.$message({
     type:'sucess',
     message:'保存成功'
   })
   },
   async fetch(){
     const res = await this.$http.get(`rest/ads/${this.id}`)
    //  如果只是res.data 如果服务端返回的数据没有items，会把数据覆盖掉
     this.model = Object.assign({},this.model,res.data);
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
