"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import DomainsHero from "./DomainsHero";

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
const MOBILE_QUERY = "(max-width: 700px)";
const TABLET_QUERY = "(max-width: 1100px)"; // phones also match; phone is checked first
const CARD_ASPECT_MOBILE = 0.8; // card width / height on phones (smaller = taller card)
const TEXT_SCALE_MOBILE = 2.6; // card text size on phones
const CARD_ASPECT_TABLET = 1.15; // card width / height on tablets / iPads (smaller = taller card)
const TEXT_SCALE_TABLET = 1.6; // card text size on tablets / iPads

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

function drawOverlay(domain, aspect = CARD_ASPECT, s = 1) {
  const W = 1800;
  const H = Math.round(W / aspect);
  const mobile = s > 1;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, W, H);

  // bottom shade
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "rgba(0,0,0,0.05)");
  g.addColorStop(mobile ? 0.5 : 0.38, "rgba(0,0,0,0.15)");
  g.addColorStop(1, "rgba(0,0,0,0.8)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  if (!SHOW_TEXT) return canvas;

  const font = `"Inter", "Helvetica Neue", Arial, sans-serif`;
  const pad = mobile ? Math.round(78 + (s - 1) * 29.4) : 78;
  const titleScale = mobile ? s * 0.78 : 1;
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";

  // number, top-left
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = `500 ${20 * s}px ${font}`;
  setSpacing(ctx, 3.5 * s);
  ctx.fillText(
    `${domain.number} / ${String(TOTAL).padStart(2, "0")}`,
    pad,
    mobile ? Math.round(72 + (s - 1) * 36.25) : 72
  );

  // build from the bottom up
  let y = H - pad;

  // tags
  ctx.font = `500 ${16 * s}px ${font}`;
  setSpacing(ctx, 2.4 * s);
  let x = pad;
  const tagH = 40 * s;
  domain.tags.forEach((tag) => {
    const w = ctx.measureText(tag).width + 28 * s;
    ctx.strokeStyle = "rgba(255,255,255,0.4)";
    ctx.lineWidth = 1.5 * s;
    ctx.strokeRect(x + 0.75, y - tagH + 0.75, w - 1.5, tagH - 1.5);
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.fillText(tag, x + 14 * s, y - 14 * s);
    x += w + 12 * s;
  });
  y -= tagH + 34 * s;

  // description
  ctx.font = `400 ${23 * s}px ${font}`;
  setSpacing(ctx, 0);
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  const descLines = wrapLines(ctx, domain.description, mobile ? W - pad * 2 : 900);
  const lh = 40 * s;
  for (let i = descLines.length - 1; i >= 0; i--) {
    ctx.fillText(descLines[i], pad, y);
    y -= lh;
  }
  y -= 22 * s;

  // title
  ctx.font = `500 ${104 * titleScale}px ${font}`;
  setSpacing(ctx, -5 * titleScale);
  ctx.fillStyle = "#fff";
  ctx.shadowColor = "rgba(0,0,0,0.4)";
  ctx.shadowBlur = 30;
  const titleLines = wrapLines(
    ctx,
    domain.name,
    mobile ? W - pad * 2 : W - pad * 2 - 160
  );
  for (let i = titleLines.length - 1; i >= 0; i--) {
    ctx.fillText(titleLines[i], pad, y);
    y -= 104 * titleScale;
  }
  ctx.shadowBlur = 0;
  y -= 6 * s;

  // eyebrow
  ctx.font = `600 ${17 * s}px ${font}`;
  setSpacing(ctx, 4 * s);
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

  // one fetch of each texture per call
  vec3 sampleAll(vec2 uv) {
    vec3 v = vec3(0.07 + 0.05 * uv.y);
    if (uHasVideo > 0.5) {
      v = texture2D(tVideo, cover(uv)).rgb;
    }
    vec4 t = texture2D(tText, uv);
    return mix(v, t.rgb, t.a);
  }

  void main() {
    // at rest there is no RGB split, so a single sample gives the same pixel
    if (abs(uShift) < 0.0002) {
      gl_FragColor = vec4(sampleAll(vUv), 1.0);
    } else {
      vec2 o = vec2(uShift, 0.0);
      float r = sampleAll(vUv + o).r;
      float g = sampleAll(vUv).g;
      float b = sampleAll(vUv - o).b;
      gl_FragColor = vec4(r, g, b, 1.0);
    }
  }
`;

export default function DomainsPage() {
  const stageRef = useRef(null);
  const nameRef = useRef(null);
  const fillRef = useRef(null);
  const [tier, setTier] = useState(null); // "phone" | "tablet" | "desktop" (null until known)

  // phones and tablets get a taller card, desktop keeps the wide card
  useEffect(() => {
    const phone = window.matchMedia(MOBILE_QUERY);
    const tablet = window.matchMedia(TABLET_QUERY);
    const update = () =>
      setTier(phone.matches ? "phone" : tablet.matches ? "tablet" : "desktop");
    update();
    phone.addEventListener("change", update);
    tablet.addEventListener("change", update);
    return () => {
      phone.removeEventListener("change", update);
      tablet.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (tier === null) return;
    const cardAspect =
      tier === "phone"
        ? CARD_ASPECT_MOBILE
        : tier === "tablet"
        ? CARD_ASPECT_TABLET
        : CARD_ASPECT;
    const textScale =
      tier === "phone"
        ? TEXT_SCALE_MOBILE
        : tier === "tablet"
        ? TEXT_SCALE_TABLET
        : 1;
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
    const cardHeight = chord / cardAspect;
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

      const textTexture = new THREE.CanvasTexture(
        drawOverlay(domain, cardAspect, textScale)
      );
      textTexture.anisotropy = maxAniso;

      const material = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        side: THREE.FrontSide,
        uniforms: {
          tVideo: { value: videoTexture },
          tText: { value: textTexture },
          uShift: { value: 0 },
          uCardAspect: { value: cardAspect },
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

      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData.index = index;
      tilt.add(mesh);

      return { mesh, material, video, videoTexture, textTexture, onReady, want: false };
    });

    // resume playback if the browser blocked autoplay
    // (kept for every tap, not just the first: the first tap may happen before
    // the carousel is on screen, and play() on a playing video is a no-op)
    const resumeVideos = () =>
      cards.forEach((c) => {
        if (c.want && c.video.paused) c.video.play().catch(() => {});
      });
    window.addEventListener("pointerdown", resumeVideos);

    /* ---------- sizing ---------- */
    let cw = 0; // cached container width
    const resize = () => {
      const w = container.clientWidth || window.innerWidth;
      cw = w;
      const h = container.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      const aspect = w / h;
      camera.aspect = aspect;

      const fraction =
        aspect < 0.9
          ? Math.min(CENTER_WIDTH_MOBILE, (MAX_HEIGHT * cardAspect) / aspect)
          : Math.min(CENTER_WIDTH, (MAX_HEIGHT * cardAspect) / aspect);
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
    let pointerX = 0;
    let pointerY = 0;
    let pointerDirty = false;

    const pxPerCard = () => Math.max(320, cw * 0.55);

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
      pointerX = e.clientX;
      pointerY = e.clientY;
      pointerDirty = true;

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
    // Only runs while the carousel is on screen and the tab is visible.
    const PLAY_RANGE = 2.4; // rad: cards inside this range keep their video playing
    let raf = 0;
    let last = performance.now();
    let running = false;
    let inView = false;
    let lastFill = "";
    let lastTA = "";
    let lastOA = "";
    let lastTB = "";
    let lastOB = "";

    const setPlaying = (card, want) => {
      if (card.want === want) return;
      card.want = want;
      if (want) card.video.play().catch(() => {});
      else card.video.pause();
    };

    const tick = (now) => {
      if (!running) return;
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
        // only decode video for the cards that are (about to be) visible
        setPlaying(card, Math.abs(angle) < PLAY_RANGE);
      });

      // subtle pointer tilt (rect measured once per frame, not per event)
      if (pointerDirty) {
        const rect = container.getBoundingClientRect();
        mouseX = ((pointerX - rect.left) / rect.width) * 2 - 1;
        mouseY = ((pointerY - rect.top) / rect.height) * 2 - 1;
        pointerDirty = false;
      }
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
      const fillStr = `${Math.max(fillShown * 100, 0.01).toFixed(2)} 100`;
      if (fillStr !== lastFill) {
        fillPath.setAttribute("stroke-dasharray", fillStr);
        lastFill = fillStr;
      }

      // name: old name rolls up, next one rises from below
      if (shownA !== i0) {
        nameA.textContent = DOMAINS[i0].name;
        shownA = i0;
      }
      if (shownB !== i1) {
        nameB.textContent = DOMAINS[i1].name;
        shownB = i1;
      }
      // DOM is only touched when a value actually changed
      const tA = `translateY(${(-frac * 100).toFixed(2)}%)`;
      const oA = (1 - 0.65 * frac).toFixed(3);
      const tB = `translateY(${((1 - frac) * 100).toFixed(2)}%)`;
      const oB = (0.35 + 0.65 * frac).toFixed(3);
      if (tA !== lastTA) {
        nameA.style.transform = tA;
        lastTA = tA;
      }
      if (oA !== lastOA) {
        nameA.style.opacity = oA;
        lastOA = oA;
      }
      if (tB !== lastTB) {
        nameB.style.transform = tB;
        lastTB = tB;
      }
      if (oB !== lastOB) {
        nameB.style.opacity = oB;
        lastOB = oB;
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
      cards.forEach((c) => setPlaying(c, false));
    };
    const sync = () => (inView && !document.hidden ? start() : stop());

    // start a little before the carousel scrolls into view, stop when it leaves
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { rootMargin: "20% 0px" }
    );
    io.observe(container);
    document.addEventListener("visibilitychange", sync);

    /* ---------- cleanup ---------- */
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      clearTimeout(snapTimer);
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
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
  }, [tier]);

  return (
    <>
      <Navbar />
      <DomainsHero />
      <main className="domains-page">
        <style>{`
          @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500&display=swap");

          html,
          body {
            margin: 0;
            background: #070a0f;
          }

          .domains-page {
            position: relative;
            width: 100%;
            height: 100vh;
            min-height: 600px;
            overflow: hidden;
            background:
              radial-gradient(
                ellipse at 50% 45%,
                rgba(50, 75, 112, 0.17) 0%,
                transparent 65%
              ),
              linear-gradient(
                145deg,
                #10141b 0%,
                #090d14 54%,
                #070a0f 100%
              );
            background-attachment: fixed;
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