<template>
  <div id="player"> 
    <div class="panel">
      <div class="controls">
        <button @click="prev">
          <i class="icomoon icon-prev_song"></i>
        </button>
        <button @click="playPause">
          <i class="icomoon icon-play" v-if="playStatus === 'play'"></i>
          <i class="icomoon icon-pause" v-else></i>
        </button>
        <button @click="next">
          <i class="icomoon icon-next_song"></i>
        </button>      
      </div>  
    </div>
    <audio      
      ref="audioRef"
      :src="audioSrc"   
      @timeupdate="timeupdate"
      @ended="ended"
      ></audio>
  </div>
</template>

<script>
export default {
  name:'Player',
  components:{},
  props:{},
  data(){
    return {
      //audio 标签 播放状态(播放/暂停)
      audio: null,
      playStatus: 'play',
      //歌名 当前歌曲
      songNames: ['派对动物-五月天', '干杯-五月天', '正义之道-黄渤'],
      current: 0   
    }
  },
  computed: {   
    audioSrc(){
      return require('../resources/' + this.songNames[this.current] + '.mp3')
    }
  },  
  watch: {
    current(){
      this.$bus.$emit('songChange', this.current)
    }    
  },
  mounted(){
    this.getAudioElement()
    this.$bus.$emit('audioTransfer', this.audio)
  },
  methods: {
    // 获取 audio 标签
    getAudioElement(){
      this.audio = this.$refs.audioRef        
    },
    //播放控制
    playPause(){   
      if(this.audio.paused){
        this.audio.play()
        this.playStatus = 'pause'
      }else{
        this.audio.pause()
        this.playStatus = 'play'
      }     
    },    
    prev(){
      if(this.current === 0){
        this.current = this.songNames.length - 1     
      }else{
        this.current--           
      }
    },
    next(){
      if(this.current === this.songNames.length - 1){
        this.current = 0
      }else{      
        this.current++                     
      }
    },
    timeupdate(){
      //时间更新, 使歌词滚动
      this.$bus.$emit('lrcScroll')
    },
    ended(){
      this.next()
    }    
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#player
  .panel
    height 46px
    margin 0 auto    
    overflow hidden
    .controls
      display flex
      justify-content center     
      background-color rgb(239, 239, 239)
      button 
        width 46px
        height 46px              
        cursor pointer 
      .icomoon 
        font-size 18px
        font-weight 600
      .icon-play, .icon-pause 
        font-size 32px  
</style>