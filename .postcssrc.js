module.exports = {
    plugins: {
      //...
      // 'autoprefixer': {
      //   browsers: ['Android >= 4.0', 'iOS >= 7']
      // },
      'postcss-pxtorem': {
        // rootValue: 37.5, //vant-UI的官方根字体大小是37.5
        rootValue({file}){
          return file.indexOf('vant') !== -1 ? 37.5 :75
        },


        propList: ['*']
      }
    }
  }