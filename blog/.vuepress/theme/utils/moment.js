import moment from 'moment';

moment.locale('zh-cn');
// 可以使用 moment(datetime).toChinese() 转换为展示给用户的时间
moment.prototype.toChinese = function() {
  return this.format('YYYY 年 MM 月 DD 日 HH:mm');
}
moment.prototype.dateNumber = function() {
  return Number(this.format('YYYYMMDD'));
}
window.moment = moment;
export default moment;
