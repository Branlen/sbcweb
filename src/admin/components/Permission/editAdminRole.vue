

<template>
  <div class="adminAddRole">
      <el-form>
     <el-form-item label="栏目权限：">
          <el-select 
          v-model="roleInfoId" 
          placeholder="请选择" 
          size="mini"
          >
            <el-option
              v-for="item in data"
              :key="item.roleInfo.id"
              :label="item.roleInfo.description"
              :value="item.roleInfo.id"
            ></el-option>
          </el-select>
        </el-form-item>
      <el-form-item  class="buttons">
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import request from "../../untils/request";
export default {
  props:['selectAdminUid'],
  data() {
    return {
      roleInfoId:'',
      data: [
      //   {
      //   roleInfo:{
      //     id:'1',
      //     role:'',
      //     status:'',
      //     description: "1栏目"
      //   }
      // },
      // {
      //   roleInfo:{
      //     id:'2',
      //     role:'',
      //     status:'',
      //     description: "2栏目"
      //   }
      // },
      // {
      //   roleInfo:{
      //     id:'3',
      //     role:'',
      //     status:'',
      //     description: "3栏目"
      //   }
      // },
      // {
      //   roleInfo:{
      //     id:'4',
      //     role:'',
      //     status:'',
      //     description: "4栏目"
      //   }}
        ],
    };
  },
  methods: {
    getAdminRole(adminUid) {
      request.get(`/sbcweb/role/list`).then(res => {
        console.log("===allRole===", res);
        if (res.data.status === 200) {
          this.data = res.data.data;
        } else {
        }
      });
    },
    handleSubmit(){
      if(this.roleInfoId)
      {
      console.log('===提交角色===')
      request.post('/sbcweb/admin/addAdminRole',{
        uid:this.selectAdminUid,
        roleId:this.roleInfoId,
      })
      .then(res =>{
        console.log('===tijiaojuese===',res)
        if(res.data.status === 200)
        {
          this.$message.success('添加成功')
          this.$emit('success',false)
        }else{
          this.$message.warning(res.data.msg)
          this.$emit('success',false)
        }
      })
      }else{
        this.$message.warning('栏目不能为空！')
      }
     
    },
  },
  created() {
     this.getAdminRole();
  }
};
</script>
<style lang="less">
.adminAddRole{
  margin-top: 20px;
  margin-left: 20px;
  min-width: 300px;
  width: 450px;
  .el-form{
      max-width: 450px;
      .el-upload {
          margin-left: 0px;
      }
  }
  .el-input{
    max-width:300px; 
  }
  .buttons{
   float: right;
   margin-top:-20px;
  }
}
</style>


