function openGame(page) {
  window.location.href = page;
}

function updateUserStats() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) return;
  document.getElementById("userTokens").innerText = user.tokens || 0;
  document.getElementById("userBadges").innerText = user.badges || 0;
}

// Allow each game to call this when completed
async function awardGameReward(gameName) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) return;

  user.tokens += 1;
  user.badges += 1;
  user.score += 10;

  const updated = await apiUpdate(user);
  localStorage.setItem("loggedInUser", JSON.stringify(updated));

  alert(`🎉 You completed ${gameName}! +1 Token & Badge`);
  window.location.href = "index.html"; // return to dashboard
}

window.onload = function () {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user) {
    document.getElementById("auth-container").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    updateUserStats();
  }
};

// Attach listeners for dashboard interactions (cards, explore button)
document.addEventListener('DOMContentLoaded', () => {
  const exploreBtn = document.getElementById('exploreBtn');
  if (exploreBtn) exploreBtn.addEventListener('click', () => {
    const features = document.getElementById('features');
    if (features) features.scrollIntoView({ behavior: 'smooth' });
  });

  // Cards: use data-page attribute to navigate
  document.querySelectorAll('.card[data-page]').forEach(card => {
    const page = card.getAttribute('data-page');
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => openGame(page));
  });
});
