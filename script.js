var frameLocations = [[], [], [], []];
var frames = [];
var gameActive = false;
var timeInterval;
var score = 0;
var points = 0;
var totalTime = 0;
var currLevel = 0;
var tasksTillNext = 100;
var assistSelect = false;
var easyButtonDisabled = false;
var paused = false;
var easyButtonTimeout;
var difficulty = "medium";
var words;
var easyWords = ["ball", "bat", "bed", "book", "boy", "bun", "can", "cake", "cap", "car", "cat", "cow", "cub", "cup", "dad", "day", "dog", "doll", "dust", "fan", "feet", "girl", "gun", "hall", "hat", "hen", "jar", "kite", "man", "map", "men", "mom", "pan", "pet", "pie", "pig", "pot", "rat", "son", "sun", "toe", "tub", "van", "apple", "arm", "banana", "bike", "bird", "book", "chin", "clam", "class", "clover", "club", "corn", "crayon", "crow", "crown", "crowd", "crib", "desk", "dime", "dirt", "dress", "fang", "field", "flag", "flower", "fog", "game", "heat", "hill", "home", "horn", "hose", "joke", "juice", "kite", "lake", "maid", "mask", "mice", "milk", "mint", "meal", "meat", "moon", "mother", "morning", "name", "nest", "nose", "pear", "pen", "pencil", "plant", "rain", "river", "road", "rock", "room", "rose", "seed", "shape", "shoe", "shop", "show", "sink", "snail", "snake", "snow", "soda", "sofa", "star", "step", "stew", "stove", "straw", "string", "summer", "swing", "table", "tank", "team", "tent", "test", "toes", "tree", "vest", "water", "wing", "winter", "woman", "women"];
var mediumWords = ["alarm", "animal", "aunt", "bait", "balloon", "bath", "bead", "beam", "bean", "bedroom", "boot", "bread", "brick", "brother", "camp", "chicken", "children", "crook", "deer", "dock", "doctor", "downtown", "drum", "dust", "eye", "family", "father", "fight", "flesh", "food", "frog", "goose", "grade", "grandfather", "grandmother", "grape", "grass", "hook", "horse", "jail", "jam", "kiss", "kitten", "light", "loaf", "lock", "lunch", "lunchroom", "meal", "mother", "notebook", "owl", "pail", "parent", "park", "plot", "rabbit", "rake", "robin", "sack", "sail", "scale", "sea", "sister", "soap", "song", "spark", "space", "spoon", "spot", "spy", "summer", "tiger", "toad", "town", "trail", "tramp", "tray", "trick", "trip", "uncle", "vase", "winter", "water", "week", "wheel", "wish", "wool", "yard", "zebra", "actor", "airplane", "airport", "army", "baseball", "beef", "birthday", "boy", "brush", "bushes", "butter", "cast", "cave", "cent", "cherries", "cherry", "cobweb", "coil", "cracker", "dinner", "eggnog", "elbow", "face", "fireman", "flavor", "gate", "glove", "glue", "goldfish", "goose", "grain", "hair", "haircut", "hobbies", "holiday", "hot", "jellyfish", "ladybug", "mailbox", "number", "oatmeal", "pail", "pancake", "pear", "pest", "popcorn", "queen", "quicksand", "quiet", "quilt", "rainstorm", "scarecrow", "scarf", "stream", "street", "sugar", "throne", "toothpaste", "twig", "volleyball", "wood", "wrench"];
var hardWords = ["advice", "anger", "answer", "apple", "arithmetic", "badge", "basket", "basketball", "battle", "beast", "beetle", "beggar", "brain", "branch", "bubble", "bucket", "cactus", "cannon", "cattle", "celery", "cellar", "cloth", "coach", "coast", "crate", "cream", "daughter", "donkey", "drug", "earthquake", "feast", "fifth", "finger", "flock", "frame", "furniture", "geese", "ghost", "giraffe", "governor", "honey", "hope", "hydrant", "icicle", "income", "island", "jeans", "judge", "lace", "lamp", "lettuce", "marble", "month", "north", "ocean", "patch", "plane", "playground", "poison", "riddle", "rifle", "scale", "seashore", "sheet", "sidewalk", "skate", "slave", "sleet", "smoke", "stage", "station", "thrill", "throat", "throne", "title", "toothbrush", "turkey", "underwear", "vacation", "vegetable", "visitor", "voyage", "year", "able", "achieve", "acoustics", "action", "activity", "aftermath", "afternoon", "afterthought", "apparel", "appliance", "beginner", "believe", "bomb", "border", "boundary", "breakfast", "cabbage", "cable", "calculator", "calendar", "caption", "carpenter", "cemetery", "channel", "circle", "creator", "creature", "education", "faucet", "feather", "friction", "fruit", "fuel", "galley", "guide", "guitar", "health", "heart", "idea", "kitten", "laborer", "language", "lawyer", "linen", "locket", "lumber", "magic", "minister", "mitten", "money", "mountain", "music", "partner", "passenger", "pickle", "picture", "plantation", "plastic", "pleasure", "pocket", "police", "pollution", "railway", "recess", "reward", "route", "scene", "scent", "squirrel", "stranger", "suit", "sweater", "temper", "territory", "texture", "thread", "treatment", "veil", "vein", "volcano", "wealth", "weather", "wilderness", "wren", "wrist", "writer"];
var minimumEnabled = 14;
var highscore = 0;
var playedFrames = "1000000000000000";
var amtChecked = 16;
var difficultyMultiplier = 1;
var frameOrder = [];
var difficultyTimeMultiplier = 1;
var selectedFrame = 0;

levels = [];
var Level = function(num, enabled, rememberAmt, maxAdd, maxMult, repeatMax, repeatCharsMax, mashMax, tasksTillNextLvl, additionalTime) {
  this.num = num;
  this.enabled = enabled;
  this.rememberAmt = rememberAmt;
  this.maxMult = maxMult;
  this.maxAdd = maxAdd;
  this.repeatMax = repeatMax;
  this.repeatCharsMax = repeatCharsMax;
  this.tasksTillNext = tasksTillNextLvl;
  this.additionalTime = additionalTime;
  this.mashMax = mashMax;

  //enables all frames in enabled[] and adds time to each frame
  //also reset all timers
  this.activate = function() {
    for(var i = 0; i < enabled.length; i++) {
      enable(enabled[i]);
    }
    for(var i = 0; i < 16; i++) {
      frames[i].origTime += additionalTime*difficultyTimeMultiplier;
    }
    resetAll();
    currLevel = this.num;
    tasksTillNext = this.tasksTillNext;
    if(this.num === 0) {
      currLevel = 0;
      score = 0;
      totalTime = 0;
      level = 0;
    }
  }
}

//functions that start each frame
var frameInits = [
  function() {void(0)},
  function() {chooseWord()},
  function() {chooseAddition()},
  function() {chooseMult()},
  function() {initRemember()},
  function() {chooseBword()},
  function() {chooseColor()},
  function() {chooseButton()},
  function() {chooseRepeat()},
  function() {chooseMash()},
  function() {chooseCopy()},
  function() {chooseBool()},
  function() {chooseHold()},
  function() {chooseSquare()},
  function() {chooseLog()},
  function() {choosePlace()}
];

//frameOrder is the order that levels are to take place.
//randomized at the start of every game.
var createNewFrameOrder = function() {
  frameOrder = [];
  for(var i = 1; i < 16; i++) {
    frameOrder.push(i);
  }
  frameOrder = shuffleArray(frameOrder);
  //add easy button at the start.
  frameOrder.unshift(0);
}

var makeNewLevels = function() {
  levels = [];
  //order: Level(num, enabled, rememberAmt, maxAdd, maxMult, repeatMax,
  //repeatCharsMax, mashMax, tasksTillNextLvl, additionalTime)
  levels[0] = new Level(0, [frameOrder[0]],    3, 5, 10, 15, 1, 20, 1, 0);
  levels[1] = new Level(1, [frameOrder[1]],    3, 5, 10, 15, 1, 20, 10, 0);
  levels[2] = new Level(2, [frameOrder[2]],    3, 10, 5, 15, 1, 20, 10, 5);
  levels[3] = new Level(3, [frameOrder[3]],    3, 20, 5, 15, 1, 20, 15, 2.5);
  levels[4] = new Level(4, [frameOrder[4]],    3, 25, 10, 15, 1, 20, 15, 2.5);
  levels[5] = new Level(5, [frameOrder[5]],    3, 25, 10, 15, 1, 20, 15, 2);
  levels[6] = new Level(6, [frameOrder[6]],    3, 25, 10, 15, 1, 20, 15, 2);
  levels[7] = new Level(7, [frameOrder[7]],    3, 25, 11, 15, 1, 20, 15, 2);
  levels[8] = new Level(8, [frameOrder[8]],    3, 30, 11, 15, 1, 25, 15, 2);
  levels[9] = new Level(9, [frameOrder[9]],    3, 30, 12, 15, 1, 25, 15, 2);
  levels[10] = new Level(10, [frameOrder[10]], 3, 30, 12, 15, 1, 25, 15, 1);
  levels[11] = new Level(11, [frameOrder[11]], 3, 40, 13, 15, 1, 30, 20, 1);
  levels[12] = new Level(12, [frameOrder[12]], 3, 40, 13, 16, 1, 30, 15, 2);
  levels[13] = new Level(13, [frameOrder[13]], 3, 40, 13, 17, 1, 30, 20, 5);
  levels[14] = new Level(14, [frameOrder[14]], 3, 45, 14, 18, 1, 30, 20, 2.5);
  levels[15] = new Level(15, [frameOrder[15]], 3, 50, 15, 20, 1, 35, 30, 2);
  levels[16] = new Level(16, [],               4, 100, 20, 20, 2, 40, 30, 2);
  levels[17] = new Level(17, [],               4, 250, 20, 17, 3, 40, 30, 2);
}

//these names will be looped through when frames are being created
var names = ["easy", "typing", "add", "mult", "remember", "btyping", "color",
            "button", "repeat", "mash", "copy", "bool", "hold", "square", "log",
            "place"];
//these will be for the checkboxes in customization
var moreNames = ["easy button", "typing", "adding", "multiplying", "remembering",
                "typing backwards", "text color", "left/right button", "repeating a letter",
                "mash button", "copy and paste", "true/false statement",
                "holding button", "squaring", "logarithms", "letter position in word"];

//frame class. desc is basically the name since .name is already taken.
var Frame = function(num, desc, extendDesc, time, active) {
  this.num = num;
  this.desc = desc;
  this.extendDesc = extendDesc;
  this.time = time;
  this.origTime = time;
  this.active = active;
  this.select = false;
  this.played = false;
  this.position = [0, 0];
  if(this.active === false) {
    $("#frame" + this.num).addClass("disabled");
  }
  this.resetTime = function() {
    if(this.active) {
      var that = this;
      this.time = this.origTime;
      $("#frame" + this.num + " .frame-inner").addClass("success");
      setTimeout(function() {$("#frame" + that.num + " .frame-inner").removeClass("success");}, 100);
    }
  }
  //should run if the task is done wrong. will remove 5 seconds and make the frame red.
  this.failure = function() {
    var that = this;
    this.time -= 5;
    $("#frame" + this.num + " .frame-inner").addClass("failure");
    setTimeout(function() {$("#frame" + that.num + " .frame-inner").removeClass("failure");}, 100);
  }
  //occurs when the frame is the cause of the loss. animation takes 1s.
  this.epicFailure = function() {
    var that = this;
    $('input').each(function(){
      $(this).trigger('blur');
    });
    $("#frame" + this.num + " .frame-inner").addClass("mainLoss");
    setTimeout(function() {$("#frame" + that.num + " .frame-inner").removeClass("mainLoss");}, 1000);
    $(".frame-inner:not(#frame" + this.num + " .frame-inner)").addClass("loss");
    for(var i = 0; i < 16; i++) {
      if(i != this.num) {
        var randomRotation = Math.floor(Math.random()*720 - 360);
        $("#frame" + i + " .frame-inner").attr("style",
            "transform: transform: scale(1.1) rotate("+randomRotation+"deg);" +
            "-webkit-transform: scale(1.1) rotate("+randomRotation+"deg)");
      }
    }
    setTimeout(function() {
      $(".frame-inner").attr("style", "")
      $(".frame-inner").removeClass("loss");
    }, 2000)
  }
  this.enableCheckbox = function() {
    if(this.num != 0) {
      this.played = true;
      playedFrames = playedFrames.replaceAt(this.num, "1");
      if(this.played) {
        $("label[for='"+this.desc+"-c']").html("<span></span>"+this.extendDesc);
        $("input[name='"+this.desc+"-c']").removeAttr("disabled");
        $("input[name='"+this.desc+"-c']").removeClass("unplayed");
      }
    }
  }
}

//triggers the pause menu.
//if restartConfirm is true, then the pause menu will show an option to restart or cancel.
//if it's false, then the pause menu will just have the button "play"
var pause = function(restartConfirm) {
  paused = true;
  $("#paused-menu").addClass("shown");
  if(!restartConfirm) {
    $("#message").html("paused");
    $(".paused").css("display", "block");
    $(".restart").css("display", "none");
  } else {
    $("#message").html("restart?");
    $(".paused").css("display", "none");
    $(".restart").css("display", "block");
  }
}

//hides the paused menu
var unpause = function() {
  paused = false;
  $("#paused-menu").removeClass("shown");
}

var restartConfirm = function() {
  pause(true);
}

//resets the game
//timeTillMenu is the amount of time the user can see the board before the main
//menu shows up.
var lose = function(timeTillMenu) {
  unpause();
  gameActive = false;
  $("#replay").html("replay");
  setTimeout(function() {
    $("#menu").addClass("shown");
    for(var i = 0; i < 16; i++) {
      disable(i);
    }
  }, timeTillMenu);
  points = (score*(amtChecked/16)*difficultyMultiplier).toFixed(0);
  $("#menu").animate({
    scrollTop: 0
  }, 1);
  if(points === "1") {
    $("#points").html(points + " point");
  }
  else {
    $("#points").html(points + " points");
  }
  if(score === 1) {
    $("#score").html("you accomplished 1 task in " + parseInt(totalTime) + "s");
  } else {
    $("#score").html("you accomplished " + score + " tasks in " + parseInt(totalTime) + "s");
  }
  if(parseInt(points) > parseInt(highscore)) {
    highscore = points;
    setCookie("highscore", highscore, 99999);
  }

  setCookie("played", playedFrames, 99999);
  enableCheckboxesFromPF();
  $("#highscore").html("highscore: " + highscore);
  level = 0;
  clearInterval(timeInterval);
  $("input[name='easy-c']").attr("disabled", "disabled");
  $("input[name='easy-c']").prop("checked", "checked");
}

//cookies yum
var setCookie = function(name, val, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = "" + name + "=" + val + "; " + expires;
}

var getCookie = function(name) {
  var findString = name + "=";
  var cookieArray = document.cookie.split(';');
  for(var i = 0; i < cookieArray.length; i++) {
    if(cookieArray[i].search(findString) != -1) {
      return (cookieArray[i].substr(findString.length,
                                  cookieArray[i].length - findString.length)
                                  .replace(/=/g, ""));
    }
  }
  return "";
}

//sets the difficulty based on the value of #difficulty option:selected.
//also checks all tasks being enabled and redisables the easy button task
//reset checkBoxes = true checks all checkboxes
var setDifficulty = function(resetCheckboxes) {
  if(resetCheckboxes) {
    $("#customize-menu").find("input").prop("checked", "checked");
    $("#customize-menu").find("input:not(.unplayed)").removeAttr("disabled");
    $("input[name='easy-c']").attr("disabled", "disabled");
  }
  difficulty = $('#difficulty option:selected').text();
  switch(difficulty) {
    case "easy":
      words = easyWords;
      minimumEnabled = 12;
      difficultyMultiplier = 0.8;
      difficultyTimeMultiplier = 1.2;
      break;
    case "medium":
      words = mediumWords;
      minimumEnabled = 14;
      difficultyMultiplier = 1;
      difficultyTimeMultiplier = 1;
      break;
    //hard will disable all checkboxes
    case "hard":
      $("#customize-menu").find("input").attr("disabled", "disabled");
      minimumEnabled = 16;
      words = hardWords;
      difficultyMultiplier = 1.2;
      difficultyTimeMultiplier = 0.8;
      break;
  }
  $("#min-checkboxes").html(minimumEnabled)
}

//initiates a new game
var start = function() {
  createNewFrameOrder();
  makeNewLevels();
  gameActive = true;
  if($("input[name='assist-s']").is(":checked")) {
    assistSelect = true;
    createTip(5000, 0);
  } else {
    assistSelect = false;
  }
  $("#menu").removeClass("shown");
  setDifficulty(false);
  clearTimeout(easyButtonTimeout);
  easyButtonDisabled = false;
  $(".easy-reset-button").removeClass("disabled");
  timeInterval = setInterval(function() {updateTimes()}, 10);
  shuffle();
  tasksTillNext = 100;
  for(var i = 0; i < 16; i++) {
    //frame times are reset
    frames[i].origTime = Math.floor(Math.random()*20 + 10);
    frames[i].time = frames[i].origTime;
    resetTime(i);
  }
  currLevel = 0;
  score = 0;
  points = 0;
  totalTime = 0;
  level = 0;
  selectedFrame = 0;
  levels[0].activate();
  activeLocations = [[0, 0, 0, 0],
                     [0, 0, 0, 0],
                     [0, 0, 0, 0],
                     [0, 0, 0, 0]];
  selectedLocation = frames[0].position;
  $("#select-shower").css("top", (selectedLocation[0]*25) + "%");
  $("#select-shower").css("left", (selectedLocation[1]*25) + "%");
  stickSelected = false;
  $("#current-score").html("0 tasks");
  $("#current-points").html("0 points")
  $("#current-time").html("0 seconds");
}

//sees how many checkboxes are unchecked.
//if it's less than minimumEnabled (12 easy, 14 medium, 16 hard),
//then disable all checked checkboxes.
//otherwise enable all checkboxes other than the easy button one
var checkEnabledBoxes = function() {
  var enabled = $("#customize-menu > div").find("input:checked").length;
  amtChecked = enabled;
  if(enabled === minimumEnabled) {
    $("#customize-menu > div").find("input:checked").attr("disabled", "disabled");
    $("#min-checkboxes").addClass("maxed-out");
  } else if (minimumEnabled === 16) {
    $("#customize-menu").find("input").prop("checked", "checked");
    $("#customize-menu").find("input").attr("disabled", "disabled");
  } else {
    $("#customize-menu > div").find("input:not(.unplayed)").removeAttr("disabled");
    $("#customize-menu > div").find("input[name='easy-c']").attr("disabled", "disabled");
    $("#min-checkboxes").removeClass("maxed-out");
  }
  $("input[name='easy-c']").attr("disabled", "disabled");
  $("input[name='easy-c']").prop("checked", "checked");
}

//resets the time of a frame, increases the score by 1, decreases tasksTillNext by 1.
var resetTime = function(whichFrame) {
  frames[whichFrame].resetTime();
  score += 1;
  points = (score*(amtChecked/16)*difficultyMultiplier).toFixed(0);
  if(points != 1) {
    $("#current-points").html(points + " points");
  }
  else {
    $("#current-points").html("1 point");
  }
  if(score != 1) {
    $("#current-score").html(score + " tasks");
  } else {
    $("#current-score").html("1 task");
  }
  tasksTillNext -= 1;
  if(tasksTillNext === 0) {
    if(typeof levels[currLevel + 1] != "undefined") {
      levels[currLevel + 1].activate();
    } else {
      tasksTillNext = 999;
    }
  }
}

//resets every frame's time
var resetAll = function() {
  for(var i = 0; i < 16; i++) {
    frames[i].resetTime();
  }
}

//calls the specified frame's failure method, removes 5 seconds
var removeTime = function(whichFrame) {
  frames[whichFrame].failure();
}

//enables a frame if its checkbox is checked
var enable = function(whichFrame) {
  activeLocations[frames[whichFrame].position[0],
                  frames[whichFrame].position[1]] = 1;
  var currName = frames[whichFrame].desc;
  if($("input[name='" + currName + "-c']").is(":checked")) {
    frames[whichFrame].active = true;
    if(!frames[whichFrame].played) {
      frames[whichFrame].played = true;
      frames[whichFrame].enableCheckbox();
    }
    frameInits[whichFrame]();
    $("#frame" + whichFrame).removeClass("disabled");
    $("#frame" + whichFrame).find("input").prop("disable", false);
  }
  else {
    setTimeout(function() {tasksTillNext = 1;}, 100);
  }
}

//disables a frame
var disable = function(whichFrame) {
  frames[whichFrame].active = false;
  $("#frame" + whichFrame).addClass("disabled");
  $("#frame" + whichFrame).find("input").prop("disable", true);
  $("#frame" + whichFrame).find("input").attr("val", "");
}

//updates all times. is called every 10ms by timeInterval
//only functions if paused is false
//if a time is 0, then the game is lost
//also adds classes to frames based on their times
var updateTimes = function() {
  if(!paused) {
    for(var i = 0; i < 16; i++) {
      if(frames[i].active) {
        $("#frame" + i + " .timer-text").html(frames[i].time.toFixed(2))
        frames[i].time -= 0.01;
        if(frames[i].time < 0) {
          frames[i].epicFailure();
          lose(2000);
        } else if(frames[i].time < 5) {
          $("#frame" + i).addClass("urgent2");
        } else if(frames[i].time < 10) {
          $("#frame" + i).removeClass("urgent2");
          $("#frame" + i).addClass("urgent1");
        } else {
          $("#frame" + i).removeClass("urgent1 urgent2");
        }
      }
    }
    totalTime += 0.01;
    $("#current-time").html(totalTime.toFixed(2) + " seconds");
  }
}

//tests if the screen width to height ratio allows for the entire board to be
//in view.
//if it's not, then you can't play the game. scrolling takes too much time
//could be changed in the future
var choose;
var screenValid = true;
var testScreen = function() {
  var height = window.innerHeight;
  var width = window.innerWidth;
  if(width <= height*1.42) {
    if(!gameActive) {
      //i was lazy so i plopped .warning into the loading screen
      $(".warning, #loading").addClass("shown");
      $("#replay").addClass("hidden");
      screenValid = false;
    }
  } else {
    //if h/w ratio is greater than 0.6, then there is room for the restart,
    //score, and time elements on the bottom left.
    if(height/width >= 0.6) {
      $("#current-score, #current-time,"
      + "#restart-button, #current-points").css("display", "none");
    } else {
      $("#current-score, #current-time,"
      + "#restart-button, #current-points").css("display", "block");
    }
    $(".warning, #loading").removeClass("shown");
    $("#replay").removeClass("hidden");
    screenValid = true;
  }
}

//replaces character in string at an index
//used for tips
String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

//finds the amount of times a value occurs in an array.
//used for one of the tasks
function findOccurrences(arr, val) {
  var e, j, count = 0;
  for (e = 0, j = arr.length; e < j; e++) {
    (arr[e] === val) && count++;
  }
  return count;
}

//searches for a value in a multidimensional array.
//returns [index1, index2] of the first occurrance
//will be [y, x]!!!!
//[-1, -1] is a failure
function searchMultiArray(arr, val) {
  var result = [-1, -1];
  for(var i = 0; i < arr.length; i++) {
    for(var j = 0; j < arr[i].length; j++) {
      if(arr[i][j] === val) {
        result = [i, j];
        return result
      }
    }
  }
  return result;
}

//shuffles an array
//used for level randomization
function shuffleArray(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

//replaces a certain character in a string at an index.
//used for determining which checkboxes are active in customization
String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

//generates a random string based on characters in an array of a specified len
//used for copy and paste, character finding, and remembering tasks
var generateRandomString = function(len, array) {
  var finalString = "";
  for(var i = 0; i < len; i++) {
    finalString += array[Math.floor(Math.random()*array.length)];
  }
  return finalString;
}

//shuffles all frames in frameLocations[] and on #game-outer
var shuffle = function() {
  frameLocations = [[20, 20, 20, 20],
                    [20, 20, 20, 20],
                    [20, 20, 20, 20],
                    [20, 20, 20, 20]];
  for(var i = 0; i < 16; i++) {
    var row = Math.floor(Math.random()*4);
    while(findOccurrences(frameLocations[row], 20) === 0) {
      row = Math.floor(Math.random()*4);
    }
    var column = Math.floor(Math.random()*4);
    while(frameLocations[row][column] != 20) {
      column = Math.floor(Math.random()*4);
    }
    frameLocations[row][column] = i;
    frames[i].position = [row, column];
    $("#frame" + i).css("top", (row*25) + "%");
    $("#frame" + i).css("left", (column*25) + "%");
  }
}

//copy and paste game
var copyChars = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ1234567890-=!@#$%^&*()/?;|{}";
var currCopy;
var chooseCopy = function() {
  currCopy = generateRandomString(10, copyChars);
  $("#copy-word").html(currCopy);
}
var submitCopy = function() {
  var userCopy = $("input[name='copy-input']").val();
  $("input[name='copy-input']").val("");
  if(userCopy === currCopy) {
    resetTime(10);
    chooseCopy();
  } else {
    removeTime(10);
  }
}

//type _ character game
var places = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh",
              "eighth", "ninth", "tenth", "eleventh", "twelveth", "thirteenth"];
var currPlace;
var choosePlace = function() {
  var currPlaceString = generateRandomString(10, copyChars);
  $("#place-word").html(currPlaceString);
  var currPlacePosition = Math.floor(Math.random()*10);
  currPlace = currPlaceString[currPlacePosition];
  $("#place-place").html(places[currPlacePosition]);
}
var submitPlace = function() {
  var userPlace = $("input[name='place-input']").val();
  $("input[name='place-input']").val("");
  if(userPlace === currPlace) {
    resetTime(15);
    choosePlace();
  } else {
    removeTime(15);
  }
}


//word game
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
  } else {
    removeTime(1);
  }
}

//backwards word game
var currBword;
function reverse(s) {
    return s.split("").reverse().join("");
}

var chooseBword = function() {
  currBword = words[Math.floor(Math.random()*words.length)];
  $("#btype-word").html(currBword);
}
var submitBword = function() {
  var userBword = $("input[name='btyping-input']").val();
  $("input[name='btyping-input']").val("");
  if(reverse(userBword) === currBword) {
    resetTime(5);
    chooseBword();
  } else {
    removeTime(5);
  }
}

//repeat game
var currRepeat;
var chooseRepeat = function() {
  var repeatBase = "";
  for(i = 0; i < levels[currLevel].repeatCharsMax; i++) {
    repeatBase += chars[Math.floor(Math.random()*chars.length)];
  }
  var repeatAmt = Math.floor(Math.random()*(levels[currLevel].repeatMax - 5) + 5);
  currRepeat = Array(repeatAmt + 1).join(repeatBase);
  $("#repeat-word").html(repeatBase);
  $("#repeat-times").html(repeatAmt);
}
var submitRepeat = function() {
  var userRepeat = $("input[name='repeat-input']").val();
  $("input[name='repeat-input']").val("");
  if(userRepeat.toLowerCase() === currRepeat.toLowerCase()) {
    resetTime(8);
    chooseRepeat();
  } else {
    removeTime(8);
  }
}

//color game
var currColor;
var colors = ["red", "green", "blue", "purple", "pink", "yellow", "black", "orange"];
var chooseColor = function() {
  currColor = colors[Math.floor(Math.random()*colors.length)];
  randColor = colors[Math.floor(Math.random()*colors.length)];
  while(currColor === randColor) {
    randColor = colors[Math.floor(Math.random()*colors.length)];
  }
  $("#color-lower").html(randColor);
  $("#color-lower").css("color", currColor);
  if(currColor === "black") {
    $("#color-lower").addClass("no-outline");
  } else {
    $("#color-lower").removeClass("no-outline");
  }
}
var submitColor = function() {
  var userColor = $("input[name='color-input']").val();
  $("input[name='color-input']").val("");
  if(currColor === userColor) {
    resetTime(6);
    chooseColor();
  } else {
    removeTime(6);
  }
}

//math
var currAdd
var chooseAddition = function() {
  var num1 = Math.floor(Math.random()*levels[currLevel].maxAdd*difficultyMultiplier);
  var num2 = Math.floor(Math.random()*levels[currLevel].maxAdd*difficultyMultiplier);
  currAdd = num1 + num2;
  $("#add-upper").html(num1 + " + " + num2);
}
var submitAddition = function() {
  var userAdd = $("input[name='add-input']").val();
  $("input[name='add-input']").val("");
  if(parseInt(userAdd) === currAdd) {
    resetTime(2);
    chooseAddition();
  } else {
    removeTime(2);
  }
}

//multitplacation game
var currMult
var chooseMult = function() {
  var num1 = Math.floor(Math.random()*levels[currLevel].maxMult*difficultyMultiplier);
  var num2 = Math.floor(Math.random()*levels[currLevel].maxMult*difficultyMultiplier);
  currMult = num1 * num2;
  $("#mult-upper").html(num1 + " * " + num2);
}
var submitMult = function() {
  var userMult = $("input[name='mult-input']").val();
  $("input[name='mult-input']").val("");
  if(parseInt(userMult) === currMult) {
    resetTime(3);
    chooseMult();
  } else {
    removeTime(3);
  }
}

//n^2 game
var currSqaure
var chooseSquare = function() {
  var num1 = Math.floor(Math.random()*levels[currLevel].maxMult*difficultyMultiplier);
  currSquare = num1 * num1;
  $("#square-upper").html(num1 + "<sup>2</sup>");
}
var submitSquare = function() {
  var userSquare = $("input[name='square-input']").val();
  $("input[name='square-input']").val("");
  if(parseInt(userSquare) === currSquare) {
    resetTime(13);
    chooseSquare();
  } else {
    removeTime(13);
  }
}

//logarithm game
var currLog
var chooseLog = function() {
  var base = Math.floor(Math.random()*4 + 2);
  currLog = Math.floor(Math.random()*4 + 1);
  var ans = Math.pow(base, currLog);
  $("#log-upper").html("log<sub>" + base + "</sub>" + ans);
}
var submitLog = function() {
  var userLog = $("input[name='log-input']").val();
  $("input[name='log-input']").val("");
  if(parseInt(userLog) === currLog) {
    resetTime(14);
    chooseLog();
  } else {
    removeTime(14);
  }
}

//button game
//currButton: "left" = left or buttonStates[0],
//"right" = right or buttonStates[1]
var randBoolean = function() {
  return (Math.random() < 0.5);
}
var currButton
var buttonStates = ["left", "right"];
var chooseButton = function() {
  currButton = buttonStates[Math.floor(Math.random()*2)];
  var wrongButton;
  if(currButton === "left") {
    wrongButton = "right";
  } else {
    wrongButton = "left";
  }
  var inverted = randBoolean();
  if(inverted) {
    $("#button-t").html("Don't press the " + wrongButton + " button.");
  } else {
    $("#button-t").html("Press the " + currButton + " button");
  }
}
var submitButton = function(id) {
  userButton = id.substr(7, id.length - 6);
  if(userButton === currButton) {
    resetTime(7);
    chooseButton();
  } else {
    removeTime(7);
  }
}

//boolean game
var currBool
var operations = ["<", ">"];
var chooseBool = function() {
  var fracNum1 = randBoolean();
  var fracNum2 = randBoolean();
  var operation = operations[Math.floor(Math.random()*2)];
  var num1, num2;
  var boolNums = [[Math.floor(Math.random()*19 + 1), Math.floor(Math.random()*19 + 1)],
                  [Math.floor(Math.random()*19 + 1), Math.floor(Math.random()*19 + 1)]];
  while(boolNums[0][0]/boolNums[0][1] === boolNums[1][0]/boolNums[1][1]) {
    boolNums = [[Math.floor(Math.random()*19 + 1), Math.floor(Math.random()*19 + 1)],
                    [Math.floor(Math.random()*19 + 1), Math.floor(Math.random()*19 + 1)]];
  }
  if(!fracNum1) {
    num1 = (boolNums[0][0]/boolNums[0][1]).toFixed(2);
  } else if(fracNum1) {
    num1 = boolNums[0][0] + "/" + boolNums[0][1];
  }
  if(!fracNum2) {
    num2 = (boolNums[1][0]/boolNums[1][1]).toFixed(2);
  } else if(fracNum2) {
    num2 = boolNums[1][0] + "/" + boolNums[1][1];
  }
  $("#bool-title").html(num1 + " " + operation + " " + num2);
  if(boolNums[0][0]/boolNums[0][1] > boolNums[1][0]/boolNums[1][1]) {
    if(operation === ">") {
      currBool = true;
    } else {
      currBool = false;
    }
  } else {
    if(operation === "<") {
      currBool = true;
    } else {
      currBool = false;
    }
  }
}
var submitBool = function(id) {
  userBool = id.substr(5, id.length - 3);
  if(userBool === currBool.toString()) {
    resetTime(11);
    chooseBool();
  } else {
    removeTime(11);
  }
}

//holding button game
var holdTime = 5;
var origHoldTime = 5;
var holdSuccess = false;
var holdInterval;
var chooseHold = function() {
  holdSuccess = false;
  origHoldTime = (Math.random()*5 + 2.5).toFixed(2);
  holdTime = origHoldTime;
  $("#hold-amt").html(holdTime);
}
var pressHold = function() {
  $(".hold-button").animate({
    backgroundColor: "#55dd55 !important"
  }, (origHoldTime*1000), "linear");
  holdInterval = setInterval(function() {
    holdTime -= 0.01;
    holdTime = holdTime.toFixed(2);
    $("#hold-amt").html(holdTime);
    if(holdTime <= 0) {
      holdSuccess = true;
      resetTime(12);
      clearInterval(holdInterval)
      $("#hold-amt").html("0");
    }
  }, 10);
}
var releaseHold = function() {
  $(".hold-button").stop();
  $(".hold-button").css("background-color", "#3333ff");
  if(holdSuccess) {
    chooseHold();
  } else {
    holdSuccess = false;
    removeTime(12);
    holdTime = origHoldTime;
    $("#hold-amt").html(origHoldTime);
    clearInterval(holdInterval);
  }
}

//mashing button game
var mashAmt = 20;
var mashSelectedTimeout;
var chooseMash = function() {
  mashAmt = Math.floor(Math.random()*(levels[currLevel].mashMax - 10)*difficultyMultiplier) + 10;
  $("#mash-amt").html(mashAmt);
  $("#mash-times").html("times!");
}
var pressMash = function() {
  mashAmt -= 1;
  if(mashAmt === 0) {
    resetTime(9);
    chooseMash();
  } else if(mashAmt === 1) {
    $("#mash-times").html("time!");
  } else {
    $("#mash-times").html("times!");
  }
  $("#mash-amt").html(mashAmt);
}

//remember game
var currRemember, userRemember, rememberTime, rememberTimeUpdater;
var chars = "ABCDEFG";
var rememberPhase = 0;
//first phase displays the the text to be remembered. no input
//lasts for five seconds
var initRemember = function() {
  rememberPhase = 1;
  currRemember = generateRandomString(levels[currLevel].rememberAmt, chars);
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
//shows the input but hides the text to be remembered
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
  } else {
    removeTime(4);
  }
}

//easy button
var easySelectedTimeout;
var clickEasyButton = function() {
  if(!easyButtonDisabled) {
    resetTime(0);
    easyButtonDisabled = true;
    $(".easy-reset-button:not(.mash-button, .hold-button)").addClass("disabled");
    easyButtonTimeout = setTimeout(function() {
      easyButtonDisabled = false;
      $(".easy-reset-button:not(.mash-button, .hold-button)").removeClass("disabled");
    }, 5000);
  }
}

//played cookie setting
if(getCookie("played") === "") {
  setCookie("played", "0000000000000000", 99999);
} else {
  playedFrames = getCookie("played");
}

var enableCheckboxesFromPF = function() {
  playedFrames = playedFrames.replace(/=/g, "")
  for(var i = 0; i < 16; i++) {
    var framePlayed = playedFrames[i];
    if(framePlayed === "1") {
      frames[i].enableCheckbox();
    }
  }
}


//tips
var tipMessages = ["assisted selecting allows you to select inputs without clicking, but just hovering",
                  "try using the arrow keys to select boxes",
                  "press enter to press a single button",
                  "use 1 and 2 to select left/right buttons in a frame"];

var tipActive = false;
var tipFadeTimeout;
var seenTips = "0000";

//duration should be in ms
//tipNum should be location in tipMessages (0-3)
var createTip = function(duration, tipNum) {
  if(!tipActive && seenTips.charAt(tipNum) === '0') {
    tipActive = true;
    seenTips = seenTips.replaceAt(tipNum, '1');
    setCookie("tips", seenTips, 99999);
    $("#tip-outer").addClass("shown");
    $("#tip").html(tipMessages[tipNum]);
    tipFadeTimeout = setTimeout(function() {
      destroyTip();
    }, duration);
  }
}

var destroyTip = function() {
  clearTimeout(tipFadeTimeout);
  $("#tip-outer").removeClass("shown");
  tipActive = false;
}

//arrow key assisted selecting stuff

var activeLocations = [[0, 0, 0, 0],
                      [0, 0, 0, 0],
                      [0, 0, 0, 0],
                      [0, 0, 0, 0]];
var selectedLocation;
var stickSelected = false;

//should do [-1, 0]
var selectUp = function() {
  if(selectedLocation[0] > 0) {
    for(i = 0; i < 16; i++) {
      unselectFrame(i);
      $("input").blur();
    }
    selectedLocation[0]--;
  }
  selectFrame(frameLocations[selectedLocation[0]][selectedLocation[1]],
              "keyboard");
}

//should do [+1, 0]
var selectDown = function() {
  if(selectedLocation[0] < 3) {
    for(i = 0; i < 16; i++) {
      unselectFrame(i);
      $("input").blur();
    }
    selectedLocation[0]++;
  }
  selectFrame(frameLocations[selectedLocation[0]][selectedLocation[1]],
              "keyboard");
}

//should do [0, -1]
var selectLeft = function() {
  if(selectedLocation[1] > 0) {
    for(i = 0; i < 16; i++) {
      unselectFrame(i);
      $("input").blur();
    }
    selectedLocation[1]--;
  }
  selectFrame(frameLocations[selectedLocation[0]][selectedLocation[1]],
              "keyboard");
}

//should do [0, +1]
var selectRight = function() {
  if(selectedLocation[1] < 3) {
    for(i = 0; i < 16; i++) {
      unselectFrame(i);
      $("input").blur();
    }
    selectedLocation[1]++;
  }
  selectFrame(frameLocations[selectedLocation[0]][selectedLocation[1]],
              "keyboard");
}

var selectShowerFadeTimeout;
var selectDirection = function(keycode) {
  switch(keycode) {
    case 38:
      selectUp();
      break;
    case 40:
      selectDown();
      break;
    case 37:
      selectLeft();
      break;
    case 39:
      selectRight();
      break;
  }
  $("#select-shower").stop();
  $("#select-shower").css("opacity", "1");
  clearTimeout(selectShowerFadeTimeout);
  selectShowerFadeTimeout = setTimeout(function() {
    $("#select-shower").animate({
      opacity: 0
    }, 1000, "linear");
  }, 1000);
  $("#select-shower").css("top", (selectedLocation[0]*25) + "%");
  $("#select-shower").css("left", (selectedLocation[1]*25) + "%");
}

//way should be "mouse" or "keyboard"
var selectFrame = function(num, way) {
  if(assistSelect && frames[num].active === true) {
    for(i = 0; i < 16; i++) {
      unselectFrame(i);
    }
    $("input").blur();
    if($("#frame" + num).find("input").length > 0) {
      $("#frame" + num).find("input").focus();
      $("#frame" + num).find("input").select();
    }
    $("#frame" + num).addClass("selected");
    frames[num].select = true;
  }
  if(way === "keyboard" && frames[num].active === true) {
    if(num === 11 || num === 7) {
      createTip(5000, 3);
    }
    if(num === 0 || num === 9 || num === 12) {
      createTip(5000, 2);
    }
  }
}

var unselectFrame = function(num) {
  if(assistSelect) {
    createTip(5000, 1);
    $(".frame").removeClass("selected");
    $("#frame" + num).children("input").blur();
  }
  for(i = 0; i < 16; i++) {
    frames[i].select = false;
  }
}

var clickButtonAnimation = function(selector) {
  if(!($(selector).hasClass("disabled"))) {
    $(selector).addClass("active");
    setTimeout(function() {
      $(selector).removeClass("active");
    }, 100);
  }
}


//keydown variable
var allowed = true;
var upAllowed = false;

window.onload = function() {
  $("#loading").removeClass("shown");
  //make sure the screen size works
  testScreen();
}

var doubleButtonAllowed = true;

$(document).ready(function() {
  //sets the difficulty in case the browser saves the difficulty to something
  //also checks all checkboxes
  setDifficulty(true);

  //highscore cookie setting
  if(getCookie("highscore") === "") {
    setCookie("highscore", "0", 99999);
  } else {
    highscore = getCookie("highscore");
  }

  $("#highscore").html("highscore: " + highscore);

  //tip cookie setting
  if(getCookie("tips") === "") {
    setCookie("tips", "0000", 99999);
  } else {
    seenTips = getCookie("tips");
  }

  //creates all the frames with random times
  for(var i = 0; i < 16; i++) {
    frames[i] = new Frame(i, names[i], moreNames[i],
          (Math.floor(Math.random()*20 + 10)*difficultyTimeMultiplier), false);
  }
  //gives each frame a timer
  for(var i = 0; i < 16; i++) {
    $("#frame" + i + " > .frame-inner").append("<div class='timer' id='timer" + i
                                            + "'><h1 class='timer-text'>30</h1>"
                                            + "</div>");
  }

  //replay is the play button at first
  $("#replay").click(function() {
    if(screenValid) {
      start();
    }
  });

  //test the screen size whenever the window is resized
  $(window).resize(function() {
    testScreen();
  });

  //.button-game is the left/right button. submitButton handles everything with
  //their ids passed
  $(".button-game").click(function() {
    submitButton($(this).attr("id").toString());
  });

  //true/false buttons for that boolean game.
  //submitBool handles everything, since their ids have true/false in them
  $(".bool-button").click(function() {
    submitBool($(this).attr("id").toString());
  });

  $(".mash-button").click(function() {
    pressMash();
  })

  $(".hold-button").mousedown(function() {
    pressHold();
  });

  $(".hold-button").mouseup(function() {
    releaseHold();
  });

  //ok, this is a bit of me being lazy
  //i tried to keep the styling of the easy button for the mash and hold button
  //so i made a class. but the easy reset button needs resetting and i forgot to
  //give it an id, so oh well
  //don't kill me please
  $(".easy-reset-button:not(.mash-button, .hold-button)").click(function() {
    clickEasyButton();
  });

  //assisting selecting gets all those inputs selected
  //when you hover over a frame
  $(".frame-inner").mouseenter(function() {
    var hoveredNum = $(this).parent().attr("id").charAt(5);
    if($(this).parent().attr("id").length === 7) {
      hoveredNum = parseInt($(this).parent().attr("id").charAt(5))*10
                    + parseInt($(this).parent().attr("id").charAt(6));
    }
    selectFrame(hoveredNum, "hover");
  });

  $(".frame-inner").mouseleave(function() {
    var hoveredNum = $(this).parent().attr("id").charAt(5);
    if($(this).parent().attr("id").length === 7) {
      hoveredNum = parseInt($(this).parent().attr("id").charAt(5))*10
                    + parseInt($(this).parent().attr("id").charAt(6));
    }
    unselectFrame(hoveredNum);
  });

  $(".input").focus(function() {
    $(this).select();
  });

  $("#difficulty").change(function() {
    setDifficulty(true);
  });

  enableCheckboxesFromPF();

  //this is a little confusing, sorry
  //basically, the customize menu consists of two divs: customize-menu and a
  //child with no id or class that takes up the right 60vh (might be 70vh idk)
  //if you click on customize-menu, then it'll hide the menu
  //if you click on the child, the menu won't be hidden
  $("#customize-menu").bind("click", function(event) {
    if(event.target.id === "customize-menu") {
      $(this).removeClass("shown");
    }
  });

  //every time a checkbox changes, make sure that the user can still click more.
  $("#customize-menu > div > input").click(function() {
    checkEnabledBoxes();
  });

  $("#tip-close").click(function() {
    destroyTip();
  })

  //sorry about this mess
  //whenever the user clicks enter, prevent the default action of page reloading
  //and depending on what input's in focus, submit that task
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
      else if($("input[name='btyping-input']").is(":focus")) {
        submitBword();
      }
      else if($("input[name='color-input']").is(":focus")) {
        submitColor();
      }
      else if($("input[name='repeat-input']").is(":focus")) {
        submitRepeat();
      }
      else if($("input[name='copy-input']").is(":focus")) {
        submitCopy();
      }
      else if($("input[name='square-input']").is(":focus")) {
        submitSquare();
      }
      else if($("input[name='log-input']").is(":focus")) {
        submitLog();
      }
      else if($("input[name='place-input']").is(":focus")) {
        submitPlace();
      }
      else if($("#frame9").hasClass("selected")) {
        pressMash();
        clickButtonAnimation(".mash-button");
      }
      else if($("#frame0").hasClass("selected")) {
        clickEasyButton();
        clickButtonAnimation(".easy-button");
      }
    }
    //'1' key, should press left button
    if(doubleButtonAllowed) {
      if(e.which == 49) {
        if($("#frame11").hasClass("selected")) {
          doubleButtonAllowed = false;
          setTimeout(function() {
            doubleButtonAllowed = true;
            $("#frame11, #frame7").removeClass("nopress");
          }, 1000);
          $("#frame11, #frame7").addClass("nopress");
          submitBool("bool-true");
          clickButtonAnimation("#bool-true");
        }
        else if($("#frame7").hasClass("selected")) {
          doubleButtonAllowed = false;
          setTimeout(function() {
            doubleButtonAllowed = true;
            $("#frame11, #frame7").removeClass("nopress");
          }, 1000);
          $("#frame11, #frame7").addClass("nopress");
          submitButton("button-left");
          clickButtonAnimation("#button-left");
        }
      }
      //'2' key, shoud press right button
      if(e.which == 50) {
        if($("#frame11").hasClass("selected")) {
          doubleButtonAllowed = false;
          setTimeout(function() {
            doubleButtonAllowed = true;
            $("#frame11, #frame7").removeClass("nopress");
          }, 1000);
          $("#frame11, #frame7").addClass("nopress");
          submitBool("bool-false");
          clickButtonAnimation("#bool-false");
        }
        else if($("#frame7").hasClass("selected")) {
          doubleButtonAllowed = false;
          setTimeout(function() {
            doubleButtonAllowed = true;
            $("#frame11, #frame7").removeClass("nopress");
          }, 1000);
          $("#frame11, #frame7").addClass("nopress");
          submitButton("button-right");
          clickButtonAnimation("#button-right");
        }
      }
    }
  });
  //.keypress ignores arrow keys :(
  $(document).keydown(function(e) {
    if(e.which == 37 || e.which == 38 || e.which == 39 || e.which == 40) {
      selectDirection(e.which);
    }
    if(e.which == 13) {
      upAllowed = true;
      if (e.repeat != undefined) {
        allowed = !e.repeat;
      }
      if (!allowed) return;
      allowed = false;
      if($("#frame12").hasClass("selected")) {
        $(".hold-button").addClass("active");
        pressHold();
      }
    }
    $(document).keyup(function(e) {
      allowed = true;
      if (e.repeat != undefined) {
        upAllowed = !e.repeat;
      }
      if (!upAllowed) return;
      upAllowed = false;
      if(e.which == 13) {
        if($(".hold-button").hasClass("active")) {
          releaseHold();
          $(".hold-button").removeClass("active");
        }
      }
    });
    $(document).focus(function(e) {
      allowed = true;
      upAllowed = false;
    })
  });
});
