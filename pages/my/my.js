// pages/my/my.js
import {
  ClassicModel
} from '../../models/classic.js'
import {
  BookModel
} from '../../models/book.js'


const classicModel = new ClassicModel()
const bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo:null,
    bookCount: 0,
    classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //如何知道用户是否授权
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },

  getMyFavor(){
    classicModel.getMyFavor(res => {
      this.setData({
        classics: res
      })
    })
  },

  getMyBookCount(){
    bookModel.getMyBookCount().then(res=>{
      this.setData({
        bookCount: res.count
      })
    })
  },

  userAuthorized(){
    //判断用户是否授权,wx的api
    wx.getSetting({
      success:data => {
        if(data.authSetting['scope.userInfo']){
          //只有用户授权以后调用这个函数才能获取到用户信息
          wx.getUserInfo({
            success:data => {
              this.setData({
                authorized:true,
                userInfo: data.userInfo
              })
            },
          })
        }
      }
    })
  },

  getUserInfo(event){
    //console.log(event)
  },

  onGetUserInfo(event){
    const userInfo = event.detail.userInfo
    if(userInfo){
      this.setData({
        authorized: true,
        userInfo
      })
    }
  },

  onJumpToAbout(event){
    //如果要从一个小程序跳到另一个小程序，那么这两个小程序必须关联同一个公众号
    wx.navigateTo({
      url: '/pages/about/about',
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