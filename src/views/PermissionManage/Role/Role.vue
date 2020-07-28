<template>
  <div class="user-list">
    <ToolBar>
          <el-button type="primary" icon="el-icon-plus" size="small" @click="addUser()">添加</el-button>
          <el-table
              :data="usersData"
              border
              v-loading="loading"
              ref="table"
              style="width: 100%">
            <el-table-column
                prop="name"
                label="角色名称">
            </el-table-column>
            <el-table-column
                prop="is_active"
                label="状态">
            </el-table-column>
            <el-table-column
                label="操作"
                width="180">
              <template slot-scope="scope">
                  <el-button @click=" editUser(scope.row)" type="primary" icon="el-icon-edit" size="small" circle></el-button>
                  <el-button @click="deleteUser(scope.row.id)"  type="danger" icon="el-icon-delete" circle size="small"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="编辑菜单" :visible.sync="dialogFormVisible">        
              <el-tree
                ref="tree"
                :data="menuList"
                show-checkbox
                node-key="id"
                @check-change="handleCheckChange"
                >
              </el-tree>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">
                  取消
                </el-button>
                <el-button type="primary" @click="btnOk">
                  确认
                </el-button>
              </div>
          </el-dialog>
          <el-dialog title="添加角色" :visible.sync="dialogFormVisible2"> 
          <el-form ref="userForm" :rules="rules" :model="userAdd" label-position="left" label-width="150px" style="width: 400px; margin-left:50px;">
              <el-form-item label="角色名称" prop="username">
                <el-input v-model="userAdd.username" />
              </el-form-item> 
               <el-form-item label="角色状态" >
                  <el-switch
                    v-model="isActive"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
              </el-form-item> 
           </el-form>
           <el-tree
              ref="tree"
              :data="menuList"
              show-checkbox
              node-key="id"
              @check-change="handleCheckChange"
              >
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">
                  取消
                </el-button>
                <el-button type="primary" @click="btnOk2">
                  确认
                </el-button>
            </div>
          </el-dialog>
    </ToolBar>
  </div>
</template>

<script>
  import ToolBar from '~/components/ToolBar/ToolBar.vue';
  import HelpHint from '~/components/HelpHint/HelpHint.vue';

  export default {
    data() {
      return {
        isActive:true,
        perData:{},
        userAdd:{},
        usersData:[],
        menuList:[],
        dialogStatus: 'create',
        dialogFormVisible:false,
        changeList:[],
        loading:false,
        dialogFormVisible2:false,
        rules: {
          username:  [{ required: true, message: '角色名称必须输入', trigger: 'blur' }],
        },
      }
    },
    components: {
      ToolBar,HelpHint
    },
    methods: {
      searchUser(){
      },
      editUser(data) {
           this.perData = data
           sessionStorage.id = data.id
           this.dialogFormVisible = true
      },
      addUser(){
           this.dialogFormVisible2 = true ;

      },
      initData(){
          this.loading = true;
          this.getHttpPost({},'roleList',true,'get').then(res => {
              this.loading = false;
              if(res.code==0){
                   this.usersData = res.data
                }
              },error=>{
                this.$message.error('网络开小差了');
          })
          this.getHttpPost({},'pemissionList',true,'get').then(res => {
              if(res.code==0){
                   this.menuList = res.data
                }
              },error=>{
                this.$message.error('网络开小差了');
          })
      },
      handleCheckChange () {
        this.changeList = []
        let res = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
        this.changeList = res
     
         console.log(res)
      },
      btnOk(){
          let param = {
             name:  this.perData.name,
             is_active: this.perData.is_active,
             permission_list:this.changeList.toString()
          }
          this.getHttpPost(param,'changeRole',true,'PUT').then(res => {
              this.loginLoading = false;
              if(res.code==0){
                    this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                   
              }
              },error=>{
                this.$message.error('网络开小差了');
          })
      },
      btnOk2(){
          let param = {
             name:  this.userAdd.username,
             is_active: this.isActive,
             permission_list:this.changeList.toString()
          }
          this.getHttpPost(param,'roleAdd',true,'post').then(res => {
              this.loginLoading = false;
              if(res.code==0){
                    this.$message({
                    message: '添加成功',
                    type: 'success'
                  }); 
                  this.initData()
              }
              },error=>{
                this.$message.error('网络开小差了');
          })
      }
    },
    mounted() {
      this.initData()
    },
  }
</script>
<style lang="less">

</style>
