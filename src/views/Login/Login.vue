<template>
  <div class="login">
    <div class="login-form">
      <div class="login-header">
        <p>{{ $Config.siteName }}</p>
      </div>
      <el-input
          placeholder="请输入用户名"
          suffix-icon="fa fa-user"
          v-model="userNmae"
          style="margin-bottom: 18px"
      >
      </el-input>

      <el-input
          placeholder="请输入密码"
          suffix-icon="fa fa-keyboard-o"
          v-model="password"
          type="password"
          style="margin-bottom: 18px"
          @keyup.native.enter="login"
      >
      </el-input>

      <el-button
          type="primary" :loading="loginLoading"
          style="width: 100%;margin-bottom: 18px"
          @click.native="login"
      >登录
      </el-button>
      <div>
        <el-checkbox v-model="Remenber"> Remenber</el-checkbox>
        <a href="javascript:;" style="float: right;color: #3C8DBC;font-size: 14px">Register</a>
      </div>
    <p>username: super@admin password: 888888</p>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userNmae: 'super@admin',
        password: '888888',
        Remenber: true,
        loginLoading: false
      }
    },
    methods: {
      login() {
          this.loginLoading = true;
          let param = {
             username: this.userNmae,
             password: this.password
          } 
          this.getHttpPost(param,'loginSystem',false,'post').then(res => {
          this.loginLoading = false;
                if(res.code==0){
                   this.$message({
                    message: '登录成功',
                    type: 'success'
                  });
                  //登录成功 存储菜单
                   let permission_list = res.data.permission_list
                   sessionStorage.access_token = res.data.access_token
                   sessionStorage.token_type = res.data.token_type
                   sessionStorage.permission_list =JSON.stringify(permission_list)
                    this.$router.push({path: '/'});
                }else{
                  this.$message.error('用户名或密码错误');
                }
              },
              error => { 
                this.loginLoading = false;
                this.$message.error('网络开小差了');
                console.log(error); 
              })
        }
    }
  }
</script>

<style lang="less">
  @import "Login.less";
</style>
