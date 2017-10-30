var md5 = require('./md5');
function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

// 参数加密(排序,加密)
function pass(){

  var params_str = '';

  for(var i in arguments){
    params_str += String(arguments[i]);
    params_str += ',';
  }
  params_str = params_str.substring(0,params_str.length-1);
  
  var params_arr = params_str.split(',');
  params_arr = params_arr.sort();
  var new_params_str = params_arr.join('');

  return md5.hex_md5(new_params_str);
  
}

// 判断数组中是否有某个值
function contains(arr, obj) {
  var i = arr.length;
  while (i--) {
    if (arr[i] === obj) {
      return true;
    }
  }
  return false;
}

module.exports = {
  formatTime: formatTime,
  md5:pass,
  contains:contains
}
