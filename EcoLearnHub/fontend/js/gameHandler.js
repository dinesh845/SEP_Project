// gameHandler.js
// Handles what happens after a game is completed and syncs with backend

async function awardGameReward(gameName) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    alert("Please log in first!");
    window.location.href = "index.html";
    return;
  }

  // 🎯 Increase user stats
  user.tokens = (user.tokens || 0) + 1;
  user.badges = (user.badges || 0) + 1;
  user.score = (user.score || 0) + 10;

  // 💾 Save updated stats to backend
  try {
    const res = await fetch("http://localhost:5000/api/users/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const updated = await res.json();
    localStorage.setItem("loggedInUser", JSON.stringify(updated));

    alert(`🎉 You completed ${gameName}! +1 Token, +1 Badge, +10 Score`);

    // ⏪ Return to dashboard
    window.location.href = "index.html";
  } catch (err) {
    console.error("Failed to update user stats:", err);
    alert("❌ Could not update your progress. Check backend connection.");
  }
}

// 🧩 For optional use: give specific rewards
async function awardCustomReward(gameName, tokens = 1, badges = 1, score = 10) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    alert("Please log in first!");
    window.location.href = "index.html";
    return;
  }

  user.tokens += tokens;
  user.badges += badges;
  user.score += score;

  try {
    const res = await fetch("http://localhost:5000/api/users/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const updated = await res.json();
    localStorage.setItem("loggedInUser", JSON.stringify(updated));

    alert(`🏆 ${gameName} completed! +${tokens} Tokens, +${badges} Badges, +${score} Score`);
    window.location.href = "index.html";
  } catch (err) {
    console.error(err);
  }
}
