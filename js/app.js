jQuery(document).ready(function() {
  
  //variable for the timer and break timer's length
  var timerLength = 25;
  var breakLength = 5;
  //variable for converting timer to milliseconds so as to work for msToTime formula
  var msConvert = timerLength * 60000;
  var msConvertBreak = breakLength * 60000;
  //variable for the timer countdown later
  var timeInterval;
  var timeIntervalBreak;
  //variable for start/stop for countdown
  var startStop = false;
  
  //hides break counter by default
  $(".break-countdown").hide();
  
  //resets everything back to default
  function resetIt() {
    clearInterval(timeInterval);
    clearInterval(timeIntervalBreak);
    timerLength = 25;
    breakLength = 5;
    msConvert = timerLength * 60000;
    msConvertBreak = breakLength * 60000;
    $(".timer-length").text(timerLength);
    $(".break-length").text(breakLength);
    $(".countdown").text("25:00");
    $( "#start-stop" ).removeClass( "stop" ).addClass( "start" );
    $("#start-stop").text("start");
    $("#start-stop-cd").removeClass("stop-countdown");
    startStop = false;
    $(".break-countdown").hide();
    $(".start-countdown").show();
    $(".minus2").show();
    $(".plus2").show();
   }
  
   //function for countdown and break
  function msToTimeBreak() {
        clearInterval(timeInterval);
        $(".start-countdown").hide();
        $(".break-countdown").show();
        $(".minus2").hide();
        $(".plus2").hide();
        msConvertBreak -= 1000;
        var seconds = parseInt((msConvertBreak/1000)%60)
        var minutes = parseInt((msConvertBreak/(1000*60))%60);
        var hours = parseInt((msConvertBreak/(1000*60*60))%24);
    
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
    
        $(".countdown-break").text(hours + ":" + minutes + ":" + seconds);
    
    //starts break time then resets timer to default upon reaching the end of the countdown
        if($(".countdown-break").text() === "00:00" || $(".countdown-break").text() === "00:00:00") {
         resetIt();
        }
   };
  
  
  
   //function for countdown
  function msToTime() {
        msConvert -= 1000;
        var seconds = parseInt((msConvert/1000)%60)
        var minutes = parseInt((msConvert/(1000*60))%60);
        var hours = parseInt((msConvert/(1000*60*60))%24);
    
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
    
        $(".countdown").text(hours + ":" + minutes + ":" + seconds);

        //starts break time then resets timer to default upon reaching the end of the countdown
        if($(".countdown").text() === "00:00" || $(".countdown").text() === "00:00:00") {
         timeIntervalBreak = setInterval(msToTimeBreak, 1000);
        }
        
    }
  
  
  //when clicked it starts the time interval set, click again to pause
  $(".start-countdown").click(function() {
    //if start isn't countind down it starts it and changes aesthetics to match, otherwise it stops it and changes them back
    if(startStop === false) {
      timeInterval = setInterval(msToTime, 1000);
      $( "#start-stop" ).removeClass( "start" ).addClass( "stop" );
      $("#start-stop").text("pause");
      $("#start-stop-cd").addClass("stop-countdown");
      startStop = true;
    } 
    else {
      clearInterval(timeInterval);
      $( "#start-stop" ).removeClass( "stop" ).addClass( "start" );
      $("#start-stop").text("start");
      $("#start-stop-cd").removeClass("stop-countdown");
      startStop = false;
    }
    
  });
  
  //stops timer and resets all timers back to default settings
  $(".reset").click(function() {
    resetIt()
  });
  
  
  //decreases the timer on click
  $(".minus").click(function() {
    //if statement disallows bring the timer under 1 minute
    if(timerLength !== 1) {
      //if timer is currently counting down it stops it and resets timer to length
      if($("#start-stop").hasClass("stop")) {
        clearInterval(timeInterval);
        clearInterval(timeIntervalBreak);
        $( "#start-stop" ).removeClass( "stop" ).addClass( "start" );
        $("#start-stop").text("start");
        $("#start-stop-cd").removeClass("stop-countdown");
        msConvert = timerLength * 60000;
        breakLength = 5;
        msConvertBreak = breakLength * 60000;
        timerLength --;
        msConvert -= 60000;
        $(".break-countdown").hide();
        $(".start-countdown").show();
        $(".minus2").show();
        $(".plus2").show();
        $(".timer-length").text(timerLength);
        $(".break-length").text(breakLength);
        //if time is less than 10 adds extra zero for consistent look
        if(timerLength < 10) {
          $(".countdown").text("0" + timerLength + ":00");
        } 
        else {
          $(".countdown").text(timerLength + ":00");
        }
        startStop = false;
      } 
      else {
        msConvert = timerLength * 60000;
        timerLength --;
        msConvert -= 60000;
        $(".timer-length").text(timerLength);
        //if time is less than 10 adds extra zero for consistent look
        if(timerLength < 10) {
          $(".countdown").text("0" + timerLength + ":00");
        } 
        else {
          $(".countdown").text(timerLength + ":00");
        }
      }
    }
  });
  
  //increases the timer on click
  $(".plus").click(function() {
    //if timer is currently counting down it stops it and resets timer to length
      if($("#start-stop").hasClass("stop")) {
        clearInterval(timeInterval);
        clearInterval(timeIntervalBreak);
        $( "#start-stop" ).removeClass( "stop" ).addClass( "start" );
        $("#start-stop").text("start");
        $("#start-stop-cd").removeClass("stop-countdown");
        msConvert = timerLength * 60000;
        breakLength = 5;
        msConvertBreak = breakLength * 60000;
        timerLength ++;
        msConvert += 60000;
        $(".break-countdown").hide();
        $(".start-countdown").show();
        $(".minus2").show();
        $(".plus2").show();
        $(".timer-length").text(timerLength);
        $(".break-length").text(breakLength);
        $(".timer-length").text(timerLength);
        //if time is less than 10 adds extra zero for consistent look
        if(timerLength < 10) {
          $(".countdown").text("0" + timerLength + ":00");
        } 
        else {
          $(".countdown").text(timerLength + ":00");
        }
        startStop = false;
      } 
      else {
        msConvert = timerLength * 60000;
        timerLength ++;
        msConvert += 60000;
        $(".timer-length").text(timerLength);
        $(".countdown").text(timerLength + ":00");
      }    
  });
  
  
    //decreases the break timer on click
  $(".minus2").click(function() {
    //if statement disallows bring the timer under 1 minute
    if(breakLength !== 1) {
        breakLength --;
        msConvertBreak -= 60000;
        $(".break-length").text(breakLength);
      }
  });
  
     //increases the break timer on click
  $(".plus2").click(function() {
        breakLength ++;
        msConvertBreak += 60000;
        $(".break-length").text(breakLength);
  });
  
  
  
  
  
  
  
  
  
});