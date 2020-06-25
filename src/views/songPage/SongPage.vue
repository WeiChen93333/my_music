<template>
  <div id="song-page-wrapper">
    <div class="song-page">
      <div class="button-box">
        <!-- <mo-button type="primary" text="歌单" size="middle"
          @click.native="showSongList"></mo-button>   -->
        <mo-button type="primary" text="歌词" size="small"
          @click.native="showLrc"></mo-button>     
      </div>
      <div class="container">
        <ul class="song-list" v-show="!lrcVisible">
        <li v-for="(item, index) in songNames" :key="index"
          @click="selectSong(index)">{{item}}</li>
        </ul>
        <ul v-show="lrcVisible" class="lrc" ref="lrcRef">        
          <li ref="lrcLineRef" class="lrcLine"
            v-for="(item, index) in lrc" :key="index">{{item}}</li>
        </ul>
      </div>
    </div>          
  </div>
</template>

<script>
export default {
  name: 'SongPage',  
  data(){
    return {
      //歌名 当前歌曲
      songNames: ['派对动物-五月天', '干杯-五月天', '正义之道-黄渤'],
      current: 0,
      //歌词时间, 内容, 
      time: [],
      lrc: [],
      lrcLines: [],
      lrcVisible: false
    }    
  },
  created(){        
    this.getLrc()
  },
  mounted(){
    //监听 Play 组件歌曲切换
    this.$bus.$on('songChange', value => { //value 是当前歌曲在歌曲数组中的索引
      this.current = value
      this.getLrc() //获取当前歌曲的歌词
    })
    //监听 Play 组件 audio 标签 timeupdate 事件
    this.$bus.$on('lrcScroll', value =>{ // value 是 audio 对象
      this.lrcScroll(value) 
    })
  },
  beforeDestroy(){
    console.log('beforeDestroy')

  },
  methods: {
    //显示/隐藏歌词    
    showLrc(){
      this.lrcVisible = !this.lrcVisible    
    },
    //歌单中选择歌曲
    selectSong(index){
      this.showLrc()
      this.current = index
      this.init()        
    },
    getLrc(){
      //准备工作
      //利用正则切出歌词时间和内容  
      let {lrcStr} = require('../resources/' + this.songNames[this.current] + 'lrc.js')     
      const time = []
      const lrc = []
      const reg = /(\d{2}:\d{2})\.\d{2}](.+)/g
      let regStr = reg.exec(lrcStr)
      while(regStr){
        time.push(regStr[1])
        lrc.push(regStr[2])
        regStr = reg.exec(lrcStr)
      }   
      this.lrc = lrc     
      this.time = time      
    },
    //audio timeupdate 事件 歌词滚动
    lrcScroll(audio){  
      let lrcLines = this.$refs.lrcLineRef       
      lrcLines = Array.from(lrcLines)
      let minute = '0' + parseInt(audio.currentTime / 60)    
      let second = parseInt(audio.currentTime % 60)
      let currentTimeFormat = minute + ":" + (second < 10 ? "0" : "") + second
      let index = this.time.indexOf(currentTimeFormat);             
      if(index !== -1){               
        lrcLines.forEach(item => {
          item.className = ''      
        })
        lrcLines[index].className = 'active'          
        this.$refs.lrcRef.style.top = 120 - 40 * index + 'px'      
      }      
    }    
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#song-page-wrapper
  display flex
  justify-content center
  // background-image url(./sky.jpg)
  // background-repeat no-repeat
  // background-size cover
  .song-page 
    flex 1
    max-width 375px
    max-height 677px
    .button-box
      margin-bottom 10px
      padding-right 6px
      text-align right
    .container
      height 440px     
      position relative  
      overflow hidden
      .song-list
        li
          height 20px
          line-height 20px  
          padding 15px        
          box-sizing content-box
          margin-bottom 10px   
          background-color rgb(240, 244, 248)
          cursor pointer      
      .lrc 
        position absolute
        top 120px         
        width 400px      
        text-align center
        font-size 18px    
        li
          height 40px
          line-height 40px  
          &.active
            color sandybrown
            transition color .2s linear
  
</style>