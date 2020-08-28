// components/search/index.js
import {KeywordModel} from '../../models/keyword'
const keywordModel = new KeywordModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hotWords: Array,
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
  },

  attached(){
    this.setData({
      historyWords: keywordModel.getHistory()
    })
    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event){
      this.triggerEvent('cancel',{},{})
    },
    onConfirm(event){
      keywordModel.addToHistory(event.detail.value)
    }
  }
})
