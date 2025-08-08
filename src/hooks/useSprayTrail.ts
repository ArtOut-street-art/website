import { useEffect } from "react";

export function useSprayTrail(ref: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Create canvas
    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none"; 
    canvas.style.zIndex = "5";
    canvas.style.display = "block";
    container.appendChild(canvas);

    let ctx = canvas.getContext("2d");
    let animationId: number | null = null;
    let particles: {
      x: number;
      y: number;
      r: number;
      color: string;
      alpha: number;
      vx: number;
      vy: number;
    }[] = [];

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      }
    }
    resize();
    const ro =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    if (ro) ro.observe(container);
    window.addEventListener("resize", resize);

    function spray(x: number, y: number) {
      for (let i = 0; i < 10; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 2 + 1;
        const r = Math.random() * 7 + 4;
        const color =
          Math.random() < 0.33
            ? "#f472b6"
            : Math.random() < 0.5
            ? "#facc15"
            : "#818cf8";
        particles.push({
          x,
          y,
          r,
          color,
          alpha: 0.7 + Math.random() * 0.3,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        });
      }
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.018;
        p.r *= 0.97;
      });
      particles = particles.filter((p) => p.alpha > 0.05 && p.r > 1);
      animationId = requestAnimationFrame(animate);
    }

    // Attach mousemove event on window so we can detect hover over the container
    function handleMouseMove(e: MouseEvent) {
      const rect = container.getBoundingClientRect();
      // Only spray if the mouse is within the container's bounding box
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        spray(e.clientX - rect.left, e.clientY - rect.top);
      }
    }
    window.addEventListener("mousemove", handleMouseMove);

    animate();

    // Cleanup
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (ro) ro.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (container.contains(canvas)) container.removeChild(canvas);
    };
  }, [ref]);
}
