<template>
  <div class="loginRegister">
    <div class="top">
      <img id="ad" src="../images/background3.png" alt>
      <div class="Tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="登录" name="first">
            <p>用户名</p>
            <el-input v-model="information.username" placeholder="请输入用户名"></el-input>
            <p>密码</p>
            <el-input placeholder="请输入密码" v-model="information.password" show-password></el-input>
            <div class="somedetail">
              <div class="remPas">
                <label>
                  <input v-model="checked" type="checkbox">记住密码
                </label>
              </div>

              <div class="registerNow">
                <h5 @click="goRegister()">立即注册</h5>
              </div>
            </div>
            <el-button @click="submitForm(information)" type="success">登录</el-button>
          </el-tab-pane>
          <el-tab-pane label="注册" name="second">
            <p>用户名</p>
            <el-input v-model="newUserName" placeholder="请输入用户名"></el-input>
            <p>密码</p>
            <el-input placeholder="请输入密码" v-model="newPassword" show-password></el-input>
            <p class="passTip">密码长度为0~16位</p>
            <p>确认密码</p>
            <el-input
              placeholder="请再次输入密码"
              @blur="checkSame()"
              v-model="rewritePassword"
              show-password
            ></el-input>
            <p class="passSame">请保持两次密码一致</p>
            <div class="agreement">
              <input type="checkbox" v-model="checkedAgreement">我已阅读并同意
              <a href="#">《当当交易条款》</a> 和
              <a href="#">《当当社区条款》</a>
            </div>

            <el-button @click="submitRegister()" type="success">申请注册</el-button>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      information: {
        username: "",
        password: ""
      },
      newUserName: "",
      newPassword: "",
      rewritePassword: "",
      checked: "",
      checkedAgreement: ""
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //点击登录调用方法
    submitForm(formName) {
      //保存的账号
      var name = this.information.username;
      //保存的密码
      var pass = this.information.password;
      if (name == "" || name == null) {
        alert("请输入正确的用户名");
        return;
      } else if (pass == "" || pass == null) {
        alert("请输入正确的密码");
        return;
      }
      //判断复选框是否被勾选 勾选则调用配置cookie方法
      if ((this.checked = true)) {
        //传入账号名，密码，和保存天数3个参数
        this.setCookie(name, pass, 7);
      }
      //接口

      console.log(this.information);
      console.log(...this.information);
      console.log(this.$http.post);
      this.$http
        .post(
          `/sbcweb/user/login?username=${this.information.username}&password=${
            this.information.password
          }`
        )
        .then(res => {
          console.log(res);
          if (res.body.status == "200") {
            console.log(res);
            if (res.body.msg == "OK") {
              console.log(res);
              alert("登陆成功");
              this.$router.push("/");
            }
          } else {
            alert("用户名或密码错误,请重新输入");
            this.information.username = "";
            this.information.password = "";
            console.log("调用失败");
          }
        })
        .catch(e => {
          console.log(e);
          console.log(...this.information);
        });
    },
    //设置cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "username" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "username") {
            this.information.username = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.information.password = arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    },
    //检查两次输入密码是否相同
    checkSame() {
      if (this.newPassword !== this.rewritePassword) {
        this.$message({
          showClose: true,
          message: "两次输入密码不一致，请重新输入",
          type: "warning"
        });
      }
    },
    goRegister() {
      this.activeName = "second";
    },
    submitRegister() {
      console.log(this.checkedAgreement);
      if (this.checkedAgreement == true) {
        if (this.newPassword === this.rewritePassword) {
          this.$http
            .post(
              `/sbcweb/user/register?username=${this.newUserName}&password=${
                this.newPassword
              }`
            )
            .then(res => {
              console.log(res);
              // 调用成功
              if (res.status == "200") {
                if (res.body.msg == "OK") {
                  this.$message({
                    message: "恭喜注册成功",
                    type: "success"
                  });
                  this.newUserName = "";
                  this.newPassword = "";
                  this.rewritePassword = "";
                  this.activeName = "first";
                } else if (res.body.msg == "注册失败，该用户名已存在") {
                  this.$message.error("用户名已经存在");
                  this.newUserName = "";
                  this.newPassword = "";
                  this.rewritePassword = "";
                }
              }
            });
        }
      } else {
        this.$message.error("请同意条款");
      }
    }
  },

  //页面加载调用获取cookie值
  mounted() {
    this.getCookie();
  }
};
</script>

<style lang="less" scope>
.loginRegister {
  width: 100%;
  position: relative;
  .top {
    width: 100%;
    position: relative;
    #ad {
      margin: 3% 4%;
      width: 92%;
      height: 80%;
    }
    .Tabs {
      width: 25%;
      height: 60%;
      position: absolute;
      right: 35%;
      top: 15%;
      background-color: #ffffff;
      opacity: 0.9;
    }
  }
}
.el-tabs__header {
  .el-tabs__nav {
    width: 100%;
    height: 50px;
    .el-tabs__item {
      width: 50%;
      text-align: center;
      height: 100%;
      font-size: 16px;
    }
  }
}
#pane-first {
  p {
    text-align: center;
  }
  .el-input {
    width: 75%;
    margin: 2% 13%;
  }
  .el-button {
    width: 75%;
    margin: 2% 12.5%;
  }
}
.somedetail {
  display: flex;
  justify-content: space-between;
  width: 75%;
  margin: 0 auto;
  .remPas {
    width: 50%;
  }
  .registerNow {
    display: inline-block;
    width: 50%;
    h5 {
      text-align: right;
      cursor: pointer;
      color: #58abdb;
      text-decoration: underline;
    }
  }
}
#pane-second {
  p {
    text-align: center;
  }
  .el-input {
    width: 75%;
    margin: 2% 13%;
  }
  .el-button {
    width: 75%;
    margin: 2% 12.5%;
  }
  .passTip,
  .passSame {
    margin: 0 0 2% 14%;
    text-align: left;
    font-size: 10px;
  }
  .agreement {
    font-size: 10px;
    width: 90%;
    margin: 0 auto;
    text-align: center;
  }
}
</style>

