function formDate (date) {
  var dt = new Date(Date.parse(date));

  var min = dt.getMinutes();
  var hour = dt.getHours();
  var month = dt.getMonth();
  var day = dt.getDate();
  var year = dt.getFullYear();
  var truemin = min<10 ? "0"+min : min;
  switch(month){
    case 0: rusmonth = "января"
    break
    case 1: rusmonth = "февраля"
    break
    case 2: rusmonth = "марта"
    break
    case 3: rusmonth = "апреля"
    break
    case 4: rusmonth = "мая"
    break
    case 5: rusmonth = "июня"
    break
    case 6: rusmonth = "июля"
    break
    case 7: rusmonth = "августа"
    break
    case 8: rusmonth = "сентября"
    break
    case 9: rusmonth = "октября"
    break
    case 10: rusmonth = "ноября"
    break
    case 11: rusmonth = "декабря"
    break
  }
  document.write(hour + ":" + truemin + " " +
   day + ' ' + rusmonth + ' ' + year);
}