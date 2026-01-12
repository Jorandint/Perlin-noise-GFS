class noise_generator {
	
	constructor(){
		this._perm = new Uint8Array(512);
		this._phaserRng = null;
	}

	_mulberry32(a){
         return function(){
			var t = a += 0x6D2B79F5;
      		t = Math.imul(t ^ t >>> 15, t | 1);
      		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      		return ((t ^ t >>> 14) >>> 0) / 4294967296;
			}; 
        }

	seed(s){
		const hash = (typeof s === 'number') ? s  : (String(s).split('').reduce((h,c)=>((h<<5)-h)+c.charCodeAt(0),0)|0) ;
		console.log(hash)
		const rnd = this._mulberry32(hash);
		console.log(rnd());
		const p = new Uint8Array(256);
		for(let i=0;i<256;i++) p[i]=i;
		for(let i=255;i>0;i--){ 
			const j = Math.floor(rnd()*(i+1));
			const t = p[i];
			p[i]=p[j];
			p[j]=t;
			}
		for(let i=0;i<512;i++) this._perm[i] = p[i & 255];
	}

	_fade(t){
		return t*t*t*(t*(t*6-15)+10); 
		}
	_lerp(a,b,t){
		return a + t*(b-a); 
		}
	_grad(hash,x,y){
		const h = hash & 3;
		return (h&1 ? -x : x) + (h&2 ? -y : y); 
		}
	// Core Perlin on continuous coordinates (approx [-1,1])

	perlin2(x,y){
		const P = this._perm;
		const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
		x -= Math.floor(x);
		y -= Math.floor(y);
		const u = this._fade(x), v = this._fade(y);
		const a = P[X + P[Y]], b = P[X + 1 + P[Y]];
		const c = P[X + P[Y + 1]], d = P[X + 1 + P[Y + 1]];
		const v1 = this._grad(a, x, y), v2 = this._grad(b, x-1, y);
		const v3 = this._grad(c, x, y-1), v4 = this._grad(d, x-1, y-1);
		return this._lerp(this._lerp(v1,v2,u), this._lerp(v3,v4,u), v);
	}

	// Fractal noise with simple options; returns [0,1]
	noise(x,y,opts){
		opts = opts || {};
		const octaves = Math.max(1, (opts.octaves) || 1);
		const persistence = opts.persistence !== undefined ? opts.persistence : 0.5;
		const lacunarity = opts.lacunarity !== undefined ? opts.lacunarity : 2.0;
		const scale = (opts.scale && opts.scale>0) ? opts.scale : 1.0;
		const ox = opts.offsetX || 0, oy = opts.offsetY || 0;

		let amp = 1, freq = 1, max = 0, acc = 0;
		for(let i=0;i<octaves;i++){
			acc += this.perlin2((x+ox) * freq / scale, (y+oy) * freq / scale) * amp;
			max += amp;
			amp *= persistence;
			freq *= lacunarity;
		}
		return acc / max * 0.5 + 0.5;
	}

	// simple generator: returns array of Float32Array rows
	generate(width,height,opts){
		const out = new Array(height);
		for(let y=0;y<height;y++){
			const row = new Float32Array(width);
		for(let x=0;x<width;x++){
			row[x] = this.noise(x,y,opts);
			out[y] = row;
			}}
		return out;
	}
}

export { noise_generator };