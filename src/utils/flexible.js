export const designScreenWidth = 1440
export const designFontSize = 14

const setHtmlFontSize = () => {
  const scale = designScreenWidth / designFontSize

  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
  // 得到html的Dom元素
  const htmlDom = document.getElementsByTagName('html')[0]
  // 设置根元素字体大小
  htmlDom.style.fontSize = htmlWidth / scale + 'px'
}

export const listenerSize = () => {
  setHtmlFontSize()
  window.onresize = setHtmlFontSize
}
