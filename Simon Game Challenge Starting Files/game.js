var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function() {
  if (!started) {
    started = true;
    nextSequence();
  }
});

function nextSequence() {
  userClickedPattern = []; // Limpa o array de cliques do usuário
  level++; // Incrementa o nível
  $("h1").text("Level " + level); // Atualiza o título
  var randomNumber = Math.floor(Math.random() * 4); // Gera um número aleatório entre 0 e 3
  var randomChosenColour = buttonColours[randomNumber]; // Seleciona uma cor aleatória
  gamePattern.push(randomChosenColour); // Adiciona a cor ao padrão do jogo
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100); // Anima o botão da cor escolhida
  playSound(randomChosenColour); // Toca o som correspondente
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id"); // Obtém a cor escolhida pelo usuário
  userClickedPattern.push(userChosenColour); // Adiciona a cor escolhida ao array de cliques do usuário
  animatePress(userChosenColour); // Anima o botão da cor escolhida
  playSound(userChosenColour); // Toca o som correspondente
  checkAnswer(userClickedPattern.length - 1); // Verifica a resposta do usuário
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { // Verifica se o último clique do usuário coincide com o padrão do jogo
    if (userClickedPattern.length === gamePattern.length) { // Se o usuário tiver acertado todo o padrão
      setTimeout(function() {
        nextSequence(); // Vai para o próximo nível
      }, 1000);
    }
  } else { // Se o usuário errar
    playSound("wrong"); // Toca o som de erro
    $("body").addClass("game-over"); // Adiciona a classe game-over ao body para animar o background
    setTimeout(function() {
      $("body").removeClass("game-over"); // Remove a classe game-over após 200ms
    }, 200);
    $("h1").text("Game Over, your colors score: "+level+". Press Any Key to Restart." ); // Atualiza o título
    startOver(); // Começa o jogo novamente
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); // Cria um novo objeto Audio com o som correspondente
  audio.play(); // Toca o som
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed"); // Adiciona a classe pressed ao botão para animá-lo
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed"); // Remove a classe pressed após 100ms
  }, 100);
}
