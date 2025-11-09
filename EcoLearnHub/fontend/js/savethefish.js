// Extracted from savethefish.html
document.addEventListener('DOMContentLoaded', () => {
  const gameArea = document.getElementById('gameArea');
  const fish = document.getElementById('fish');
  const scoreDisplay = document.getElementById('score');
  const levelDisplay = document.getElementById('level');
  const gameOverText = document.getElementById('gameOver');
  const youWinText = document.getElementById('youWin');
  const nextLevelText = document.getElementById('nextLevel');
  const restartBtn = document.getElementById('restartBtn');

  let fishY = 180;
  let score = 0;
  let level = 1;
  let gameOver = false;
  let gameInterval;
  let spawnRate = 1500;
  let speed = 4;

  document.addEventListener('keydown', e => {
    if (gameOver) return;
    if (e.key === 'ArrowUp' && fishY > 0) fishY -= 30;
    if (e.key === 'ArrowDown' && fishY < gameArea.clientHeight - 40) fishY += 30;
    fish.style.top = fishY + 'px';
  });

  function spawnObject() {
    if (gameOver) return;
    const isTrash = Math.random() < 0.7;
    const div = document.createElement('div');
    div.classList.add(isTrash ? 'trash' : 'drop');
    div.textContent = isTrash ? '🛍️' : '💧';
    div.style.top = Math.random() * (gameArea.clientHeight - 40) + 'px';
    div.style.right = '0px';
    gameArea.appendChild(div);

    let pos = 0;
    const move = setInterval(() => {
      if (gameOver) { div.remove(); clearInterval(move); return; }
      pos += speed;
      div.style.right = pos + 'px';

      const fishRect = fish.getBoundingClientRect();
      const objRect = div.getBoundingClientRect();

      if (
        fishRect.left < objRect.right &&
        fishRect.right > objRect.left &&
        fishRect.top < objRect.bottom &&
        fishRect.bottom > objRect.top
      ) {
        if (isTrash) {
          endGame(false);
        } else {
          score += 10;
          scoreDisplay.textContent = 'Score: ' + score;
          checkLevelUp();
        }
        div.remove();
        clearInterval(move);
      }

      if (pos > gameArea.clientWidth) {
        div.remove();
        clearInterval(move);
      }
    }, 50);
  }

  function startGame() {
    gameInterval = setInterval(spawnObject, spawnRate);
  }

  function endGame(win) {
    gameOver = true;
    clearInterval(gameInterval);
    restartBtn.style.display = 'inline-block';

    if (win) {
      youWinText.style.display = 'block';

      // ✅ Award tokens & badges when user wins
      if (typeof awardGameReward === 'function') {
        awardGameReward('Fish Saver Game');
      } else {
        let user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (user) {
          user.tokens += 1;
          user.badges += 1;
          user.score += 10;
          let allUsers = JSON.parse(localStorage.getItem('users')) || [];
          let idx = allUsers.findIndex(u => u.email === user.email);
          if (idx !== -1) allUsers[idx] = user;
          localStorage.setItem('users', JSON.stringify(allUsers));
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          alert('🎉 You completed the Fish Saver Game! +1 Token & Badge');
        }
      }

    } else {
      gameOverText.style.display = 'block';
    }
  }

  function checkLevelUp() {
    if (level === 1 && score >= 50) {
      levelUp(2, 1200, 6);
    } else if (level === 2 && score >= 100) {
      levelUp(3, 900, 8);
    } else if (level === 3 && score >= 150) {
      endGame(true);
    }
  }

  function levelUp(newLevel, newRate, newSpeed) {
    level = newLevel;
    spawnRate = newRate;
    speed = newSpeed;
    levelDisplay.textContent = 'Level: ' + level;
    nextLevelText.style.display = 'block';
    setTimeout(() => { nextLevelText.style.display = 'none'; }, 2000);
    clearInterval(gameInterval);
    startGame();
  }

  function restartGame() {
    score = 0;
    level = 1;
    spawnRate = 1500;
    speed = 4;
    scoreDisplay.textContent = 'Score: 0';
    levelDisplay.textContent = 'Level: 1';
    fishY = 180;
    fish.style.top = fishY + 'px';
    gameOver = false;
    document.querySelectorAll('.trash, .drop').forEach(el => el.remove());
    gameOverText.style.display = 'none';
    youWinText.style.display = 'none';
    nextLevelText.style.display = 'none';
    restartBtn.style.display = 'none';
    clearInterval(gameInterval);
    startGame();
  }

  restartBtn.addEventListener('click', restartGame);
  startGame();
});
