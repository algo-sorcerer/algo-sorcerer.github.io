/**
 * AlgoSorcerer World — Interactive Digital Universe & Laboratory Engine
 * Award-Winning Procedural Simulations & System Architecture Canvas
 * "Ancient wisdom. Algorithmic thinking. Infinite possibilities."
 */

(function () {
  'use strict';

  // ============================================================================
  // Canvas HiDPI / Retina Helper
  // ============================================================================
  function setupHiDpi(canvas) {
    if (!canvas) return null;
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for high performance
    const rect = canvas.getBoundingClientRect();
    const displayWidth = Math.floor(rect.width || canvas.width);
    const displayHeight = Math.floor(rect.height || canvas.height);

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w: displayWidth, h: displayHeight, dpr };
  }

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
    const count = Math.min(75, Math.floor(width / 20));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2.2 + 0.8,
        color: Math.random() > 0.4 ? 'rgba(100, 232, 255, ' : 'rgba(199, 166, 106, ',
        alpha: Math.random() * 0.5 + 0.15,
        phase: Math.random() * Math.PI * 2,
      });
    }

    function animateAmbient() {
      ctx.clearRect(0, 0, width, height);

      // Draw Constellation Edges
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 125) {
            const edgeAlpha = 0.14 * (1 - dist / 125);
            ctx.strokeStyle = `rgba(100, 232, 255, ${edgeAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw Luminous Nodes
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.02;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pulseAlpha = p.alpha * (0.8 + 0.2 * Math.sin(p.phase));
        ctx.fillStyle = p.color + pulseAlpha + ')';
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
    let t = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      const rect = heroPortalCanvas.getBoundingClientRect();
      targetMouseX = ((e.clientX - (rect.left + rect.width / 2)) / rect.width) * 2;
      targetMouseY = ((e.clientY - (rect.top + rect.height / 2)) / rect.height) * 2;
    });

    function renderHeroPortal() {
      const dpi = setupHiDpi(heroPortalCanvas);
      if (!dpi) return;
      const { ctx, w, h } = dpi;
      ctx.clearRect(0, 0, w, h);

      // Smooth mouse damping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const cx = w / 2 + mouseX * 18;
      const cy = h / 2 + mouseY * 18;
      t += 0.016;

      ctx.save();
      ctx.translate(cx, cy);

      // 1. Ambient Background Glow Core
      const radialGlow = ctx.createRadialGradient(0, 0, 10, 0, 0, 240);
      radialGlow.addColorStop(0, 'rgba(199, 166, 106, 0.25)');
      radialGlow.addColorStop(0.35, 'rgba(100, 232, 255, 0.12)');
      radialGlow.addColorStop(0.7, 'rgba(154, 140, 255, 0.04)');
      radialGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(0, 0, 240, 0, Math.PI * 2);
      ctx.fill();

      // 2. Outer Astrolabe Gauge Ring with Degree Ticks
      ctx.strokeStyle = 'rgba(199, 166, 106, 0.28)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, 210, 0, Math.PI * 2);
      ctx.stroke();

      for (let i = 0; i < 72; i++) {
        const angle = (i * Math.PI * 2) / 72 + t * 0.08;
        const isMajor = i % 9 === 0;
        const len = isMajor ? 10 : 4;
        const r1 = 210;
        const r2 = 210 - len;

        ctx.strokeStyle = isMajor ? '#c7a66a' : 'rgba(199, 166, 106, 0.25)';
        ctx.lineWidth = isMajor ? 1.5 : 0.8;
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * r1, Math.sin(angle) * r1);
        ctx.lineTo(Math.cos(angle) * r2, Math.sin(angle) * r2);
        ctx.stroke();
      }

      // 3. Concentric Orbital Resonance Rings
      for (let r = 70; r <= 180; r += 26) {
        ctx.strokeStyle = `rgba(100, 232, 255, ${0.12 + (r / 200) * 0.16})`;
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 4. Rotating Sacred Algorithmic Geometry (Clockwise Octagon Matrix)
      ctx.save();
      ctx.rotate(t * 0.35);
      for (let i = 0; i < 8; i++) {
        const polyGrad = ctx.createLinearGradient(0, 40, 140, 140);
        polyGrad.addColorStop(0, 'rgba(100, 232, 255, 0.6)');
        polyGrad.addColorStop(1, 'rgba(199, 166, 106, 0.25)');

        ctx.strokeStyle = polyGrad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.rotate((Math.PI * 2) / 8);
        ctx.moveTo(0, 48);
        ctx.lineTo(95, 135);
        ctx.lineTo(135, 95);
        ctx.closePath();
        ctx.stroke();

        // Subtle luminous vertex node
        ctx.fillStyle = '#64e8ff';
        ctx.shadowColor = '#64e8ff';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(95, 135, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.restore();

      // 5. Counter-Rotating Hexagonal Mathematical Core (Counter-Clockwise)
      ctx.save();
      ctx.rotate(-t * 0.5);
      for (let i = 0; i < 6; i++) {
        ctx.strokeStyle = 'rgba(199, 166, 106, 0.45)';
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.rotate((Math.PI * 2) / 6);
        ctx.moveTo(0, 28);
        ctx.lineTo(70, 70);
        ctx.lineTo(70, -25);
        ctx.closePath();
        ctx.stroke();
      }
      ctx.restore();

      // 6. Orbiting Algorithmic Nodes with Energy Beams
      const nodeCount = 6;
      for (let i = 0; i < nodeCount; i++) {
        const orbitR = 145 + Math.sin(t * 2 + i * 1.5) * 16;
        const angle = t * 0.75 + (i * Math.PI * 2) / nodeCount;
        const nx = Math.cos(angle) * orbitR;
        const ny = Math.sin(angle) * orbitR;

        // Thin radiant connector to center
        ctx.strokeStyle = `rgba(100, 232, 255, ${0.12 + 0.08 * Math.sin(t * 3 + i)})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        // Node Glow Sphere
        const isGold = i % 2 === 0;
        ctx.fillStyle = isGold ? '#e2c288' : '#64e8ff';
        ctx.shadowColor = isGold ? '#c7a66a' : '#64e8ff';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(nx, ny, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Orbiting Micro Halo
        ctx.strokeStyle = isGold ? 'rgba(199, 166, 106, 0.4)' : 'rgba(100, 232, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(nx, ny, 9, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 7. Central Hyper-Dimensional Crystal Core
      const corePulse = Math.sin(t * 3.5) * 6 + 22;
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#64e8ff';
      ctx.shadowBlur = corePulse;
      ctx.beginPath();
      ctx.arc(0, 0, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Inner Symbol rotation
      ctx.save();
      ctx.rotate(t * 0.2);
      ctx.fillStyle = '#08090d';
      ctx.font = 'bold 9.5px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('{ }', 0, 3.5);
      ctx.restore();

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
    let samsaraStep = 1;
    const maxStack = 6;
    let samsaraAnimTime = 0;
    let shockwaveR = 0;

    function renderSamsara() {
      const dpi = setupHiDpi(samsaraCanvas);
      if (!dpi) return;
      const { ctx, w, h } = dpi;

      samsaraAnimTime += 0.02;
      ctx.fillStyle = '#040508';
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Fine coordinate grid backdrop
      ctx.strokeStyle = 'rgba(233, 223, 200, 0.04)';
      ctx.lineWidth = 0.8;
      for (let x = 0; x < w; x += 35) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 35) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      ctx.save();
      ctx.translate(cx, cy);

      const isBaseCase = samsaraStep >= maxStack;

      // Golden Spiral Parametric Curve
      ctx.strokeStyle = 'rgba(199, 166, 106, 0.2)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let a = 0; a < Math.PI * 4; a += 0.08) {
        const rad = 22 * Math.exp(0.18 * a);
        const sx = Math.cos(a + samsaraAnimTime * 0.4) * rad;
        const sy = Math.sin(a + samsaraAnimTime * 0.4) * rad;
        if (a === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();

      // Draw Recursive Stack Frames
      for (let i = 0; i < samsaraStep; i++) {
        const r = 165 * Math.pow(0.75, i);
        const rot = samsaraAnimTime * 0.5 + i * 0.65;
        const x = Math.cos(rot) * r;
        const y = Math.sin(rot) * r;

        // Glowing connection ray to center
        ctx.strokeStyle = `rgba(100, 232, 255, ${0.15 + (i / maxStack) * 0.25})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Stack Frame Capsule Box
        const cardW = 92;
        const cardH = 34;
        ctx.save();
        ctx.translate(x, y);

        // Frame Glow
        const isCurrentActive = i === samsaraStep - 1;
        ctx.fillStyle = isCurrentActive ? 'rgba(16, 26, 44, 0.95)' : 'rgba(8, 12, 20, 0.85)';
        ctx.strokeStyle = isCurrentActive ? '#64e8ff' : 'rgba(199, 166, 106, 0.45)';
        ctx.lineWidth = isCurrentActive ? 2 : 1;
        ctx.shadowColor = isCurrentActive ? '#64e8ff' : 'rgba(0,0,0,0)';
        ctx.shadowBlur = isCurrentActive ? 15 : 0;

        ctx.beginPath();
        ctx.roundRect(-cardW / 2, -cardH / 2, cardW, cardH, 6);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Frame text: Frame number & Memory offset
        ctx.fillStyle = isCurrentActive ? '#64e8ff' : '#e2c288';
        ctx.font = 'bold 10px Fira Code, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`Frame #${i + 1}`, 0, -3);

        ctx.fillStyle = '#a3a9b8';
        ctx.font = '8.5px Fira Code, monospace';
        ctx.fillText(`0x7FF${(80 - i * 16).toString(16).toUpperCase()}`, 0, 9);

        ctx.restore();
      }

      // Shockwave ring when Base Case is active
      if (isBaseCase) {
        shockwaveR = (shockwaveR + 2.5) % 220;
        ctx.strokeStyle = `rgba(74, 222, 128, ${Math.max(0, 0.7 - shockwaveR / 220)})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, shockwaveR, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        shockwaveR = 0;
      }

      // Central Base Case Anchor Beacon
      const glow = Math.sin(samsaraAnimTime * 4) * 8 + 20;
      ctx.fillStyle = isBaseCase ? '#4ade80' : '#e2c288';
      ctx.shadowColor = isBaseCase ? '#22c55e' : '#c7a66a';
      ctx.shadowBlur = isBaseCase ? 28 : glow;
      ctx.beginPath();
      ctx.arc(0, 0, isBaseCase ? 22 : 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#08090d';
      ctx.font = 'bold 8.5px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(isBaseCase ? 'BASE' : 'ENTRY', 0, 3);

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
          samsaraStep >= maxStack ? 'State: Base Case Met (Unwinding Memory)' : 'State: Pushing Stack Frame';
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
      counter1: 'Active Nodes: 8 Services',
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
    // Handle canvas clicks for interactive graph impulses
    masterCanvas.addEventListener('click', (e) => {
      const rect = masterCanvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      graphImpulseNodes.push({ x: clickX, y: clickY, r: 0, alpha: 1.0 });
    });

    function renderMasterLab() {
      const dpi = setupHiDpi(masterCanvas);
      if (!dpi) return;
      const { ctx, w, h } = dpi;

      if (isLabPlaying) {
        labTime += 0.02;
      }

      ctx.fillStyle = '#040509';
      ctx.fillRect(0, 0, w, h);

      // Fine Futuristic Grid Backdrop
      ctx.strokeStyle = 'rgba(233, 223, 200, 0.035)';
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

      // Tech Corner Brackets (┌ ┐ └ ┘)
      ctx.strokeStyle = 'rgba(100, 232, 255, 0.3)';
      ctx.lineWidth = 1.5;
      const cornerSize = 14;
      // Top-Left
      ctx.beginPath();
      ctx.moveTo(14, 14 + cornerSize);
      ctx.lineTo(14, 14);
      ctx.lineTo(14 + cornerSize, 14);
      ctx.stroke();
      // Top-Right
      ctx.beginPath();
      ctx.moveTo(w - 14 - cornerSize, 14);
      ctx.lineTo(w - 14, 14);
      ctx.lineTo(w - 14, 14 + cornerSize);
      ctx.stroke();
      // Bottom-Left
      ctx.beginPath();
      ctx.moveTo(14, h - 14 - cornerSize);
      ctx.lineTo(14, h - 14);
      ctx.lineTo(14 + cornerSize, h - 14);
      ctx.stroke();
      // Bottom-Right
      ctx.beginPath();
      ctx.moveTo(w - 14 - cornerSize, h - 14);
      ctx.lineTo(w - 14, h - 14);
      ctx.lineTo(w - 14, h - 14 - cornerSize);
      ctx.stroke();

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

  // Lab A: Recursion and Call Stacks (Isometric Stack Towers & Wave Unwind)
  function drawRecursionDeck(ctx, w, h, t) {
    const cx = w / 2;
    const cy = h / 2;
    const steps = 7;
    const activeFrame = Math.min(steps, Math.floor((t * 0.8) % (steps + 2)));
    const isBaseCase = activeFrame >= steps - 1;

    ctx.save();
    ctx.translate(cx, cy);

    // Glowing Spiral Background Orbit
    ctx.strokeStyle = 'rgba(199, 166, 106, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, 180, 0, Math.PI * 2);
    ctx.stroke();

    for (let i = 0; i < steps; i++) {
      const r = 180 * Math.pow(0.74, i);
      const angle = t * 0.5 + i * 0.72;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      const isAllocated = i <= activeFrame;

      // Connecting Laser Line
      ctx.strokeStyle = isAllocated
        ? `rgba(100, 232, 255, ${0.2 + (i / steps) * 0.5})`
        : 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = isAllocated ? 1.5 : 0.8;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(x, y);
      ctx.stroke();

      // Memory Frame Capsule Card
      ctx.save();
      ctx.translate(x, y);
      const isCurrent = i === activeFrame;

      ctx.fillStyle = isCurrent
        ? 'rgba(16, 26, 44, 0.95)'
        : isAllocated
        ? 'rgba(12, 16, 28, 0.85)'
        : 'rgba(8, 10, 16, 0.5)';
      ctx.strokeStyle = isCurrent ? '#64e8ff' : isAllocated ? '#c7a66a' : 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = isCurrent ? 2 : 1;
      ctx.shadowColor = isCurrent ? '#64e8ff' : 'transparent';
      ctx.shadowBlur = isCurrent ? 16 : 0;

      ctx.beginPath();
      ctx.roundRect(-46, -18, 92, 36, 6);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Frame text readouts
      ctx.fillStyle = isAllocated ? '#f0f4fc' : '#6b7280';
      ctx.font = 'bold 9.5px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`Frame #${i + 1}`, 0, -2);

      ctx.fillStyle = isCurrent ? '#64e8ff' : '#a3a9b8';
      ctx.font = '8px Fira Code, monospace';
      ctx.fillText(`n=${steps - i} [ret 0x${(i * 4).toString(16)}]`, 0, 10);

      ctx.restore();
    }

    // Central Base Case Invariant Core
    const pulse = Math.sin(t * 3.5) * 6 + 20;
    ctx.fillStyle = isBaseCase ? '#4ade80' : '#c7a66a';
    ctx.shadowColor = isBaseCase ? '#22c55e' : '#c7a66a';
    ctx.shadowBlur = isBaseCase ? 32 : pulse;
    ctx.beginPath();
    ctx.arc(0, 0, isBaseCase ? 22 : 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#08090d';
    ctx.font = 'bold 8px Fira Code, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(isBaseCase ? 'BASE' : 'HALT', 0, 3);

    ctx.restore();

    if (hudCounter1) hudCounter1.textContent = `Stack Depth: ${activeFrame + 1} / ${steps}`;
    if (hudCounter2) hudCounter2.textContent = isBaseCase ? 'State: Unwinding Call Stack' : 'State: Pushing Frame Record';
  }

  // Lab B: Binary Search (Holographic Laser Calipers & Elimination)
  function drawBinarySearchDeck(ctx, w, h, t) {
    const cx = w / 2;
    const cy = h / 2;
    const n = 16;
    const boxW = Math.min(46, (w - 120) / n);
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

    // Draw Top Caliper Indicators [LOW] [MID] [HIGH]
    const lowX = startX + low * boxW + boxW / 2;
    const highX = startX + high * boxW + boxW / 2;
    const midX = startX + currentMid * boxW + boxW / 2;

    // Laser Range Beam between Low and High
    ctx.strokeStyle = 'rgba(100, 232, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(lowX, cy - 54);
    ctx.lineTo(highX, cy - 54);
    ctx.stroke();

    // Caliper Pointers
    [
      { x: lowX, label: 'LOW', col: '#64e8ff' },
      { x: midX, label: 'MID', col: '#e2c288' },
      { x: highX, label: 'HIGH', col: '#64e8ff' },
    ].forEach((cal) => {
      ctx.fillStyle = cal.col;
      ctx.font = 'bold 9px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(cal.label, cal.x, cy - 62);

      ctx.beginPath();
      ctx.moveTo(cal.x, cy - 50);
      ctx.lineTo(cal.x, cy - 35);
      ctx.strokeStyle = cal.col;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // Array Memory Cells
    for (let i = 0; i < n; i++) {
      const x = startX + i * boxW;
      const isDiscarded = i < low || i > high;
      const isMid = i === currentMid;
      const isTarget = values[i] === binSearchTarget;

      ctx.save();
      if (isDiscarded) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.lineWidth = 1;
      } else if (isMid) {
        ctx.fillStyle = 'rgba(199, 166, 106, 0.85)';
        ctx.strokeStyle = '#e2c288';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#c7a66a';
        ctx.shadowBlur = 12;
      } else {
        ctx.fillStyle = 'rgba(16, 25, 42, 0.8)';
        ctx.strokeStyle = 'rgba(100, 232, 255, 0.35)';
        ctx.lineWidth = 1.2;
      }

      ctx.beginPath();
      ctx.roundRect(x + 2, cy - 25, boxW - 4, 52, 6);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Index and Value
      ctx.fillStyle = isMid ? '#08090d' : isDiscarded ? '#4b5563' : '#f0f4fc';
      ctx.font = 'bold 12px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(values[i], x + boxW / 2, cy + 6);

      // Index label below
      ctx.fillStyle = '#6b7280';
      ctx.font = '8.5px Fira Code, monospace';
      ctx.fillText(`[${i}]`, x + boxW / 2, cy + 42);

      if (isDiscarded) {
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 8px Outfit, sans-serif';
        ctx.fillText('PRUNED', x + boxW / 2, cy - 32);
      }
      ctx.restore();
    }

    if (hudCounter1) hudCounter1.textContent = `Target Key: ${binSearchTarget} (Index ${targetIdx})`;
    if (hudCounter2) hudCounter2.textContent = `Step ${step + 1}: Remaining Interval [${low}..${high}]`;
  }

  // Lab C: Graph Theory & Distributed DAGs (Curved Beziers & Packet Impulses)
  function drawGraphDAGDeck(ctx, w, h, t) {
    const cx = w / 2;
    const cy = h / 2;
    const nodes = [
      { name: 'Gateway', x: cx - 250, y: cy, col: '#c7a66a', status: '200 OK' },
      { name: 'Auth', x: cx - 130, y: cy - 75, col: '#64e8ff', status: '1.2ms' },
      { name: 'RateLimit', x: cx - 130, y: cy + 75, col: '#64e8ff', status: '0.4ms' },
      { name: 'UserDB', x: cx + 20, y: cy - 95, col: '#9a8cff', status: 'Sharded' },
      { name: 'Cache', x: cx + 20, y: cy, col: '#c7a66a', status: 'Hit 99%' },
      { name: 'Queue', x: cx + 20, y: cy + 95, col: '#64e8ff', status: 'Kafka' },
      { name: 'Worker', x: cx + 190, y: cy + 55, col: '#4ade80', status: 'Idle' },
      { name: 'Analytics', x: cx + 190, y: cy - 55, col: '#9a8cff', status: 'Stream' },
    ];

    const edges = [
      [0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [4, 7], [5, 6]
    ];

    // Draw Smooth Curved Bezier Edges
    edges.forEach(([u, v]) => {
      const p1 = nodes[u];
      const p2 = nodes[v];
      const midX = (p1.x + p2.x) / 2;

      ctx.strokeStyle = 'rgba(100, 232, 255, 0.28)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.bezierCurveTo(midX, p1.y, midX, p2.y, p2.x, p2.y);
      ctx.stroke();

      // Flowing Energy Packet along the curve
      const flowT = (t * 0.75 + (u + v) * 0.25) % 1;
      const bx = (1 - flowT) * (1 - flowT) * p1.x + 2 * (1 - flowT) * flowT * midX + flowT * flowT * p2.x;
      const by = (1 - flowT) * (1 - flowT) * p1.y + 2 * (1 - flowT) * flowT * ((p1.y + p2.y) / 2) + flowT * flowT * p2.y;

      ctx.fillStyle = '#64e8ff';
      ctx.shadowColor = '#64e8ff';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Draw Microservice Nodes
    nodes.forEach((n) => {
      ctx.save();
      ctx.translate(n.x, n.y);

      // Node Backdrop Card
      ctx.fillStyle = '#101521';
      ctx.strokeStyle = n.col;
      ctx.lineWidth = 1.8;
      ctx.shadowColor = n.col;
      ctx.shadowBlur = 10;

      ctx.beginPath();
      ctx.roundRect(-38, -20, 76, 40, 6);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Node Name & Status
      ctx.fillStyle = '#f0f4fc';
      ctx.font = 'bold 9.5px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(n.name, 0, -2);

      ctx.fillStyle = n.col;
      ctx.font = '8px Fira Code, monospace';
      ctx.fillText(n.status, 0, 10);

      ctx.restore();
    });

    // Draw user click shockwaves
    for (let i = graphImpulseNodes.length - 1; i >= 0; i--) {
      const imp = graphImpulseNodes[i];
      imp.r += 3;
      imp.alpha -= 0.03;

      ctx.strokeStyle = `rgba(100, 232, 255, ${Math.max(0, imp.alpha)})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(imp.x, imp.y, imp.r, 0, Math.PI * 2);
      ctx.stroke();

      if (imp.alpha <= 0) graphImpulseNodes.splice(i, 1);
    }
  }

  // Lab D: Garbage Collection & Heap Memory (Scanning Radar & Reclaim Particles)
  function drawGarbageCollectionDeck(ctx, w, h, t) {
    const cx = w / 2;
    const cy = h / 2;

    // GC Root Node (Stack/Registers)
    ctx.save();
    ctx.fillStyle = '#101521';
    ctx.strokeStyle = '#64e8ff';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#64e8ff';
    ctx.shadowBlur = 14;

    ctx.beginPath();
    ctx.roundRect(cx - 55, cy - 145, 110, 36, 6);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#64e8ff';
    ctx.font = 'bold 10px Fira Code, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('⚡ GC ROOT', cx, cy - 128);
    ctx.restore();

    // Heap Objects
    const objects = [
      { x: cx - 150, y: cy + 10, live: true, label: 'UserSession', size: '32KB' },
      { x: cx, y: cy - 10, live: true, label: 'AuthToken', size: '16KB' },
      { x: cx + 150, y: cy + 10, live: true, label: 'DBPool', size: '64KB' },
      { x: cx - 90, y: cy + 115, live: false, label: 'OrphanSocket', size: '48KB' },
      { x: cx + 90, y: cy + 115, live: false, label: 'StaleQuery', size: '80KB' },
    ];

    // Reference connections from Root
    objects.forEach((b) => {
      if (b.live) {
        ctx.strokeStyle = gcPhase === 'marking' ? 'rgba(74, 222, 128, 0.7)' : 'rgba(100, 232, 255, 0.4)';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 109);
        ctx.lineTo(b.x, b.y - 20);
        ctx.stroke();
      }
    });

    // Draw Heap Objects
    objects.forEach((b) => {
      const isDead = !b.live;
      if (isDead && gcPhase === 'sweeping') {
        // Vaporize into red particle cloud
        for (let p = 0; p < 3; p++) {
          const px = b.x + (Math.random() - 0.5) * 60;
          const py = b.y + (Math.random() - 0.5) * 30 - (t * 20) % 40;
          ctx.fillStyle = 'rgba(239, 68, 68, 0.6)';
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        return;
      }

      ctx.save();
      ctx.translate(b.x, b.y);

      let fillCol = 'rgba(16, 21, 33, 0.85)';
      let strokeCol = '#6b7280';

      if (b.live) {
        fillCol = gcPhase === 'marking' ? 'rgba(22, 45, 30, 0.95)' : 'rgba(16, 26, 44, 0.9)';
        strokeCol = gcPhase === 'marking' ? '#4ade80' : '#64e8ff';
      } else {
        if (gcPhase === 'marking') {
          fillCol = 'rgba(45, 20, 20, 0.95)';
          strokeCol = '#ef4444';
        }
      }

      ctx.fillStyle = fillCol;
      ctx.strokeStyle = strokeCol;
      ctx.lineWidth = 1.5;
      if (b.live) {
        ctx.shadowColor = strokeCol;
        ctx.shadowBlur = 8;
      }

      ctx.beginPath();
      ctx.roundRect(-50, -18, 100, 36, 6);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#f0f4fc';
      ctx.font = 'bold 9.5px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(b.label, 0, -2);

      ctx.fillStyle = strokeCol;
      ctx.font = '8px Fira Code, monospace';
      ctx.fillText(b.size, 0, 9);

      ctx.restore();
    });

    if (hudCounter1) hudCounter1.textContent = `Live Heap: 3 Objects (${gcPhase === 'sweeping' ? '0 Dead' : '2 Dead'})`;
    if (hudCounter2) hudCounter2.textContent = `GC Phase: ${gcPhase.toUpperCase()} • Reclaimed: ${gcReclaimedBytes} KB`;
  }

  // Lab E: Dynamic Programming & Memoization Table
  function drawDynamicProgrammingDeck(ctx, w, h, t) {
    const cx = w / 2;
    const cy = h / 2;
    const cols = 7;
    const cellW = 58;
    const startX = cx - (cols * cellW) / 2;
    const fibVals = [0, 1, 1, 2, 3, 5, 8];

    ctx.fillStyle = '#c7a66a';
    ctx.font = 'bold 11px Fira Code, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('DYNAMIC PROGRAMMING // MEMO TABLE dp[0..6]', cx, cy - 75);

    // Render Cache Table
    for (let i = 0; i < cols; i++) {
      const x = startX + i * cellW;
      const isCached = dpMode === 'memoized' ? (t * 0.8) % 8 > i : false;

      ctx.save();
      ctx.fillStyle = isCached ? 'rgba(26, 32, 22, 0.95)' : 'rgba(16, 21, 33, 0.7)';
      ctx.strokeStyle = isCached ? '#4ade80' : '#4b5563';
      ctx.lineWidth = isCached ? 2 : 1;
      if (isCached) {
        ctx.shadowColor = '#4ade80';
        ctx.shadowBlur = 10;
      }

      ctx.beginPath();
      ctx.roundRect(x + 2, cy - 40, cellW - 4, 50, 6);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = isCached ? '#4ade80' : '#9ca3af';
      ctx.font = 'bold 11px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(isCached ? `val=${fibVals[i]}` : `dp[${i}]`, x + cellW / 2, cy - 15);

      ctx.fillStyle = '#6b7280';
      ctx.font = '8px Fira Code, monospace';
      ctx.fillText(isCached ? 'O(1) HIT' : 'NIL', x + cellW / 2, cy + 2);
      ctx.restore();
    }

    // Call Graph representation below
    ctx.fillStyle = dpMode === 'memoized' ? '#4ade80' : '#ef4444';
    ctx.font = 'bold 12px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      dpMode === 'memoized'
        ? '✓ Linear Complexity: Exactly 7 distinct subproblem resolutions'
        : '⚠ Exponential Call Explosion: 2^N redundant subproblem calculations!',
      cx,
      cy + 55
    );

    if (hudCounter1) hudCounter1.textContent = `Mode: ${dpMode === 'memoized' ? 'Memoized Lookup' : 'Naive Recursion'}`;
    if (hudCounter2) hudCounter2.textContent = dpMode === 'memoized' ? 'Complexity: O(N) Linear' : 'Complexity: O(2^N) Redundant';
  }

  // Lab F: Sorting Algorithms & Shannon Entropy (Neon Spectrum & Entropy Gauge)
  function drawSortingEntropyDeck(ctx, w, h, t) {
    const cx = w / 2;
    const cy = h / 2;
    const count = 20;
    const barW = Math.min(26, (w - 140) / count);
    const startX = cx - (count * barW) / 2;

    for (let i = 0; i < count; i++) {
      const heightVal = 35 + ((i * 15 + Math.sin(t * 2 + i) * 16) % 150);
      const x = startX + i * barW;
      const y = cy + 85 - heightVal;

      // Color Spectrum from Cyan to Gold
      const colorRatio = heightVal / 185;
      const barGrad = ctx.createLinearGradient(0, y, 0, y + heightVal);
      barGrad.addColorStop(0, colorRatio > 0.6 ? '#e2c288' : '#64e8ff');
      barGrad.addColorStop(1, colorRatio > 0.6 ? '#916f39' : '#0e7490');

      ctx.fillStyle = barGrad;
      ctx.fillRect(x + 2, y, barW - 4, heightVal);

      // Top glowing tip
      ctx.fillStyle = colorRatio > 0.6 ? '#ffffff' : '#a5f3fc';
      ctx.fillRect(x + 2, y, barW - 4, 2.5);
    }

    // Corner Circular Shannon Entropy Gauge
    const gaugeX = w - 85;
    const gaugeY = 65;
    const gaugeR = 36;
    const entropyVal = Math.max(0.12, (3.84 - ((t * 0.3) % 3.84))).toFixed(2);

    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(gaugeX, gaugeY, gaugeR, 0, Math.PI * 2);
    ctx.stroke();

    // Active Entropy Arc
    const entropyPercent = entropyVal / 4.0;
    ctx.strokeStyle = entropyPercent > 0.5 ? '#ef4444' : '#4ade80';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(gaugeX, gaugeY, gaugeR, -Math.PI / 2, -Math.PI / 2 + entropyPercent * Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#f0f4fc';
    ctx.font = 'bold 11px Fira Code, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${entropyVal}`, gaugeX, gaugeY + 1);

    ctx.fillStyle = '#a3a9b8';
    ctx.font = '7.5px Fira Code, monospace';
    ctx.fillText('ENTROPY H', gaugeX, gaugeY + 12);
    ctx.restore();

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
    function renderArchDiagram() {
      const dpi = setupHiDpi(archCanvas);
      if (!dpi) return;
      const { ctx, w, h } = dpi;

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
    const r = 135;
    ctx.strokeStyle = 'rgba(100, 232, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    // 4 Nodes on the ring
    const nodes = [
      { angle: 0, name: 'Node A', col: '#c7a66a' },
      { angle: Math.PI / 2, name: 'Node B', col: '#64e8ff' },
      { angle: Math.PI, name: 'Node C', col: '#c7a66a' },
      { angle: (3 * Math.PI) / 2, name: 'Node D', col: '#64e8ff' },
    ];

    nodes.forEach((n) => {
      const nx = cx + Math.cos(n.angle) * r;
      const ny = cy + Math.sin(n.angle) * r;

      ctx.fillStyle = '#101521';
      ctx.strokeStyle = n.col;
      ctx.lineWidth = 2;
      ctx.shadowColor = n.col;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(nx, ny, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#f0f4fc';
      ctx.font = 'bold 9px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(n.name, nx, ny + 3);
    });

    // Orbiting request packets with color trails
    for (let i = 0; i < 4; i++) {
      const pAngle = (t * 0.8 + (i * Math.PI) / 2) % (Math.PI * 2);
      const px = cx + Math.cos(pAngle) * r;
      const py = cy + Math.sin(pAngle) * r;

      ctx.fillStyle = '#64e8ff';
      ctx.shadowColor = '#64e8ff';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(px, py, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function drawCachePipeline(ctx, cx, cy, t) {
    const points = [
      { x: cx - 180, y: cy, label: 'Client App', col: '#64e8ff' },
      { x: cx, y: cy, label: 'LRU Cache (RAM)', col: '#c7a66a' },
      { x: cx + 180, y: cy, label: 'Database (Disk)', col: '#9a8cff' },
    ];

    // Pipeline Laser Connectors
    ctx.strokeStyle = 'rgba(233, 223, 200, 0.25)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(points[0].x, cy);
    ctx.lineTo(points[2].x, cy);
    ctx.stroke();

    // Data packet flow
    const packetT = (t * 0.6) % 1;
    const px = points[0].x + (points[2].x - points[0].x) * packetT;
    ctx.fillStyle = '#64e8ff';
    ctx.shadowColor = '#64e8ff';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(px, cy, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    points.forEach((p) => {
      ctx.fillStyle = '#101521';
      ctx.strokeStyle = p.col;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(p.x - 56, p.y - 25, 112, 50, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = p.col;
      ctx.font = 'bold 10px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(p.label, p.x, p.y + 4);
    });
  }

  function drawBPlusTree(ctx, cx, cy, t) {
    ctx.fillStyle = '#c7a66a';
    ctx.font = 'bold 11px Fira Code, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('B+ Tree Index Hierarchy', cx, cy - 85);

    // Tree Branch Lasers
    ctx.strokeStyle = 'rgba(100, 232, 255, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 65);
    ctx.lineTo(cx - 120, cy);
    ctx.moveTo(cx, cy - 65);
    ctx.lineTo(cx + 120, cy);
    ctx.stroke();

    // Root Card
    ctx.fillStyle = '#101521';
    ctx.strokeStyle = '#c7a66a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(cx - 45, cy - 80, 90, 30, 4);
    ctx.fill();
    ctx.stroke();

    // Internal Pages
    [-120, 120].forEach((ox) => {
      ctx.fillStyle = '#101521';
      ctx.strokeStyle = '#64e8ff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(cx + ox - 45, cy - 15, 90, 30, 4);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#f0f4fc';
      ctx.font = '9px Fira Code, monospace';
      ctx.fillText('Page [Key]', cx + ox, cy + 4);
    });
  }

  function drawRaftCluster(ctx, cx, cy, t) {
    // Leader in center with pulsing heartbeat shockwaves
    const waveR = (t * 40) % 130;
    ctx.strokeStyle = `rgba(199, 166, 106, ${Math.max(0, 0.6 - waveR / 130)})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, waveR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#c7a66a';
    ctx.shadowColor = '#c7a66a';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(cx, cy, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#08090d';
    ctx.font = 'bold 9px Fira Code, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('LEADER', cx, cy + 3);

    // 4 Followers around
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      const fx = cx + Math.cos(a) * 120;
      const fy = cy + Math.sin(a) * 120;

      // Heartbeat line
      ctx.strokeStyle = 'rgba(100, 232, 255, 0.3)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(fx, fy);
      ctx.stroke();

      ctx.fillStyle = '#101521';
      ctx.strokeStyle = '#64e8ff';
      ctx.lineWidth = 1.8;
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
    ctx.font = 'bold 11px Fira Code, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Topic: telemetry-events [Partition 0..2]', cx, cy - 80);

    for (let p = 0; p < 3; p++) {
      const py = cy - 40 + p * 45;
      ctx.fillStyle = 'rgba(16, 21, 33, 0.6)';
      ctx.strokeStyle = 'rgba(233, 223, 200, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(cx - 180, py, 360, 32, 4);
      ctx.fill();
      ctx.stroke();

      // Moving message blocks
      for (let m = 0; m < 5; m++) {
        const mx = cx - 160 + ((m * 65 + t * 45) % 325);
        ctx.fillStyle = '#c7a66a';
        ctx.beginPath();
        ctx.roundRect(mx, py + 4, 38, 24, 3);
        ctx.fill();

        ctx.fillStyle = '#08090d';
        ctx.font = 'bold 7.5px Fira Code, monospace';
        ctx.fillText(`m${m}`, mx + 19, py + 18);
      }
    }
  }

  function drawCircuitBreaker(ctx, cx, cy, t) {
    const states = [
      { name: 'CLOSED (OK)', x: cx - 140, y: cy, col: '#4ade80' },
      { name: 'OPEN (TRIPPED)', x: cx, y: cy - 70, col: '#ef4444' },
      { name: 'HALF-OPEN', x: cx + 140, y: cy, col: '#c7a66a' },
    ];

    // Transition connecting arcs
    ctx.strokeStyle = 'rgba(233, 223, 200, 0.2)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(states[0].x, states[0].y);
    ctx.lineTo(states[1].x, states[1].y);
    ctx.lineTo(states[2].x, states[2].y);
    ctx.closePath();
    ctx.stroke();

    states.forEach((s) => {
      ctx.fillStyle = '#101521';
      ctx.strokeStyle = s.col;
      ctx.lineWidth = 2;
      ctx.shadowColor = s.col;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.roundRect(s.x - 55, s.y - 20, 110, 40, 8);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = s.col;
      ctx.font = 'bold 9px Fira Code, monospace';
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
