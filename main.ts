import { mkdirSync as d, readdirSync as f, readFileSync as y, writeFileSync as w } from 'node:fs';
const T = `()),.237xxxxxxxx1111111-111-111x111xxxxxxxxxxxxx(,,((xxxxxxxxxxx-0xxxxxxxxxxxxxx,,),`;
const B = [(a,b)=>a+b,(a,b)=>a-b,Math.imul,(a,b)=>(a/b)|0,(a,b)=>a%b,(a,b)=>(a>>>0)/(b>>>0)|0,(a,b)=>(a>>>0)%(b>>>0),,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,,(a,b)=>a<<b,(a,b)=>a>>b,(a,b)=>a>>>b,,(a,b)=>a===b?1:0,(a,b)=>a<b?1:0,(a,b)=>(a>>>0)<(b>>>0)?1:0];
function run(p, q) {
const D = new Int32Array(256), C = new Int32Array(64), M = new Int32Array(256), o = new Uint8Array(65536);
let s = 0, c = 0, l = 0, i = 0, x = 0, t = 0;
const n = p.length, done = (e) => [o.subarray(0, l), e];
for(;;) {
if(t === 1e6) return done(10);
if(x < 0 || x >= n) return done(9);
const op = p[x], k = T.charCodeAt(op) - 40;
if(op > 83 || k > 15) return done(5);
const m = op === 1 ? 1 : op === 2 ? 4 : op >> 2 === 12 ? 2 : 0;
if(x + m >= n) return done(9);
t++;
const nx = x + 1 + m;
if(s < (k >> 2)) return done(2);
if(s - (k >> 2) + (k & 3) > 256) return done(3);
x = nx;
if(k === 9) {
const b = D[s - 1], a = D[s - 2];
if(!b && op > 18 && op < 23) return done(4);
s -= 2;
D[s++] = B[op - 16](a, b);
continue;
}
switch(op) {
case 0: return done(0);
case 1: D[s++] = (p[nx - 1] << 24) >> 24; break;
case 2: D[s++] = p[nx - 4] | p[nx - 3] << 8 | p[nx - 2] << 16 | p[nx - 1] << 24; break;
case 3: s--; break;
case 4: D[s] = D[s - 1]; s++; break;
case 5: [D[s - 1], D[s - 2]] = [D[s - 2], D[s - 1]]; break;
case 6: D[s] = D[s - 2]; s++; break;
case 7: [D[s - 3], D[s - 2], D[s - 1]] = [D[s - 2], D[s - 1], D[s - 3]]; break;
case 23: D[s - 1] = -D[s - 1]; break;
case 27: D[s - 1] = ~D[s - 1]; break;
case 48: case 49: case 50: {
const r = (p[nx - 2] | p[nx - 1] << 8) << 16 >> 16;
if(op === 48 || (op === 49) === (D[--s] === 0)) x = nx + r;
break;
}
case 51:
if(c === 64) return done(7);
C[c++] = nx;
x = p[nx - 2] | p[nx - 1] << 8;
break;
case 52:
if(!c) return done(8);
x = C[--c];
break;
case 64: {
const a = D[s - 1];
if(a < 0 || a > 255) return done(6);
D[s - 1] = M[a];
break;
}
case 65: {
const a = D[s - 1], v = D[s - 2];
if(a < 0 || a > 255) return done(6);
s -= 2;
M[a] = v;
break;
}
case 80: {
const g = D[s - 1] + '';
if(l + g.length > 65536) return done(11);
s--;
for(const ch of g) o[l++] = ch.charCodeAt(0);
break;
}
case 81:
if(l + 1 > 65536) return done(11);
o[l++] = D[--s] & 255;
break;
case 82: D[s++] = i < q.length ? q[i++] : -1; break;
case 83: return done(D[--s] & 255);
}
}
}
const I = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const O = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
for(const id of f(I).sort()) {
const [b, e] = run(y(`${I}/${id}/program.bin`), y(`${I}/${id}/input.bin`));
d(`${O}/${id}`, { recursive: true });
w(`${O}/${id}/stdout.bin`, b);
w(`${O}/${id}/exit.txt`, e + '\n');
}
