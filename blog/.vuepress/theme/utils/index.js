/**
 * generate MD5 of string
 * @returns {number}
 */
String.prototype.hashCode = function() {
  let hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

/**
 * alternative of lodash/pick
 * @param o {Object}
 * @param props {Array<String>}
 * @returns {Object}
 */
export function pick(o, props) {
  return Object.assign({}, ...props.map(prop => ({[prop]: o[prop]})));
}