const moment = require("moment");

/**
 * get file name without extension
 * @param filePath {String}
 * @returns {String}
 */
function getFileNameWithoutExtension(filePath) {
  return filePath
    .match(/[^\/\\]+$/i)[0]  // get string after last /
    .match(/^[^.]+/i)[0];    // get string before first .
}


/**
 * guess headings from Markdown content
 * @param content {String} Markdown content
 * @returns {String | null} title,
 */
function getFirstMarkdownHeading(content) {
  if (!content)
    return null;
  const headings = content.match(/# .+/);
  if (headings && headings.length > 0)
    return headings[0].replace(/# +/, "");
  else
    return null;
}


/**
 * an alternative of lodash/pick
 * @param o {Object} origin of props
 * @param props {Array<String>} names of props be picked
 * @return {Object} a new object consisting of picked props from origin
 */
function pick(o, props) {
  return Object.assign({}, ...props.map(prop => ({[prop]: o[prop]})));
}


/**
 * Transform timestamp to YYYY-MM-DD HH:mm:ss
 * @param timestamp
 * @returns {string} 'YYYY-MM-DD HH:mm:ss'
 */
function timeTransformer(timestamp) {
  return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
}

/**
 * sort pages from newest to oldest
 * @param pages
 * @returns pages
 */
function sortPages(pages) {
  return pages.sort((a, b) => new Date(b.date) - new Date(a.date));
}

module.exports = {
  getFileNameWithoutExtension,
  getFirstMarkdownHeading,
  pick,
  timeTransformer,
  sortPages
};