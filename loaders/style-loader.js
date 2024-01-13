module.exports.pitch = function(remainingRequest) {
  const relativePath = remainingRequest.split('!')
                        .map((absolutePath)=>{
                          return this.utils.contextify(this.context,absolutePath)
                        }).join('!')

  const script = `
  import style from "!!${relativePath}"
  const styleEl = document.createElement('style')
  styleEl.innerHTML = style
  document.head.appendChild(styleEl)
  `
  return script
}