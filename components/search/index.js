// components/search/index.js
import {KeywordModel} from '../../models/keyword'
import {BookModel} from '../../models/book'
const keywordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hotWords: Array,
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    dataArray: [],
    searching: false,
    q: '',
    loading:false
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

    onDelete(event){
      this.setData({
        searching: false,
        q: ''
      })
    },

    onConfirm(event){
      this.setData({
        searching: true
      })
      const q = event.detail.value || event.detail.text
      bookModel.search(0, q)
        .then(res => {
          this.setData({
            dataArray: res.books,
            q
          })
          keywordModel.addToHistory(q)
        })
    },

    loadMore(){
      if(!this.data.q){
        return
      }
      if(this.data.loading){
        return
      }
      const length = this.data.dataArray.length
      //如果wxml中绑定了loading就必须使用setData
      this.data.loading = true
      bookModel.search(length, this.data.q).then(res => {
        const tempArry = this.data.dataArray.concat(res.books)
        this.setData({
          dataArray:tempArry,
          loading: false
        })
      })
    },
  }
})
