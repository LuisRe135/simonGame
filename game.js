let started = false;
$(document).keydown(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(document).click(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

let buttonColours = ["red", "green", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
let clickCount = 0;

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("h1").text("Level " + gamePattern.length);
  playSound(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  clickCount = 0;
  userClickedPattern = [];

}

$(".btn").click(function(event) {
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  let ans = checkAnswer(clickCount);

  if (ans) {
    playSound(userChosenColour);
    animatePress(userChosenColour);
    clickCount++;
    if (clickCount == gamePattern.length) {
      if (checkAnswer(clickCount - 1)) {
        setTimeout(nextSequence, 500);
      } else {
        wrongAnswer();
      }
    }
  } else {
    wrongAnswer();
  }


});

function wrongAnswer() {
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over")
  }, 100);
  gamePattern = [];
  playSound("wrong");
  $("h1").text("Game Over! Press any key to start again.");
  started = false;
  $(document).keydown(function() {
    if (!started) {
      nextSequence();
      started = true;
    }
  });
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    return true;
  } else {
    return false;
  }
}

function playSound(name) {
  let beep = new Audio("sounds/" + name + ".mp3");
  beep.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100)
}
