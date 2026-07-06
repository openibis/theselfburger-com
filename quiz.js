/*
 * SELF. · theselfburger.com · quiz.js · v0.2 · 2026-07-06
 * The Mood-Quiz weighted-scoring engine + fandom overlay result screen + Uber Eats deep-link.
 * v0.2 adds the 6-fandom-layer overlay (Element · Zodiac · MBTI · Anime · RPG · Emoji signature)
 * from character-mapping/archetype-fandom-mapping.md.
 * Zero external dependencies. Pure DOM. Runs anywhere GitHub Pages / Netlify hosts.
 */

// Archetype data with fandom overlays.
// See brand/self-burger/phase-0/character-mapping/archetype-fandom-mapping.md for the full matrix rationale.
const ARCHETYPES = {
  'The Ego': {
    slug: 'the-ego',
    caseNumber: '#C-00001',
    subtitle: 'I built me.',
    ingredientPhilosophy: 'Dry-aged beef · aged cheddar · exact geometric build · gold-flecked brioche. Photographs like a portrait.',
    price: 19,
    slicePrice: 8,
    accent: 'archetype-ego',
    ubereatsSkuIdBurger: 'sku_ego_burger',
    ubereatsSkuIdSlice: 'sku_ego_slice',
    // Fandom overlays
    element: 'The Flame',
    elementVibe: 'Fire · passion · main-character energy',
    zodiac: 'Leo · Aries',
    mbti: 'ENTJ · The Commander',
    anime: 'Genki (energetic protagonist)',
    rpg: 'Paladin',
    kidDescriptor: 'Main character energy',
    emoji: '👑🔥',
    reading: `You built this. Whatever this is — the room you are eating in, the account with your name on it, the language you learned to speak with the vowels flattened out — it was built. Deliberately. Some of it in secret.

The Ego is the archetype that measures the room. It notices the light. It notices who is looking. And once, tonight, it will pause, take a photograph, and eat what it built.

The Ego is not vain. The Ego is precise. What The Ego composes tastes like effort completed. Which is a rare taste.`,
  },
  'The Shadow': {
    slug: 'the-shadow',
    caseNumber: '#C-00002',
    subtitle: 'The part I hide.',
    ingredientPhilosophy: 'Black bun · black-garlic aioli · blue cheese · umami mushroom. Rich, guilty, private.',
    price: 17,
    slicePrice: 7,
    accent: 'archetype-shadow',
    ubereatsSkuIdBurger: 'sku_shadow_burger',
    ubereatsSkuIdSlice: 'sku_shadow_slice',
    element: 'The Veil',
    elementVibe: 'Dark · mystery · hidden depths',
    zodiac: 'Scorpio · Capricorn',
    mbti: 'INFJ · The Advocate',
    anime: 'Kuudere (cool + aloof)',
    rpg: 'Rogue',
    kidDescriptor: 'Villain-arc energy',
    emoji: '🖤🌙',
    reading: `You know it. Not from a photograph — from a certain kind of silence around 11 PM, when the front of the day has finally been turned off.

The Shadow is the archetype of the private meal. Composed of black bun, black-garlic aioli, blue cheese, one deliberate mushroom layer. Rich in a way you would not describe on record.

The Shadow does not perform. The Shadow eats to be seen only by itself, which is a form of seeing that gets ignored by most menus. Not by ours. There is a difference between alone and lonely. This is the difference.`,
  },
  'The Inner Child': {
    slug: 'the-inner-child',
    caseNumber: '#C-00003',
    subtitle: 'Who I was before I edited.',
    ingredientPhilosophy: 'American cheese · iceberg · dill pickle · secret sauce · sesame seed bun. Deliberately unsophisticated.',
    price: 14,
    slicePrice: 5,
    accent: 'archetype-inner-child',
    ubereatsSkuIdBurger: 'sku_inner_child_burger',
    ubereatsSkuIdSlice: 'sku_inner_child_slice',
    element: 'The Root',
    elementVibe: 'Earth · growing · wholesome',
    zodiac: 'Cancer · Taurus',
    mbti: 'ISFP · The Adventurer',
    anime: 'Tenshi (bright + wholesome)',
    rpg: 'Bard',
    kidDescriptor: 'Softie',
    emoji: '🌱🧒',
    reading: `There is a burger you have wanted since you were nine, and no one made it right after. This is that burger.

American cheese, iceberg lettuce, one crisp dill pickle, a secret sauce that is not secret because everyone recognizes it. A sesame-seed bun.

The Inner Child does not want refinement. The Inner Child wants remembering. Composed with everything the year 1994 taught the mouth. If you order it before dinner and it makes you cry a little, that is expected. It is not the food. It is that you allowed yourself to want the food.`,
  },
  'The Mother': {
    slug: 'the-mother',
    caseNumber: '#C-00004',
    subtitle: 'I feed everyone else first.',
    ingredientPhilosophy: 'Soft brioche · slow-cooked onions · gruyère · warm consommé on the side. Warmth as ingredient.',
    price: 16,
    slicePrice: 7,
    accent: 'archetype-mother',
    ubereatsSkuIdBurger: 'sku_mother_burger',
    ubereatsSkuIdSlice: 'sku_mother_slice',
    element: 'The Current',
    elementVibe: 'Water · flow · care',
    zodiac: 'Cancer · Pisces',
    mbti: 'ESFJ · The Consul',
    anime: 'Onee-san (elder-sister figure)',
    rpg: 'Cleric',
    kidDescriptor: 'Group therapist friend',
    emoji: '🫂🌊',
    reading: `The Mother waits. She composes for others — from morning through the family dinner, through the second helpings, through the dish that was set aside "for whoever comes home late."

When she is finally handed her own plate — brioche, slow-cooked onions, gruyère, a small warm consommé on the side — she does not eat quickly. She eats as if the meal were also for someone else. Whom she knows to be herself.

Warmth is the primary ingredient of The Mother. The rest is a delivery vehicle. Tonight the delivery arrives with her name on it, for once.`,
  },
  'The Rebel': {
    slug: 'the-rebel',
    caseNumber: '#C-00005',
    subtitle: 'I refused.',
    ingredientPhilosophy: 'Beyond patty · harissa · pickled jalapeño · butter lettuce wrap. Refuses the bun format.',
    price: 15,
    slicePrice: 6,
    accent: 'archetype-rebel',
    ubereatsSkuIdBurger: 'sku_rebel_burger',
    ubereatsSkuIdSlice: 'sku_rebel_slice',
    element: 'The Blade',
    elementVibe: 'Steel · edge · refusal',
    zodiac: 'Aquarius · Sagittarius',
    mbti: 'ENTP · The Debater',
    anime: 'Tsundere (spiky exterior, soft inside)',
    rpg: 'Barbarian',
    kidDescriptor: 'Chaotic good',
    emoji: '⚔️🔥',
    reading: `The Rebel refuses the bun. The Rebel refuses the beef. The Rebel refuses the shape of the sandwich itself.

What is left is a Beyond patty, harissa, one pickled jalapeño ring, and a butter-lettuce leaf wrapping the whole thing as if to say: fine, then this.

The Rebel is not against food. The Rebel is against the format food was handed in. Composed for those who negotiate menus by walking around them, who took the vegetable option not because they had to but because the vegetable option was not being watched, which was the entire point.`,
  },
  'The Impostor': {
    slug: 'the-impostor',
    caseNumber: '#C-00006',
    subtitle: 'Nobody knows yet.',
    ingredientPhilosophy: 'Two patties: one wagyu, one smash. Card inside reveals which is which. Only the eater knows.',
    price: 18,
    slicePrice: 8,
    accent: 'archetype-impostor',
    ubereatsSkuIdBurger: 'sku_impostor_burger',
    ubereatsSkuIdSlice: 'sku_impostor_slice',
    element: 'The Signal',
    elementVibe: 'Electric · hidden brilliance · mystery',
    zodiac: 'Gemini · Libra',
    mbti: 'INFP · The Mediator',
    anime: 'Dandere (silent + deep)',
    rpg: 'Wizard · Illusionist',
    kidDescriptor: 'Plot twist waiting to happen',
    emoji: '🎭⚡',
    reading: `Two patties are stacked in your burger. One is wagyu. One is smash. You will not be able to tell them apart from the photograph. You will not be able to tell them apart from the wrapper.

A small card inside your order will reveal which is which. You are the only person in the world who reads that card.

Composed for the moments when the room does not yet know what you have decided to be. The Impostor is not a fraud. The Impostor is a beginning that has not yet been announced.`,
  },
  'The Perfectionist': {
    slug: 'the-perfectionist',
    caseNumber: '#C-00007',
    subtitle: 'I redid this seven times.',
    ingredientPhilosophy: 'Black-truffle butter · aged comté · double-baked brioche · written ingredient card (the receipt).',
    price: 19,
    slicePrice: 9,
    accent: 'archetype-perfectionist',
    ubereatsSkuIdBurger: 'sku_perfectionist_burger',
    ubereatsSkuIdSlice: 'sku_perfectionist_slice',
    element: 'The Sky',
    elementVibe: 'Air · precision · above',
    zodiac: 'Virgo · Capricorn',
    mbti: 'INTJ · The Architect',
    anime: 'Kichō (refined + intentional)',
    rpg: 'Artificer',
    kidDescriptor: 'Straight A\'s, up at 3 AM',
    emoji: '🎯🌌',
    reading: `Black-truffle butter, thinly sliced across the top of the patty at the last moment of assembly. Aged comté with the rind trimmed away by hand. A brioche bun brushed with clarified butter and baked twice.

A written ingredient card accompanies your order — the perfectionist's receipt — so that you may confirm the details are correct.

The Perfectionist does not eat until the composition is verified. Composed for those who would return the plate to the kitchen not out of complaint but out of accuracy. Which is a different transaction than the one the room assumes.`,
  },
};

const ANSWER_WEIGHTS = {
  q1_whole_life: ['The Inner Child', 'The Mother'],
  q1_something_new: ['The Rebel', 'The Perfectionist'],
  q1_photographed: ['The Ego', 'The Perfectionist'],
  q1_dont_remember: ['The Shadow', 'The Impostor'],
  q2_sharp: ['The Ego', 'The Perfectionist'],
  q2_soft: ['The Mother', 'The Inner Child'],
  q2_restless: ['The Rebel', 'The Shadow'],
  q2_in_between: ['The Impostor', 'The Shadow'],
  q3_everyone: ['The Ego', 'The Perfectionist'],
  q3_just_me: ['The Shadow', 'The Impostor'],
  q3_one_person: ['The Mother', 'The Inner Child'],
  q3_dont_care: ['The Rebel', 'The Inner Child'],
};

let state = {
  answers: [],
  currentQ: 1,
};

// Uber Eats deep-link builder.
// Phase 0: points to Uber Eats search until first partner storefront is live.
// Once partner signs, replace URL_TEMPLATE with the actual deep-link.
const UBEREATS_URL_TEMPLATE = 'https://www.ubereats.com/search?q=Self%20Burger';

function computeScore(answers) {
  const score = {};
  Object.keys(ARCHETYPES).forEach((a) => (score[a] = 0));
  answers.forEach((answer) => {
    const weights = ANSWER_WEIGHTS[answer] || [];
    weights.forEach((archetype) => {
      score[archetype] += 1;
    });
  });
  return score;
}

function pickWinner(scores, answers) {
  const sorted = Object.keys(ARCHETYPES).sort((a, b) => scores[b] - scores[a]);
  const topScore = scores[sorted[0]];
  const topArchetypes = sorted.filter((a) => scores[a] === topScore);
  if (topArchetypes.length === 1) return topArchetypes[0];

  const q3 = answers.find((a) => a.startsWith('q3_'));
  const q3Weights = q3 ? ANSWER_WEIGHTS[q3] || [] : [];
  const q3Winner = topArchetypes.find((a) => q3Weights.includes(a));
  return q3Winner || topArchetypes.sort()[0];
}

function runnersUp(scores, winner) {
  const winnerScore = scores[winner];
  return Object.keys(ARCHETYPES)
    .filter((a) => a !== winner)
    .filter((a) => scores[a] >= winnerScore - 1)
    .sort((a, b) => scores[b] - scores[a])
    .slice(0, 2);
}

// Case number generator — grows the public register.
// Phase 0: uses localStorage for demo purposes. Phase 2 (Sub-project A.2): Supabase-backed.
function generateCaseNumber() {
  let counter = parseInt(localStorage.getItem('self_case_counter') || '0', 10);
  counter += 1;
  localStorage.setItem('self_case_counter', String(counter));
  const num = String(counter).padStart(5, '0');
  return `#C-${num}`;
}

// UI wiring
document.getElementById('start-quiz').addEventListener('click', () => {
  document.getElementById('hero').classList.add('hidden');
  document.getElementById('quiz').classList.remove('hidden');
  window.scrollTo(0, 0);
});

document.querySelectorAll('.quiz-option').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const answer = e.target.dataset.answer;
    state.answers.push(answer);
    const nextQ = state.currentQ + 1;

    document.querySelector(`.quiz-question[data-q="${state.currentQ}"]`).classList.add('hidden');

    if (nextQ > 3) {
      showResult();
    } else {
      const nextEl = document.querySelector(`.quiz-question[data-q="${nextQ}"]`);
      nextEl.classList.remove('hidden');
      state.currentQ = nextQ;
      window.scrollTo(0, 0);
    }
  });
});

function showResult() {
  const scores = computeScore(state.answers);
  const winnerName = pickWinner(scores, state.answers);
  const winner = ARCHETYPES[winnerName];
  const runnerNames = runnersUp(scores, winnerName);

  // Generate a fresh case number for this user (Phase 0 · localStorage)
  const userCaseNumber = generateCaseNumber();

  // Populate result screen — primary
  document.getElementById('result-case').textContent = userCaseNumber;
  document.getElementById('result-archetype').textContent = winnerName;
  document.getElementById('result-subtitle').textContent = `"${winner.subtitle}"`;
  document.getElementById('result-reading').textContent = winner.reading;

  // Populate fandom overlay
  document.getElementById('fandom-element').textContent = winner.element;
  document.getElementById('fandom-element-vibe').textContent = winner.elementVibe;
  document.getElementById('fandom-zodiac').textContent = winner.zodiac;
  document.getElementById('fandom-mbti').textContent = winner.mbti;
  document.getElementById('fandom-anime').textContent = winner.anime;
  document.getElementById('fandom-rpg').textContent = winner.rpg;
  document.getElementById('fandom-kid-descriptor').textContent = winner.kidDescriptor;
  document.getElementById('fandom-emoji').textContent = winner.emoji;

  // Uber Eats deep-link
  document.getElementById('result-order').href = UBEREATS_URL_TEMPLATE + '&archetype=' + encodeURIComponent(winnerName);
  document.getElementById('result-order').textContent = `Order ${winnerName} on Uber Eats`;

  // Runners-up
  const runnersEl = document.getElementById('result-runners');
  if (runnerNames.length > 0) {
    let runnersHTML = '<h3>and also considering</h3>';
    runnerNames.forEach((name) => {
      const r = ARCHETYPES[name];
      runnersHTML += `
        <a href="#${r.slug}" class="result-runner-card" onclick="restart(); return false;">
          <p>${name} · ${r.element}</p>
          <p>"${r.subtitle}" · ${r.emoji}</p>
        </a>
      `;
    });
    runnersEl.innerHTML = runnersHTML;
  }

  // Swap accent color for the winning archetype
  document.body.className = winner.accent;

  // Show result
  document.getElementById('quiz').classList.add('hidden');
  document.getElementById('result').classList.remove('hidden');
  window.scrollTo(0, 0);

  // Analytics (Plausible-compatible; no-op if not loaded)
  if (typeof plausible === 'function') {
    plausible('mood_quiz_completed', {
      props: {
        archetype: winnerName,
        element: winner.element,
        case_number: userCaseNumber,
      },
    });
  }

  // Screenshot-friendly share prompt (kid+teen viral loop)
  const shareText = `I'm ${winnerName} · ${winner.element} · ${winner.emoji}\n\nTake the quiz: theselfburger.com/quiz\n\n#whicharchetypeareyou #selfburger`;
  const shareBtn = document.getElementById('result-share');
  if (shareBtn && navigator.share) {
    shareBtn.style.display = 'inline-block';
    shareBtn.onclick = () => {
      navigator.share({
        title: `I'm ${winnerName} · SELF.`,
        text: shareText,
        url: 'https://theselfburger.com/quiz',
      }).catch(() => {});
    };
  } else if (shareBtn) {
    // Fallback for browsers without native share
    shareBtn.style.display = 'inline-block';
    shareBtn.onclick = () => {
      navigator.clipboard.writeText(shareText).then(() => {
        shareBtn.textContent = 'Copied — paste into TikTok / IG';
      });
    };
  }
}

function restart() {
  state = { answers: [], currentQ: 1 };
  document.body.className = '';
  document.getElementById('result').classList.add('hidden');
  document.querySelectorAll('.quiz-question').forEach((el) => el.classList.add('hidden'));
  document.querySelector('.quiz-question[data-q="1"]').classList.remove('hidden');
  document.getElementById('quiz').classList.remove('hidden');
  window.scrollTo(0, 0);
}

document.getElementById('result-restart').addEventListener('click', restart);

// MENU rendering (with element name shown alongside archetype)
function renderMenu(brand) {
  const grid = document.getElementById('menu-grid');
  grid.innerHTML = '';
  Object.entries(ARCHETYPES).forEach(([name, a]) => {
    const price = brand === 'burger' ? a.price : a.slicePrice;
    const item = document.createElement('div');
    item.className = 'menu-item';
    item.dataset.archetype = name;
    item.innerHTML = `
      <p class="archetype-tag">${a.caseNumber} · ${a.emoji}</p>
      <p class="item-name">${name}</p>
      <p class="item-element">aka ${a.element}</p>
      <p class="item-subtitle">"${a.subtitle}"</p>
      <p class="item-price">$${price}</p>
    `;
    grid.appendChild(item);
  });
}

renderMenu('burger');

document.querySelectorAll('.menu-tab').forEach((tab) => {
  tab.addEventListener('click', (e) => {
    document.querySelectorAll('.menu-tab').forEach((t) => t.classList.remove('active'));
    e.target.classList.add('active');
    renderMenu(e.target.dataset.brand);
  });
});
