// Target-shape generators for the Edhe particle system.
// All shapes return Float32Array of length count * 3 (xyz).
// Coordinate scale: roughly [-5, 5] so the shapes read nicely at default camera.

const RND = () => Math.random() - 0.5;

// Sample dense positions from a rendered 2D glyph / text using offscreen canvas.
function sampleText(text: string, count: number, opts: any = {}) {
  const {
    fontSize = 420,
    font = '900 420px "Cabinet Grotesk", sans-serif',
    size = 700,
    scale = 0.017,
    depth = 0.35
  } = opts;

  if (typeof document === 'undefined') {
    // Return a dummy array if SSR
    return new Float32Array(count * 3);
  }

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new Float32Array(count * 3);

  ctx.fillStyle = "#000";
  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, size / 2, size / 2 + 15);
  const img = ctx.getImageData(0, 0, size, size).data;
  const pool: [number, number][] = [];
  const step = 2;
  for (let y = 0; y < size; y += step) {
    for (let x = 0; x < size; x += step) {
      const i = (y * size + x) * 4;
      if (img[i + 3] > 128) pool.push([x, y]);
    }
  }
  const arr = new Float32Array(count * 3);
  if (pool.length === 0) {
    // fallback: spherical noise
    for (let i = 0; i < count; i++) {
      arr[i * 3] = RND() * 4;
      arr[i * 3 + 1] = RND() * 4;
      arr[i * 3 + 2] = RND() * 1;
    }
    return arr;
  }
  for (let i = 0; i < count; i++) {
    const p = pool[Math.floor(Math.random() * pool.length)];
    const jx = (Math.random() - 0.5) * 0.06;
    const jy = (Math.random() - 0.5) * 0.06;
    arr[i * 3] = (p[0] - size / 2) * scale + jx;
    arr[i * 3 + 1] = -(p[1] - size / 2) * scale + jy;
    arr[i * 3 + 2] = (Math.random() - 0.5) * depth;
  }
  return arr;
}

// 1. HERO — a massive question mark "?"
export function questionShape(count: number) {
  return sampleText("?", count, {
    scale: 0.019,
    depth: 0.4
  });
}

// 2. ABOUT — flowing horizontal river / wind tunnel
export function riverShape(count: number) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = Math.random();
    const x = (t - 0.5) * 12;
    const swirl = Math.sin(t * Math.PI * 3 + Math.random() * 0.5) * 1.8;
    const y = swirl + (Math.random() - 0.5) * 0.6;
    const z = Math.cos(t * Math.PI * 4) * 1.2 + (Math.random() - 0.5) * 0.8;
    arr[i * 3] = x;
    arr[i * 3 + 1] = y;
    arr[i * 3 + 2] = z;
  }
  return arr;
}

// 3. SERVICES — structured 3D grid cube
export function gridShape(count: number) {
  const arr = new Float32Array(count * 3);
  const cube = Math.ceil(Math.cbrt(count));
  const spacing = 6.5 / cube;
  let idx = 0;
  for (let x = 0; x < cube && idx < count; x++) {
    for (let y = 0; y < cube && idx < count; y++) {
      for (let z = 0; z < cube && idx < count; z++) {
        const px = (x - cube / 2) * spacing + (Math.random() - 0.5) * 0.05;
        const py = (y - cube / 2) * spacing + (Math.random() - 0.5) * 0.05;
        const pz = (z - cube / 2) * spacing + (Math.random() - 0.5) * 0.05;
        arr[idx * 3] = px;
        arr[idx * 3 + 1] = py;
        arr[idx * 3 + 2] = pz;
        idx++;
      }
    }
  }
  return arr;
}

// 4. PROCESS — horizontal timeline with branches / pulses
export function timelineShape(count: number) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = Math.random();
    const branch = Math.random();
    let x = (t - 0.5) * 12;
    let y = (Math.random() - 0.5) * 0.3;
    let z = (Math.random() - 0.5) * 0.4;
    if (branch < 0.25) {
      // vertical pulses at 4 nodes
      const node = Math.floor(t * 4) / 4 - 0.5;
      x = node * 10 + (Math.random() - 0.5) * 0.2;
      y = (Math.random() - 0.5) * 3.2;
    }
    arr[i * 3] = x;
    arr[i * 3 + 1] = y;
    arr[i * 3 + 2] = z;
  }
  return arr;
}

// 5. PROJECTS — loose scattered constellation with two dense clusters
export function constellationShape(count: number) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const cluster = Math.random();
    let cx = 0,
      cy = 0;
    if (cluster < 0.45) {
      cx = -2.2;
      cy = 0.5;
    } else if (cluster < 0.85) {
      cx = 2.4;
      cy = -0.6;
    } else {
      cx = (Math.random() - 0.5) * 9;
      cy = (Math.random() - 0.5) * 5;
    }
    const r = Math.pow(Math.random(), 2) * 2.2;
    const theta = Math.random() * Math.PI * 2;
    arr[i * 3] = cx + Math.cos(theta) * r;
    arr[i * 3 + 1] = cy + Math.sin(theta) * r;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 1.6;
  }
  return arr;
}

// 6. CTA — converging sphere (the answer)
export function sphereShape(count: number) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = 2.4 + (Math.random() - 0.5) * 0.25;
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
}

export function buildAllShapes(count: number) {
  return [
    questionShape(count),
    riverShape(count),
    gridShape(count),
    timelineShape(count),
    constellationShape(count),
    sphereShape(count)
  ];
}
