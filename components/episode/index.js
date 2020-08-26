// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  //data和properties变量名不能一样，不然会覆盖，因为this.data和this.properties是一样的
  properties: {
    index: {
      type: String,
      //在监听函数里改变变量，会造成无限递归
      observer: function(newVal, oldVal, changedPath) {
        let val = Number(newVal) < 10 ? '0'+newVal : newVal
        this.setData({
          _index: val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    mounths: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月',
    '十二月'],
    year: 0,
    mounth: '',
    _index: ''
  },

  attached: function() {
    let date = new Date()
    let year = date.getFullYear()
    let mounth = date.getMonth()
    this.setData({
      year: year,
      mounth: this.data.mounths[mounth]
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
