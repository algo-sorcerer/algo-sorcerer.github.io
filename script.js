/**
 * AlgoSorcerer World — Public Showcase & Interactive Algorithm Engines
 * Pure Computer Science, System Architecture & Algorithmic Mental Models
 */

(function () {
  'use strict';

  // 1. Ambient Background Particle Matrix
  const ambientCanvas = document.getElementById('ambient-canvas');
  if (ambientCanvas) {
    const ctx = ambientCanvas.getContext('2d');
    let width = (ambientCanvas.width = window.innerWidth);
    let height = (ambientCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = ambientCanvas.width = window.innerWidth;
      height = ambientCanvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(65, Math.floor(width / 22));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.4 ? 'rgba(6, 182, 212, ' : 'rgba(245, 158, 11, ',
        alpha: Math.random() * 0.5 + 0.15,
      });
    }

    function animateAmbient() {
      ctx.clearRect(0, 0, width, height);

      // Draw Network Edges
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw Vertices
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animateAmbient);
    }
    animateAmbient();
  }

  // 2. Hero Interactive Cyber-Lattice Portal
  const heroPortalCanvas = document.getElementById('hero-portal-canvas');
  if (heroPortalCanvas) {
    const ctx = heroPortalCanvas.getContext('2d');
    let t = 0;

    function renderHeroPortal() {
      const w = heroPortalCanvas.width;
      const h = heroPortalCanvas.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      t += 0.018;

      ctx.save();
      ctx.translate(cx, cy);

      // Rotating Algorithmic Geometry Rings
      for (let r = 50; r <= 180; r += 32) {
        ctx.strokeStyle = `rgba(245, 158, 11, ${0.18 + (r / 200) * 0.25})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Rotating Polygonal Matrices
      ctx.rotate(t * 0.5);
      for (let i = 0; i < 8; i++) {
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.45)';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.rotate((Math.PI * 2) / 8);
        ctx.moveTo(0, 45);
        ctx.lineTo(95, 135);
        ctx.lineTo(135, 95);
        ctx.closePath();
        ctx.stroke();
      }

      ctx.restore();
      requestAnimationFrame(renderHeroPortal);
    }
    renderHeroPortal();
  }

  // 3. Featured Episode #1: Recursion & Call Stack Spiral
  const samsaraCanvas = document.getElementById('samsara-canvas');
  const btnSpiralStep = document.getElementById('btn-spiral-step');
  const btnSpiralReset = document.getElementById('btn-spiral-reset');
  const stackDepthLabel = document.getElementById('stack-depth-label');
  const stackStateLabel = document.getElementById('stack-state-label');

  if (samsaraCanvas) {
    const ctx = samsaraCanvas.getContext('2d');
    const w = samsaraCanvas.width;
    const h = samsaraCanvas.height;

    let samsaraStep = 1;
    const maxStack = 6;
    let samsaraAnimTime = 0;

    function renderSamsara() {
      samsaraAnimTime += 0.02;
      ctx.fillStyle = '#03040a';
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      ctx.save();
      ctx.translate(cx, cy);

      const isBaseCase = samsaraStep >= maxStack;

      // Draw Recursive Spiral Stack Frames
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
        ctx.fillText(`Frame #${i + 1}`, x, y + 4);
      }

      // Central Base Case Node
      const glow = Math.sin(samsaraAnimTime * 4) * 8 + 20;
      ctx.fillStyle = isBaseCase ? '#4ade80' : '#fef08a';
      ctx.shadowColor = isBaseCase ? '#22c55e' : '#f59e0b';
      ctx.shadowBlur = isBaseCase ? 30 : glow;
      ctx.beginPath();
      ctx.arc(0, 0, isBaseCase ? 24 : 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 9px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(isBaseCase ? 'BASE CASE' : 'ENTRY', 0, 3);

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
          samsaraStep >= maxStack ? 'State: Base Case Met (Unwinding Stack)' : 'State: Pushing Stack Frame';
      }
    }
  }

  // 4. Master Interactive Algorithm Labs
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
      badge: 'RECURSION & CALL STACKS',
      title: 'The Logarithmic Spiral of Call Stacks & Halting Invariants',
      desc: 'Watch the recursive call stack expand as a logarithmic spiral. Without the explicit base case boundary condition, recursive invocations exhaust available stack memory into a crash.',
    },
    binary_search_neti: {
      badge: 'BINARY SEARCH & LOGARITHMIC PRUNING',
      title: 'O(log N) Divide-and-Conquer State Pruning',
      desc: 'Binary search discards half of the candidate search space at every comparison, pinpointing target keys in 30 steps among 1 billion elements.',
    },
    indras_net_graphs: {
      badge: 'GRAPH THEORY & DISTRIBUTED DAGs',
      title: 'Distributed Network Topology & PageRank Reflexivity',
      desc: 'Graph Theory models nodes connected by directed dependencies. In microservices and distributed topologies, system health depends on eliminating cyclic bottlenecks.',
    },
    aparigraha_gc: {
      badge: 'GARBAGE COLLECTION & HEAP OPTIMIZATION',
      title: 'Mark-and-Sweep Memory Reclaiming & Leak Prevention',
      desc: 'Trace live objects from root pointers. Dormant, unreferenced instances are systematically swept to reclaim heap memory and prevent production memory exhaustion.',
    },
    dynamic_programming_karma: {
      badge: 'DYNAMIC PROGRAMMING & MEMOIZATION',
      title: 'Subproblem Caching: O(2^N) to O(N) Lookup Acceleration',
      desc: 'Avoid recomputing identical subproblems. Memoize evaluated states into an O(1) hash lookup table, converting exponential combinatorial explosions into fast linear throughput.',
    },
    three_gunas_sorting: {
      badge: 'SORTING ALGORITHMS & SHANNON ENTROPY',
      title: 'QuickSort Partitioning: Dissipating Disorder into Sorted Order',
      desc: 'An unsorted array holds maximum entropy. QuickSort selects a pivot, applies active partitioning swaps, and recursively settles the array into minimal entropy equilibrium.',
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
      if (isLabPlaying) {
        labTime += 0.02;
      }

      ctx.fillStyle = '#060814';
      ctx.fillRect(0, 0, w, h);

      // Grid Backdrop
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Dispatch to specific CS simulation renderer
      switch (activeLabKey) {
        case 'recursion_samsara':
          drawRecursionLab(ctx, w, h, labTime);
          break;
        case 'binary_search_neti':
          drawBinarySearchLab(ctx, w, h, labTime);
          break;
        case 'indras_net_graphs':
          drawDistributedGraphLab(ctx, w, h, labTime);
          break;
        case 'aparigraha_gc':
          drawGarbageCollectionLab(ctx, w, h, labTime);
          break;
        case 'dynamic_programming_karma':
          drawMemoizationDPLab(ctx, w, h, labTime);
          break;
        case 'three_gunas_sorting':
          drawQuickSortEntropyLab(ctx, w, h, labTime);
          break;
        default:
          drawRecursionLab(ctx, w, h, labTime);
      }

      requestAnimationFrame(renderMasterLab);
    }
    renderMasterLab();
  }

  // --- Specific Simulation Renderers ---

  function drawRecursionLab(ctx, w, h, t) {
    const cx = w / 2;
    const cy = h / 2;
    const steps = 7;

    ctx.save();
    ctx.translate(cx, cy);

    for (let i = 0; i < steps; i++) {
      const r = 175 * Math.pow(0.72, i);
      const angle = t * 0.7 + i * 0.7;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;

      ctx.strokeStyle = `rgba(245, 158, 11, ${0.9 - i * 0.1})`;
      ctx.lineWidth = Math.max(1.5, 4.5 - i * 0.4);
      ctx.beginPath();
      ctx.arc(x, y, 16 + (steps - i) * 1.5, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.font = '11px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Stack #${i + 1}`, x, y + 4);
    }

    const pulse = Math.sin(t * 3) * 6 + 18;
    ctx.fillStyle = '#4ade80';
    ctx.shadowColor = '#22c55e';
    ctx.shadowBlur = pulse;
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 8.5px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('BASE CASE', 0, 3);
    ctx.restore();
  }

  function drawBinarySearchLab(ctx, w, h, t) {
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
        ctx.font = 'bold 8.5px Outfit';
        ctx.fillText('PRUNED', x + boxW / 2, cy - 32);
      } else if (isMid) {
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 9px Outfit';
        ctx.fillText('MID', x + boxW / 2, cy - 32);
      }
    }
  }

  function drawDistributedGraphLab(ctx, w, h, t) {
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

  function drawGarbageCollectionLab(ctx, w, h, t) {
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
      { x: cx - 120, y: cy + 10, live: true, label: 'UserSession' },
      { x: cx, y: cy - 10, live: true, label: 'AuthToken' },
      { x: cx + 120, y: cy + 10, live: true, label: 'DbConnection' },
      { x: cx - 70, y: cy + 100, live: false, label: 'OrphanSocket' },
      { x: cx + 70, y: cy + 100, live: false, label: 'StaleCache' },
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
      ctx.roundRect(b.x - 55, b.y - 20, 110, 40, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.font = '11px Outfit';
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

  function drawMemoizationDPLab(ctx, w, h, t) {
    const cx = w / 2;
    const cy = h / 2;
    const cols = 6;
    const cellW = 55;
    const startX = cx - (cols * cellW) / 2;

    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 14px Outfit';
    ctx.textAlign = 'center';
    ctx.fillText('DYNAMIC PROGRAMMING: MEMOIZATION TABLE dp[i]', cx, cy - 70);

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

  function drawQuickSortEntropyLab(ctx, w, h, t) {
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
