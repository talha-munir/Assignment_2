    var monthArrays = ["January", "Febuarary", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
	var daysnamefull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var app = angular.module("myApp", []);
app.controller("myController",function($scope) {
    $scope.days = ["Mon","Tues","Wed","Thu","Fri","Sat","Sun"];

    var dat = new Date();
	$scope.setDate=function($scope,date){
    var dateCurrent = (new Date());
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    
	var minusDate = 0;
	var week_index=1;
    
	var monthStartDay = new Date(year,month, 1).getDay();  
    var monthArray = monthArrays[month];
    
	$scope.currMonth = monthArray + ", " + year.toString();
    $scope.dateCurrent = dateCurrent;
    $scope.weeks = new Array([],[],[],[],[],[],[]);

	if(monthStartDay==0)
	{
		monthStartDay=7;
	}
	else{
		monthStartDay=monthStartDay;
	}

	var actual_Start_day = monthStartDay-1;
	var Starting_week_index = week_index-1;
    
    for(var i=actual_Start_day-1;i>=0;i--){
		
        var preMonDate = new Date(year, month, minusDate--);
        var day = {};
        day.class = "disabled";
        day.data =  preMonDate.getDate() + "  ";
        $scope.weeks[Starting_week_index].push(day);
		
    }
	
	
    $scope.weeks[Starting_week_index].reverse();
    
	var weekLeft = 7-$scope.weeks[0].length;
    
	if(weekLeft<1){
        Starting_week_index++;
        weekLeft = 7;
    }
    
	var count = monthStartDay;
    var dayInMon = (new Date(year, month + 1, 0)).getDate();
    for (var j = 1; j < dayInMon + 1;  j++) {
        
		var date = new Date(year, month, j);
        
		var day = {};
        day.weather = ' ';
        day.data = date.getDate() + " " + day.weather;
        
		if(dateCurrent.getDate() === date.getDate()){
            //day.class = "today";
        }
		
        var weekLeft = 7-$scope.weeks[Starting_week_index].length;
        
		if(weekLeft<1){
            Starting_week_index++;
			weekLeft = 7;
        }
        
		$scope.weeks[Starting_week_index].push(day);
        count++;
    }
	
    var count = count;
    var plusDate = 1;
    while (count < 43) {
        var nextMonDate = new Date(year, month + 1, plusDate++);
        var day = {};
        day.class = "disabled";
        day.data = nextMonDate.getDate() + "";
        var weekLeft = 7-$scope.weeks[Starting_week_index].length;
        if(weekLeft<1){
            Starting_week_index++; weekLeft = 7;
        }
        $scope.weeks[Starting_week_index].push(day);
        count++;
    } 
        
    }
   
    var currentDate = new Date();
    var currDate = new Date(currentDate);
     $scope.setDate($scope,currDate);
    
    $scope.previous=function(){
        currDate.setMonth(currDate.getMonth()-1);
        $scope.setDate($scope,currDate);

    }
    $scope.next=function(){
        currDate.setMonth(currDate.getMonth()+1);
        $scope.setDate($scope,currDate);
    }
   
});




function showWeather() {
console.log("ssd");
  var currdate = new Date();
  var date = currdate.getDate() + ' ' + monthArrays[currdate.getMonth()] + ' ' + currdate.getFullYear();
  $.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22islamabad%2C%20asia%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
  function(data) {
	for(var i = 0; i < data.query.results.channel.item.forecast.length; i++) {
      if(data.query.results.channel.item.forecast[i].date == date)
      $('#weather-text').text(data.query.results.channel.item.forecast[i].text);
      $('#weather-high-low').html('High '+ data.query.results.channel.item.forecast[i].high + ' &deg;F - Low: ' + data.query.results.channel.item.forecast[i].low + ' &deg;F');
    }
    var html = '<table style="font-size: 20px;" ><tr cell-padding:7% style="color:#ffffff">';
    for(var i = 0; i < data.query.results.channel.item.forecast.length; i++) {
      html += '<td style="padding: 13px"><img src="http://l.yimg.com/a/i/us/we/52/' + data.query.results.channel.item.forecast[i].code + '.gif" style="margin-bottom:5px;"><br>' + data.query.results.channel.item.forecast[i].day + '<br>' + data.query.results.channel.item.forecast[i].date + '<br>' + data.query.results.channel.item.forecast[i].text + '<br>High: '+ data.query.results.channel.item.forecast[i].high + ' &deg;F<br>Low: ' + data.query.results.channel.item.forecast[i].low + ' &deg;F' + '</td>';
    }
    html += '</tr></table>';
    $('#weather-full').html(html);
  });
}


setInterval(function() {
  var currtime = new Date();

  var hours = currtime.getHours(), minutes = currtime.getMinutes();
  var ampm = 'am';
  if(hours > 12) {
    ampm = 'pm';
    hours = hours % 12;
  }
  if(minutes < 10) {
    minutes = '0' + minutes;
  }
  $('.time-text').text(hours + ':' + minutes + ' ' + ampm);

  var day = currtime.getDay(), date = currtime.getDate(), month = currtime.getMonth();
  $('.date-day').text(daysnamefull[day] + ', ' + date + ' ' + monthArrays[month]);
}, 1000);


function myfunc() {
	var d = new Date();
 
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
	
	var secondhand = s*6;
	var minutehand = m*6;
	var hourhand = ((h-12)*30) + (m/2);
	
	var x = document.getElementById("clock");
	x.getElementsByClassName("hours")[0].style.transform = "rotate("+ hourhand +"deg)";
	x.getElementsByClassName("minutes")[0].style.transform = "rotate("+ minutehand +"deg)";
	x.getElementsByClassName("seconds")[0].style.transform = "rotate("+ secondhand +"deg)"
}






function showweather(){
	document.getElementById("full-size").style.display = "none";
	document.getElementById("calenderView").style.display = "none";
	document.getElementById("weatherView").style.display = "block";
	document.getElementById("full").style.backgroundColor = "#000000";
	document.getElementById("clockView").style.display = "none";
	
	showWeather();
}



function showCalender(){
	
	document.getElementById("full-size").style.display = "none";
	document.getElementById("weatherView").style.display = "none";
	document.getElementById("calenderView").style.display = "block";
	document.getElementById("full").style.backgroundColor = "#000000";
	document.getElementById("clockView").style.display = "none";
	
}

function closeCalender(){
	document.getElementById("full-size").style.display = "block";
	document.getElementById("calenderView").style.display = "none";
	document.getElementById("weatherView").style.display = "none";
	document.getElementById("full").style.backgroundColor = "#ffffff";
	document.getElementById("clockView").style.display = "none";
	
	
}

function showClock(){
	
	document.getElementById("full-size").style.display = "none";
	document.getElementById("weatherView").style.display = "none";
	document.getElementById("calenderView").style.display = "none";
	document.getElementById("clockView").style.display = "block";
	document.getElementById("full").style.backgroundColor = "#000000";
	
}

function closeClock(){
	document.getElementById("full-size").style.display = "block";
	document.getElementById("calenderView").style.display = "none";
	document.getElementById("weatherView").style.display = "none";
	document.getElementById("full").style.backgroundColor = "#ffffff";
	document.getElementById("clockView").style.display = "none";
	
	
}

function closeWeather(){
	document.getElementById("clockView").style.display = "none";
	document.getElementById("full-size").style.display = "block";
	document.getElementById("calenderView").style.display = "none";
	document.getElementById("weatherView").style.display = "none";
	document.getElementById("full").style.backgroundColor = "#ffffff";
}