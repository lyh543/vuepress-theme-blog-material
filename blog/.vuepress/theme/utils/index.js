export const hashRE = /#.*$/
export const extRE = /\.(md|html)$/
export const endingSlashRE = /\/$/
export const outboundRE = /^(https?:|mailto:|tel:)/

export function normalize(path) {
  return decodeURI(path)
    .replace(hashRE, '')
    .replace(extRE, '')
}

/*
 * find parent vm by ref
 * @param {String} ref
 * @param {Vue} vm
 * @param {any} def default value
 * @returns {Element}
 */
export function findContainerInVm(ref, vm, def) {
  if (!ref) return def
  let container
  let parent = vm
  while ((parent = parent.$parent) && !container) {
    container = parent.$refs[ref]
  }
  // Ensure it's html element (ref could be component)
  if (container && container.$el) {
    container = container.$el
  }
  return container || def
}
