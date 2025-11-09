document.addEventListener('DOMContentLoaded', () => {
  let user = JSON.parse(localStorage.getItem('streakUser')) || { totalDays: 0, rewards: [] };

  const milestoneRewards = {
    10: {tokens:1, badges:1, message:'🎉 10 Active Days! +1 Token & Badge'},
    20: {tokens:2, badges:1, message:'🎉 20 Active Days! +2 Tokens & 1 Badge'},
    30: {tokens:3, badges:2, message:'🎉 30 Active Days! +3 Tokens & 2 Badges'},
    40: {tokens:4, badges:2, message:'🎉 40 Active Days! +4 Tokens & 2 Badges'},
    50: {tokens:5, badges:3, message:'🎉 50 Active Days! +5 Tokens & 3 Badges'},
    60: {tokens:6, badges:3, message:'🎉 60 Active Days! +6 Tokens & 3 Badges'},
    70: {tokens:7, badges:4, message:'🎉 70 Active Days! +7 Tokens & 4 Badges'},
    80: {tokens:8, badges:4, message:'🎉 80 Active Days! +8 Tokens & 4 Badges'},
    90: {tokens:9, badges:5, message:'🎉 90 Active Days! +9 Tokens & 5 Badges'},
    100:{tokens:10,badges:5,message:'🏆 100 Active Days! Diamond Reward! +10 Tokens & 5 Badges'}
  };

  const streakNumber = document.getElementById('streakNumber');
  const rewardMsg = document.getElementById('rewardMsg');
  const milestonesDiv = document.getElementById('milestones');
  const claimBtn = document.getElementById('claimBtn');

  // Render milestone circles
  for(let i=10;i<=100;i+=10){
    let div = document.createElement('div');
    div.className='milestone';
    div.id='milestone'+i;
    div.innerText=i;
    milestonesDiv.appendChild(div);
  }

  function updateUI(){
    streakNumber.innerText = user.totalDays;
    for(let i=10;i<=100;i+=10){
      const m = document.getElementById('milestone'+i);
      if(user.totalDays >= i) m.classList.add('active');
      else m.classList.remove('active');
    }
  }

  function claimStreak(){
    user.totalDays += 1;

    // Check for rewards
    if(milestoneRewards[user.totalDays] && !user.rewards.includes(user.totalDays)){
      const reward = milestoneRewards[user.totalDays];
      rewardMsg.innerText = reward.message;
      user.rewards.push(user.totalDays);
    } else {
      rewardMsg.innerText = '✅ Active Day Claimed!';
    }

    localStorage.setItem('streakUser', JSON.stringify(user));
    animateStreak();
    updateUI();
  }

  function animateStreak(){
    streakNumber.style.transform='scale(1.5)';
    setTimeout(()=>{ streakNumber.style.transform='scale(1)'; },300);
  }

  if (claimBtn) claimBtn.addEventListener('click', claimStreak);
  updateUI();
});
