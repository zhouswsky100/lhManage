<template>
    <ToolBar>
     菜单管理 

    
   <el-tree
    :data="menuList"
    show-checkbox
    node-key="id"
    >
   </el-tree>
    </ToolBar>


</template>

<script>
  import ToolBar from '~/components/ToolBar/ToolBar.vue';
  import HelpHint from '~/components/HelpHint/HelpHint.vue';

  export default {
    data() {
      return {
        menuList:[],
        value: [],
    
      }
    },

    methods: {
      initData(){
          this.getHttpPost({},'pemissionList',true,'get').then(res => {
              this.loginLoading = false;
              if(res.code==0){
                   this.menuList = res.data
                }
              },error=>{
                this.$message.error('网络开小差了');
          })
      }
    },
    mounted() {
      this.initData()
    },
    components: {
      ToolBar, HelpHint
    }
  }
</script>
<style lang="less">

</style>
