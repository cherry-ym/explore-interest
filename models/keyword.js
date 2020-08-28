import { HTTP } from "../utils/http-p"

export class KeywordModel extends HTTP{
  addToHistory(keyword){
    //存入缓存
    let history = this.getHistory()
    const has = history.includes(keyword)
    //如果keyword不存在，再加入队列
    if(!has){
      //如果队列长度大于等于10，把队列末尾的元素删除，在头部添加新元素
      if(history.length >= 10){
        history.pop()
      }
      history.unshift(keyword)
      wx.setStorageSync('q', history)
    }
  }

  getHistory(){
    //从缓存中获取
    const history = wx.getStorageSync('q')
    if(!history){
      return []
    }
    return history
  }

  getHot(){
    return this.request({
      url: 'book/hot_keyword'
    })
  }
}