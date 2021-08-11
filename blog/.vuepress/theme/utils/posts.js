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
 * build a Vuetify TreeView of Toc by VuePress headers
 * @param headers {Array<{title, slug, level}>}
 * @return {Array<{id, name, slug, children}>}
 */
export function buildTocTree(headers) {
  let index = 0;
  function createNode(name = '', slug = '#') {
    return {
      id: slug,
      name,
      slug,
      children: []
    };
  }

  let root = createNode();

  function pushToLastNodeOfThatLevel(node, level) {
    let father = root;
    for (let i = 0; i < level; i++) {
      // it may happen when
      // a node of level 4 will be pushed into childrens of a node of level 2
      if (father.children.length === 0)
        father.children.push(createNode());
      father = father.children[father.children.length-1];
    }
    father.children.push(node);
  }

  for (const header of headers) {
    const {title, slug, level} = header;
    const node = createNode(title, slug);
    pushToLastNodeOfThatLevel(node, level - 1);
  }

  let children = root.children;
  // if a child is the only child of root, and is created by function
  // then we can substitute its child for root
  while (children.length === 1 && children[0].name === '')
    children = children[0].children;
  return children;
}
