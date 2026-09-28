"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A small, self-contained 3D accent: a stylised loaf that drifts and gently
 * turns to follow the pointer (Apple "direct manipulation" — the object
 * responds continuously and proportionally, never just at rest/end states).
 * Built from primitives, no external model, so it stays tiny and fast.
 */
export default function HeroScene({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 0.3, 6.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Loaf body: a stretched, slightly irregular capsule reads as a boule.
    // Vertex colours simulate a toasted crust — dark in the creases, golden
    // on the raised blisters — so the shape reads as bread, not a blob.
    const loafGeo = new THREE.CapsuleGeometry(1.15, 0.9, 12, 32);
    const pos = loafGeo.attributes.position as THREE.BufferAttribute;
    const colors = new Float32Array(pos.count * 3);
    const crust = new THREE.Color("#5c3416");
    const gold = new THREE.Color("#e9a24c");
    const highlight = new THREE.Color("#f7cf8a");
    const v = new THREE.Vector3();
    const tmp = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const n1 = Math.sin(v.x * 6.2 + v.y * 4.1) * 0.5 + 0.5;
      const n2 = Math.sin(v.z * 8.4 - v.y * 3.3 + 1.7) * 0.5 + 0.5;
      const bump = (n1 * 0.6 + n2 * 0.4) * 0.09 - 0.02;
      v.addScaledVector(v.clone().normalize(), bump);
      pos.setXYZ(i, v.x, v.y, v.z);

      const t = Math.min(1, Math.max(0, (bump + 0.02) / 0.07));
      tmp.copy(crust).lerp(gold, t);
      if (t > 0.78) tmp.lerp(highlight, (t - 0.78) / 0.22);
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
    }
    loafGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    loafGeo.computeVertexNormals();
    loafGeo.rotateZ(Math.PI / 2);

    const loafMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.8,
      metalness: 0.02,
    });
    const loaf = new THREE.Mesh(loafGeo, loafMat);
    scene.add(loaf);

    // Soft grounding shadow so the loaf doesn't float disconnected.
    const shadowTex = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 128;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, "rgba(0,0,0,0.35)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(c);
    })();
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(2.6, 1.4),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -1.05;
    scene.add(shadow);

    // A few scored lines across the top, suggested with thin torus arcs.
    const scoreMat = new THREE.MeshStandardMaterial({
      color: "#7a4318",
      roughness: 0.9,
    });
    for (let i = -1; i <= 1; i++) {
      const score = new THREE.Mesh(
        new THREE.TorusGeometry(0.16, 0.012, 6, 16, Math.PI * 1.1),
        scoreMat
      );
      score.position.set(i * 0.55, 0.98, 0);
      score.rotation.set(Math.PI / 2.15, 0, Math.PI / 2 + 0.15);
      scene.add(score);
    }

    // Flour dust: sparse points drifting above the loaf.
    const dustCount = 60;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 4.2;
      dustPos[i * 3 + 1] = Math.random() * 2.4 - 0.4;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 2.4;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({ color: "#f4ead9", size: 0.028, transparent: true, opacity: 0.85 })
    );
    scene.add(dust);

    const key = new THREE.DirectionalLight("#fff3e2", 2.4);
    key.position.set(3, 4, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight("#c2410c", 0.9);
    rim.position.set(-3, 1.5, -3);
    scene.add(rim);
    scene.add(new THREE.AmbientLight("#e9ddc9", 0.65));

    let raf = 0;
    let running = true;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const start = performance.now();

    function onPointerMove(e: PointerEvent) {
      const r = mount!.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    }
    mount.addEventListener("pointermove", onPointerMove);

    function tick(now: number) {
      if (!running) return;
      const t = (now - start) / 1000;

      // Critically-damped follow toward the pointer target (no overshoot).
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;

      loaf.rotation.y = current.x * 0.5 + (reduceMotion ? 0 : Math.sin(t * 0.25) * 0.12);
      loaf.rotation.x = -current.y * 0.22;
      loaf.position.y = reduceMotion ? 0 : Math.sin(t * 0.6) * 0.06;

      dust.rotation.y = reduceMotion ? 0 : t * 0.03;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    function onResize() {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      mount.removeEventListener("pointermove", onPointerMove);
      loafGeo.dispose();
      loafMat.dispose();
      dustGeo.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden />;
}
