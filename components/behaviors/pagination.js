export const pagination = Behavior({
  data:{
    dataArray: [],
    total: null,
    noneResult: false,
    loading: false
  },

  methods:{
    //添加新请求的book数据
    setMoreData(newDataArray){
      const tempArray = this.data.dataArray.concat(newDataArray)
      this.setData({
        dataArray:tempArray
      })
    },

    //获取当前书籍个数
    getCurrentStart(){
      return this.data.dataArray.length
    },

    //获取总共的书籍个数
    setTotal(total){
      this.data.total = total
      if(total === 0){
        this.setData({
          noneResult: true
        })
      }
    },

    //是否还应该继续向服务器请求数据
    hasMore(){
      if(this.data.dataArray.length >= this.data.total){
        return false
      }else {
        return true
      }
    },

    //每一次退回的下一次搜索都让数据清空，从新请求
    initialize(){
      this.setData({
        dataArray: [],
        noneResult: false,
        loading: false,
      })
      this.data.total = null
    },

    isLocked(){
      return this.data.loading ? true : false
    },

    locked(){
      this.setData({
        loading:true
      })
    },

    unLocked(){
      this.setData({
        loading:false
      })
    }
  }
})