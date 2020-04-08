<template>
  <div>
    <h1>{{id?'编辑':'新建'}}英雄</h1>
    <!-- native表示原生表单，prevent表示阻止默认行为 -->
    <el-form
      label-width="120px"
      @submit.native.prevent='save'
    >
      <el-tabs value="basic">
        <el-tab-pane
          type="border-card"
          label="基础信息"
          name="basic"
        >
          <el-form-item label='名称'>
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label='称号'>
            <el-input v-model="model.title"></el-input>
          </el-form-item>

          <!-- action上传到哪去 记得加：因为的动态绑定 -->
          <el-form-item label='头像'>
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :headers="getAuthHeaders()"
              :on-success="res => $set(model,'avatar',res.url)"
            >
              <!-- :action="$http.defaults.baseURL + '/upload'" -->
              <img
                v-if="model.avatar"
                :src="model.avatar"
                class="avatar"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              ></i>
            </el-upload>
          </el-form-item>

          <el-form-item label='banner'>
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :headers="getAuthHeaders()"
              :on-success="res => $set(model,'banner',res.url)"
            >
              <!-- :action="$http.defaults.baseURL + '/upload'" -->
              <img
                v-if="model.banner"
                :src="model.banner"
                class="banner"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              ></i>
            </el-upload>
          </el-form-item>

          <el-form-item label='类型'>
            <el-select
              v-model="model.categories"
              multiple
            >
              <el-option
                v-for="item of categories"
                :label="item.name"
                :value="item._id"
                :key="item._id"
              >

              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='难度'>
            <el-rate
              :max="9"
              style="margin-top:0.6rem"
              show-score
              v-model="model.scores.difficult"
            ></el-rate>
          </el-form-item>

          <el-form-item label='技能'>
            <el-rate
              :max="9"
              style="margin-top:0.6rem"
              show-score
              v-model="model.scores.skills"
            ></el-rate>
          </el-form-item>

          <el-form-item label='攻击'>
            <el-rate
              :max="9"
              style="margin-top:0.6rem"
              show-score
              v-model="model.scores.attack"
            ></el-rate>
          </el-form-item>

          <el-form-item label='生存'>
            <el-rate
              :max="9"
              style="margin-top:0.6rem"
              show-score
              v-model="model.scores.service"
            ></el-rate>
          </el-form-item>

<el-form-item label='皮肤'>
            <el-rate
              :max="9"
              style="margin-top:0.6rem"
              show-score
              v-model="model.scores.skin"
            ></el-rate>
          </el-form-item>
        

          <el-form-item label='顺风出装'>
            <el-select
              v-model="model.items1"
              multiple
            >
              <el-option
                v-for="item of items"
                :label="item.name"
                :value="item._id"
                :key="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label='逆风出装'>
            <el-select
              v-model="model.items2"
              multiple
            >
              <el-option
                v-for="item of items"
                :label="item.name"
                :value="item._id"
                :key="item._id"
              >

              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input
              type="textarea"
              v-model="model.usageTips"
            > </el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input
              type="textarea"
              v-model="model.battleTips"
            > </el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input
              type="textarea"
              v-model="model.teamtips"
            > </el-input>
          </el-form-item>

        </el-tab-pane>
        <el-tab-pane
          label="技能"
          name="skills"
        >
          <!-- 这里push一个对象进去，表示有一个了，所以后面v-for就会+1 -->
          <el-button
            size="small"
            @click="model.skills.push({})"
          >
            <i class="el-icon-plus"></i>
            添加技能
          </el-button>

          <el-row type="flex-wrap:wrap">
            <el-col
              :md="12"
              v-for="(item,i) in model.skills"
              :key="i"
            >
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders"
                  :show-file-list="false"
                  :on-success="res => $set(item,'icon',res.url)"
                >
                  <!-- 显式赋值 -->
                  <img
                    v-if="item.icon"
                    :src="item.icon"
                    class="avatar"
                  >
                  <i
                    v-else
                    class="el-icon-plus avatar-uploader-icon"
                  ></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>

              <el-form-item label="消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>

              <el-form-item label="描述">
                <el-input
                  type="textarea"
                  v-model="item.description"
                ></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input
                  type="textarea"
                  v-model="item.tips"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <!-- 要删除的刚好就是i -->
                <el-button
                  size="small"
                  type="danger"
                  @click="model.skills.splice(i,1)"
                >删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>

        </el-tab-pane>

        <el-tab-pane label="最佳搭档">
          <!-- 这里push一个对象进去，表示有一个了，所以后面v-for就会+1 -->
          <el-button
            size="small"
            @click="model.partners.push({})"
          >
            <i class="el-icon-plus"></i>添加英雄
          </el-button>
          <el-row type="flex-wrap:wrap">
            <el-col
              :md="12"
              v-for="(item,i) in model.partners"
              :key="i"
            >
              <el-form-item label="英雄">
                <!-- filterable!!!!!! -->
                <el-select
                  filterable
                  v-model="item.hero"
                >
                  <el-option
                    v-for="hero in heroes"
                    :key="hero._id"
                    :value="hero._id"
                    :label="hero.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input
                  type="textarea"
                  v-model="item.description"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <!-- 要删除的刚好就是i -->
                <el-button
                  size="small"
                  type="danger"
                  @click="model.partners.splice(i,1)"
                >删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>

        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <!-- 红色按钮，提交按钮 -->
        <el-button
          type="primary"
          style="margin-top:1rem;"
          native-type="submit"
        >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        name: "",
        avatar: "",
        heroes: [],
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          service: 0,
          skin: 0
        },
        options: [{ value: 2 }, { value: 3 }, { value: 4 }],
        skills: [
          {
            icon: "",
            name: "",
            description: "",
            tips: ""
          }
        ],

        items1: [],
        items2: []
      },

      categories: [],
      items: []
    };
  },

  methods: {
    async save() {
      //这里的保存加了判断，如果是编辑那就会传id，点击保存后就会跳转到相关的id界面
      //如果是新增，就直接跳转到list界面
      let res;
      if (this.id) {
        //put是替换
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        //把异步的回调函数的方法换成类似同步的
        res = await this.$http.post("rest/heroes", this.model);
      }
      //获取到之后就跳转过去
      this.$router.push("/heroes/list");
      //这个方法是elementui提供的方法
      this.$message({
        type: "sucess",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      //  this.model = res.data
      // 相当于把model放进{}，再把res.data的值添加到里面去
      //如果res里面有些数据没有的话 也不会影响到默认数据
      this.model = Object.assign({}, this.model, res.data);
    },
    async fetchCategories() {
      const res = await this.$http.get("rest/categories");
      this.categories = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get("rest/items");
      this.items = res.data;
    },
    async fetchHeroes() {
      const res = await this.$http.get("rest/heroes");
      this.heroes = res.data;
    },
    //上传图片
    handleAvatarSuccess(res, file) {
      //  this.$set(this.model,'avatar',this.url)
      this.model.avatar = res.url;
      this.model.icon = res.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  created() {
    //获取数据，记得要判断一下 这里是用&& 意思是前面的条件是true才执行后面的
    this.fetchCategories(),
      this.fetchItems(),
      this.id && this.fetch(),
      this.fetchHeroes();
  }
};
</script>

<style>
</style>