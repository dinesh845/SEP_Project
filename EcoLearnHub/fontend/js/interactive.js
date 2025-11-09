document.addEventListener('DOMContentLoaded', () => {
  const completeBtn = document.querySelector('.complete-btn');
  if (!completeBtn) return;

  completeBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      // Reward the player for completing a learning session
      await awardCustomReward('Interactive Learning', 2, 1, 15);

      alert("🎓 Lesson completed! You've earned +2 tokens, +1 badge & +15 score!");

      // Redirect to dashboard
      window.location.href = 'index.html';
    } catch (err) {
      console.error('Error completing lesson:', err);
      alert('Something went wrong while saving your progress.');
    }
  });
});
