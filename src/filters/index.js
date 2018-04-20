export function formatThousands(num) {
  if (!num) return num;
  if (typeof num == 'string') {
    const number = parseFloat(num);
    if (isNaN(number)) {
      return num;
    } else {
      if (/\d{4}\D\d{1,2}\D\d{1,2}/.test(num) || /%$/.test(num)) {
        return num
      }
    }
  } else if (typeof num == 'number') {
    num = num.toString();
  }

  //1.先去除空格,判断是否空值和非数
  num = `${num}`;
  num = num.replace(/[ ]/g, ""); //去除空格
  if (num == "") {
    return;
  }
  if (isNaN(num)) {
    return num;
  }

  //2.针对是否有小数点，分情况处理
  const index = num.indexOf(".");
  let reg;
  if (index == -1) { //无小数点
    reg = /(-?\d+)(\d{3})/;
    while (reg.test(num)) {
      num = num.replace(reg, "$1,$2");
    }
  } else {
    let intPart = num.substring(0, index);
    const pointPart = num.substring(index + 1, num.length);
    reg = /(-?\d+)(\d{3})/;
    while (reg.test(intPart)) {
      intPart = intPart.replace(reg, "$1,$2");
    }
    num = `${intPart}.${pointPart}`;
  }

  return num;
}


export function toInt(num) {
  if (!num || isNaN(+num)) return num;
  return parseInt( num );
}
