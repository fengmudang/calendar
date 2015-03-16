var oDate = new Object();
    function DateClass(_container) {
        this.author = 'xiaogang';
        this.version = '1.0';
        this.container = _container;
        this.weekArr = ['日', '一', '二', '三', '四', '五', '六'];
        this.dateArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        this.showTable = function(_year, _month) {
             this.container.innerHTML = this.getDateTable(_year, _month);
        }

        this.getDateTable = function(_year, _month) {
             if (this.checkArgs(_year, _month)) {
                 _year = parseInt(this.checkDate(_year, _month).split('-')[0]);
                 _month = parseInt(this.checkDate(_year, _month).split('-')[1]);
                 this.Thead = '<table cellpadding="5" cellspacing="0" class="DateTable">\n';
                 this.Thead += '<tr><td align="center" class="MonthTd" onclick="oDate.showTable(' + _year + ', ' + eval(_month-1) + ');">3</td>';
                 this.Thead += '<td align="center" colspan="5" class="SelectTd"><select onchange="oDate.showTable(options[selectedIndex].value, ' + _month + ');">';
                 for (var i=2015; i<2016; i++) this.Thead += '<option value="' + i + '" ' + ((_year==i) ? 'selected' : '') + '>' + i + '年</option>';
                 this.Thead += '</select><select onchange="oDate.showTable(' + _year + ', options[selectedIndex].value);">';
                 for (var i=3; i<4; i++) this.Thead += '<option value="' + i + '" ' + ((_month==i) ? 'selected' : '') + '>' + i + '月</option>';
                 this.Thead += '</select></td>';
                 this.Thead += '<td align="center" class="MonthTd" onclick="oDate.showTable(' + _year + ', ' + eval(_month+1) + ');">4</td></tr>\n';
                 this.Thead += '<tr>';
                 for (var i=0; i<this.weekArr.length; i++) this.Thead += '<td align="center" class="WeekTd">' + this.weekArr[i] + '</td>';
                 this.Thead += '</tr>\n';
                 this.Tbody = '<tr>';
                 this.dateArr[1] = (!this.checkYear(_year)) ? 28 : 29 ;
                 for (var i=0; i<this.firstPos(_year, _month); i++) this.Tbody += '<td class="BlankTd"></td>';
                 for (var i=1; i<=this.dateArr[_month-1]; i++) {
                      if (this.firstPos(_year, _month) == 0) {
                          if (i!=1 && i%7==1) this.Tbody += '</tr>\n<tr>';
                      } else {
                          if ((i+this.firstPos(_year, _month))%7==1) this.Tbody += '</tr>\n<tr>';
                      }
                      if (!this.today(_year, _month, i)) {
                          this.Tbody += '<td align="center" class="out" onmouseover="className=\'over\';" onmouseout="className=\'out\';" onmousedown="className=\'down\';" onclick="oDate.showDateStr(' + _year + ', ' + _month + ', ' + i + ', \'' + this.weekArr[new Date(_year, _month-1, i).getDay()] + '\');">' + i + '</td>';
                      } else {
                         this.Tbody += '<td align="center" class="Today" onclick="oDate.showDateStr(' + _year + ', ' + _month + ', ' + i + ', \'' + this.weekArr[new Date(_year, _month-1, i).getDay()] + '\');">' + i + '</td>'; 
                      } 
                 }
                 for (var i=0; i<6-this.lastPos(_year, _month); i++) this.Tbody += '<td class="BlankTd"></td>';
                 this.Tbody += '</tr>\n'; 
                 this.TFoot = '</table>\n';
                 this.Table = this.Thead + this.Tbody + this.TFoot;
                 return this.Table;
             } else {
                 return 'Arguments Error!';
             }            
         }

         this.firstPos = function(_year, _month) {
              return new Date(_year, _month-1, 1).getDay();
         }

         this.lastPos = function(_year, _month) {
              return new Date(_year, _month-1, this.dateArr[_month-1]).getDay();
         }

         this.checkYear = function(_year) {
              return ((_year % 4 == 0) && (_year % 100 != 0)) || (_year % 400 == 0);
         }

         this.today = function(_year, _month, _date) {
              return (new Date().getFullYear() == _year) && (new Date().getMonth() == _month-1) && (new Date().getDate() == _date);
         }
 
         this.checkArgs = function(_year, _month) {
              if (_year<1900 || _year>2100) return false;
              if (_month<0 || _month>13) return false;
              return (!isNaN(_year) && !isNaN(_month));           
         }

         this.checkDate = function(_year, _month) {
              if (_month<1) { 
                  _year --;
                  _month = 12;
              }
              if (_month>12) { 
                  _year ++;
                  _month = 1;
              }
              return _year + '-' + _month;
         } 
        
         this.showDateStr = function(_year, _month, _date, _week) {
              window.alert(_year + '年' + _month + '月' + _date + '日 星期' + _week);  
         }
    }
   
    window.onload = function() {
         oDate = new DateClass(self.oContainer);
         oDate.showTable(new Date().getFullYear(), new Date().getMonth()+1);
    }
