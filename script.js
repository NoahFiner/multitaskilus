var frameLocations = [[], [], [], []];
var frames = [];
var gameActive = false;
var timeInterval;
var score = 0;
var totalTime = 0;

var Frame = function(num, desc, time, active) {
  this.num = num;
  this.desc = name;
  this.time = time;
  this.origTime = time;
  this.active = active;
  if(this.active === false) {
    $("#frame" + this.num).addClass("disabled");
  }
  this.resetTime = function() {
    var that = this;
    score += 1;
    this.time = this.origTime;
    $("#frame" + this.num + " .frame-inner").addClass("success");
    setTimeout(function() {$("#frame" + that.num + " .frame-inner").removeClass("success");}, 100);
  }
  this.failure = function() {
    var that = this;
    this.time -= 5;
    $("#frame" + this.num + " .frame-inner").addClass("failure");
    setTimeout(function() {$("#frame" + that.num + " .frame-inner").removeClass("failure");}, 100);
  }
  this.epicFailure = function() {
    var that = this;
    $("#frame" + this.num + " .frame-inner").addClass("loss");
    setTimeout(function() {$("#frame" + that.num + " .frame-inner").removeClass("loss");}, 1000);
  }
}

var lose = function() {
  gameActive = false;
  $("#replay").html("replay");
  setTimeout(function() {
    $("#menu").addClass("shown");
    for(i = 0; i < 16; i++) {
      disable(i);
      resetTime(i);
    }
  }, 2000);
  $("#score").html("you accomplished " + score + " tasks in " + parseInt(totalTime) + "s");
  score = 0;
  totalTime = 0;
  clearInterval(timeInterval);
}

var start = function() {
  gameActive = true;
  $("#menu").removeClass("shown");
  enable(0);
  enable(1);
  enable(2);
  enable(3);
  enable(4);
  timeInterval = setInterval(function() {updateTimes()}, 10);
  shuffle();

  //Word game
  chooseWord();

  //Addition game
  chooseAddition();

  //Multiplaction game
  chooseMult();

  //Remember game
  initRemember();
}

var resetTime = function(whichFrame) {
  frames[whichFrame].resetTime();
}
var removeTime = function(whichFrame) {
  frames[whichFrame].failure();
}
var enable = function(whichFrame) {
  frames[whichFrame].active = true;
  $("#frame" + whichFrame).removeClass("disabled");
}
var disable = function(whichFrame) {
  frames[whichFrame].active = false;
  $("#frame" + whichFrame).addClass("disabled");
}


var updateTimes = function() {
  for(i = 0; i < 16; i++) {
    if(frames[i].active) {
      $("#frame" + i + " .timer-text").html(frames[i].time.toFixed(2))
      frames[i].time -= 0.01;
      if(frames[i].time < 0) {
        frames[i].epicFailure();
        lose();
      }
      else if(frames[i].time < 5) {
        $("#frame" + i).addClass("urgent2");
      }
      else if(frames[i].time < 10) {
        $("#frame" + i).addClass("urgent1");
      }
      else {
        $("#frame" + i).removeClass("urgent1 urgent2");
      }
    }
  }
  totalTime += 0.01;
}

var shuffle = function() {
  frameLocations = [[], [], [], []]
  for(i = 0; i < 16; i++) {
    var row = Math.floor(Math.random()*4);
    while(frameLocations[row].length === 4) {
      row = Math.floor(Math.random()*4);
    }
    frameLocations[row].push(i);
    $("#frame" + i).css("top", (row*25) + "%");
    $("#frame" + i).css("left", ((frameLocations[row].length - 1)*25) + "%");
  }
}

//word game
var words = ["able", "achieve", "acoustics", "action", "activity", "aftermath", "afternoon", "afterthought", "apparel", "appliance", "beginner", "believe", "bomb", "border", "boundary", "breakfast", "cabbage", "cable", "calculator", "calendar", "caption", "carpenter", "cemetery", "channel", "circle", "creator", "creature", "education", "faucet", "feather", "friction", "fruit", "fuel", "galley", "guide", "guitar", "health", "heart", "idea", "kitten", "laborer", "language", "lawyer", "linen", "locket", "lumber", "magic", "minister", "mitten", "money", "mountain", "music", "partner", "passenger", "pickle", "picture", "plantation", "plastic", "pleasure", "pocket", "police", "pollution", "railway", "recess", "reward", "route", "scene", "scent", "squirrel", "stranger", "suit", "sweater", "temper", "territory", "texture", "thread", "treatment", "veil", "vein", "volcano", "wealth", "weather", "wilderness", "wren", "wrist", "writeradorable", "beautiful", "clean", "drab", "elegant", "fancy", "glamorous", "handsome", "long", "magnificent", "old-fashioned", "plain", "quaint", "sparkling", "ugliest", "unsightly", "wide-eyedaccount", "achiever", "acoustics", "act", "action", "activity", "actor", "addition", "adjustment", "advertisement", "advice", "aftermath", "afternoon", "afterthought", "agreement", "air", "airplane", "airport", "alarm", "amount", "amusement", "anger", "angle", "animal", "answer", "ant", "ants", "apparatus", "apparel", "apple", "apples", "appliance", "approval", "arch", "argument", "arithmetic", "arm", "army", "art", "attack", "attempt", "attention", "attraction", "aunt", "authority"];
var currWord;
var chooseWord = function() {
  currWord = words[Math.floor(Math.random()*words.length)];
  $("#type-word").html(currWord);
}
var submitWord = function() {
  var userWord = $("input[name='typing-input']").val();
  $("input[name='typing-input']").val("");
  if(userWord.toLowerCase() === currWord) {
    resetTime(1);
    chooseWord();
  }
  else {
    removeTime(1);
  }
}

//math
var currAdd
var chooseAddition = function() {
  var num1 = Math.floor(Math.random()*50);
  var num2 = Math.floor(Math.random()*50);
  currAdd = num1 + num2;
  $("#add-upper").html(num1 + " + " + num2);
}
var submitAddition = function() {
  var userAdd = $("input[name='add-input']").val();
  $("input[name='add-input']").val("");
  if(parseInt(userAdd) === currAdd) {
    resetTime(2);
    chooseAddition();
  }
  else {
    removeTime(2);
  }
}

var currMult
var chooseMult = function() {
  var num1 = Math.floor(Math.random()*15);
  var num2 = Math.floor(Math.random()*15);
  currMult = num1 * num2;
  $("#mult-upper").html(num1 + " * " + num2);
}
var submitMult = function() {
  var userMult = $("input[name='mult-input']").val();
  $("input[name='mult-input']").val("");
  if(parseInt(userMult) === currMult) {
    resetTime(3);
    chooseMult();
  }
  else {
    removeTime(3);
  }
}

//remember game
var currRemember, userRemember, rememberTime, rememberTimeUpdater;
var chars = "ABCDEFG";
var rememberPhase = 0;

var generateRandomString = function(len) {
  var finalString = "";
  for(i = 0; i < len; i++) {
    finalString += chars[Math.floor(Math.random()*chars.length)];
  }
  return finalString;
}

var initRemember = function() {
  rememberPhase = 1;
  currRemember = generateRandomString(3);
  $("#remember-upper").html("Remember: " + currRemember);
  $("#remember-lower").removeClass("hidden");
  $("#remember-input").addClass("hidden");
  clearInterval(rememberTimeUpdater);
  $("#remember-time").html("5s");
  rememberTime = 5;
  rememberTimeUpdater = setInterval(function() {
    rememberTime -= 1;
    $("#remember-time").html(rememberTime + "s");
    if(rememberTime < 0) {
      rememberSecondPhase();
    }
  }, 1000);
}

var rememberSecondPhase = function() {
  rememberPhase = 2;
  $("#remember-upper").html("Type it in!");
  $("#remember-lower").addClass("hidden");
  $("#remember-input").removeClass("hidden");
  clearInterval(rememberTimeUpdater);
}

var submitRemember = function() {
  if(rememberPhase === 2) {
    userRemember = $("input[name='remember-input']").val();
    $("input[name='remember-input']").val("");
  }
  if(userRemember.toUpperCase() === currRemember) {
    resetTime(4);
    initRemember();
  }
  else {
    removeTime(4);
  }
}

var choose;
var screenValid = true;

var testScreen = function() {
  var height = window.innerHeight;
  var width = window.innerWidth;
  if(width <= height*1.33) {
    $("#warning").addClass("shown");
    screenValid = false;
  }
  else {
    $("#warning").removeClass("shown");
    screenValid = true;
  }
}


$(document).ready(function() {
  for(i = 0; i < 16; i++) {
    frames[i] = new Frame(i, "idk", Math.floor(Math.random()*20 + 10), false);
  }
  for(i = 0; i < 16; i++) {
    $("#frame" + i + " > .frame-inner").append("<div class='timer' id='timer" + i
                                            + "'><h1 class='timer-text'>30</h1>"
                                            + "</div>");
  }

  $("#replay").click(function() {
    start();
  });

  $(window).resize(function() {
    testScreen();
  });

  testScreen();

  $(document).keypress(function(e) {
    if(e.which == 13) {
      e.preventDefault();
      if($("input[name='typing-input']").is(":focus")) {
        submitWord();
      }
      else if($("input[name='add-input']").is(":focus")) {
        submitAddition();
      }
      else if($("input[name='mult-input']").is(":focus")) {
        submitMult();
      }
      else if($("input[name='remember-input']").is(":focus")) {
        submitRemember();
      }
    }
  });
});
