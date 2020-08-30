// components/search/index.js
import {KeywordModel} from '../../models/keyword'
import {BookModel} from '../../models/book'
import {pagination} from '../behaviors/pagination'
const keywordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [pagination],
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
    searching: false,
    q: '',
    loading:false,
    loadingCenter: false,
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
      this.initialize()
      this.triggerEvent('cancel',{},{})
    },

    onDelete(event){
      this.initialize()
      this._closeResult()
    },

    onConfirm(event){
      this._showResult()
      this._showLoadingCenter()
      //每一次退回的下一次搜索都让数据清空，从新请求
      // this.initialize()
      const q = event.detail.value || event.detail.text
      bookModel.search(0, q)
        .then(res => {
          //添加新请求的book数据
          this.setMoreData(res.books)
          this.setTotal(res.total)
          this.setData({
            q
          })
          keywordModel.addToHistory(q)
          this._hideLoadingCenter()
        })
    },

    _showLoadingCenter(){
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter(){
      this.setData({
        loadingCenter: false
      })
    },

    _showResult(){
      this.setData({
        searching: true
      })
    },

    _closeResult(){
      this.setData({
        searching: false,
        q: ''
      })
    },

    loadMore(){
      if(!this.data.q){
        return
      }
      if(this.isLocked()){
        return
      }
      // const length = this.data.dataArray.length
      //如果wxml中绑定了loading就必须使用setData
      if(this.hasmore()){
        this.locked()
        //获取当前书籍个数
        bookModel.search(this.getCurrentStart(), this.data.q).then(res => {
          //添加新请求的book数据
          this.setMoreData(res.books)     
          this.unLocked()
        },()=>{
          //当断网时发生错误请求，应该解锁，不然网络正常时，lock一直是true
          this.unLocked()
        })
      }
    },

    
  }
})
