import config from './config'

export default{
  install : function (Vue, options) {
    Vue.prototype.$rkUtil = {

    getWebServiceUrl : function(name) {
      let dev
      let webServiceUrls = {
        loginSystem:'/lh/users/login/', //登录
        test:'/lh/test/',
        roleSelect :'/lh/users/roleSelect/',//角色列表
        userAdd    :'/lh/users/add/',   //添加用户
        userList   :'/lh/users/list/',  //用户列表
        userChange :`/lh/users/change/${sessionStorage.id}`, //编辑用户和
        userResetPwd :`/lh/users/resetPwd/${sessionStorage.id}`,//重置密码
        userSwitch :`/lh/users/switch/${sessionStorage.id}`,//激活/封存用户 
        pemissionList :`/lh/pemission/list/`, //激活/封存用户 
        roleList: `/lh/role/list` , //获取角色列表
        changeRole:`/lh/role/change/${sessionStorage.id}`//获取角色列表
      };
      if(process.env.NODE_ENV === 'production'){
         dev  = config.interface.prod ;
      }else{//开发
         dev  = config.interface.dev ;
      }   
      return dev + webServiceUrls[name];
    },
   };
  }
};