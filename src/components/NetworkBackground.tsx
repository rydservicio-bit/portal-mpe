import { useEffect, useRef } from "react";

const NODES = [
  { label: "Personas", x: 15, y: 25 },
  { label: "Procesos", x: 75, y: 20 },
  { label: "Información", x: 85, y: 65 },
  { label: "Sistemas", x: 20, y: 70 },
  { label: "Decisiones", x: 50, y: 45 },
];

const CONNECTIONS = [
  [0, 4], [1, 4], [2, 4], [3, 4],
  [0, 1], [1, 2], [2, 3], [3, 0],
];

const NetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.005;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const nodes = NODES.map((n) => ({
        ...n,
        px: (n.x / 100) * w,
        py: (n.y / 100) * h + Math.sin(time + n.x) * 6,
      }));

      // Draw connections
      CONNECTIONS.forEach(([a, b]) => {
        const na = nodes[a];
        const nb = nodes[b];
        ctx.beginPath();
        ctx.moveTo(na.px, na.py);
        ctx.lineTo(nb.px, nb.py);
        ctx.strokeStyle = "rgba(10, 132, 255, 0.12)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Animated particle
        const t = ((time * 0.8 + a * 0.3) % 1);
        const px = na.px + (nb.px - na.px) * t;
        const py = na.py + (nb.py - na.py) * t;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 209, 255, 0.6)";
        ctx.fill();
      });

      // Draw nodes
      nodes.forEach((n) => {
        // Glow
        const gradient = ctx.createRadialGradient(n.px, n.py, 0, n.px, n.py, 40);
        gradient.addColorStop(0, "rgba(10, 132, 255, 0.15)");
        gradient.addColorStop(1, "rgba(10, 132, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(n.px - 40, n.py - 40, 80, 80);

        // Dot
        ctx.beginPath();
        ctx.arc(n.px, n.py, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 209, 255, 0.8)";
        ctx.fill();

        // Label
        ctx.font = "11px Inter, sans-serif";
        ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
        ctx.textAlign = "center";
        ctx.fillText(n.label, n.px, n.py + 20);
      });

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.7 }}
    />
  );
};

export default NetworkBackground;
