"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const DOMAINS = [
  {
    number: "01",
    name: "Competitive Programming",
    headline: "THE ART OF LOGIC",
    description:
      "Train your mind to break down complex problems, develop efficient algorithms, and turn logical thinking into elegant solutions.",
    tags: ["LOGIC", "ALGORITHMS", "PRECISION"],
    video: "/videos/cp.mp4",
  },
  {
    number: "02",
    name: "IoT & Robotics",
    headline: "IDEAS THAT MOVE",
    description:
      "Explore the connection between the physical and digital worlds through sensors, embedded systems, intelligent devices, and automation.",
    tags: ["ROBOTICS", "HARDWARE", "AUTOMATION"],
    video: "/videos/robotics.mp4",
  },
  {
    number: "03",
    name: "AI & ML",
    headline: "BEYOND THE OBVIOUS",
    description:
      "Discover intelligent systems, learn from data, recognise patterns, and explore how machine learning can solve real-world problems.",
    tags: ["AI", "MACHINE LEARNING", "DATA"],
    video: "/videos/ai.mp4",
  },
  {
    number: "04",
    name: "Video Editing",
    headline: "EVERY FRAME HAS A FEELING",
    description:
      "Transform raw footage into compelling visual stories through rhythm, transitions, sound, motion, and creative storytelling.",
    tags: ["MOTION", "STORYTELLING", "FILM"],
    video: "/videos/video-editing.mp4",
  },
  {
    number: "05",
    name: "Graphic Designing",
    headline: "MAKE IDEAS VISIBLE",
    description:
      "Bring ideas to life through typography, colour, composition, visual identity, and creative design that communicates with purpose.",
    tags: ["VISUALS", "BRANDING", "COMPOSITION"],
    video: "/videos/graphic-design.mp4",
  },
  {
    number: "06",
    name: "Web Development",
    headline: "DESIGN THE NEXT INTERNET",
    description:
      "Create meaningful digital experiences by combining modern web technologies, thoughtful interfaces, and interactive design.",
    tags: ["DESIGN", "CODE", "INTERACTION"],
    video: "/videos/web-dev.mp4",
  },
];

/* ------------------------------------------------------------------ */
/*  TUNING — values measured from the reference recording              */
/* ------------------------------------------------------------------ */
const TOTAL = DOMAINS.length;
const FOV = 32; // camera field of view
const STEP = Math.PI / 3; // angle between card centres (60deg)
const GAP = 0.085; // angular gap between cards (rad)
const CARD_ANGLE = STEP - GAP; // arc covered by one card
const CARD_ASPECT = 1.9; // card width / height
const CENTER_WIDTH = 0.85; // centre card width as share of viewport width (bigger = larger carousel)
const MAX_HEIGHT = 0.74; // centre card height will never exceed this share of viewport height
const CENTER_WIDTH_MOBILE = 0.92;
const LIFT = -0.03; // moves the carousel up (share of viewport height) to leave room for the loader
const DAMP = 6.5; // follow speed of the carousel
const DAMP_DRAG = 16; // follow speed while dragging
const WHEEL_SPEED = 0.0016; // cards per wheel pixel
const CHROMA = 0.032; // RGB split strength per card of lag
const TILT = 0.035; // subtle pointer tilt (set 0 to disable)
const SHOW_TEXT = true; // draw the domain text on each card

function wrap(value, length) {
  return ((value % length) + length) % length;
}

/* ------------------------------------------------------------------ */
/*  Card overlay (text + shade) drawn to a canvas texture              */
/* ------------------------------------------------------------------ */
function wrapLines(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);
  return lines;
}

function setSpacing(ctx, px) {
  if ("letterSpacing" in ctx) ctx.letterSpacing = `${px}px`;
}

function drawOverlay(domain) {
  const W = 1800;
  const H = Math.round(W / CARD_ASPECT);
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, W, H);

  // bottom shade
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "rgba(0,0,0,0.05)");
  g.addColorStop(0.38, "rgba(0,0,0,0.15)");
  g.addColorStop(1, "rgba(0,0,0,0.8)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  if (!SHOW_TEXT) return canvas;

  const font = `"Inter", "Helvetica Neue", Arial, sans-serif`;
  const pad = 78;
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";

  // number, top-left
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = `500 20px ${font}`;
  setSpacing(ctx, 3.5);
  ctx.fillText(`${domain.number} / ${String(TOTAL).padStart(2, "0")}`, pad, 72);

  // build from the bottom up
  let y = H - pad;

  // tags
  ctx.font = `500 16px ${font}`;
  setSpacing(ctx, 2.4);
  let x = pad;
  const tagH = 40;
  domain.tags.forEach((tag) => {
    const w = ctx.measureText(tag).width + 28;
    ctx.strokeStyle = "rgba(255,255,255,0.4)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x + 0.75, y - tagH + 0.75, w - 1.5, tagH - 1.5);
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.fillText(tag, x + 14, y - 14);
    x += w + 12;
  });
  y -= tagH + 34;

  // description
  ctx.font = `400 23px ${font}`;
  setSpacing(ctx, 0);
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  const descLines = wrapLines(ctx, domain.description, 900);
  const lh = 40;
  for (let i = descLines.length - 1; i >= 0; i--) {
    ctx.fillText(descLines[i], pad, y);
    y -= lh;
  }
  y -= 22;

  // title
  ctx.font = `500 104px ${font}`;
  setSpacing(ctx, -5);
  ctx.fillStyle = "#fff";
  ctx.shadowColor = "rgba(0,0,0,0.4)";
  ctx.shadowBlur = 30;
  const titleLines = wrapLines(ctx, domain.name, W - pad * 2 - 160);
  for (let i = titleLines.length - 1; i >= 0; i--) {
    ctx.fillText(titleLines[i], pad, y);
    y -= 104;
  }
  ctx.shadowBlur = 0;
  y -= 6;

  // eyebrow
  ctx.font = `600 17px ${font}`;
  setSpacing(ctx, 4);
  ctx.fillStyle = "rgba(255,255,255,0.78)";
  ctx.fillText(domain.headline, pad, y);

  return canvas;
}

/* ------------------------------------------------------------------ */
/*  Shader — video + overlay with horizontal RGB split                 */
/* ------------------------------------------------------------------ */
const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D tVideo;
  uniform sampler2D tText;
  uniform float uShift;
  uniform float uCardAspect;
  uniform float uVideoAspect;
  uniform float uHasVideo;

  vec2 cover(vec2 uv) {
    float r = uCardAspect / uVideoAspect;
    vec2 s = vec2(r < 1.0 ? r : 1.0, r > 1.0 ? 1.0 / r : 1.0);
    return (uv - 0.5) * s + 0.5;
  }

  float channel(vec2 uv, int c) {
    float base = 0.07 + 0.05 * uv.y;
    float v = base;
    if (uHasVideo > 0.5) {
      vec3 vid = texture2D(tVideo, cover(uv)).rgb;
      v = c == 0 ? vid.r : (c == 1 ? vid.g : vid.b);
    }
    vec4 t = texture2D(tText, uv);
    float tc = c == 0 ? t.r : (c == 1 ? t.g : t.b);
    return mix(v, tc, t.a);
  }

  void main() {
    vec2 o = vec2(uShift, 0.0);
    float r = channel(vUv + o, 0);
    float g = channel(vUv, 1);
    float b = channel(vUv - o, 2);
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

export default function DomainsPage() {
  const stageRef = useRef(null);
  const nameRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const container = stageRef.current;
    const nameHost = nameRef.current;
    const fillPath = fillRef.current;
    if (!container || !nameHost || !fillPath) return;

    /* ---------- renderer / scene ---------- */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;display:block;";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 60);
    const raycaster = new THREE.Raycaster();

    const tilt = new THREE.Group();
    scene.add(tilt);

    const chord = 2 * Math.sin(CARD_ANGLE / 2);
    const cardHeight = chord / CARD_ASPECT;
    const geometry = new THREE.CylinderGeometry(
      1,
      1,
      cardHeight,
      72,
      1,
      true,
      -CARD_ANGLE / 2,
      CARD_ANGLE
    );
    const maxAniso = renderer.capabilities.getMaxAnisotropy();

    /* hidden host for <video> elements (helps autoplay on iOS) */
    const videoHost = document.createElement("div");
    videoHost.style.cssText =
      "position:absolute;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;";
    container.appendChild(videoHost);

    const cards = DOMAINS.map((domain, index) => {
      const video = document.createElement("video");
      video.src = domain.video;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("muted", "");
      video.preload = "auto";
      video.crossOrigin = "anonymous";
      videoHost.appendChild(video);

      const videoTexture = new THREE.VideoTexture(video);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      videoTexture.generateMipmaps = false;

      const textTexture = new THREE.CanvasTexture(drawOverlay(domain));
      textTexture.anisotropy = maxAniso;

      const material = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        side: THREE.FrontSide,
        uniforms: {
          tVideo: { value: videoTexture },
          tText: { value: textTexture },
          uShift: { value: 0 },
          uCardAspect: { value: CARD_ASPECT },
          uVideoAspect: { value: 16 / 9 },
          uHasVideo: { value: 0 },
        },
      });

      const onReady = () => {
        if (video.videoWidth && video.videoHeight) {
          material.uniforms.uVideoAspect.value =
            video.videoWidth / video.videoHeight;
          material.uniforms.uHasVideo.value = 1;
        }
      };
      video.addEventListener("loadeddata", onReady);
      video.addEventListener("error", () => {
        material.uniforms.uHasVideo.value = 0;
      });
      video.play().catch(() => {});

      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData.index = index;
      tilt.add(mesh);

      return { mesh, material, video, videoTexture, textTexture, onReady };
    });

    // resume playback if the browser blocked autoplay
    const resumeVideos = () => cards.forEach((c) => c.video.play().catch(() => {}));
    window.addEventListener("pointerdown", resumeVideos, { once: true });

    /* ---------- sizing ---------- */
    const resize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      const aspect = w / h;
      camera.aspect = aspect;

      const fraction =
        aspect < 0.9
          ? CENTER_WIDTH_MOBILE
          : Math.min(CENTER_WIDTH, (MAX_HEIGHT * CARD_ASPECT) / aspect);
      const tanH = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
      const distance = chord / (2 * tanH * aspect * fraction);
      camera.position.set(0, 0, 1 + distance);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();

      tilt.position.y = LIFT * 2 * distance * tanH;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    /* ---------- state ---------- */
    let pos = 0;
    let target = 0;
    let shift = 0;
    let dragging = false;
    let dragStartX = 0;
    let dragStartTarget = 0;
    let lastX = 0;
    let lastT = 0;
    let velX = 0;
    let moved = 0;
    let snapTimer = null;
    let mouseX = 0;
    let mouseY = 0;

    const pxPerCard = () => Math.max(320, container.clientWidth * 0.55);

    const scheduleSnap = (delay = 140) => {
      clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        target = Math.round(target);
      }, delay);
    };

    /* ---------- name roll in the loader (scrubbed with the slide) ---------- */
    const makeName = () => {
      const span = document.createElement("span");
      span.className = "domain-loader-name-item";
      nameHost.appendChild(span);
      return span;
    };
    nameHost.innerHTML = "";
    const nameA = makeName();
    const nameB = makeName();
    let shownA = -1;
    let shownB = -1;
    let fillShown = 0;

    /* ---------- input ---------- */
    const onWheel = (e) => {
  // Only rotate the carousel when scrolling horizontally.
  // Vertical scrolling should work normally.
  if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) {
    return;
  }

  e.preventDefault();

  const mult = e.deltaMode === 1 ? 32 : 1;
  const d = e.deltaX;

  if (Math.abs(d) < 0.5) return;

  target += THREE.MathUtils.clamp(
    d * mult * WHEEL_SPEED,
    -0.6,
    0.6
  );

  scheduleSnap(150);
};

    const onPointerDown = (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      dragging = true;
      moved = 0;
      dragStartX = lastX = e.clientX;
      dragStartTarget = target;
      lastT = performance.now();
      velX = 0;
      clearTimeout(snapTimer);
      container.classList.add("is-dragging");
      container.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      if (!dragging) return;
      const now = performance.now();
      const dx = e.clientX - lastX;
      const dt = Math.max(1, now - lastT);
      velX = velX * 0.7 + (dx / dt) * 0.3;
      lastX = e.clientX;
      lastT = now;
      moved = Math.max(moved, Math.abs(e.clientX - dragStartX));
      target = dragStartTarget - (e.clientX - dragStartX) / pxPerCard();
    };

    const endDrag = (e) => {
      if (!dragging) return;
      dragging = false;
      container.classList.remove("is-dragging");

      if (moved < 6 && e && e.clientX !== undefined) {
        // treat as a click: jump to the card that was clicked
        const rect = container.getBoundingClientRect();
        const ndc = new THREE.Vector2(
          ((e.clientX - rect.left) / rect.width) * 2 - 1,
          -(((e.clientY - rect.top) / rect.height) * 2 - 1)
        );
        raycaster.setFromCamera(ndc, camera);
        const hit = raycaster.intersectObjects(
          cards.map((c) => c.mesh).filter((m) => m.visible)
        )[0];
        if (hit) {
          const i = hit.object.userData.index;
          const delta = wrap(i - pos + TOTAL / 2, TOTAL) - TOTAL / 2;
          target = Math.round(pos + delta);
        } else {
          target = Math.round(target);
        }
        return;
      }

      const flick = THREE.MathUtils.clamp(
        (-velX * 220) / pxPerCard(),
        -1.4,
        1.4
      );
      target = Math.round(target + flick);
    };

    const onKey = (e) => {
      if (e.key === "ArrowRight") target = Math.round(target) + 1;
      if (e.key === "ArrowLeft") target = Math.round(target) - 1;
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", endDrag);
    container.addEventListener("pointercancel", endDrag);
    window.addEventListener("keydown", onKey);

    /* ---------- render loop ---------- */
    let raf = 0;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const diff = target - pos;
      pos += diff * (1 - Math.exp(-dt * (dragging ? DAMP_DRAG : DAMP)));

      // RGB split follows how far the slide still has to travel
      const wanted = THREE.MathUtils.clamp(diff * CHROMA, -0.07, 0.07);
      shift += (wanted - shift) * (1 - Math.exp(-dt * 14));

      cards.forEach((card, i) => {
        const a = wrap(i - pos + TOTAL / 2, TOTAL) - TOTAL / 2;
        const angle = a * STEP;
        card.mesh.rotation.y = angle;
        card.mesh.visible = Math.abs(angle) < 1.75;
        card.material.uniforms.uShift.value = shift;
      });

      // subtle pointer tilt
      tilt.rotation.x += (mouseY * TILT - tilt.rotation.x) * 0.06;
      tilt.rotation.y += (-mouseX * TILT - tilt.rotation.y) * 0.06;

      const p = wrap(pos, TOTAL);
      const i0 = Math.floor(p) % TOTAL;
      const frac = p - Math.floor(p);
      const i1 = (i0 + 1) % TOTAL;

      // loading arc: fills from the left as you move through the slides
      const fillTarget = Math.min(p, TOTAL - 1) / (TOTAL - 1);
      if (fillTarget >= fillShown) {
        fillShown = fillTarget;
      } else {
        // wrapping from the last slide back to the first: drain smoothly
        fillShown += (fillTarget - fillShown) * (1 - Math.exp(-dt * 5));
      }
      fillPath.setAttribute(
        "stroke-dasharray",
        `${Math.max(fillShown * 100, 0.01)} 100`
      );

      // name: old name rolls up, next one rises from below
      if (shownA !== i0) {
        nameA.textContent = DOMAINS[i0].name;
        shownA = i0;
      }
      if (shownB !== i1) {
        nameB.textContent = DOMAINS[i1].name;
        shownB = i1;
      }
      nameA.style.transform = `translateY(${-frac * 100}%)`;
      nameA.style.opacity = String(1 - 0.65 * frac);
      nameB.style.transform = `translateY(${(1 - frac) * 100}%)`;
      nameB.style.opacity = String(0.35 + 0.65 * frac);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    /* ---------- cleanup ---------- */
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(snapTimer);
      ro.disconnect();
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", endDrag);
      container.removeEventListener("pointercancel", endDrag);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", resumeVideos);

      cards.forEach((c) => {
        c.video.pause();
        c.video.removeAttribute("src");
        c.video.load();
        c.videoTexture.dispose();
        c.textTexture.dispose();
        c.material.dispose();
      });
      geometry.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
      container.removeChild(videoHost);
    };
  }, []);

  return (
    <>
      <Navbar />

      <main className="domains-page">
        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500&display=swap");

          html,
          body {
            margin: 0;
            background: #080808;
          }

          .domains-page {
            position: relative;
            width: 100%;
            height: 100vh;
            min-height: 600px;
            overflow: hidden;
            background: #080808;
            color: #fff;
          }

          .domain-stage {
            position: absolute;
            inset: 0;
            overflow: hidden;
            touch-action: pan-y;
            user-select: none;
            -webkit-user-select: none;
            cursor: grab;
          }

          .domain-stage.is-dragging {
            cursor: grabbing;
          }

          /* ---------- loader ---------- */
          .domain-loader {
            position: absolute;
            z-index: 10;
            left: 50%;
            bottom: 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
            transform: translateX(-50%);
            pointer-events: none;
          }

          .domain-loader-arc {
            display: block;
            width: 104px;
            height: 16px;
            overflow: visible;
          }

          .domain-loader-pill {
            position: relative;
            width: 300px;
            height: 24px;
            margin-top: 12px;
            overflow: hidden;
            border-radius: 5px;
            background: transparent;
          }

          .domain-loader-name {
            position: absolute;
            inset: 0;
          }

          .domain-loader-name-item {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            padding: 0 8px 1px;
            line-height: 1.1;
            color: rgba(255, 255, 255, 0.92);
            font-family: "Space Grotesk", "Helvetica Neue", Arial, sans-serif;
            font-size: 17px;
            font-weight: 400;
            will-change: transform, opacity;
            letter-spacing: 0.01em;
            white-space: nowrap;
          }

          @media (max-width: 700px) {
            .domain-loader-pill {
              width: 200px;
              height: 24px;
            }
          }
        `}</style>

        <div ref={stageRef} className="domain-stage" />

        <div className="domain-loader" aria-live="polite">
          <svg
            viewBox="0 0 104 16"
            className="domain-loader-arc"
            aria-hidden="true"
          >
            <path
              d="M 2 15 A 100 100 0 0 1 102 15"
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1.6"
              pathLength="100"
            />
            <path
              ref={fillRef}
              d="M 2 15 A 100 100 0 0 1 102 15"
              fill="none"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray="0.01 100"
            />
          </svg>

          <div className="domain-loader-pill">
            <div ref={nameRef} className="domain-loader-name" />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}