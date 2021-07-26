import moment from "./moment";


export function generatePostImage(key) {
  const imageLength = 19;
  const imageLink = '/img/random/material-#.png';

  const id = parseInt(key.slice(2), 16);
  const index = id % imageLength;
  return imageLink.replace('#', String(index));
}


export function getPostDate(datetime) {
  return moment(new Date(datetime)).format('YYYY-MM-DD');
}