'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { TILE_STORIES } from './tileStories';

// The 3 authentic photos uploaded from CSOP – Varna
export const CSOP_HERO_PHOTOS = [
  '/hero1.jpg', // Творческо ателие: изработка на текстилно пано / дърво на живота
  '/hero2.jpg', // Ден на добротата и розовата фланелка: табло с послания и сърца
  '/hero3.jpg', // Учебен процес в класната стая: активност с учител и ученици
];

export default function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [story, setStory] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Pick a random image each time the page loads
    const chosenPhoto = CSOP_HERO_PHOTOS[Math.floor(Math.random() * CSOP_HERO_PHOTOS.length)];

    const isDarkMode = () =>
      document.documentElement.getAttribute('data-theme') === 'dark' ||
      document.documentElement.classList.contains('dark');

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(isDarkMode() ? 0x121614 : 0xfbf7f0, 18, 44);
    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 13.5);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    scene.add(new THREE.AmbientLight(0xffffff, 0.95));
    const key = new THREE.DirectionalLight(0xffffff, 1.05);
    key.position.set(-6, 9, 10);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    Object.assign(key.shadow.camera, { near: 1, far: 40, left: -16, right: 16, top: 16, bottom: -16 });
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x9fe1cb, 0.3);
    fill.position.set(8, -4, 6);
    scene.add(fill);

    const colors = [0x22b37a, 0x3da5e0, 0x4fc79e, 0x1e7fc0, 0x8fe0c0, 0x2fa8d8, 0x128a5e, 0x5dcaa5];
    const COLS = 8, ROWS = 5, GAP = 0.04, SIZE = 1.35;
    const geo = new THREE.BoxGeometry(SIZE, SIZE, 0.2);
    const totalW = COLS * (SIZE + GAP) - GAP;
    const totalH = ROWS * (SIZE + GAP) - GAP;
    const N = COLS * ROWS;

    interface TD {
      home: THREE.Vector3;
      col: number;
      row: number;
      phase: number;
      story: number;
    }
    type Tile = THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial> & { userData: TD };

    const tiles: Tile[] = [];
    const group = new THREE.Group();
    scene.add(group);

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    for (let i = 0; i < N; i++) {
      const c = i % COLS;
      const r = Math.floor(i / COLS);
      const col = colors[i % colors.length];
      const mat = new THREE.MeshStandardMaterial({ color: col, roughness: 0.5, metalness: 0.05 });
      const m = new THREE.Mesh(geo, mat) as unknown as Tile;
      m.castShadow = true;
      m.receiveShadow = true;
      const home = new THREE.Vector3(
        c * (SIZE + GAP) - totalW / 2 + SIZE / 2,
        -(r * (SIZE + GAP) - totalH / 2 + SIZE / 2),
        0
      );
      const rowNorm = r / (ROWS - 1);
      const slant = rowNorm * 1.4;
      const bulge = Math.sin(rowNorm * Math.PI) * 0.9;
      const phase = c - bulge + slant;
      m.userData = {
        home: home.clone(),
        col: c,
        row: r,
        phase,
        story: i % TILE_STORIES.length,
      };
      // start scattered, assemble once
      m.position.set(rand(-14, 14), rand(-9, 9), rand(-16, -6));
      m.rotation.set(rand(-Math.PI, Math.PI), rand(-Math.PI, Math.PI), rand(-Math.PI, Math.PI));
      m.scale.setScalar(0.3);
      group.add(m);
      tiles.push(m);
    }

    // Load the randomly chosen CSOP photo and map it evenly across the 8x5 tiles
    const loader = new THREE.TextureLoader();
    let activeTexture: THREE.Texture | null = null;

    loader.load(
      chosenPhoto,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        activeTexture = tex;
        tiles.forEach((m, i) => {
          const c = i % COLS;
          const r = Math.floor(i / COLS);
          const t = tex.clone();
          t.needsUpdate = true;
          t.repeat.set(1 / COLS, 1 / ROWS);
          t.offset.set(c / COLS, (ROWS - 1 - r) / ROWS);
          m.material.map = t;
          m.material.color.set(0xffffff);
          m.material.roughness = 0.42;
          m.material.needsUpdate = true;
        });
      },
      undefined,
      (err) => {
        console.warn('Failed to load hero image:', chosenPhoto, err);
      }
    );

    const groundMat = new THREE.ShadowMaterial({ opacity: isDarkMode() ? 0.25 : 0.09 });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(60, 40), groundMat);
    ground.position.z = -1.3;
    ground.receiveShadow = true;
    scene.add(ground);

    // Watch for theme changes to update fog and shadow
    const themeObserver = new MutationObserver(() => {
      const dark = isDarkMode();
      if (scene.fog) {
        scene.fog.color.set(dark ? 0x121614 : 0xfbf7f0);
      }
      groundMat.opacity = dark ? 0.25 : 0.09;
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });

    let mx = 0, my = 0, tmx = 0, tmy = 0;
    const mouseWorld = new THREE.Vector3(999, 999, 0);
    const mNdc = new THREE.Vector2();
    const mRay = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const onMove = (e: PointerEvent) => {
      tmx = (e.clientX / window.innerWidth - 0.5) * 2;
      tmy = (e.clientY / window.innerHeight - 0.5) * 2;
      mNdc.x = (e.clientX / window.innerWidth) * 2 - 1;
      mNdc.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mRay.setFromCamera(mNdc, camera);
      mRay.ray.intersectPlane(plane, mouseWorld);
    };
    window.addEventListener('pointermove', onMove);
    const onLeave = () => mouseWorld.set(999, 999, 0);
    window.addEventListener('pointerout', onLeave);

    const ray = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const onClick = (e: MouseEvent) => {
      ndc.x = (e.clientX / window.innerWidth) * 2 - 1;
      ndc.y = -(e.clientY / window.innerHeight) * 2 + 1;
      ray.setFromCamera(ndc, camera);
      const hit = ray.intersectObjects(tiles, false)[0];
      if (hit) setStory((hit.object as Tile).userData.story);
    };
    canvas.addEventListener('click', onClick);

    const clock = new THREE.Clock();
    let elapsed = 0;
    let firstFrame = true;
    let raf = 0;
    let assembled = false;

    setTimeout(() => { assembled = true; }, 1400);

    const WAVE_SPEED = 2.4;
    const WAVE_WIDTH = 2.2;
    const WAVE_LIFT = 1.0;
    const WAVE_GAP = 2.4;
    const HOVER_RADIUS = 2.6;
    const HOVER_LIFT = 1.3;

    function animate() {
      raf = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      elapsed += dt;

      mx += (tmx - mx) * 0.04;
      my += (tmy - my) * 0.04;
      group.rotation.y += (mx * 0.2 - group.rotation.y) * 0.05;
      group.rotation.x += (my * 0.14 - group.rotation.x) * 0.05;

      const phaseSpan = COLS + 2.4;
      const period = phaseSpan / WAVE_SPEED + WAVE_GAP;
      const tt = elapsed % period;
      const head = tt * WAVE_SPEED - 1.2;

      tiles.forEach((m) => {
        const u = m.userData;
        if (!assembled) {
          m.position.lerp(u.home, 0.08);
          m.scale.setScalar(m.scale.x + (1 - m.scale.x) * 0.08);
          m.rotation.x += (0 - m.rotation.x) * 0.08;
          m.rotation.y += (0 - m.rotation.y) * 0.08;
          m.rotation.z += (0 - m.rotation.z) * 0.08;
          return;
        }

        const d = u.phase - head;
        let pop = 0;
        if (d <= 0 && d > -WAVE_WIDTH) {
          pop = Math.sin((-d / WAVE_WIDTH) * Math.PI) * WAVE_LIFT;
        }

        const dx = m.userData.home.x - mouseWorld.x;
        const dy = m.userData.home.y - mouseWorld.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let hover = 0;
        if (dist < HOVER_RADIUS) {
          hover = Math.cos((dist / HOVER_RADIUS) * (Math.PI / 2)) * HOVER_LIFT;
        }

        const targetZ = u.home.z + Math.max(pop, hover);

        m.position.x += (u.home.x - m.position.x) * 0.2;
        m.position.y += (u.home.y - m.position.y) * 0.2;
        m.position.z += (targetZ - m.position.z) * 0.18;

        m.rotation.x += (0 - m.rotation.x) * 0.15;
        m.rotation.y += (0 - m.rotation.y) * 0.15;
        m.rotation.z += (0 - m.rotation.z) * 0.15;
      });

      renderer.render(scene, camera);
      if (firstFrame) { firstFrame = false; setReady(true); }
    }
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerout', onLeave);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('click', onClick);
      geo.dispose();
      tiles.forEach((m) => {
        if (m.material.map) m.material.map.dispose();
        m.material.dispose();
      });
      if (activeTexture) (activeTexture as THREE.Texture).dispose();
      renderer.dispose();
    };
  }, []);

  const s = story !== null ? TILE_STORIES[story] : null;

  return (
    <div className="stage">
      <canvas ref={canvasRef} id="gl" />

      <div className="overlay">
        <span className="eyebrow">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21s-7-4.35-9.5-8.5C.9 9.7 2.2 6 5.5 6c2 0 3.3 1.2 4 2.3C10.2 7.2 11.5 6 13.5 6c3.3 0 4.6 3.7 3 6.5C19 16.65 12 21 12 21z" />
          </svg>{' '}
          Вярваме, че…
        </span>
        <h1>
          Посоката, в която се движим, е по-важна от <em>скоростта.</em>
        </h1>
        <p className="lead">
          Всяка плочка е един момент от нашето ежедневие. Докоснете някоя — и вижте
          историята зад нея.
        </p>
        <div className="cta-row">
          <a href="/priem" className="btn btn-primary">
            Планирайте посещение{' '}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a href="/priem/proczedura" className="btn btn-ghost">
            Процедура за прием
          </a>
        </div>
      </div>

      <div className="hint">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        <span>Докоснете плочка за история · Разгледайте 3D мозайката</span>
      </div>

      {s && (
        <div className="story-overlay" onClick={() => setStory(null)}>
          <div className="story-modal" onClick={(e) => e.stopPropagation()}>
            <div className="story-strip" />
            <button className="story-close" onClick={() => setStory(null)} aria-label="Затвори">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="story-body">
              <span className="story-cat">{s.category.toUpperCase()}</span>
              <h3>{s.title}</h3>
              <p className="story-msg">{s.message}</p>
              <blockquote>„{s.quote}“</blockquote>
            </div>
          </div>
        </div>
      )}

      <div className={`loading ${ready ? 'hide' : ''}`}>
        <div className="spinner" />
      </div>
    </div>
  );
}
