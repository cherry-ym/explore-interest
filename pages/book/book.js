// pages/book/book.js
import {BookModel} from '../../models/book'
import {KeywordModel} from '../../models/keyword'
const bookModel = new BookModel()
const keywordModel = new KeywordModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    searching: false,
    hotWords: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //Promise
    bookModel.getHotList()
      .then(res=>{
        this.setData({
          books:res
        })
      })

      keywordModel.getHot().then(res => {
        this.setData({
          hotWords: res.hot
        })
      })
  },

  onSearching() {
    this.setData({
      searching: true
    })
  },

  onCancel() {
    this.setData({
      searching: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})