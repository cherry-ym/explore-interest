// components/classic/music/index.js
import {classicBeh} from '../classic-beh'
const mMgr = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src:String,
    content: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing:false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
  },

  attached:function() {
    this._recoverStatus()
    this._monitorSwitch()
  },
  //组件销毁生命周期函数
  detached:function() {
    //mMgr.stop()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function(event) {
      if(!this.data.playing){
        this.setData({
          playing: true
        })
        mMgr.title = this.properties.src
        mMgr.src = this.properties.src
      }else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },
    _recoverStatus:function() {
      if(mMgr.paused){
        this.setData({
          playing:false
        })
        return
      }
      if(mMgr.src === this.properties.src){
        this.setData({
          playing:true
        })
      }
    },
    _monitorSwitch:function(){
      //播放音乐
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      //暂停音乐
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      //关闭音乐
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      //一首音乐自动播放完成
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})
