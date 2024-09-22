;(function (win) {
  const doc = win.document

  const docEl = doc.documentElement
  // rem等比适配配置文件
  // 基准大小
  const baseSize = 14
  // 设置 rem 函数
  function setRem() {
    const clientWidth = docEl.clientWidth
    const scale = docEl.clientWidth / (clientWidth > 768 ? 1440 : 375)
    // 设置页面根节点字体大小（“Math.min(scale, 3)” 指最高放大比例为3，可根据实际业务需求调整）
    docEl.style.fontSize = `${baseSize * Math.min(scale, 3)}px`
  }
  // 初始化
  setRem()
  // 改变窗口大小时重新设置 rem
  window.onresize = () => {
    setRem()
  }
})(window)
