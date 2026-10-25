/**
 * AlgoSorcerer World — Interactive Digital Universe & Laboratory Engine
 * "Ancient wisdom. Algorithmic thinking. Infinite possibilities."
 */

(function () {
  'use strict';

  // ============================================================================
  // 1. Ambient Background Particle Matrix
  // ============================================================================
  const ambientCanvas = document.getElementById('ambient-canvas') || document.getElementById('cosmic-bg');
  if (ambientCanvas) {
    const ctx = ambientCanvas.getContext('2d');
    let width = (ambientCanvas.width = window.innerWidth);
    let height = (ambientCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = ambientCanvas.width = window.innerWidth;
      height = ambientCanvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(65, Math.floor(width / 24));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.45 ? 'rgba(100, 232, 255, ' : 'rgba(199, 166, 106, ',
        alpha: Math.random() * 0.45 + 0.15,
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

          if (dist < 115) {
            ctx.strokeStyle = `rgba(100, 232, 255, ${0.1 * (1 - dist / 115)})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw Particles
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

  // ============================================================================
  // 2. Hero Centerpiece: Mathematical Mandala & Computational Artifact
  // ============================================================================
  const heroPortalCanvas = document.getElementById('hero-portal-canvas');
  if (heroPortalCanvas) {
    const ctx = heroPortalCanvas.getContext('2d');
    let t = 0;
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      const rect = heroPortalCanvas.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    });

    function renderHeroPortal() {
      const w = heroPortalCanvas.width;
      const h = heroPortalCanvas.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2 + mouseX * 12;
      const cy = h / 2 + mouseY * 12;
      t += 0.015;

      ctx.save();
      ctx.translate(cx, cy);

      // Concentric Orbital Invariants
      for (let r = 55; r <= 200; r += 28) {
        ctx.strokeStyle = `rgba(199, 166, 106, ${0.15 + (r / 220) * 0.25})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Rotating Algorithmic Geometry (Clockwise)
      ctx.save();
      ctx.rotate(t * 0.4);
      for (let i = 0; i < 8; i++) {
        ctx.strokeStyle = 'rgba(100, 232, 255, 0.45)';
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.rotate((Math.PI * 2) / 8);
        ctx.moveTo(0, 50);
        ctx.lineTo(100, 140);
        ctx.lineTo(140, 100);
        ctx.closePath();
        ctx.stroke();
      }
      ctx.restore();

      // Counter-Rotating Inner Mathematical Matrix
      ctx.save();
      ctx.rotate(-t * 0.6);
      for (let i = 0; i < 6; i++) {
        ctx.strokeStyle = 'rgba(199, 166, 106, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.rotate((Math.PI * 2) / 6);
        ctx.moveTo(0, 30);
        ctx.lineTo(75, 75);
        ctx.lineTo(75, -20);
        ctx.closePath();
        ctx.stroke();
      }
      ctx.restore();

      // Orbiting Algorithmic Nodes
      const nodeCount = 5;
      for (let i = 0; i < nodeCount; i++) {
        const orbitR = 150 + Math.sin(t * 2 + i) * 15;
        const angle = t * 0.8 + (i * Math.PI * 2) / nodeCount;
        const nx = Math.cos(angle) * orbitR;
        const ny = Math.sin(angle) * orbitR;

        // Connector ray to center
        ctx.strokeStyle = 'rgba(100, 232, 255, 0.15)';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        // Node circle
        ctx.fillStyle = i % 2 === 0 ? '#64e8ff' : '#c7a66a';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(nx, ny, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Central Luminous Core
      const corePulse = Math.sin(t * 3) * 6 + 22;
      ctx.fillStyle = '#f0f4fc';
      ctx.shadowColor = '#64e8ff';
      ctx.shadowBlur = corePulse;
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Central Glyph
      ctx.fillStyle = '#08090d';
      ctx.font = 'bold 10px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('{ }', 0, 3.5);

      ctx.restore();
      requestAnimationFrame(renderHeroPortal);
    }
    renderHeroPortal();
  }

  // ============================================================================
  // 3. Featured Episode 1: Call Stack Spiral Simulator
  // ============================================================================
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
      ctx.fillStyle = '#040508';
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      ctx.save();
      ctx.translate(cx, cy);

      const isBaseCase = samsaraStep >= maxStack;

      // Draw Recursive Spiral Stack Frames
      for (let i = 0; i < samsaraStep; i++) {
        const r = 160 * Math.pow(0.76, i);
        const rot = samsaraAnimTime * 0.5 + i * 0.65;
        const x = Math.cos(rot) * r;
        const y = Math.sin(rot) * r;

        ctx.strokeStyle = `rgba(${199 - i * 15}, ${166 - i * 12}, ${106 + i * 25}, 0.9)`;
        ctx.lineWidth = Math.max(2, 5 - i * 0.4);

        ctx.beginPath();
        ctx.arc(x, y, 16 + (maxStack - i) * 2, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#f0f4fc';
        ctx.font = '11px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`Frame #${i + 1}`, x, y + 4);
      }

      // Central Base Case Anchor
      const glow = Math.sin(samsaraAnimTime * 4) * 8 + 18;
      ctx.fillStyle = isBaseCase ? '#4ade80' : '#e2c288';
      ctx.shadowColor = isBaseCase ? '#22c55e' : '#c7a66a';
      ctx.shadowBlur = isBaseCase ? 25 : glow;
      ctx.beginPath();
      ctx.arc(0, 0, isBaseCase ? 22 : 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#08090d';
      ctx.font = 'bold 8.5px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(isBaseCase ? 'BASE CASE' : 'ROOT', 0, 3);

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
      if (stackDepthLabel) stackDepthLabel.textContent = `Stack Depth: ${samsaraStep} / ${maxStack}`;
      if (stackStateLabel) {
        stackStateLabel.textContent =
          samsaraStep >= maxStack ? 'State: Base Case Met (Unwinding Stack)' : 'State: Pushing Stack Frame';
      }
    }
  }

  // ============================================================================
  // 4. Master Interactive Algorithm Laboratory
  // ============================================================================
  const masterCanvas = document.getElementById('master-lab-canvas');
  const labTabs = document.querySelectorAll('.lab-select-card');
  const currentLabBadge = document.getElementById('current-lab-badge');
  const currentLabTitle = document.getElementById('current-lab-title');
  const hudTimeComplexity = document.getElementById('hud-time-complexity');
  const hudSpaceComplexity = document.getElementById('hud-space-complexity');
  const hudRuntimeState = document.getElementById('hud-runtime-state');
  const hudCounter1 = document.getElementById('hud-counter-1');
  const hudCounter2 = document.getElementById('hud-counter-2');
  const stageExplanationHeading = document.getElementById('stage-explanation-heading');
  const stageExplanationText = document.getElementById('stage-explanation-text');
  const btnLabToggle = document.getElementById('btn-lab-toggle');
  const btnLabStep = document.getElementById('btn-lab-step');
  const btnLabReset = document.getElementById('btn-lab-reset');
  const dynamicLabActions = document.getElementById('dynamic-lab-actions');

  let activeLabKey = 'recursion_samsara';
  let labTime = 0;
  let isLabPlaying = true;

  // Lab Specifications & Metadata
  const labConfigs = {
    recursion_samsara: {
      badge: 'LAB A // RECURSION & CALL STACKS',
      title: 'Call Stack Expansion & Halting Invariants',
      time: 'O(N)',
      space: 'O(N)',
      heading: 'Halting Invariant In Depth:',
      desc: 'Watch recursive invocations allocate stack frames sequentially. Without an explicit Base Case boundary, memory expands infinitely until hardware stack limits trigger a terminal overflow.',
      counter1: 'Stack Depth: 1 / 7',
      counter2: 'Operation: Frame Push',
    },
    binary_search_neti: {
      badge: 'LAB B // BINARY SEARCH & PRUNING',
      title: 'Logarithmic O(log N) State Space Elimination',
      time: 'O(log N)',
      space: 'O(1)',
      heading: 'Divide-and-Conquer Pruning:',
      desc: 'By testing the sorted array midpoint against the target, binary search eliminates fifty percent of candidates in every single comparison step, reaching instant convergence.',
      counter1: 'Target: 42',
      counter2: 'Comparisons: 0 / 4',
    },
    indras_net_graphs: {
      badge: 'LAB C // GRAPH THEORY & DISTRIBUTED DAGs',
      title: 'Distributed Network Topology & Dependency Propagation',
      time: 'O(V + E)',
      space: 'O(V)',
      heading: 'Topological Interdependence:',
      desc: 'In distributed architectures and DAGs, no microservice is independent. Click any node to fire a request impulse and trace dependency propagation through downstream services.',
      counter1: 'Active Nodes: 12 Services',
      counter2: 'Topology: Directed Acyclic Graph',
    },
    aparigraha_gc: {
      badge: 'LAB D // GARBAGE COLLECTION & HEAP OPTIMIZATION',
      title: 'Mark-and-Sweep Memory Reclaiming & Zero Leaks',
      time: 'O(Live + Dead)',
      space: 'O(Heap)',
      heading: 'Root Traceability & Heap Reclaim:',
      desc: 'Trace live objects from root pointers. Dormant, unreferenced instances are systematically swept to reclaim heap memory and prevent production memory exhaustion.',
      counter1: 'Live Heap: 3 Objects',
      counter2: 'Orphaned Dead: 2 Objects',
    },
    dynamic_programming_karma: {
      badge: 'LAB E // DYNAMIC PROGRAMMING & MEMOIZATION',
      title: 'Subproblem Caching: O(2^N) to O(N) Acceleration',
      time: 'O(N)',
      space: 'O(N)',
      heading: 'State Memoization Table:',
      desc: 'Avoid recomputing identical subproblems. Memoize evaluated states into an O(1) hash lookup table, converting exponential combinatorial explosions into fast linear throughput.',
      counter1: 'Mode: Memoized Lookup',
      counter2: 'Cache Hits: 14 Saved Invocations',
    },
    three_gunas_sorting: {
      badge: 'LAB F // SORTING ALGORITHMS & SHANNON ENTROPY',
      title: 'QuickSort Partitioning: Dissipating Disorder into Equilibrium',
      time: 'O(N log N)',
      space: 'O(log N)',
      heading: 'Entropy Reduction Mechanics:',
      desc: 'An unsorted array holds maximum information entropy. QuickSort selects a pivot, applies active partitioning swaps, and recursively settles the array into minimal entropy equilibrium.',
      counter1: 'Shannon Entropy: H(X) = 3.84 bits',
      counter2: 'Array Partition: Active Swaps',
    },
  };

  // State Variables for specific labs
  let binSearchTarget = 42;
  let binSearchStep = 0;
  let graphImpulseNodes = [];
  let gcPhase = 'idle'; // 'idle', 'marking', 'sweeping'
  let gcReclaimedBytes = 0;
  let dpMode = 'memoized'; // 'memoized' or 'naive'
  let sortingAlg = 'quicksort'; // 'quicksort' or 'mergesort'
  let sortStepCount = 0;

  // Initialize Dynamic Action Buttons for current lab
  function updateDynamicControls() {
    if (!dynamicLabActions) return;
    dynamicLabActions.innerHTML = '';

    if (activeLabKey === 'recursion_samsara') {
      const btnPush = document.createElement('button');
      btnPush.className = 'btn-ctrl';
      btnPush.innerHTML = '<span>Push Frame</span>';
      btnPush.addEventListener('click', () => {
        labTime += 0.8;
      });

      const btnBase = document.createElement('button');
      btnBase.className = 'btn-ctrl active-state';
      btnBase.innerHTML = '<span>Trigger Base Case</span>';
      btnBase.addEventListener('click', () => {
        labTime = 0;
      });

      dynamicLabActions.appendChild(btnPush);
      dynamicLabActions.appendChild(btnBase);
    } else if (activeLabKey === 'binary_search_neti') {
      [7, 23, 42, 88].forEach((targetVal) => {
        const btnT = document.createElement('button');
        btnT.className = `btn-ctrl ${binSearchTarget === targetVal ? 'active-state' : ''}`;
        btnT.innerHTML = `<span>Target: ${targetVal}</span>`;
        btnT.addEventListener('click', () => {
          binSearchTarget = targetVal;
          binSearchStep = 0;
          updateDynamicControls();
        });
        dynamicLabActions.appendChild(btnT);
      });
    } else if (activeLabKey === 'aparigraha_gc') {
      const btnGC = document.createElement('button');
      btnGC.className = 'btn-ctrl primary';
      btnGC.innerHTML = '<span>🧹 Trigger GC Cycle</span>';
      btnGC.addEventListener('click', () => {
        gcPhase = 'marking';
        setTimeout(() => {
          gcPhase = 'sweeping';
          gcReclaimedBytes += 128;
          setTimeout(() => {
            gcPhase = 'idle';
          }, 1200);
        }, 1000);
      });
      dynamicLabActions.appendChild(btnGC);
    } else if (activeLabKey === 'dynamic_programming_karma') {
      const btnToggleDP = document.createElement('button');
      btnToggleDP.className = `btn-ctrl ${dpMode === 'memoized' ? 'active-state' : ''}`;
      btnToggleDP.innerHTML = `<span>Mode: ${dpMode === 'memoized' ? 'Memoized Table O(N)' : 'Naive Recursion O(2^N)'}</span>`;
      btnToggleDP.addEventListener('click', () => {
        dpMode = dpMode === 'memoized' ? 'naive' : 'memoized';
        updateDynamicControls();
      });
      dynamicLabActions.appendChild(btnToggleDP);
    } else if (activeLabKey === 'three_gunas_sorting') {
      const btnShuffle = document.createElement('button');
      btnShuffle.className = 'btn-ctrl';
      btnShuffle.innerHTML = '<span>🎲 Shuffle Array</span>';
      btnShuffle.addEventListener('click', () => {
        sortStepCount = 0;
      });

      const btnAlg = document.createElement('button');
      btnAlg.className = 'btn-ctrl active-state';
      btnAlg.innerHTML = `<span>Algorithm: ${sortingAlg === 'quicksort' ? 'QuickSort' : 'MergeSort'}</span>`;
      btnAlg.addEventListener('click', () => {
        sortingAlg = sortingAlg === 'quicksort' ? 'mergesort' : 'quicksort';
        updateDynamicControls();
      });

      dynamicLabActions.appendChild(btnShuffle);
      dynamicLabActions.appendChild(btnAlg);
    }
  }

  // Switch Active Laboratory
  function switchLab(key) {
    activeLabKey = key;
    labTabs.forEach((tab) => {
      const isMatch = tab.dataset.sim === key;
      tab.classList.toggle('active', isMatch);
      tab.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    const cfg = labConfigs[key];
    if (cfg) {
      if (currentLabBadge) currentLabBadge.textContent = cfg.badge;
      if (currentLabTitle) currentLabTitle.textContent = cfg.title;
      if (hudTimeComplexity) hudTimeComplexity.textContent = cfg.time;
      if (hudSpaceComplexity) hudSpaceComplexity.textContent = cfg.space;
      if (hudCounter1) hudCounter1.textContent = cfg.counter1;
      if (hudCounter2) hudCounter2.textContent = cfg.counter2;
      if (stageExplanationHeading) stageExplanationHeading.textContent = cfg.heading;
      if (stageExplanationText) stageExplanationText.textContent = cfg.desc;
    }

    labTime = 0;
    updateDynamicControls();
  }

  labTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      switchLab(tab.dataset.sim);
    });
  });

  if (btnLabToggle) {
    btnLabToggle.addEventListener('click', () => {
      isLabPlaying = !isLabPlaying;
      btnLabToggle.innerHTML = isLabPlaying
        ? '<span class="ctrl-icon">⏸</span><span class="ctrl-text">Pause</span>'
        : '<span class="ctrl-icon">▶</span><span class="ctrl-text">Play</span>';
      if (hudRuntimeState) {
        hudRuntimeState.textContent = isLabPlaying ? 'EXECUTING' : 'PAUSED';
        hudRuntimeState.className = isLabPlaying ? 'telemetry-val highlight' : 'telemetry-val';
      }
    });
  }

  if (btnLabStep) {
    btnLabStep.addEventListener('click', () => {
      labTime += 0.5;
      binSearchStep = (binSearchStep + 1) % 4;
      sortStepCount++;
    });
  }

  if (btnLabReset) {
    btnLabReset.addEventListener('click', () => {
      labTime = 0;
      binSearchStep = 0;
      sortStepCount = 0;
      gcPhase = 'idle';
    });
  }

  // Master Canvas Render Loop
  if (masterCanvas) {
    const ctx = masterCanvas.getContext('2d');
    const w = masterCanvas.width;
    const h = masterCanvas.height;

    // Handle canvas clicks for interactive graph
    masterCanvas.addEventListener('click', (e) => {
      const rect = masterCanvas.getBoundingClientRect();
      const clickX = ((e.clientX - rect.left) / rect.width) * w;
      const clickY = ((e.clientY - rect.top) / rect.height) * h;
      graphImpulseNodes.push({ x: clickX, y: clickY, r: 0, alpha: 1.0 });
    });

    function renderMasterLab() {
      if (isLabPlaying) {
        labTime += 0.02;
      }

      ctx.fillStyle = '#040509';
      ctx.fillRect(0, 0, w, h);

      // Fine Grid Backdrop
      ctx.strokeStyle = 'rgba(233, 223, 200, 0.03)';
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

      // Dispatch to active simulation renderer
      switch (activeLabKey) {
        case 'recursion_samsara':
          drawRecursionDeck(ctx, w, h, labTime);
          break;
        case 'binary_search_neti':
          drawBinarySearchDeck(ctx, w, h, labTime);
          break;
        case 'indras_net_graphs':
          drawGraphDAGDeck(ctx, w, h, labTime);
          break;
        case 'aparigraha_gc':
          drawGarbageCollectionDeck(ctx, w, h, labTime);
          break;
        case 'dynamic_programming_karma':
          drawDynamicProgrammingDeck(ctx, w, h, labTime);
          break;
        case 'three_gunas_sorting':
          drawSortingEntropyDeck(ctx, w, h, labTime);
          break;
        default:
          drawRecursionDeck(ctx, w, h, labTime);
      }

      requestAnimationFrame(renderMasterLab);
    }
    renderMasterLab();
    updateDynamicControls();
  }

  // --- Specific Simulation Implementations ---

  // Lab A: Recursion and Call Stacks
  function drawRecursionDeck(ctx, w, h, t) {
    const cx = w / 2;
    const cy = h / 2;
    const steps = 7;
    const activeFrame = Math.min(steps, Math.floor((t * 0.8) % (steps + 2)));

    ctx.save();
    ctx.translate(cx, cy);

    for (let i = 0; i < steps; i++) {
      const r = 175 * Math.pow(0.74, i);
      const angle = t * 0.6 + i * 0.7;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      const isAllocated = i <= activeFrame;

      ctx.strokeStyle = isAllocated
        ? `rgba(199, 166, 106, ${0.9 - i * 0.1})`
        : 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = isAllocated ? Math.max(1.5, 4.5 - i * 0.4) : 1;
      ctx.beginPath();
      ctx.arc(x, y, 16 + (steps - i) * 1.5, 0, Math.PI * 2);
      ctx.stroke();

      if (isAllocated) {
        ctx.fillStyle = '#f0f4fc';
        ctx.font = '11px Fira Code, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`Frame #${i + 1}`, x, y + 4);
      }
    }

    // Base Case Core
    const isBaseCase = activeFrame >= steps - 1;
    const pulse = Math.sin(t * 3) * 6 + 18;
    ctx.fillStyle = isBaseCase ? '#4ade80' : '#c7a66a';
    ctx.shadowColor = isBaseCase ? '#22c55e' : '#c7a66a';
    ctx.shadowBlur = pulse;
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#08090d';
    ctx.font = 'bold 8.5px Fira Code, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('BASE CASE', 0, 3);
    ctx.restore();

    if (hudCounter1) hudCounter1.textContent = `Stack Depth: ${activeFrame + 1} / ${steps}`;
    if (hudCounter2) hudCounter2.textContent = isBaseCase ? 'State: Unwinding Memory' : 'State: Pushing Frame';
  }

  // Lab B: Binary Search
  function drawBinarySearchDeck(ctx, w, h, t) {
    const cx = w / 2;
    const cy = h / 2;
    const n = 16;
    const boxW = Math.min(44, (w - 100) / n);
    const startX = cx - (n * boxW) / 2;

    const values = [2, 5, 7, 11, 15, 19, 23, 29, 34, 42, 51, 64, 72, 80, 88, 96];
    const targetIdx = values.indexOf(binSearchTarget) !== -1 ? values.indexOf(binSearchTarget) : 9;

    const step = (Math.floor(t * 0.7) + binSearchStep) % 4;
    let low = 0;
    let high = n - 1;

    for (let s = 0; s < step; s++) {
      const mid = Math.floor((low + high) / 2);
      if (values[mid] === binSearchTarget) {
        low = mid;
        high = mid;
        break;
      } else if (values[mid] < binSearchTarget) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    const currentMid = Math.floor((low + high) / 2);

    for (let i = 0; i < n; i++) {
      const x = startX + i * boxW;
      const isDiscarded = i < low || i > high;
      const isMid = i === currentMid;

      if (isDiscarded) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      } else if (isMid) {
        ctx.fillStyle = 'rgba(199, 166, 106, 0.75)';
        ctx.strokeStyle = '#e2c288';
      } else {
        ctx.fillStyle = 'rgba(100, 232, 255, 0.2)';
        ctx.strokeStyle = '#64e8ff';
      }

      ctx.lineWidth = 1.5;
      ctx.fillRect(x + 2, cy - 25, boxW - 4, 50);
      ctx.strokeRect(x + 2, cy - 25, boxW - 4, 50);

      ctx.fillStyle = '#f0f4fc';
      ctx.font = '12px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(values[i], x + boxW / 2, cy + 4);

      if (isDiscarded) {
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 8.5px Outfit, sans-serif';
        ctx.fillText('PRUNED', x + boxW / 2, cy - 32);
      } else if (isMid) {
        ctx.fillStyle = '#c7a66a';
        ctx.font = 'bold 9px Fira Code, monospace';
        ctx.fillText('MID', x + boxW / 2, cy - 32);
      }
    }

    if (hudCounter1) hudCounter1.textContent = `Target: ${binSearchTarget} (Index ${targetIdx})`;
    if (hudCounter2) hudCounter2.textContent = `Step ${step + 1}: Search Interval [${low}..${high}]`;
  }

  // Lab C: Graph Theory & DAGs
  function drawGraphDAGDeck(ctx, w, h, t) {
    const cx = w / 2;
    const cy = h / 2;
    const nodes = [
      { name: 'Gateway', x: cx - 240, y: cy },
      { name: 'Auth', x: cx - 120, y: cy - 70 },
      { name: 'RateLimit', x: cx - 120, y: cy + 70 },
      { name: 'UserDB', x: cx + 20, y: cy - 90 },
      { name: 'Cache', x: cx + 20, y: cy },
      { name: 'Queue', x: cx + 20, y: cy + 90 },
      { name: 'Worker', x: cx + 180, y: cy + 50 },
      { name: 'Analytics', x: cx + 180, y: cy - 50 },
    ];

    const edges = [
      [0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [4, 7], [5, 6]
    ];

    // Draw Edges
    edges.forEach(([u, v]) => {
      ctx.strokeStyle = 'rgba(100, 232, 255, 0.25)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(nodes[u].x, nodes[u].y);
      ctx.lineTo(nodes[v].x, nodes[v].y);
      ctx.stroke();

      // Flowing Pulse on Edge
      const pulsePos = (t * 0.7 + u * 0.3) % 1;
      const px = nodes[u].x + (nodes[v].x - nodes[u].x) * pulsePos;
      const py = nodes[u].y + (nodes[v].y - nodes[u].y) * pulsePos;
      ctx.fillStyle = '#64e8ff';
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw Nodes
    nodes.forEach((n, idx) => {
      ctx.fillStyle = '#101521';
      ctx.strokeStyle = idx === 0 ? '#c7a66a' : '#64e8ff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#f0f4fc';
      ctx.font = '10px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(n.name, n.x, n.y + 3);
    });

    // Draw click impulses
    for (let i = graphImpulseNodes.length - 1; i >= 0; i--) {
      const imp = graphImpulseNodes[i];
      imp.r += 2.5;
      imp.alpha -= 0.025;

      ctx.strokeStyle = `rgba(100, 232, 255, ${Math.max(0, imp.alpha)})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(imp.x, imp.y, imp.r, 0, Math.PI * 2);
      ctx.stroke();

      if (imp.alpha <= 0) graphImpulseNodes.splice(i, 1);
    }
  }

  // Lab D: Garbage Collection & Heap Optimization
  function drawGarbageCollectionDeck(ctx, w, h, t) {
    const cx = w / 2;
    const cy = h / 2;

    // Root
    ctx.fillStyle = '#64e8ff';
    ctx.beginPath();
    ctx.arc(cx, cy - 120, 24, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#08090d';
    ctx.font = 'bold 9.5px Fira Code, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('GC ROOT', cx, cy - 116);

    const objects = [
      { x: cx - 140, y: cy + 10, live: true, label: 'Session' },
      { x: cx, y: cy - 10, live: true, label: 'AuthToken' },
      { x: cx + 140, y: cy + 10, live: true, label: 'DBPool' },
      { x: cx - 80, y: cy + 110, live: false, label: 'OrphanSocket' },
      { x: cx + 80, y: cy + 110, live: false, label: 'StaleQuery' },
    ];

    objects.forEach((b) => {
      const isDead = !b.live;
      if (isDead && gcPhase === 'sweeping') return;

      let fill = 'rgba(255, 255, 255, 0.1)';
      let stroke = '#6b7280';

      if (b.live) {
        fill = gcPhase === 'marking' ? 'rgba(74, 222, 128, 0.45)' : 'rgba(100, 232, 255, 0.25)';
        stroke = gcPhase === 'marking' ? '#4ade80' : '#64e8ff';
      } else {
        if (gcPhase === 'marking') {
          fill = 'rgba(239, 68, 68, 0.4)';
          stroke = '#ef4444';
        }
      }

      ctx.fillStyle = fill;
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(b.x - 55, b.y - 20, 110, 40, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#f0f4fc';
      ctx.font = '11px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(b.label, b.x, b.y + 4);

      if (b.live) {
        ctx.strokeStyle = 'rgba(100, 232, 255, 0.4)';
        ctx.beginPath();
        ctx.moveTo(cx, cy - 96);
        ctx.lineTo(b.x, b.y - 20);
        ctx.stroke();
      }
    });

    if (hudCounter1) hudCounter1.textContent = `Heap Objects: 3 Live, ${gcPhase === 'sweeping' ? '0 Dead' : '2 Dead'}`;
    if (hudCounter2) hudCounter2.textContent = `Phase: ${gcPhase.toUpperCase()} • Reclaimed: ${gcReclaimedBytes} KB`;
  }

  // Lab E: Dynamic Programming
  function drawDynamicProgrammingDeck(ctx, w, h, t) {
    const cx = w / 2;
    const cy = h / 2;
    const cols = 7;
    const cellW = 55;
    const startX = cx - (cols * cellW) / 2;

    ctx.fillStyle = '#c7a66a';
    ctx.font = 'bold 12px Fira Code, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('MEMOIZATION TABLE dp[0..6]', cx, cy - 70);

    const fibVals = [0, 1, 1, 2, 3, 5, 8];

    for (let i = 0; i < cols; i++) {
      const x = startX + i * cellW;
      const isCalculated = (t * 0.8) % 8 > i;

      ctx.fillStyle = isCalculated ? 'rgba(199, 166, 106, 0.35)' : 'rgba(255, 255, 255, 0.06)';
      ctx.strokeStyle = isCalculated ? '#c7a66a' : '#4b5563';
      ctx.lineWidth = 1.5;
      ctx.fillRect(x + 2, cy - 40, cellW - 4, 48);
      ctx.strokeRect(x + 2, cy - 40, cellW - 4, 48);

      ctx.fillStyle = isCalculated ? '#f0f4fc' : '#6b7280';
      ctx.font = '12px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(isCalculated ? `fib(${i})=${fibVals[i]}` : `dp[${i}]`, x + cellW / 2, cy - 12);
    }

    if (hudCounter1) hudCounter1.textContent = `Mode: ${dpMode.toUpperCase()}`;
    if (hudCounter2) hudCounter2.textContent = dpMode === 'memoized' ? 'Complexity: O(N) Linear Flow' : 'Complexity: O(2^N) Redundant Tree';
  }

  // Lab F: Sorting & Shannon Entropy
  function drawSortingEntropyDeck(ctx, w, h, t) {
    const cx = w / 2;
    const cy = h / 2;
    const count = 18;
    const barW = Math.min(26, (w - 120) / count);
    const startX = cx - (count * barW) / 2;

    for (let i = 0; i < count; i++) {
      const heightVal = 35 + ((i * 16 + Math.sin(t * 2 + i) * 16) % 150);
      const x = startX + i * barW;
      const y = cy + 85 - heightVal;

      let fillCol = '#ef4444';
      if (heightVal > 75) fillCol = '#c7a66a';
      if (heightVal > 115) fillCol = '#64e8ff';

      ctx.fillStyle = fillCol;
      ctx.fillRect(x + 2, y, barW - 4, heightVal);
    }

    const entropyVal = Math.max(0.12, (3.84 - ((t * 0.3) % 3.84))).toFixed(2);
    if (hudCounter1) hudCounter1.textContent = `Shannon Entropy: H(X) = ${entropyVal} bits`;
    if (hudCounter2) hudCounter2.textContent = `Algorithm: ${sortingAlg.toUpperCase()} • Partition Active`;
  }

  // ============================================================================
  // 5. Character Dialogue Console
  // ============================================================================
  const scenarioButtons = document.querySelectorAll('.btn-scenario');
  const dialogueTopicHeading = document.getElementById('dialogue-active-topic');
  const dialogueStream = document.getElementById('console-transcript-stream');
  const dialogueTakeaway = document.getElementById('dialogue-takeaway-text');

  const dialogueTranscripts = {
    stack_overflow: {
      topic: 'The Mystery of the Call Stack Crash',
      takeaway: 'In recursion, base cases are not optional safety nets; they are the mathematical halting invariants that give the function finite termination.',
      turns: [
        { speaker: 'anvay', name: '💡 ANVAY', roleClass: 'cyan', text: 'Acharya, yesterday my recursive function crashed our staging cluster with a Stack Overflow error. Why did allocating frames tear down the whole runtime?' },
        { speaker: 'acharya', name: '🎓 ACHARYA', roleClass: 'gold', text: 'Anvay, every function call claims a slice of finite physical stack memory. Your function lacked a definitive halting boundary. Without a Base Case, recursion continues indefinitely until the hardware intervenes.' },
        { speaker: 'anvay', name: '💡 ANVAY', roleClass: 'cyan', text: 'So the algorithm was executing valid logic, but it lacked the wisdom of when to halt?' },
        { speaker: 'acharya', name: '🎓 ACHARYA', roleClass: 'gold', text: 'Precisely. Every reliable system begins with a boundary. When the Base Case evaluates to true, state stops expanding and begins unwinding—returning memory to equilibrium.' }
      ]
    },
    o1_myth: {
      topic: 'The O(1) Lookup Reality Check',
      takeaway: 'Abstractions leak under extreme load. Amortized constant time requires uniform distribution and predictable load factors.',
      turns: [
        { speaker: 'anvay', name: '💡 ANVAY', roleClass: 'cyan', text: 'I used a Hash Map everywhere assuming constant O(1) lookups, but our p99 latency spiked dramatically under heavy traffic. Isn\'t hash access guaranteed constant time?' },
        { speaker: 'acharya', name: '🎓 ACHARYA', roleClass: 'gold', text: 'Constant time in a hash table is amortized, not absolute. When your hash function produces excessive collisions, or when the load factor triggers an internal table resizing, O(1) degrades toward O(N).' },
        { speaker: 'anvay', name: '💡 ANVAY', roleClass: 'cyan', text: 'So the worst-case scenario isn\'t just theoretical—it directly degrades production response times?' },
        { speaker: 'acharya', name: '🎓 ACHARYA', roleClass: 'gold', text: 'Indeed. High-performance engineering requires understanding the hidden machinery beneath the abstraction: uniform distribution, bucket resizing overhead, and cache locality.' }
      ]
    },
    memory_leak: {
      topic: 'The Phantom Memory Leak',
      takeaway: 'Garbage collectors only sweep what is strictly unreachable. Retaining unneeded root pointers is the primary cause of modern memory exhaustion.',
      turns: [
        { speaker: 'anvay', name: '💡 ANVAY', roleClass: 'cyan', text: 'Our server heap was climbing continuously until the Out-Of-Memory killer terminated the container. But our language has an automatic garbage collector! How could memory leak?' },
        { speaker: 'acharya', name: '🎓 ACHARYA', roleClass: 'gold', text: 'An automatic Garbage Collector only reclaims objects that are unreachable from the GC roots. If an unused object remains connected through an event listener, static cache, or global set, it is considered alive.' },
        { speaker: 'anvay', name: '💡 ANVAY', roleClass: 'cyan', text: 'So memory doesn\'t leak because the collector failed; it leaks because our code clung to pointers it no longer needed.' },
        { speaker: 'acharya', name: '🎓 ACHARYA', roleClass: 'gold', text: 'Exactly. The collector cannot judge your intent. Detach dead references explicitly, and the runtime will keep your heap pristine.' }
      ]
    }
  };

  scenarioButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      scenarioButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const scenarioId = btn.dataset.dialogueId;
      const data = dialogueTranscripts[scenarioId];
      if (data && dialogueStream) {
        if (dialogueTopicHeading) dialogueTopicHeading.textContent = data.topic;
        if (dialogueTakeaway) dialogueTakeaway.textContent = data.takeaway;

        dialogueStream.innerHTML = '';
        data.turns.forEach((turn) => {
          const turnEl = document.createElement('div');
          turnEl.className = `transcript-turn turn-${turn.speaker}`;
          turnEl.innerHTML = `
            <div class="turn-speaker-badge">
              <span class="speaker-tag ${turn.roleClass}">${turn.name}</span>
            </div>
            <div class="turn-bubble">
              <p>${turn.text}</p>
            </div>
          `;
          dialogueStream.appendChild(turnEl);
        });
      }
    });
  });

  // ============================================================================
  // 6. Architecture Chronicles Visualizer Canvas
  // ============================================================================
  const archCanvas = document.getElementById('architecture-diagram-canvas');
  const chronicleCards = document.querySelectorAll('.chronicle-card');
  const archStageTag = document.getElementById('arch-stage-tag');
  const archStageMetric = document.getElementById('arch-stage-metric');
  const archRuleText = document.getElementById('arch-rule-text');
  const archHudReadout = document.getElementById('arch-hud-readout');

  let activeChronicleId = 'load_balancing';
  let archTime = 0;

  const chronicleConfigs = {
    load_balancing: {
      tag: 'TOPOLOGY // CONSISTENT HASHING RING',
      metric: 'Throughput: 10M Req/s • Latency: <12ms',
      rule: 'Never let single nodes bear unbound load; decouple traffic ingestion from execution via hashing rings.',
      hud: 'Incoming request stream hashed deterministically across active node cluster ring.',
    },
    caching_locality: {
      tag: 'TOPOLOGY // LRU CACHE-ASIDE PIPELINE',
      metric: 'Hit Ratio: 98.4% • Sub-millisecond Read',
      rule: 'Cache read-heavy hot partitions, but always establish deterministic TTLs and eviction policies to prevent stale state.',
      hud: 'Temporal locality: client queries resolved in RAM before reaching relational disk.',
    },
    db_indexing: {
      tag: 'TOPOLOGY // B+ TREE STORAGE HIERARCHY',
      metric: 'Lookup: O(log N) • Page Size: 16KB',
      rule: 'Index columns selectively; each secondary index accelerates reads at the direct expense of write throughput.',
      hud: 'Root and internal branches guide binary disk page traversal down to linked leaf nodes.',
    },
    distributed_consensus: {
      tag: 'TOPOLOGY // RAFT LEADER & QUORUM CLUSTER',
      metric: 'Quorum: floor(N/2)+1 • Zero Split-Brain',
      rule: 'In network partitions, prioritize either Consistency or Availability (CAP theorem); never pretend both can be maximized simultaneously.',
      hud: 'Leader coordinates replicated log entries across quorum majority peers.',
    },
    message_queues: {
      tag: 'TOPOLOGY // KAFKA PARTITIONED STREAM',
      metric: 'Streaming: 100K Events/Sec • Linear Horizontal Scale',
      rule: 'Decouple synchronous inter-service calls with durable event queues to isolate failure domains.',
      hud: 'Append-only message log buffer decouples high-throughput ingest from consumer workers.',
    },
    fault_tolerance: {
      tag: 'TOPOLOGY // CIRCUIT BREAKER STATE MACHINE',
      metric: 'States: CLOSED → OPEN → HALF-OPEN',
      rule: 'Always wrap remote RPCs in circuit breakers and exponential backoff with randomized jitter.',
      hud: 'Detects downstream timeout storms and trips open to prevent cascading cluster failure.',
    },
  };

  chronicleCards.forEach((card) => {
    card.addEventListener('click', () => {
      chronicleCards.forEach((c) => c.classList.remove('active'));
      card.classList.add('active');

      activeChronicleId = card.dataset.chronicle;
      const cfg = chronicleConfigs[activeChronicleId];
      if (cfg) {
        if (archStageTag) archStageTag.textContent = cfg.tag;
        if (archStageMetric) archStageMetric.textContent = cfg.metric;
        if (archRuleText) archRuleText.textContent = cfg.rule;
        if (archHudReadout) archHudReadout.innerHTML = `<span>${cfg.hud}</span>`;
      }
    });
  });

  if (archCanvas) {
    const ctx = archCanvas.getContext('2d');
    const w = archCanvas.width;
    const h = archCanvas.height;

    function renderArchDiagram() {
      archTime += 0.02;
      ctx.fillStyle = '#040508';
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Draw active topology based on activeChronicleId
      switch (activeChronicleId) {
        case 'load_balancing':
          drawConsistentHashingRing(ctx, cx, cy, archTime);
          break;
        case 'caching_locality':
          drawCachePipeline(ctx, cx, cy, archTime);
          break;
        case 'db_indexing':
          drawBPlusTree(ctx, cx, cy, archTime);
          break;
        case 'distributed_consensus':
          drawRaftCluster(ctx, cx, cy, archTime);
          break;
        case 'message_queues':
          drawKafkaStream(ctx, cx, cy, archTime);
          break;
        case 'fault_tolerance':
          drawCircuitBreaker(ctx, cx, cy, archTime);
          break;
        default:
          drawConsistentHashingRing(ctx, cx, cy, archTime);
      }

      requestAnimationFrame(renderArchDiagram);
    }
    renderArchDiagram();
  }

  function drawConsistentHashingRing(ctx, cx, cy, t) {
    const r = 130;
    ctx.strokeStyle = 'rgba(100, 232, 255, 0.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    // 4 Nodes on the ring
    const nodes = [
      { angle: 0, name: 'Node A' },
      { angle: Math.PI / 2, name: 'Node B' },
      { angle: Math.PI, name: 'Node C' },
      { angle: (3 * Math.PI) / 2, name: 'Node D' },
    ];

    nodes.forEach((n) => {
      const nx = cx + Math.cos(n.angle) * r;
      const ny = cy + Math.sin(n.angle) * r;

      ctx.fillStyle = '#c7a66a';
      ctx.beginPath();
      ctx.arc(nx, ny, 16, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#08090d';
      ctx.font = 'bold 9px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(n.name, nx, ny + 3);
    });

    // Orbiting request packets
    for (let i = 0; i < 4; i++) {
      const pAngle = (t * 0.8 + (i * Math.PI) / 2) % (Math.PI * 2);
      const px = cx + Math.cos(pAngle) * r;
      const py = cy + Math.sin(pAngle) * r;

      ctx.fillStyle = '#64e8ff';
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawCachePipeline(ctx, cx, cy, t) {
    // Client -> Cache -> DB
    const points = [
      { x: cx - 180, y: cy, label: 'Client', col: '#64e8ff' },
      { x: cx, y: cy, label: 'LRU Cache', col: '#c7a66a' },
      { x: cx + 180, y: cy, label: 'Database', col: '#9a8cff' },
    ];

    // Connectors
    ctx.strokeStyle = 'rgba(233, 223, 200, 0.25)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(points[0].x, cy);
    ctx.lineTo(points[2].x, cy);
    ctx.stroke();

    points.forEach((p) => {
      ctx.fillStyle = '#101521';
      ctx.strokeStyle = p.col;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(p.x - 50, p.y - 25, 100, 50, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = p.col;
      ctx.font = 'bold 11px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(p.label, p.x, p.y + 4);
    });
  }

  function drawBPlusTree(ctx, cx, cy, t) {
    ctx.fillStyle = '#c7a66a';
    ctx.font = '11px Fira Code, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('B+ Tree Index Root', cx, cy - 90);

    // Tree levels
    ctx.strokeStyle = 'rgba(100, 232, 255, 0.35)';
    ctx.beginPath();
    ctx.moveTo(cx, cy - 75);
    ctx.lineTo(cx - 120, cy);
    ctx.moveTo(cx, cy - 75);
    ctx.lineTo(cx + 120, cy);
    ctx.stroke();

    [-120, 120].forEach((ox) => {
      ctx.fillStyle = '#101521';
      ctx.strokeStyle = '#64e8ff';
      ctx.beginPath();
      ctx.roundRect(cx + ox - 40, cy - 15, 80, 30, 4);
      ctx.fill();
      ctx.stroke();
    });
  }

  function drawRaftCluster(ctx, cx, cy, t) {
    // Leader in center
    ctx.fillStyle = '#c7a66a';
    ctx.beginPath();
    ctx.arc(cx, cy, 28, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#08090d';
    ctx.font = 'bold 9.5px Fira Code, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('LEADER', cx, cy + 3);

    // 4 Followers around
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      const fx = cx + Math.cos(a) * 120;
      const fy = cy + Math.sin(a) * 120;

      // Heartbeat line
      ctx.strokeStyle = 'rgba(100, 232, 255, 0.3)';
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(fx, fy);
      ctx.stroke();

      ctx.fillStyle = '#101521';
      ctx.strokeStyle = '#64e8ff';
      ctx.beginPath();
      ctx.arc(fx, fy, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#f0f4fc';
      ctx.font = '8px Fira Code, monospace';
      ctx.fillText(`Peer ${i + 1}`, fx, fy + 3);
    }
  }

  function drawKafkaStream(ctx, cx, cy, t) {
    ctx.fillStyle = '#64e8ff';
    ctx.font = '11px Fira Code, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Topic: telemetry-events [Partition 0..2]', cx, cy - 80);

    for (let p = 0; p < 3; p++) {
      const py = cy - 40 + p * 45;
      ctx.strokeStyle = 'rgba(233, 223, 200, 0.2)';
      ctx.strokeRect(cx - 180, py, 360, 32);

      // Moving message blocks
      for (let m = 0; m < 5; m++) {
        const mx = cx - 160 + ((m * 60 + t * 40) % 320);
        ctx.fillStyle = '#c7a66a';
        ctx.fillRect(mx, py + 4, 35, 24);
      }
    }
  }

  function drawCircuitBreaker(ctx, cx, cy, t) {
    const states = [
      { name: 'CLOSED (OK)', x: cx - 140, y: cy, col: '#4ade80' },
      { name: 'OPEN (TRIPPED)', x: cx, y: cy - 70, col: '#ef4444' },
      { name: 'HALF-OPEN', x: cx + 140, y: cy, col: '#c7a66a' },
    ];

    states.forEach((s) => {
      ctx.fillStyle = '#101521';
      ctx.strokeStyle = s.col;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(s.x - 55, s.y - 20, 110, 40, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = s.col;
      ctx.font = 'bold 9.5px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(s.name, s.x, s.y + 4);
    });
  }

  // ============================================================================
  // 7. Curriculum "Launch Lab" Action Buttons
  // ============================================================================
  const launchLabButtons = document.querySelectorAll('.btn-launch-lab');
  launchLabButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetLab = btn.dataset.targetLab;
      if (targetLab) {
        switchLab(targetLab);
        const labsSection = document.getElementById('labs');
        if (labsSection) {
          labsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // ============================================================================
  // 8. Navigation & Active Section Indicator
  // ============================================================================
  const siteNav = document.getElementById('site-nav');
  const navMobileToggle = document.getElementById('nav-mobile-toggle');
  const navMobileDrawer = document.getElementById('nav-mobile-drawer');
  const navItems = document.querySelectorAll('.nav-menu .nav-item');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link');

  // Navbar scroll background
  window.addEventListener('scroll', () => {
    if (siteNav) {
      siteNav.classList.toggle('nav-scrolled', window.scrollY > 40);
    }
  });

  // Mobile drawer toggle
  if (navMobileToggle && navMobileDrawer) {
    navMobileToggle.addEventListener('click', () => {
      const isOpen = navMobileDrawer.classList.toggle('is-open');
      navMobileToggle.classList.toggle('is-active', isOpen);
      navMobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navMobileDrawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });

    drawerLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMobileDrawer.classList.remove('is-open');
        navMobileToggle.classList.remove('is-active');
        navMobileToggle.setAttribute('aria-expanded', 'false');
        navMobileDrawer.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // IntersectionObserver for active section highlight
  const observedSections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window && observedSections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            navItems.forEach((item) => {
              item.classList.toggle('active', item.getAttribute('href') === `#${sectionId}`);
            });
          }
        });
      },
      { threshold: 0.25, rootMargin: '-76px 0px 0px 0px' }
    );

    observedSections.forEach((s) => observer.observe(s));
  }
})();
