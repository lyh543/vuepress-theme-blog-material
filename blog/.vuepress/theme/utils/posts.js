import moment from "./moment";

/**
 * parse post key (hex digit) to integer
 * @param key {String} key of posts, like 'v-1234abcd'
 * @returns {number}
 */
export function parsePostKeyToInt(key) {
  return parseInt(key.slice(2), 16);
}


/**
 * generate random image for post by its key
 * @param page {{key: string}} vuepress posts
 * @returns {string} the link of image
 */
export function generatePostImage(page) {
  const imageLength = 19;
  const imageLink = '/img/random/material-#.png';

  const index = parsePostKeyToInt(page.key) % imageLength + 1;
  return imageLink.replace('#', String(index));
}


/**
 * parse datetime to date
 * @param datetime {String} datetime (maybe of different format)
 * @param dateFormat {String} vm.$themeConfig.dateFormat
 * @returns {string} date
 */
export function convertDatetimeToDate(datetime, dateFormat = 'YYYY-MM-DD') {
  return moment(new Date(datetime)).format(dateFormat);
}

/**
 * get file name without extension
 * @param filePath {String}
 * @returns {String}
 */
export function getFileNameWithoutExtension(filePath) {
  return filePath
    .match(/[^\/\\]+$/i)[0]  // get string after last /
    .match(/^[^.]+/i)[0];    // get string before first .
}