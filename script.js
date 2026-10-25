/**
 * AlgoSorcerer World — Public Showcase & Interactive Darshana Engines
 */

(function () {
  // 1. Ambient Cosmic Particle Engine
  const cosmicCanvas = document.getElementById('cosmic-bg');
  if (cosmicCanvas) {
    const ctx = cosmicCanvas.getContext('2d');
    let width = (cosmicCanvas.width = window.innerWidth);
    let height = (cosmicCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = cosmicCanvas.width = window.innerWidth;
      height = cosmicCanvas.height = window.innerHeight;
    });

    const particles = [];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2 + 0.8,
        color: i % 2 === 0 ? 'rgba(245, 158, 11, ' : 'rgba(6, 182, 212, ',
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    function renderCosmic() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(renderCosmic);
    }
    renderCosmic();
  }

  // 2. Hero Mini-Canvas Rotating Aura
  const heroCanvas = document.getElementById('hero-mini-canvas');
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    const cx = heroCanvas.width / 2;
    const cy = heroCanvas.height / 2;
    let heroT = 0;

    function renderHero() {
      ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
      heroT += 0.015;

      // Rotating gold rays
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(heroT * 0.25);

      for (let i = 0; i < 12; i++) {
        const ang = (i / 12) * Math.PI * 2;
        const r1 = 80;
        const r2 = 180 + Math.sin(heroT * 2 + i) * 15;

        ctx.strokeStyle = i % 2 === 0 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(6, 182, 212, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(Math.cos(ang) * r1, Math.sin(ang) * r1);
        ctx.lineTo(Math.cos(ang) * r2, Math.sin(ang) * r2);
        ctx.stroke();

        ctx.fillStyle = i % 2 === 0 ? '#f59e0b' : '#06b6d4';
        ctx.beginPath();
        ctx.arc(Math.cos(ang) * r2, Math.sin(ang) * r2, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      requestAnimationFrame(renderHero);
    }
    renderHero();
  }

  // 3. Featured Episode: Samsara Spiral Interactive Canvas
  const samsaraCanvas = document.getElementById('samsara-canvas');
  const btnSpiralStep = document.getElementById('btn-spiral-step');
  const btnSpiralReset = document.getElementById('btn-spiral-reset');
  const stackDepthLabel = document.getElementById('stack-depth-label');
  const stackStateLabel = document.getElementById('stack-state-label');

  let samsaraStep = 1;
  const maxStack = 8;
  let samsaraAnimTime = 0;

  if (samsaraCanvas) {
    const ctx = samsaraCanvas.getContext('2d');
    const w = samsaraCanvas.width;
    const h = samsaraCanvas.height;

    function renderSamsara() {
      samsaraAnimTime += 0.02;
      ctx.fillStyle = '#03040a';
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      ctx.save();
      ctx.translate(cx, cy);

      const isMoksha = samsaraStep >= maxStack;

      // Draw Recursive Spiral Nodes
      for (let i = 0; i < samsaraStep; i++) {
        const r = 160 * Math.pow(0.76, i);
        const rot = samsaraAnimTime * 0.6 + i * 0.6;
        const x = Math.cos(rot) * r;
        const y = Math.sin(rot) * r;

        ctx.strokeStyle = `rgba(${245 - i * 20}, ${158 - i * 10}, ${11 + i * 30}, 0.85)`;
        ctx.lineWidth = Math.max(2, 5 - i * 0.4);

        ctx.beginPath();
        ctx.arc(x, y, 16 + (maxStack - i) * 2, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.font = '11px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`Stack #${i + 1}`, x, y + 4);
      }

      // Central Moksha Bindu
      const glow = Math.sin(samsaraAnimTime * 4) * 8 + 20;
      ctx.fillStyle = isMoksha ? '#4ade80' : '#fef08a';
      ctx.shadowColor = isMoksha ? '#22c55e' : '#f59e0b';
      ctx.shadowBlur = isMoksha ? 30 : glow;
      ctx.beginPath();
      ctx.arc(0, 0, isMoksha ? 22 : 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 9px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(isMoksha ? 'MOKSHA!' : 'BINDu', 0, 3);

      ctx.restore();
      requestAnimationFrame(renderSamsara);
    }
    renderSamsara();

    if (btnSpiralStep) {
      btnSpiralStep.addEventListener('click', () => {
        if (samsaraStep < maxStack) {
          samsaraStep++;
        } else {
          samsaraStep = 1;
        }
        updateSamsaraHud();
      });
    }

    if (btnSpiralReset) {
      btnSpiralReset.addEventListener('click', () => {
        samsaraStep = 1;
        updateSamsaraHud();
      });
    }

    function updateSamsaraHud() {
      if (stackDepthLabel) stackDepthLabel.textContent = `Stack Depth: ${samsaraStep}`;
      if (stackStateLabel) {
        stackStateLabel.textContent =
          samsaraStep >= maxStack ? 'Cycle: Base Case (Moksha Reached)' : 'Cycle: Active Rebirth';
      }
    }
  }

  // 4. Master Interactive Darshana Labs
  const masterCanvas = document.getElementById('master-lab-canvas');
  const labItems = document.querySelectorAll('.lab-card-item');
  const currentLabBadge = document.getElementById('current-lab-badge');
  const currentLabTitle = document.getElementById('current-lab-title');
  const stageExplanationText = document.getElementById('stage-explanation-text');
  const btnLabToggle = document.getElementById('btn-lab-toggle');
  const btnLabReset = document.getElementById('btn-lab-reset');

  let activeLabKey = 'recursion_samsara';
  let labTime = 0;
  let isLabPlaying = true;

  const labExplanations = {
    recursion_samsara: {
      badge: 'RECURSION & SAMSARA',
      title: 'The Logarithmic Spiral of Call Stacks & Base Cases',
      desc: "Watch the recursive call stack expand as a golden spiral. Without the central 'Moksha' base case, the stack exhausts all available mental memory.",
    },
    binary_search_neti: {
      badge: 'BINARY SEARCH & NETI-NETI',
      title: 'Logarithmic O(log N) Elimination of Illusions',
      desc: "In the Upanishads, the sage eliminates Maya with 'Neti-Neti' (Not this, not this). Binary search discards half the falsehoods at each step until truth shines.",
    },
    indras_net_graphs: {
      badge: "INDRA'S NET & GRAPH THEORY",
      title: 'The Infinite Lattice of Reflective Jewel Vertices',
      desc: 'Every node in existence reflects every other connected node. Graph centrality, PageRank, and resonance show that no being exists in isolation.',
    },
    aparigraha_gc: {
      badge: 'GARBAGE COLLECTION & APARIGRAHA',
      title: 'Mark-and-Sweep Mental Heap Liberation',
      desc: 'Trace back to your live root: pure awareness. Obsolete desires with no active connection to Dharma are swept away to reclaim mental heap space.',
    },
    dynamic_programming_karma: {
      badge: 'DYNAMIC PROGRAMMING & KARMA',
      title: 'Sanchita Karma Memoization Table',
      desc: 'Why repeat identical suffering? Memoize past karmic lessons into a conscious lookup table, converting exponential agony O(2^N) into linear flow O(N).',
    },
    three_gunas_sorting: {
      badge: 'THE THREE GUNAS & SORTING',
      title: 'From Chaos (Tamas) through Focus (Rajas) to Sattva',
      desc: 'An unsorted array is Tamas (inert disorder). QuickSort applies Rajasic focus around a pivot until the whole system settles into tranquil Sattvic harmony.',
    },
  };

  labItems.forEach((item) => {
    item.addEventListener('click', () => {
      labItems.forEach((i) => i.classList.remove('active'));
      item.classList.add('active');
      activeLabKey = item.dataset.sim;

      const exp = labExplanations[activeLabKey];
      if (exp) {
        if (currentLabBadge) currentLabBadge.textContent = exp.badge;
        if (currentLabTitle) currentLabTitle.textContent = exp.title;
        if (stageExplanationText) stageExplanationText.textContent = exp.desc;
      }
      labTime = 0;
    });
  });

  if (btnLabToggle) {
    btnLabToggle.addEventListener('click', () => {
      isLabPlaying = !isLabPlaying;
      btnLabToggle.textContent = isLabPlaying ? 'Pause' : 'Play';
    });
  }

  if (btnLabReset) {
    btnLabReset.addEventListener('click', () => {
      labTime = 0;
    });
  }

  if (masterCanvas) {
    const ctx = masterCanvas.getContext('2d');
    const w = masterCanvas.width;
    const h = masterCanvas.height;

    function renderMasterLab() {
      if (isLabPlaying) labTime += 0.018;

      // Dark Cosmic Void
      const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, Math.max(w, h) * 0.65);
      bgGrad.addColorStop(0, '#0d1028');
      bgGrad.addColorStop(0.5, '#070918');
      bgGrad.addColorStop(1, '#020308');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Rotating Sacred Geometry
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate(labTime * 0.08);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.12)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(0, 0, Math.min(w, h) * 0.36, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Render Active Simulation
      if (activeLabKey === 'recursion_samsara') {
        drawSamsaraLab(ctx, w, h, labTime);
      } else if (activeLabKey === 'binary_search_neti') {
        drawNetiLab(ctx, w, h, labTime);
      } else if (activeLabKey === 'indras_net_graphs') {
        drawIndrasNetLab(ctx, w, h, labTime);
      } else if (activeLabKey === 'aparigraha_gc') {
        drawAparigrahaLab(ctx, w, h, labTime);
      } else if (activeLabKey === 'dynamic_programming_karma') {
        drawKarmaDPLab(ctx, w, h, labTime);
      } else {
        drawThreeGunasLab(ctx, w, h, labTime);
      }

      requestAnimationFrame(renderMasterLab);
    }
    renderMasterLab();
  }

  function drawSamsaraLab(ctx, w, h, t) {
    const cx = w / 2;
    const cy = h / 2;
    const depth = 8;
    const angleStep = 0.58 + Math.sin(t * 0.5) * 0.04;

    ctx.save();
    ctx.translate(cx, cy);

    for (let i = 0; i < depth; i++) {
      const r = 180 * Math.pow(0.74, i);
      const rot = t * 0.7 + i * angleStep;
      const x = Math.cos(rot) * r;
      const y = Math.sin(rot) * r;

      ctx.strokeStyle = `rgba(${245 - i * 20}, ${158 - i * 12}, ${11 + i * 30}, ${0.85 - i * 0.08})`;
      ctx.lineWidth = Math.max(2, 5 - i * 0.5);

      ctx.beginPath();
      ctx.arc(x, y, 16 + (8 - i) * 3, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.font = '11px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Stack #${i + 1}`, x, y + 4);
    }

    const pulse = Math.sin(t * 3) * 6 + 18;
    ctx.fillStyle = '#fef08a';
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = pulse;
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 9px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('MOKSHA', 0, 3);
    ctx.restore();
  }

  function drawNetiLab(ctx, w, h, t) {
    const cx = w / 2;
    const cy = h / 2;
    const n = 16;
    const boxW = Math.min(42, (w - 80) / n);
    const startX = cx - (n * boxW) / 2;

    const step = Math.floor((t * 0.8) % 5);
    const low = Math.floor(Math.pow(0.5, step) * 0);
    const high = Math.floor(n - 1 - step * 2);
    const mid = Math.floor((low + high) / 2);

    for (let i = 0; i < n; i++) {
      const x = startX + i * boxW;
      const isDiscarded = i < low || i > high;
      const isMid = i === mid;

      if (isDiscarded) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      } else if (isMid) {
        ctx.fillStyle = 'rgba(245, 158, 11, 0.8)';
        ctx.strokeStyle = '#fef08a';
      } else {
        ctx.fillStyle = 'rgba(6, 182, 212, 0.25)';
        ctx.strokeStyle = '#38bdf8';
      }

      ctx.lineWidth = 1.5;
      ctx.fillRect(x + 2, cy - 25, boxW - 4, 50);
      ctx.strokeRect(x + 2, cy - 25, boxW - 4, 50);

      ctx.fillStyle = '#fff';
      ctx.font = '12px Courier New';
      ctx.textAlign = 'center';
      ctx.fillText(i, x + boxW / 2, cy + 4);

      if (isDiscarded) {
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 9px Outfit';
        ctx.fillText('NETI', x + boxW / 2, cy - 32);
      }
    }
  }

  function drawIndrasNetLab(ctx, w, h, t) {
    const cx = w / 2;
    const cy = h / 2;
    const num = 12;
    const r = Math.min(w, h) * 0.32;
    const nodes = [];

    for (let i = 0; i < num; i++) {
      const a = (i / num) * Math.PI * 2 + t * 0.15;
      nodes.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
    }

    for (let i = 0; i < num; i++) {
      for (let j = i + 1; j < num; j++) {
        const pulse = (Math.sin(t * 2 + i + j) + 1) / 2;
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.08 + pulse * 0.22})`;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }

    nodes.forEach((n, idx) => {
      ctx.fillStyle = idx % 2 === 0 ? '#f59e0b' : '#06b6d4';
      ctx.beginPath();
      ctx.arc(n.x, n.y, 7, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawAparigrahaLab(ctx, w, h, t) {
    const cx = w / 2;
    const cy = h / 2;
    const cycle = (t * 0.6) % 4;

    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(cx, cy - 110, 22, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 10px Outfit';
    ctx.textAlign = 'center';
    ctx.fillText('ROOT', cx, cy - 106);

    const blocks = [
      { x: cx - 120, y: cy + 10, live: true, label: 'Dharma' },
      { x: cx, y: cy - 10, live: true, label: 'Wisdom' },
      { x: cx + 120, y: cy + 10, live: true, label: 'Compassion' },
      { x: cx - 70, y: cy + 100, live: false, label: 'Past Guilt' },
      { x: cx + 70, y: cy + 100, live: false, label: 'Ego Clinging' },
    ];

    blocks.forEach((b) => {
      const isDead = !b.live;
      if (isDead && cycle > 3.0) return;

      ctx.fillStyle = b.live
        ? 'rgba(34, 197, 94, 0.35)'
        : cycle > 2.0
        ? 'rgba(239, 68, 68, 0.75)'
        : 'rgba(255, 255, 255, 0.12)';
      ctx.strokeStyle = b.live ? '#4ade80' : cycle > 2.0 ? '#ef4444' : '#94a3b8';
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.roundRect(b.x - 45, b.y - 20, 90, 40, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.font = '12px Outfit';
      ctx.textAlign = 'center';
      ctx.fillText(b.label, b.x, b.y + 4);

      if (b.live) {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.beginPath();
        ctx.moveTo(cx, cy - 88);
        ctx.lineTo(b.x, b.y - 20);
        ctx.stroke();
      }
    });
  }

  function drawKarmaDPLab(ctx, w, h, t) {
    const cx = w / 2;
    const cy = h / 2;
    const cols = 6;
    const cellW = 55;
    const startX = cx - (cols * cellW) / 2;

    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 15px Outfit';
    ctx.textAlign = 'center';
    ctx.fillText('SANCHITA KARMA (LOOKUP MEMO TABLE)', cx, cy - 70);

    for (let i = 0; i < cols; i++) {
      const x = startX + i * cellW;
      const computed = t * 0.7 > i;

      ctx.fillStyle = computed ? 'rgba(245, 158, 11, 0.4)' : 'rgba(255, 255, 255, 0.08)';
      ctx.strokeStyle = computed ? '#f59e0b' : '#64748b';
      ctx.lineWidth = 1.5;
      ctx.fillRect(x + 2, cy - 40, cellW - 4, 45);
      ctx.strokeRect(x + 2, cy - 40, cellW - 4, 45);

      ctx.fillStyle = computed ? '#fff' : '#64748b';
      ctx.font = '12px Courier New';
      ctx.textAlign = 'center';
      ctx.fillText(computed ? `F[${i}]` : '?', x + cellW / 2, cy - 12);
    }
  }

  function drawThreeGunasLab(ctx, w, h, t) {
    const cx = w / 2;
    const cy = h / 2;
    const count = 18;
    const barW = Math.min(24, (w - 120) / count);
    const startX = cx - (count * barW) / 2;

    for (let i = 0; i < count; i++) {
      const heightVal = 35 + ((i * 16 + Math.sin(t * 2 + i) * 18) % 140);
      const x = startX + i * barW;
      const y = cy + 80 - heightVal;

      let fillCol = '#ef4444';
      if (heightVal > 70) fillCol = '#f59e0b';
      if (heightVal > 110) fillCol = '#38bdf8';

      ctx.fillStyle = fillCol;
      ctx.fillRect(x + 2, y, barW - 4, heightVal);
    }
  }
})();
