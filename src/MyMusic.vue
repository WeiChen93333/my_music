<template>
  <div id="my-music">
    <div class="title">我的音乐</div>    
    <router-view class="view-content" name="content"></router-view>
    <router-view class="view-player" name="player"></router-view>
  </div>
</template>

<script>
export default {
  name: 'MyMusic'  
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#my-music
  display flex
  flex-direction column
  width 100vw
  height 100vh 
  .title
    flex 0 0 52px
    line-height 52px
    text-align center
    font-size 22px
    font-weight 600
  .view-player
    flex 0 0 46px
  .view-content
    flex 1
</style>