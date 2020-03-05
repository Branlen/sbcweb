<template>
    <div class="adminSetup">
     <div>
       <label>关键词过滤：</label>
       <el-input v-model="keyword" ></el-input>
       </div>
         <div>
       <label>文件类型管理：</label>
       <el-input v-model="fileSuffix"  ></el-input>
       </div>
       <div class="button">
           <el-button type="primary" @click="submit">确认</el-button>
       </div>
   </div>
</template>
<script>
import axios from 'axios';
import request from '../../untils/request'
export default {
    data(){
        return{
            fileSuffix:'',
            keyword:'',
        }
    },
    methods: {
        getData(){
            request.get(`/sbcweb/setting/info/1`).then(res =>{
                let data = res.data.data;
                if(res.data.status == 200){
                    this.keyword = data.keyword;
                    this.fileSuffix = data.fileSuffix;
                }
            })
        },
        submit(){
            request.put(`/sbcweb/setting/update`,
            {
                'fileSuffix':this.fileSuffix,
                'keyword':this.keyword,
                'settingId':1,
            }
            )
            .then(res =>{
                console.log(res);
                if(res.data.status == 200){
                    this.$message.success("修改成功");
                   console.log('成功');
              
                }else{
                    this.$message.warning(res.data.msg)
                }
            }).catch(err =>{
                console.log(err);
                this.$message.error('错误')
            })
        }
    },
    mounted() {
        this.getData();
    },
}
</script>
<style lang="less">
.adminSetup{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 500px;
    .el-input{
        min-width: 300px;
        width: 20%;
        max-width: 600px;
        margin: 20px;
    }
    .button{
      margin-left: 100px;
    }
}
</style>
