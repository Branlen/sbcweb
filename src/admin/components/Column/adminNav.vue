<template>
    <div v-loading="loading">
       <div  class="dialog">
        <el-dialog  :visible.sync="addVisible" width="500px">
          <addNav :addVisible="addVisible" v-on:success="addSuccess"></addNav>
        </el-dialog>
      </div>
      <div  class="dialog">
        <el-dialog  :visible.sync="editVisible" width="500px">
          <editNav :editVisible="editVisible" v-on:success="editSuccess" ref="myChild"></editNav>
        </el-dialog>
      </div> 
         <div class="button">
      <el-button type="primary" size="small" @click="handleAdd">新增导航栏</el-button>
    </div>
    <el-table
    ref="dragNavTable"
    :data="tableData"
    class="admin_table"
    row-key="navigationBarId"
     border fit highlight-current-row>
     <el-table-column
     align="center"
      label="ID"
      width="150">
       <template slot-scope="scope">
        <span>{{scope.row.navigationBarId}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="导航栏"
      min-width="210">
      <template slot-scope="scope">
        <span>{{scope.row.name}}</span>
      </template>
    </el-table-column>
     <!-- <el-table-column
      label="排序"
      width="210">
       <template slot-scope="scope">
        <span>{{scope.row.sort}}</span>
      </template>
    </el-table-column> -->
    <el-table-column
      label="编辑"
      align="center"
      width="200">
       <template slot-scope="scope">
       <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
       </template>
    </el-table-column>
    </el-table>
       <div class="admin_block">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
    </div>
</template>
<script>
 import axios from 'axios';
import request from '../../untils/request'
import addNav from './adminAddNav'
import editNav from './adminEditNav'
import Sortable from 'sortablejs'
export default {
    name:"adminTable",
    components:{
        addNav,
        editNav
    },
    data(){
        return{
            pageSize:10,
            currentPage:1,
            total:0,
            tableData:[],
            addVisible:false,
            editVisible:false,
            loading:true,
        }
        
    },
    created() {
        this.getNav();
    },
    methods: {
        addSuccess(res){
        this.addVisible = false;
        this.getNav(this.currentPage,this.pageSize);
      },
        editSuccess(res){
        this.editVisible = false;
        this.getNav(this.currentPage,this.pageSize);
      },
       getNav(){
        request.get(`/sbcweb/navigationbar/list`).then(res =>{
          console.log('===导航栏===',res.data.data)
          const data = res.data.data;
          if(res.status == 200){
            this.tableData = data.list;
            this.total = data.totalCount;
            this.currentPage =data.currPage;
            this.oldList = this.tableData.map(v => v.navigationBarId);
            console.log(this.oldList)
            this.newList = this.oldList.slice();
            this.loading = false;
          }
        })
        this.$nextTick(() =>{
          this.setSort();
        })
      },
        handleAdd(){
          this.addVisible = true;
      },
        handleEdit(index,row){
        this.editVisible = true;
        setTimeout(() => {
          this.$refs.myChild.getNavInfo(row.navigationBarId);
        }, 0);
        // this.$nextTick(()=>{
        //   this.$refs.myChild.getNavInfo(row.categoryId);
        // })    
      },
      handleDelete(index,row){
        this.loading = true;
        request.delete(`/sbcweb/navigationbar/delete?navigationBarId=${row.navigationBarId}`)
        .then(res =>{
          if(res.data.status === 200)
          {
             this.$message("删除成功");
           this.getNav(this.currentPage,this.pageSize);
          }else{
            this.$message.warning(res.data.msg);
            this.loading = false;
          }
         

        })
        .catch(err =>{
          console.log(err);
          this.$message.error('错误')
          this.loading = false;
        })
      },
      handleCurrentChange(val) {
        this.loading = true;
      this.currentPage = val;
       this.getNav(val,this.pageSize)
      },
       setSort() {
      const el = this.$refs.dragNavTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      console.log(el);
      var sortable =  Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          console.log("end");
          const targetRow = this.tableData.splice(evt.oldIndex, 1)[0]
          console.log(targetRow);
          this.tableData.splice(evt.newIndex, 0, targetRow)
          console.log('this.tableData');
          console.log(this.tableData);
          this.tableData.forEach((item,index) =>{
             item.sort = index+1;
            request.put('/sbcweb/navigationbar/update',{
            "name": item.name,
            "sort":item.sort,
            "navigationBarId":item.navigationBarId,
        })
          })
        
        }
      })
    }   
    },
}
</script>
<style lang="less">
.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #a9e3f5!important;
}
</style>
