<template>
  <div class="adminLogin">
    <div class="loginMain">
      <div class="loginHeader">
        <h1>资产与实验室管理处</h1>
      </div>
      <div class="loginForm">
        <el-form ref="dynamicValidateForm" :model="dynamicValidateForm">
          <el-form-item
            prop="username"
            :rules="[{ required: true, message: '用户名不能为空', trigger: 'blur' }]"
            :error="errorMsg"
          >
            <el-input prefix-icon="icon-username icon iconfont" v-model="dynamicValidateForm.username"></el-input>
          </el-form-item>
          <el-form-item
            prop="password"
            :rules="[{ required: true, message: '密码不能为空', trigger: 'blur' }]"
            :error="errorMsg2"
          >
            <el-input
              prefix-icon="icon-password icon iconfont"
              v-model="dynamicValidateForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="loginSubmit"
              type="primary"
              @click="submitForm('dynamicValidateForm')"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { asyncRoutes } from "../../router/index";
import router from "../../router/index";
import store from "../../store/index";
import { setToken, setRoles } from "../untils/auth";
export default {
  data() {
    return {
      dynamicValidateForm: {
        username: "",
        password: ""
      },
      errorMsg: "",
      errorMsg2: ""
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log(
          "===this.dynamicValidateForm.password===",
          this.dynamicValidateForm.password
        );
        console.log(
          "===this.dynamicValidateForm.username===",
          this.dynamicValidateForm.username
        );
        this.errorMsg = "";
        this.errorMsg2 = "";
        if (valid) {
          axios
            .post(
              `/sbcweb/login?username=${this.dynamicValidateForm.username}&password=${this.dynamicValidateForm.password}`,
              {
                password: this.dynamicValidateForm.password,
                username: this.dynamicValidateForm.username
              }
            )
            .then(res => {
              console.log("===login===");
              console.log(res);
              let result = res.data;
              if (result.status == 200) {
                this.$message.success("登陆成功");
                console.log("===登陆成功==管理员信息===", result);
                store.dispatch(
                  "user/setTokenID",
                  result.data.tokenInfo.tokenId
                );
                
                //store.dispatch('user/setTokenID',res.data.tokenInfo.tokenId)
                console.log("===token===", result.data.tokenInfo.token);
                setToken(result.data.tokenInfo.token);
                setRoles(result.data.role[0]);
                if (result.data.role[0] == "superAdmin") {
                  router.addRoutes(asyncRoutes);
                  store.dispatch(
                  "user/setUserName",
                  "超级管理员"
                )
                }else{
                   store.dispatch(
                  "user/setUserName",
                  "普通管理员"
                )
                }

                this.$router.push({
                  name: "adminManageArticle"
                });
                console.log("跳转成功");
              } else {
                this.$message.error(result.msg); //登录失败提示错误
              }
            })
            .catch(err => {
              this.$message.error(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script> 

<style  lang = "less" scoped>
.adminLogin {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #2d3a4b;
  overflow: hidden;
  /* background-image: url(../assets/bgImage/bg.jpg); */
  background-size: cover;
  min-width: 100%;
  .loginMain {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    width: 100vw;
    height: 91vh;
    color: #eee;
    .loginHeader {
      text-align: center;
      margin-bottom: 20px;
    }
    .loginForm {
      @media screen and (max-width: 575px) {
        min-width: 300px;
      }
      display: inline-block;
      min-width: 350px;
      /* padding: 30px 30px 20px 30px;
      background-color: hsla(0, 0%, 100%, 0.4); */
      border-radius: 10px;
      .loginSubmit {
        min-width: 350px;
      }
    }
  }
}
</style>