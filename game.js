// // // // ── Read level index from URL: game.html?level=0 ─────────────
// // // const params       = new URLSearchParams(window.location.search);
// // // let   currentLevel = parseInt(params.get('level') || '0', 10);

// // // const canvas = document.getElementById('gameCanvas');
// // // const ctx    = canvas.getContext('2d');

// // // // ── NAVIGATION ───────────────────────────────────────────────
// // // function exitGame(){
// // //   stopSim();
// // //   window.location.href = 'levelselect.html';
// // // }
// // // function goNextLevel(){
// // //   document.getElementById('winModal').classList.add('hidden');
// // //   const next = currentLevel < LEVELS.length - 1 ? currentLevel + 1 : currentLevel;
// // //   window.location.href = `game.html?level=${next}`;
// // // }

// // // // ── PHYSICS CONSTANTS ─────────────────────────────────────────
// // // const VEHICLE_MASS      = 5;
// // // const STRESS_PER_LOAD   = 0.09;
// // // const STRESS_FIXED_LOAD = 0.28;
// // // const BEAM_FATIGUE_RATE = 0.002;

// // // // ── MATERIALS ─────────────────────────────────────────────────
// // // const MAT = {
// // //   wood:  { label:'Wood',  costPx:1.0, maxStr:0.12, w:6,  color:'#c07828', hi:'#e8a040' },
// // //   steel: { label:'Steel', costPx:2.2, maxStr:1,    w:7,  color:'#c02828', hi:'#e84040' },
// // //   cable: { label:'Cable', costPx:0.5, maxStr:0.08, w:3,  color:'#777',    hi:'#aaa'    },
// // //   iron:  { label:'Iron',  costPx:1.6, maxStr:2,    w:9,  color:'#3a5a7a', hi:'#6888aa' },
// // //   road:  { label:'Road',  costPx:3.0, maxStr:2,    w:11, color:'#2a2a2a', hi:'#555'    },
// // // };

// // // // ── LEVELS ────────────────────────────────────────────────────
// // // const LEVELS = [
// // //   {
// // //     name:'Tutorial Gap', tutorial:true, budget:99999,
// // //     sky:['#c0bcd4','#d8d4e8'], waterY:0.78, waterC:'#48a8bc',
// // //     terrain:[
// // //       {pts:[[0,0.70],[0.27,0.70],[0.27,1],[0,1]], type:'grass'},
// // //       {pts:[[0.50,0.70],[1,0.70],[1,1],[0.50,1]], type:'grass'},
// // //     ],
// // //     anchors:[{x:0.27,y:0.70},{x:0.27,y:0.50},{x:0.50,y:0.70},{x:0.50,y:0.50}],
// // //     veh:{x:0.04, w:52, h:26, speed:1.3},
// // //     goal:{x:0.88, y:0.70},
// // //     tips:[
// // //       'Click a red anchor to select it',
// // //       'Now click another anchor or empty space to draw a beam!',
// // //       'The car is HEAVY — add diagonals or it will collapse!',
// // //       'Press TEST — watch stress colors appear under load!',
// // //     ],
// // //   },
// // //   {
// // //     name:'River Crossing', budget:5000,
// // //     sky:['#b8c8d8','#ccdce8'], waterY:0.78, waterC:'#3aa8c0',
// // //     terrain:[
// // //       {pts:[[0,0.70],[0.22,0.70],[0.22,1],[0,1]], type:'grass'},
// // //       {pts:[[0.52,0.70],[1,0.70],[1,1],[0.52,1]], type:'grass'},
// // //     ],
// // //     anchors:[{x:0.22,y:0.70},{x:0.22,y:0.48},{x:0.10,y:0.48},{x:0.52,y:0.70},{x:0.52,y:0.48},{x:0.64,y:0.48}],
// // //     veh:{x:0.04, w:52, h:26, speed:1.1},
// // //     goal:{x:0.88, y:0.71},
// // //   },
// // //   {
// // //     name:'Double Span', budget:7000,
// // //     sky:['#c0b8cc','#d4cce0'], waterY:0.78, waterC:'#3898b0',
// // //     terrain:[
// // //       {pts:[[0,0.70],[0.17,0.70],[0.17,1],[0,1]], type:'rock'},
// // //       {pts:[[0.37,0.70],[0.50,0.70],[0.50,1],[0.37,1]], type:'rock'},
// // //       {pts:[[0.68,0.70],[1,0.70],[1,1],[0.68,1]], type:'rock'},
// // //     ],
// // //     anchors:[
// // //       {x:0.17,y:0.70},{x:0.17,y:0.48},
// // //       {x:0.37,y:0.70},{x:0.37,y:0.48},{x:0.50,y:0.70},{x:0.50,y:0.48},
// // //       {x:0.68,y:0.70},{x:0.68,y:0.48},
// // //     ],
// // //     veh:{x:0.04, w:52, h:26, speed:1.1},
// // //     goal:{x:0.90, y:0.71},
// // //   },
// // //   {
// // //     name:'Deep Chasm', budget:6500,
// // //     sky:['#b0a8c0','#ccc4d8'], waterY:0.88, waterC:'#286888',
// // //     terrain:[
// // //       {pts:[[0,0.62],[0.20,0.62],[0.20,1],[0,1]], type:'ice'},
// // //       {pts:[[0.56,0.62],[1,0.62],[1,1],[0.56,1]], type:'ice'},
// // //     ],
// // //     anchors:[
// // //       {x:0.20,y:0.62},{x:0.20,y:0.40},{x:0.08,y:0.40},
// // //       {x:0.56,y:0.62},{x:0.56,y:0.40},{x:0.68,y:0.40},
// // //     ],
// // //     veh:{x:0.04, w:52, h:26, speed:1.0},
// // //     goal:{x:0.88, y:0.63},
// // //   },
// // //   {
// // //     name:'Asymmetric', budget:6000,
// // //     sky:['#b8c4cc','#ccd4dc'], waterY:0.80, waterC:'#389898',
// // //     terrain:[
// // //       {pts:[[0,0.68],[0.24,0.68],[0.24,1],[0,1]], type:'grass'},
// // //       {pts:[[0.56,0.61],[1,0.61],[1,1],[0.56,1]], type:'grass'},
// // //     ],
// // //     anchors:[
// // //       {x:0.24,y:0.68},{x:0.24,y:0.46},{x:0.10,y:0.46},
// // //       {x:0.56,y:0.61},{x:0.56,y:0.39},{x:0.70,y:0.39},
// // //     ],
// // //     veh:{x:0.04, w:52, h:26, speed:1.0},
// // //     goal:{x:0.90, y:0.62},
// // //   },
// // //   {
// // //     name:'Tight Budget', budget:2200,
// // //     sky:['#beb8cc','#d2cce0'], waterY:0.79, waterC:'#48a8bc',
// // //     terrain:[
// // //       {pts:[[0,0.70],[0.22,0.70],[0.22,1],[0,1]], type:'ice'},
// // //       {pts:[[0.50,0.70],[1,0.70],[1,1],[0.50,1]], type:'ice'},
// // //     ],
// // //     anchors:[{x:0.22,y:0.70},{x:0.22,y:0.50},{x:0.50,y:0.70},{x:0.50,y:0.50}],
// // //     veh:{x:0.04, w:52, h:26, speed:1.4},
// // //     goal:{x:0.88, y:0.71},
// // //   },
// // //   {
// // //     name:'Mid-River Rock', budget:7500,
// // //     sky:['#b4bec8','#c8d2dc'], waterY:0.80, waterC:'#38a0b4',
// // //     terrain:[
// // //       {pts:[[0,0.70],[0.17,0.70],[0.17,1],[0,1]], type:'rock'},
// // //       {pts:[[0.40,0.76],[0.48,0.76],[0.48,1],[0.40,1]], type:'rock'},
// // //       {pts:[[0.70,0.70],[1,0.70],[1,1],[0.70,1]], type:'rock'},
// // //     ],
// // //     anchors:[
// // //       {x:0.17,y:0.70},{x:0.17,y:0.48},
// // //       {x:0.40,y:0.76},{x:0.48,y:0.76},{x:0.40,y:0.48},{x:0.48,y:0.48},
// // //       {x:0.70,y:0.70},{x:0.70,y:0.48},
// // //     ],
// // //     veh:{x:0.04, w:52, h:26, speed:1.0},
// // //     goal:{x:0.90, y:0.71},
// // //   },
// // //   {
// // //     name:'Triple Chasm', budget:10000,
// // //     sky:['#acb4c0','#c4ccd8'], waterY:0.81, waterC:'#288898',
// // //     terrain:[
// // //       {pts:[[0,0.70],[0.13,0.70],[0.13,1],[0,1]], type:'ice'},
// // //       {pts:[[0.27,0.70],[0.38,0.70],[0.38,1],[0.27,1]], type:'ice'},
// // //       {pts:[[0.52,0.70],[0.63,0.70],[0.63,1],[0.52,1]], type:'ice'},
// // //       {pts:[[0.77,0.70],[1,0.70],[1,1],[0.77,1]], type:'ice'},
// // //     ],
// // //     anchors:[
// // //       {x:0.13,y:0.70},{x:0.13,y:0.46},
// // //       {x:0.27,y:0.70},{x:0.38,y:0.70},{x:0.27,y:0.46},{x:0.38,y:0.46},
// // //       {x:0.52,y:0.70},{x:0.63,y:0.70},{x:0.52,y:0.46},{x:0.63,y:0.46},
// // //       {x:0.77,y:0.70},{x:0.77,y:0.46},
// // //     ],
// // //     veh:{x:0.03, w:52, h:26, speed:0.9},
// // //     goal:{x:0.91, y:0.71},
// // //   },
// // //   {
// // //     name:'Steep Canyon', budget:8000,
// // //     sky:['#a8b0be','#bcc4d2'], waterY:0.92, waterC:'#185068',
// // //     terrain:[
// // //       {pts:[[0,0.58],[0.19,0.58],[0.19,1],[0,1]], type:'rock'},
// // //       {pts:[[0.56,0.58],[1,0.58],[1,1],[0.56,1]], type:'rock'},
// // //     ],
// // //     anchors:[
// // //       {x:0.19,y:0.58},{x:0.19,y:0.35},{x:0.06,y:0.35},
// // //       {x:0.56,y:0.58},{x:0.56,y:0.35},{x:0.70,y:0.35},
// // //     ],
// // //     veh:{x:0.04, w:56, h:28, speed:1.3},
// // //     goal:{x:0.90, y:0.59},
// // //   },
// // //   {
// // //     name:'Grand Finale', budget:14000,
// // //     sky:['#a0a8b4','#b8c0cc'], waterY:0.82, waterC:'#185878',
// // //     terrain:[
// // //       {pts:[[0,0.65],[0.13,0.65],[0.13,1],[0,1]], type:'ice'},
// // //       {pts:[[0.30,0.72],[0.38,0.72],[0.38,1],[0.30,1]], type:'rock'},
// // //       {pts:[[0.55,0.70],[0.63,0.70],[0.63,1],[0.55,1]], type:'rock'},
// // //       {pts:[[0.78,0.65],[1,0.65],[1,1],[0.78,1]], type:'ice'},
// // //     ],
// // //     anchors:[
// // //       {x:0.13,y:0.65},{x:0.13,y:0.42},{x:0.03,y:0.42},
// // //       {x:0.30,y:0.72},{x:0.38,y:0.72},{x:0.30,y:0.42},{x:0.38,y:0.42},
// // //       {x:0.55,y:0.70},{x:0.63,y:0.70},{x:0.55,y:0.42},{x:0.63,y:0.42},
// // //       {x:0.78,y:0.65},{x:0.78,y:0.42},{x:0.90,y:0.42},
// // //     ],
// // //     veh:{x:0.03, w:58, h:30, speed:1.5},
// // //     goal:{x:0.92, y:0.66},
// // //   },
// // // ];

// // // // ── GAME STATE ────────────────────────────────────────────────
// // // let mode       = 'build';
// // // let currentMat = 'steel';
// // // let nodes      = [];
// // // let beams      = [];
// // // let veh        = null;
// // // let nid        = 0;
// // // let selNode    = null;
// // // let hovNode    = null;
// // // let hovBeam    = null;
// // // let mouseX     = 0, mouseY = 0;
// // // let won        = false, failed = false;
// // // let showGrid   = true;
// // // let raf        = null;
// // // let history    = [];
// // // let budget     = 0;
// // // let tutStep    = 0;

// // // const SNAP  = 18;
// // // const G     = 0.38;
// // // const DAMP  = 0.982;
// // // const ITERS = 24;

// // // // ── INIT ──────────────────────────────────────────────────────
// // // function resizeCanvas(){
// // //   canvas.width  = window.innerWidth;
// // //   canvas.height = window.innerHeight - 46 - 58;
// // // }

// // // function resetLevel(){
// // //   stopSim();
// // //   resizeCanvas();
// // //   const lv = LEVELS[currentLevel];
// // //   nodes=[]; beams=[]; history=[];
// // //   selNode=null; hovNode=null; hovBeam=null;
// // //   won=false; failed=false; veh=null; nid=0;
// // //   tutStep=0;
// // //   budget = lv.budget;
// // //   document.getElementById('levelLabel').textContent = `LVL ${currentLevel + 1}`;
// // //   updateBudget();
// // //   lv.anchors.forEach(a => nodes.push(mkNode(a.x * canvas.width, a.y * canvas.height, true)));
// // //   setMode('build');
// // //   updateTut();
// // //   raf = requestAnimationFrame(loop);
// // // }

// // // function mkNode(x, y, fixed=false){
// // //   return { id:nid++, x, y, px:x, py:y, fixed, bx:x, by:y };
// // // }

// // // // ── MATERIAL ──────────────────────────────────────────────────
// // // function selectMat(m){
// // //   currentMat = m;
// // //   document.querySelectorAll('.mat-btn').forEach(b => b.classList.remove('selected'));
// // //   const el = document.getElementById('mat-' + m);
// // //   if(el) el.classList.add('selected');
// // //   const lbl = document.getElementById('matCostLabel');
// // //   if(lbl && MAT[m]) lbl.textContent = `${MAT[m].label} — $${MAT[m].costPx.toFixed(1)}/px`;
// // // }

// // // // ── MODE ──────────────────────────────────────────────────────
// // // function setMode(m){
// // //   mode = m;
// // //   document.getElementById('btnBuild').className = 'tb-btn mode-btn' + (m==='build' ? ' active-build' : '');
// // //   document.getElementById('btnTest').className  = 'tb-btn mode-btn' + (m==='test'  ? ' active-test'  : '');
// // //   canvas.style.cursor = m === 'build' ? 'crosshair' : 'default';
// // //   selNode = null;
// // //   if(m === 'test'){
// // //     nodes.forEach(n => { n.bx=n.x; n.by=n.y; n.px=n.x; n.py=n.y; });
// // //     beams.forEach(b => { b.broken=false; b.stress=0; b.fatigue=0; });
// // //     spawnVehicle();
// // //     updateTut('test');
// // //   } else {
// // //     veh = null;
// // //     nodes.forEach(n => { n.x=n.bx; n.y=n.by; n.px=n.bx; n.py=n.by; });
// // //     beams.forEach(b => { b.broken=false; b.stress=0; b.fatigue=0; });
// // //   }
// // // }

// // // function spawnVehicle(){
// // //   const lv = LEVELS[currentLevel];
// // //   const vd = lv.veh;
// // //   const sx = vd.x * canvas.width;
// // //   let ty = lv.terrain[0].pts[0][1] * canvas.height;
// // //   lv.terrain.forEach(tr => {
// // //     const xs = tr.pts.map(p => p[0] * canvas.width);
// // //     const ys = tr.pts.map(p => p[1] * canvas.height);
// // //     if(sx >= Math.min(...xs) && sx <= Math.max(...xs)) ty = Math.min(...ys);
// // //   });
// // //   veh = { x:sx, y:ty-vd.h-1, w:vd.w, h:vd.h, speed:vd.speed, vy:0, spin:0, done:false, onBridge:false };
// // // }

// // // // ── PHYSICS ───────────────────────────────────────────────────
// // // function simulate(){
// // //   if(mode !== 'test') return;

// // //   nodes.forEach(n => {
// // //     if(n.fixed) return;
// // //     const vx = (n.x-n.px)*DAMP, vy = (n.y-n.py)*DAMP + G;
// // //     n.px=n.x; n.py=n.y;
// // //     n.x+=vx; n.y+=vy;
// // //   });

// // //   for(let it=0; it<ITERS; it++){
// // //     beams.forEach(b => {
// // //       if(b.broken) return;
// // //       const na=nodes[b.a], nb=nodes[b.b];
// // //       if(!na||!nb) return;
// // //       const dx=nb.x-na.x, dy=nb.y-na.y;
// // //       const d=Math.sqrt(dx*dx+dy*dy)||0.001;
// // //       const err=(d-b.restLen)/d;
// // //       if(b.mat==='cable' && err<0){ b.stress*=0.92; return; }
// // //       b.stress=Math.abs(err);
// // //       if(b.stress > MAT[b.mat].maxStr*0.40) b.fatigue=(b.fatigue||0)+BEAM_FATIGUE_RATE;
// // //       const eMax = MAT[b.mat].maxStr-(b.fatigue||0);
// // //       if(b.stress > eMax){ b.broken=true; return; }
// // //       if(na.fixed && nb.fixed) return;
// // //       const fx=dx*err*0.5, fy=dy*err*0.5;
// // //       if(!na.fixed){ na.x+=fx; na.y+=fy; }
// // //       if(!nb.fixed){ nb.x-=fx; nb.y-=fy; }
// // //     });
// // //     floorNodes();
// // //   }
// // //   applyLoad();
// // //   moveVehicle();
// // // }

// // // function floorNodes(){
// // //   const lv = LEVELS[currentLevel];
// // //   nodes.forEach(n => {
// // //     if(n.fixed) return;
// // //     lv.terrain.forEach(tr => {
// // //       const xs=tr.pts.map(p=>p[0]*canvas.width), ys=tr.pts.map(p=>p[1]*canvas.height);
// // //       const topY=Math.min(...ys);
// // //       if(n.x>=Math.min(...xs)&&n.x<=Math.max(...xs)&&n.y>topY){ n.y=topY; n.py=topY+0.5; }
// // //     });
// // //   });
// // // }

// // // function applyLoad(){
// // //   if(!veh||veh.done) return;
// // //   const samples=[
// // //     veh.x+veh.w*0.10, veh.x+veh.w*0.28, veh.x+veh.w*0.50,
// // //     veh.x+veh.w*0.72, veh.x+veh.w*0.90,
// // //   ];
// // //   const wPer = VEHICLE_MASS / samples.length;
// // //   veh.onBridge = false;
// // //   samples.forEach(wx => {
// // //     beams.forEach(b => {
// // //       if(b.broken) return;
// // //       const na=nodes[b.a], nb=nodes[b.b];
// // //       if(!na||!nb||!isDeck(na,nb)) return;
// // //       const lo=Math.min(na.x,nb.x), hi=Math.max(na.x,nb.x);
// // //       if(wx<lo||wx>hi) return;
// // //       const t=sat((wx-na.x)/((nb.x-na.x)||0.001));
// // //       const sy=na.y+t*(nb.y-na.y);
// // //       if(Math.abs(veh.y+veh.h-sy)>28) return;
// // //       veh.onBridge=true;
// // //       if(!na.fixed){ na.y+=wPer*(1-t); na.py=na.y+0.2; }
// // //       if(!nb.fixed){ nb.y+=wPer*t;     nb.py=nb.y+0.2; }
// // //       const sAdd = (na.fixed&&nb.fixed) ? STRESS_FIXED_LOAD : STRESS_PER_LOAD;
// // //       b.stress = Math.min(b.stress+sAdd, MAT[b.mat].maxStr+0.15);
// // //       b.fatigue = (b.fatigue||0)+BEAM_FATIGUE_RATE*2;
// // //       if(b.stress > MAT[b.mat].maxStr-(b.fatigue||0)) b.broken=true;
// // //     });
// // //   });
// // // }

// // // function isDeck(na,nb){
// // //   const dx=nb.x-na.x, dy=nb.y-na.y, len=Math.sqrt(dx*dx+dy*dy)||1;
// // //   return Math.abs(dy/len)<0.55;
// // // }
// // // function sat(v){ return Math.max(0,Math.min(1,v)); }

// // // function moveVehicle(){
// // //   if(!veh||veh.done) return;
// // //   const lv = LEVELS[currentLevel];
// // //   veh.x+=veh.speed; veh.vy+=G*0.55; veh.spin+=veh.speed*0.1;
// // //   const xs=[veh.x+veh.w*0.15, veh.x+veh.w*0.5, veh.x+veh.w*0.85];
// // //   let surfY=null;
// // //   xs.forEach(wx=>{
// // //     beams.forEach(b=>{
// // //       if(b.broken) return;
// // //       const na=nodes[b.a], nb=nodes[b.b];
// // //       if(!na||!nb||!isDeck(na,nb)) return;
// // //       const lo=Math.min(na.x,nb.x), hi=Math.max(na.x,nb.x);
// // //       if(wx<lo||wx>hi) return;
// // //       const t=sat((wx-na.x)/((nb.x-na.x)||0.001));
// // //       const sy=na.y+t*(nb.y-na.y);
// // //       if(surfY===null||sy<surfY) surfY=sy;
// // //     });
// // //     lv.terrain.forEach(tr=>{
// // //       const xs2=tr.pts.map(p=>p[0]*canvas.width), ys2=tr.pts.map(p=>p[1]*canvas.height);
// // //       if(wx>=Math.min(...xs2)&&wx<=Math.max(...xs2)){
// // //         const topY=Math.min(...ys2);
// // //         if(surfY===null||topY<surfY) surfY=topY;
// // //       }
// // //     });
// // //   });
// // //   if(surfY!==null){
// // //     const gap=surfY-(veh.y+veh.h);
// // //     if(gap<=3 && gap>=-veh.h*1.2 && veh.vy>=0){ veh.y=surfY-veh.h; veh.vy=0; }
// // //   }
// // //   veh.y+=veh.vy;
// // //   if(veh.y>canvas.height+100 && !won){
// // //     veh.done=true;
// // //     const bc=beams.filter(b=>b.broken).length;
// // //     const msg=bc>0
// // //       ? `${bc} beam${bc>1?'s':''} snapped! Add stronger supports — the car is heavy.`
// // //       : 'The vehicle fell! Make sure the deck spans the full crossing.';
// // //     showFail(msg);
// // //     return;
// // //   }
// // //   if(veh.x+veh.w >= lv.goal.x*canvas.width) showWin();
// // // }

// // // // ── WIN / FAIL ────────────────────────────────────────────────
// // // function showWin(){
// // //   if(won||failed) return; won=true;
// // //   const sp=spent(), lv=LEVELS[currentLevel];
// // //   document.getElementById('winMsg').textContent=`Spent $${sp.toLocaleString()} of $${lv.budget>90000?'∞':lv.budget.toLocaleString()}`;
// // //   document.getElementById('winModal').classList.remove('hidden');
// // // }
// // // function showFail(msg){
// // //   if(won||failed) return; failed=true;
// // //   document.getElementById('failMsg').textContent=msg;
// // //   document.getElementById('failModal').classList.remove('hidden');
// // // }

// // // // ── BUDGET ────────────────────────────────────────────────────
// // // function spent(){
// // //   return Math.round(beams.reduce((s,b)=>s+b.restLen*MAT[b.mat].costPx, 0));
// // // }
// // // function updateBudget(){
// // //   const s=spent(), lv=LEVELS[currentLevel];
// // //   document.getElementById('budgetSpent').textContent='$'+s.toLocaleString();
// // //   document.getElementById('budgetSpent').className='budget-spent'+(s>lv.budget&&lv.budget<90000?' budget-over':'');
// // //   document.getElementById('budgetLabel').textContent='Budget: $'+(lv.budget>90000?'∞':lv.budget.toLocaleString());
// // // }
// // // function flashBudget(){
// // //   const el=document.getElementById('budgetSpent');
// // //   el.textContent='OVER BUDGET!'; el.className='budget-spent budget-over';
// // //   setTimeout(updateBudget,900);
// // // }

// // // // ── UNDO / CLEAR ──────────────────────────────────────────────
// // // function undoLast(){
// // //   if(mode!=='build'||!history.length) return;
// // //   const last=history.pop();
// // //   if(last.type==='beam'){ beams=beams.filter(b=>b.id!==last.id); }
// // //   else {
// // //     beams=beams.filter(b=>b.naid!==last.id&&b.nbid!==last.id);
// // //     nodes=nodes.filter(n=>n.id!==last.id);
// // //     rebuildIdx();
// // //   }
// // //   selNode=null; updateBudget();
// // // }
// // // function clearAll(){
// // //   if(mode!=='build') return;
// // //   nodes=nodes.filter(n=>n.fixed);
// // //   beams=[]; history=[]; selNode=null;
// // //   rebuildIdx(); updateBudget();
// // // }
// // // function rebuildIdx(){
// // //   const m={};
// // //   nodes.forEach((n,i)=>m[n.id]=i);
// // //   beams=beams.filter(b=>m[b.naid]!==undefined&&m[b.nbid]!==undefined);
// // //   beams.forEach(b=>{ b.a=m[b.naid]; b.b=m[b.nbid]; });
// // // }

// // // // ── GRID ──────────────────────────────────────────────────────
// // // function toggleGrid(){
// // //   showGrid=!showGrid;
// // //   document.getElementById('gridBtn').classList.toggle('active-icon',showGrid);
// // // }

// // // // ── INPUT ─────────────────────────────────────────────────────
// // // canvas.addEventListener('mousemove',e=>{
// // //   const r=canvas.getBoundingClientRect();
// // //   mouseX=e.clientX-r.left; mouseY=e.clientY-r.top;
// // //   if(mode!=='build') return;
// // //   hovNode=null; let md=SNAP;
// // //   nodes.forEach(n=>{ const d=Math.hypot(n.x-mouseX,n.y-mouseY); if(d<md){md=d;hovNode=n;} });
// // //   hovBeam=null;
// // //   if(!hovNode) beams.forEach(b=>{ const na=nodes[b.a],nb=nodes[b.b]; if(na&&nb&&segDist(mouseX,mouseY,na.x,na.y,nb.x,nb.y)<9) hovBeam=b; });
// // // });

// // // canvas.addEventListener('click',e=>{
// // //   if(mode!=='build') return;
// // //   const r=canvas.getBoundingClientRect();
// // //   const cx=e.clientX-r.left, cy=e.clientY-r.top;
// // //   let snap=null, sd=SNAP;
// // //   nodes.forEach(n=>{ const d=Math.hypot(n.x-cx,n.y-cy); if(d<sd){sd=d;snap=n;} });

// // //   if(!selNode){
// // //     if(snap){ selNode=snap; advTut(1); }
// // //     else if(!inTerrain(cx,cy)){ const n=mkNode(cx,cy,false); nodes.push(n); history.push({type:'node',id:n.id}); selNode=n; advTut(1); }
// // //   } else {
// // //     let target=snap;
// // //     if(!target&&!inTerrain(cx,cy)){ const n=mkNode(cx,cy,false); nodes.push(n); history.push({type:'node',id:n.id}); target=n; }
// // //     if(target&&target.id!==selNode.id){
// // //       const dup=beams.some(b=>(b.naid===selNode.id&&b.nbid===target.id)||(b.naid===target.id&&b.nbid===selNode.id));
// // //       if(!dup){
// // //         const dx=target.x-selNode.x, dy=target.y-selNode.y, len=Math.sqrt(dx*dx+dy*dy);
// // //         if(len>4){
// // //           const cost=Math.round(len*MAT[currentMat].costPx);
// // //           const lv=LEVELS[currentLevel];
// // //           if(spent()+cost>lv.budget&&lv.budget<90000){ flashBudget(); selNode=null; return; }
// // //           const ai=nodes.indexOf(selNode), bi=nodes.indexOf(target), bid=nid++;
// // //           beams.push({id:bid,a:ai,b:bi,naid:selNode.id,nbid:target.id,restLen:len,mat:currentMat,stress:0,broken:false,fatigue:0});
// // //           history.push({type:'beam',id:bid});
// // //           updateBudget(); advTut(2);
// // //         }
// // //       }
// // //       selNode=target;
// // //     } else if(!target){ selNode=null; }
// // //   }
// // // });

// // // canvas.addEventListener('contextmenu',e=>{
// // //   e.preventDefault();
// // //   if(mode!=='build') return;
// // //   const r=canvas.getBoundingClientRect();
// // //   const cx=e.clientX-r.left, cy=e.clientY-r.top;
// // //   selNode=null;
// // //   let hit=null,hd=SNAP;
// // //   nodes.forEach(n=>{ const d=Math.hypot(n.x-cx,n.y-cy); if(d<hd){hd=d;hit=n;} });
// // //   if(hit&&!hit.fixed){ beams=beams.filter(b=>b.naid!==hit.id&&b.nbid!==hit.id); nodes=nodes.filter(n=>n.id!==hit.id); history=history.filter(h=>h.id!==hit.id); rebuildIdx(); updateBudget(); return; }
// // //   const bi=beams.findIndex(b=>{ const na=nodes[b.a],nb=nodes[b.b]; return na&&nb&&segDist(cx,cy,na.x,na.y,nb.x,nb.y)<10; });
// // //   if(bi!==-1){ history=history.filter(h=>h.id!==beams[bi].id); beams.splice(bi,1); updateBudget(); }
// // // });

// // // window.addEventListener('keydown',e=>{
// // //   if(e.key==='Escape') selNode=null;
// // //   if((e.key==='z'||e.key==='Z')&&(e.ctrlKey||e.metaKey)) undoLast();
// // // });

// // // // ── HELPERS ───────────────────────────────────────────────────
// // // function segDist(px,py,ax,ay,bx,by){
// // //   const dx=bx-ax,dy=by-ay,l=dx*dx+dy*dy;
// // //   if(l<0.001) return Math.hypot(px-ax,py-ay);
// // //   const t=sat(((px-ax)*dx+(py-ay)*dy)/l);
// // //   return Math.hypot(px-(ax+t*dx),py-(ay+t*dy));
// // // }
// // // function inTerrain(x,y){
// // //   return LEVELS[currentLevel].terrain.some(tr=>{
// // //     const pts=tr.pts.map(p=>[p[0]*canvas.width,p[1]*canvas.height]);
// // //     let inside=false;
// // //     for(let i=0,j=pts.length-1;i<pts.length;j=i++){
// // //       const [xi,yi]=pts[i],[xj,yj]=pts[j];
// // //       if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi) inside=!inside;
// // //     }
// // //     return inside;
// // //   });
// // // }

// // // // ── DRAW ──────────────────────────────────────────────────────
// // // function draw(){
// // //   const W=canvas.width,H=canvas.height,lv=LEVELS[currentLevel];
// // //   const sky=ctx.createLinearGradient(0,0,0,H);
// // //   sky.addColorStop(0,lv.sky[0]); sky.addColorStop(1,lv.sky[1]);
// // //   ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);

// // //   if(showGrid){
// // //     ctx.strokeStyle='rgba(0,0,0,0.065)'; ctx.lineWidth=1;
// // //     for(let x=0;x<W;x+=50){ ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke(); }
// // //     for(let y=0;y<H;y+=50){ ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke(); }
// // //   }

// // //   // Mountains
// // //   ctx.fillStyle='rgba(150,145,175,0.18)';
// // //   [[0.09,0.57,0.16,0.21],[0.26,0.60,0.13,0.17],[0.72,0.54,0.17,0.22],[0.90,0.59,0.12,0.16]].forEach(([cx,by,bw,bh])=>{
// // //     ctx.beginPath(); ctx.moveTo((cx-bw/2)*W,by*H); ctx.lineTo(cx*W,(by-bh)*H); ctx.lineTo((cx+bw/2)*W,by*H); ctx.closePath(); ctx.fill();
// // //   });

// // //   // Water
// // //   const wy=lv.waterY*H;
// // //   const wg=ctx.createLinearGradient(0,wy,0,H);
// // //   wg.addColorStop(0,lv.waterC); wg.addColorStop(0.5,'#186070'); wg.addColorStop(1,'#082838');
// // //   ctx.fillStyle=wg; ctx.fillRect(0,wy,W,H-wy);
// // //   const t=Date.now()*0.001;
// // //   ctx.strokeStyle='rgba(255,255,255,0.10)'; ctx.lineWidth=1;
// // //   for(let i=0;i<5;i++){ ctx.beginPath(); ctx.moveTo(0,wy+10+i*14+Math.sin(t+i)*3); ctx.lineTo(W,wy+10+i*14+Math.sin(t+i+1)*3); ctx.stroke(); }

// // //   // Terrain
// // //   lv.terrain.forEach(tr=>drawTerrain(tr.pts.map(p=>[p[0]*W,p[1]*H]),tr.type));

// // //   // Goal flag
// // //   const gx=lv.goal.x*W, gy=lv.goal.y*H;
// // //   ctx.strokeStyle='#555'; ctx.lineWidth=3;
// // //   ctx.beginPath(); ctx.moveTo(gx,gy); ctx.lineTo(gx,gy-52); ctx.stroke();
// // //   ctx.fillStyle='#38b018';
// // //   ctx.beginPath(); ctx.moveTo(gx,gy-52); ctx.lineTo(gx+26,gy-41); ctx.lineTo(gx,gy-31); ctx.closePath(); ctx.fill();
// // //   ctx.font='bold 11px Nunito'; ctx.fillStyle='#555'; ctx.textAlign='center';
// // //   ctx.fillText('GOAL',gx,gy+16); ctx.textAlign='left';

// // //   beams.forEach(drawBeam);

// // //   // Preview beam while placing
// // //   if(selNode && mode==='build'){
// // //     const tx=hovNode?hovNode.x:mouseX, ty2=hovNode?hovNode.y:mouseY;
// // //     const m=MAT[currentMat];
// // //     ctx.save();
// // //     ctx.strokeStyle=m.color+'cc'; ctx.lineWidth=m.w+2; ctx.lineCap='round';
// // //     ctx.setLineDash([8,6]); ctx.lineDashOffset=-(Date.now()*0.06%14);
// // //     ctx.beginPath(); ctx.moveTo(selNode.x,selNode.y); ctx.lineTo(tx,ty2); ctx.stroke();
// // //     ctx.setLineDash([]);
// // //     const dx=tx-selNode.x,dy=ty2-selNode.y,plen=Math.sqrt(dx*dx+dy*dy);
// // //     if(plen>30){
// // //       const pcost=Math.round(plen*m.costPx), mx2=(selNode.x+tx)/2, my2=(selNode.y+ty2)/2;
// // //       ctx.fillStyle='rgba(0,0,0,0.7)';
// // //       const lw=ctx.measureText('$'+pcost).width;
// // //       ctx.fillRect(mx2-lw/2-5,my2-16,lw+10,20);
// // //       ctx.fillStyle='#fff'; ctx.font='bold 12px Nunito'; ctx.textAlign='center';
// // //       ctx.fillText('$'+pcost,mx2,my2-1); ctx.textAlign='left';
// // //     }
// // //     ctx.restore();
// // //   }

// // //   nodes.forEach(drawNode);
// // //   if(veh&&!veh.done) drawVehicle();
// // // }

// // // function drawTerrain(pts,type){
// // //   ctx.save();
// // //   ctx.shadowColor='rgba(0,0,0,0.12)'; ctx.shadowBlur=8; ctx.shadowOffsetY=4;
// // //   ctx.beginPath(); pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); ctx.closePath();
// // //   let g;
// // //   if(type==='ice'){ g=ctx.createLinearGradient(pts[0][0],pts[0][1],pts[0][0]+60,pts[0][1]+120); g.addColorStop(0,'#b8e0ef'); g.addColorStop(0.4,'#80c0d8'); g.addColorStop(1,'#387898'); }
// // //   else if(type==='grass'){ g=ctx.createLinearGradient(0,pts[0][1],0,pts[0][1]+80); g.addColorStop(0,'#68b048'); g.addColorStop(0.18,'#488030'); g.addColorStop(1,'#284818'); }
// // //   else { g=ctx.createLinearGradient(0,pts[0][1],0,pts[0][1]+100); g.addColorStop(0,'#888078'); g.addColorStop(1,'#404038'); }
// // //   ctx.fillStyle=g; ctx.fill(); ctx.shadowColor='transparent';
// // //   ctx.beginPath(); ctx.moveTo(pts[0][0],pts[0][1]); ctx.lineTo(pts[1][0],pts[1][1]);
// // //   ctx.strokeStyle=type==='grass'?'#88d060':type==='ice'?'rgba(255,255,255,0.7)':'rgba(255,255,255,0.2)';
// // //   ctx.lineWidth=type==='grass'?7:4; ctx.stroke();
// // //   ctx.restore();
// // // }

// // // function stressColor(b){
// // //   if(b.broken) return 'rgba(150,20,20,0.4)';
// // //   const eMax=MAT[b.mat].maxStr-(b.fatigue||0);
// // //   const r=Math.min(b.stress/Math.max(eMax,0.01),1);
// // //   if(r<0.45) return MAT[b.mat].color;
// // //   if(r<0.80) return '#d89020';
// // //   return '#d82020';
// // // }

// // // function drawBeam(b){
// // //   const na=nodes[b.a],nb=nodes[b.b];
// // //   if(!na||!nb) return;
// // //   const m=MAT[b.mat], col=stressColor(b);
// // //   ctx.save();
// // //   if(b===hovBeam&&mode==='build'){ ctx.shadowColor='rgba(255,140,40,0.7)'; ctx.shadowBlur=12; }

// // //   if(b.mat==='road'&&!b.broken){
// // //     const ang=Math.atan2(nb.y-na.y,nb.x-na.x), len=Math.hypot(nb.x-na.x,nb.y-na.y);
// // //     ctx.translate(na.x,na.y); ctx.rotate(ang);
// // //     ctx.fillStyle='#1e1e1e'; ctx.fillRect(0,-m.w/2,len,m.w);
// // //     ctx.fillStyle='#2e2e2e'; ctx.fillRect(0,-m.w/2+1,len,m.w-2);
// // //     ctx.strokeStyle='rgba(255,255,180,0.45)'; ctx.lineWidth=1.5; ctx.setLineDash([14,10]);
// // //     ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(len,0); ctx.stroke(); ctx.setLineDash([]);
// // //     ctx.fillStyle='#a0a0a0'; ctx.fillRect(0,-m.w/2,len,2); ctx.fillRect(0,m.w/2-2,len,2);
// // //     if(b.stress>0.02){ ctx.globalAlpha=Math.min(0.7,b.stress/m.maxStr); ctx.fillStyle='#e02020'; ctx.fillRect(0,-m.w/2,len,m.w); }
// // //     ctx.restore(); return;
// // //   }
// // //   if(b.mat==='cable'){
// // //     ctx.strokeStyle=b.broken?'rgba(80,80,80,0.35)':col; ctx.lineWidth=b.broken?1:m.w; ctx.lineCap='round';
// // //     ctx.setLineDash(b.broken?[4,4]:[]);
// // //     ctx.beginPath(); ctx.moveTo(na.x,na.y); ctx.lineTo(nb.x,nb.y); ctx.stroke();
// // //     ctx.setLineDash([]); ctx.restore(); return;
// // //   }
// // //   if(b.mat==='wood'&&!b.broken){
// // //     const ang=Math.atan2(nb.y-na.y,nb.x-na.x), len=Math.hypot(nb.x-na.x,nb.y-na.y);
// // //     ctx.translate(na.x,na.y); ctx.rotate(ang);
// // //     const wg=ctx.createLinearGradient(0,-m.w/2,0,m.w/2);
// // //     wg.addColorStop(0,'#c88030'); wg.addColorStop(0.5,'#a06020'); wg.addColorStop(1,'#785010');
// // //     ctx.fillStyle=wg; ctx.fillRect(0,-m.w/2,len,m.w);
// // //     ctx.strokeStyle='rgba(0,0,0,0.09)'; ctx.lineWidth=1;
// // //     for(let px=12;px<len;px+=15){ ctx.beginPath(); ctx.moveTo(px,-m.w/2); ctx.lineTo(px,m.w/2); ctx.stroke(); }
// // //     ctx.fillStyle='rgba(255,255,255,0.09)'; ctx.fillRect(0,-m.w/2,len,2);
// // //     if(b.stress>0.04){ ctx.globalAlpha=Math.min(0.6,b.stress/m.maxStr); ctx.fillStyle=col; ctx.fillRect(0,-m.w/2,len,m.w); }
// // //     ctx.restore(); return;
// // //   }

// // //   ctx.strokeStyle=col; ctx.lineWidth=b.broken?3:m.w; ctx.lineCap='round';
// // //   ctx.setLineDash(b.broken?[5,5]:[]);
// // //   ctx.beginPath(); ctx.moveTo(na.x,na.y); ctx.lineTo(nb.x,nb.y); ctx.stroke();
// // //   ctx.setLineDash([]);
// // //   if(!b.broken){
// // //     ctx.globalAlpha=0.18; ctx.strokeStyle='#fff'; ctx.lineWidth=2;
// // //     ctx.beginPath(); ctx.moveTo(na.x,na.y); ctx.lineTo(nb.x,nb.y); ctx.stroke();
// // //     ctx.globalAlpha=1; ctx.fillStyle=col;
// // //     [[na.x,na.y],[(na.x+nb.x)/2,(na.y+nb.y)/2],[nb.x,nb.y]].forEach(([rx,ry])=>{
// // //       ctx.beginPath(); ctx.arc(rx,ry,3.5,0,Math.PI*2); ctx.fill();
// // //     });
// // //   }
// // //   ctx.restore();
// // // }

// // // function drawNode(n){
// // //   const isSel=selNode&&selNode.id===n.id, isHov=hovNode&&hovNode.id===n.id;
// // //   const r=n.fixed?11:8;
// // //   ctx.save();
// // //   if(isSel){ ctx.shadowColor='#fff'; ctx.shadowBlur=24; }
// // //   else if(isHov){ ctx.shadowColor=n.fixed?'#ff8060':'#ffe060'; ctx.shadowBlur=18; }
// // //   if(isSel||isHov){
// // //     ctx.beginPath(); ctx.arc(n.x,n.y,r+5,0,Math.PI*2);
// // //     ctx.fillStyle=n.fixed?'rgba(255,80,40,0.15)':'rgba(255,220,40,0.15)'; ctx.fill();
// // //   }
// // //   if(n.fixed){
// // //     ctx.beginPath(); ctx.arc(n.x,n.y,r+3,0,Math.PI*2);
// // //     ctx.strokeStyle='rgba(255,255,255,0.5)'; ctx.lineWidth=2;
// // //     ctx.setLineDash([4,3]); ctx.stroke(); ctx.setLineDash([]);
// // //   }
// // //   ctx.beginPath(); ctx.arc(n.x,n.y,r,0,Math.PI*2);
// // //   const ng=ctx.createRadialGradient(n.x-2,n.y-2,1,n.x,n.y,r);
// // //   if(n.fixed){ ng.addColorStop(0,'#ff6050'); ng.addColorStop(1,'#b81818'); }
// // //   else { ng.addColorStop(0,'#ffe068'); ng.addColorStop(1,'#c09010'); }
// // //   ctx.fillStyle=ng; ctx.fill();
// // //   ctx.strokeStyle=n.fixed?'#801010':'#a07800'; ctx.lineWidth=2; ctx.stroke();
// // //   ctx.beginPath(); ctx.arc(n.x,n.y,r*0.3,0,Math.PI*2);
// // //   ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.fill();
// // //   ctx.restore();
// // // }

// // // function drawVehicle(){
// // //   const v=veh;
// // //   ctx.save();
// // //   ctx.fillStyle='rgba(0,0,0,0.12)';
// // //   ctx.beginPath(); ctx.ellipse(v.x+v.w/2,v.y+v.h+10,v.w*0.38,5,0,0,Math.PI*2); ctx.fill();
// // //   const bg=ctx.createLinearGradient(v.x,v.y,v.x,v.y+v.h);
// // //   bg.addColorStop(0,'#6090e0'); bg.addColorStop(0.5,'#3860b0'); bg.addColorStop(1,'#1c3878');
// // //   ctx.fillStyle=bg; ctx.beginPath(); ctx.roundRect(v.x,v.y+v.h*0.28,v.w,v.h*0.55,4); ctx.fill();
// // //   ctx.strokeStyle='#284880'; ctx.lineWidth=1.5; ctx.stroke();
// // //   const cg=ctx.createLinearGradient(v.x,v.y,v.x,v.y+v.h*0.44);
// // //   cg.addColorStop(0,'#80b0e8'); cg.addColorStop(1,'#3860b0');
// // //   ctx.fillStyle=cg; ctx.beginPath(); ctx.roundRect(v.x+v.w*0.15,v.y,v.w*0.55,v.h*0.44,[4,4,0,0]); ctx.fill();
// // //   ctx.fillStyle='rgba(170,225,255,0.8)';
// // //   ctx.beginPath(); ctx.roundRect(v.x+v.w*0.2,v.y+3,v.w*0.42,v.h*0.27,3); ctx.fill();
// // //   if(v.onBridge){ ctx.globalAlpha=0.25; ctx.fillStyle='#ff4020'; ctx.beginPath(); ctx.roundRect(v.x,v.y+v.h*0.28,v.w,v.h*0.55,4); ctx.fill(); ctx.globalAlpha=1; }
// // //   const wr=v.h*0.27, ws=v.spin;
// // //   [[v.x+wr+3,v.y+v.h],[v.x+v.w-wr-3,v.y+v.h]].forEach(([wx,wy])=>{
// // //     ctx.beginPath(); ctx.arc(wx,wy,wr,0,Math.PI*2); ctx.fillStyle='#181818'; ctx.fill(); ctx.strokeStyle='#383838'; ctx.lineWidth=1.5; ctx.stroke();
// // //     for(let i=0;i<6;i++){ const a=ws+i*Math.PI/3; ctx.strokeStyle='#484848'; ctx.lineWidth=1.5; ctx.beginPath(); ctx.arc(wx,wy,wr*0.72,a,a+0.30); ctx.stroke(); }
// // //     const rg=ctx.createRadialGradient(wx-1,wy-1,1,wx,wy,wr*0.42);
// // //     rg.addColorStop(0,'#ccc'); rg.addColorStop(1,'#777');
// // //     ctx.beginPath(); ctx.arc(wx,wy,wr*0.42,0,Math.PI*2); ctx.fillStyle=rg; ctx.fill();
// // //     ctx.beginPath(); ctx.arc(wx,wy,wr*0.1,0,Math.PI*2); ctx.fillStyle='#eee'; ctx.fill();
// // //   });
// // //   ctx.restore();
// // // }

// // // // ── GAME LOOP ─────────────────────────────────────────────────
// // // function loop(){ simulate(); draw(); if(!won&&!failed) raf=requestAnimationFrame(loop); }
// // // function stopSim(){
// // //   if(raf){ cancelAnimationFrame(raf); raf=null; }
// // //   document.getElementById('winModal').classList.add('hidden');
// // //   document.getElementById('failModal').classList.add('hidden');
// // // }

// // // // ── TUTORIAL ──────────────────────────────────────────────────
// // // function updateTut(override){
// // //   const bar=document.getElementById('tutHint'), el=document.getElementById('tutText');
// // //   const lv=LEVELS[currentLevel];
// // //   if(!lv.tutorial){ bar.style.display='none'; return; }
// // //   bar.style.display='flex';
// // //   if(override==='test'){ el.textContent='🚗 Watch the stress colors — red means about to snap!'; return; }
// // //   el.textContent=lv.tips[Math.min(tutStep,lv.tips.length-1)];
// // // }
// // // function advTut(s){ if(LEVELS[currentLevel].tutorial&&s>tutStep){ tutStep=s; updateTut(); } }

// // // // ── RESIZE ────────────────────────────────────────────────────
// // // window.addEventListener('resize',()=>{
// // //   if(!nodes.length) return;
// // //   const ow=canvas.width, oh=canvas.height;
// // //   resizeCanvas();
// // //   const sx=canvas.width/ow, sy=canvas.height/oh;
// // //   nodes.forEach(n=>{ n.x*=sx;n.y*=sy;n.px=n.x;n.py=n.y;n.bx*=sx;n.by*=sy; });
// // //   beams.forEach(b=>{ const na=nodes[b.a],nb=nodes[b.b]; if(na&&nb) b.restLen=Math.hypot(nb.x-na.x,nb.y-na.y); });
// // // });

// // // // ── BOOT ──────────────────────────────────────────────────────
// // // window.addEventListener('load',()=>{
// // //   resizeCanvas();
// // //   selectMat('steel');
// // //   document.getElementById('gridBtn').classList.add('active-icon');
// // //   resetLevel();
// // // });




// // // ── Read level index from URL: game.html?level=0 ─────────────
// // const params       = new URLSearchParams(window.location.search);
// // let   currentLevel = parseInt(params.get('level') || '0', 10);

// // const canvas = document.getElementById('gameCanvas');
// // const ctx    = canvas.getContext('2d');

// // // ═══════════════════════════════════════════════════════════════
// // // AUDIO ENGINE  (Web Audio API — no files needed)
// // // ═══════════════════════════════════════════════════════════════
// // let audioCtx = null;
// // let soundOn  = true;
// // let masterVol = 0.8;
// // let sfxVol    = 1.0;

// // function getAudioCtx(){
// //   if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// //   if(audioCtx.state === 'suspended') audioCtx.resume();
// //   return audioCtx;
// // }

// // // Load settings from localStorage
// // function loadAudioSettings(){
// //   try {
// //     const s = localStorage.getItem('bridgeSettings');
// //     if(s){
// //       const cfg = JSON.parse(s);
// //       soundOn   = cfg.soundOn !== undefined ? cfg.soundOn : true;
// //       masterVol = (cfg.master !== undefined ? cfg.master : 80) / 100;
// //       sfxVol    = (cfg.sfx    !== undefined ? cfg.sfx    : 100) / 100;
// //     }
// //   } catch(e){}
// // }

// // // Core sound player
// // function playSound(type){
// //   if(!soundOn) return;
// //   const vol = masterVol * sfxVol;
// //   if(vol <= 0) return;

// //   try {
// //     const ac  = getAudioCtx();
// //     const now = ac.currentTime;

// //     switch(type){

// //       // ── Beam placed — short satisfying click/thunk ──────────
// //       case 'place': {
// //         const osc = ac.createOscillator();
// //         const env = ac.createGain();
// //         osc.connect(env); env.connect(ac.destination);
// //         osc.type = 'triangle';
// //         osc.frequency.setValueAtTime(420, now);
// //         osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);
// //         env.gain.setValueAtTime(vol * 0.35, now);
// //         env.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
// //         osc.start(now); osc.stop(now + 0.13);
// //         break;
// //       }

// //       // ── Node placed — lighter tick ───────────────────────────
// //       case 'node': {
// //         const osc = ac.createOscillator();
// //         const env = ac.createGain();
// //         osc.connect(env); env.connect(ac.destination);
// //         osc.type = 'sine';
// //         osc.frequency.setValueAtTime(880, now);
// //         osc.frequency.exponentialRampToValueAtTime(600, now + 0.04);
// //         env.gain.setValueAtTime(vol * 0.18, now);
// //         env.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
// //         osc.start(now); osc.stop(now + 0.07);
// //         break;
// //       }

// //       // ── Beam snap / break — cracking sound ──────────────────
// //       case 'snap': {
// //         // Noise burst
// //         const bufSize = ac.sampleRate * 0.18;
// //         const buf = ac.createBuffer(1, bufSize, ac.sampleRate);
// //         const data = buf.getChannelData(0);
// //         for(let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
// //         const src = ac.createBufferSource();
// //         src.buffer = buf;

// //         // Band-pass filter to make it sound like cracking wood/metal
// //         const filter = ac.createBiquadFilter();
// //         filter.type = 'bandpass';
// //         filter.frequency.value = 1800;
// //         filter.Q.value = 1.2;

// //         const env = ac.createGain();
// //         src.connect(filter); filter.connect(env); env.connect(ac.destination);
// //         env.gain.setValueAtTime(vol * 1.2, now);
// //         env.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
// //         src.start(now); src.stop(now + 0.19);

// //         // Low thud underneath
// //         const osc = ac.createOscillator();
// //         const env2 = ac.createGain();
// //         osc.connect(env2); env2.connect(ac.destination);
// //         osc.type = 'sawtooth';
// //         osc.frequency.setValueAtTime(180, now);
// //         osc.frequency.exponentialRampToValueAtTime(60, now + 0.15);
// //         env2.gain.setValueAtTime(vol * 0.5, now);
// //         env2.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
// //         osc.start(now); osc.stop(now + 0.16);
// //         break;
// //       }

// //       // ── Vehicle lands on bridge — thud ───────────────────────
// //       case 'land': {
// //         const osc = ac.createOscillator();
// //         const env = ac.createGain();
// //         osc.connect(env); env.connect(ac.destination);
// //         osc.type = 'sine';
// //         osc.frequency.setValueAtTime(120, now);
// //         osc.frequency.exponentialRampToValueAtTime(55, now + 0.12);
// //         env.gain.setValueAtTime(vol * 0.6, now);
// //         env.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
// //         osc.start(now); osc.stop(now + 0.15);
// //         break;
// //       }

// //       // ── Vehicle rolling — rumble (called periodically) ───────
// //       case 'roll': {
// //         const bufSize = ac.sampleRate * 0.08;
// //         const buf = ac.createBuffer(1, bufSize, ac.sampleRate);
// //         const data = buf.getChannelData(0);
// //         for(let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
// //         const src = ac.createBufferSource();
// //         src.buffer = buf;
// //         const filter = ac.createBiquadFilter();
// //         filter.type = 'lowpass';
// //         filter.frequency.value = 280;
// //         const env = ac.createGain();
// //         src.connect(filter); filter.connect(env); env.connect(ac.destination);
// //         env.gain.setValueAtTime(vol * 0.25, now);
// //         env.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
// //         src.start(now); src.stop(now + 0.09);
// //         break;
// //       }

// //       // ── WIN — triumphant fanfare ──────────────────────────────
// //       case 'win': {
// //         const notes = [523, 659, 784, 1047]; // C E G C
// //         notes.forEach((freq, i) => {
// //           const osc = ac.createOscillator();
// //           const env = ac.createGain();
// //           osc.connect(env); env.connect(ac.destination);
// //           osc.type = 'triangle';
// //           const t = now + i * 0.13;
// //           osc.frequency.setValueAtTime(freq, t);
// //           env.gain.setValueAtTime(0, t);
// //           env.gain.linearRampToValueAtTime(vol * 0.5, t + 0.03);
// //           env.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
// //           osc.start(t); osc.stop(t + 0.30);
// //         });
// //         // Extra sparkle
// //         const osc2 = ac.createOscillator();
// //         const env2 = ac.createGain();
// //         osc2.connect(env2); env2.connect(ac.destination);
// //         osc2.type = 'sine';
// //         osc2.frequency.setValueAtTime(2093, now + 0.45);
// //         osc2.frequency.exponentialRampToValueAtTime(1760, now + 0.7);
// //         env2.gain.setValueAtTime(vol * 0.3, now + 0.45);
// //         env2.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
// //         osc2.start(now + 0.45); osc2.stop(now + 0.71);
// //         break;
// //       }

// //       // ── FAIL — sad descending tones ──────────────────────────
// //       case 'fail': {
// //         const notes = [392, 330, 262, 196]; // G E C G low
// //         notes.forEach((freq, i) => {
// //           const osc = ac.createOscillator();
// //           const env = ac.createGain();
// //           osc.connect(env); env.connect(ac.destination);
// //           osc.type = 'sawtooth';
// //           const t = now + i * 0.14;
// //           osc.frequency.setValueAtTime(freq, t);
// //           osc.frequency.exponentialRampToValueAtTime(freq * 0.92, t + 0.22);
// //           env.gain.setValueAtTime(vol * 0.38, t);
// //           env.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
// //           osc.start(t); osc.stop(t + 0.29);
// //         });
// //         // Splash rumble
// //         const bufSize = ac.sampleRate * 0.4;
// //         const buf = ac.createBuffer(1, bufSize, ac.sampleRate);
// //         const data = buf.getChannelData(0);
// //         for(let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
// //         const src = ac.createBufferSource();
// //         src.buffer = buf;
// //         const filter = ac.createBiquadFilter();
// //         filter.type = 'lowpass'; filter.frequency.value = 600;
// //         const env3 = ac.createGain();
// //         src.connect(filter); filter.connect(env3); env3.connect(ac.destination);
// //         env3.gain.setValueAtTime(vol * 0.7, now + 0.55);
// //         env3.gain.exponentialRampToValueAtTime(0.001, now + 0.95);
// //         src.start(now + 0.55); src.stop(now + 0.96);
// //         break;
// //       }

// //       // ── Test mode start — engine rev ─────────────────────────
// //       case 'teststart': {
// //         const osc = ac.createOscillator();
// //         const env = ac.createGain();
// //         osc.connect(env); env.connect(ac.destination);
// //         osc.type = 'sawtooth';
// //         osc.frequency.setValueAtTime(80, now);
// //         osc.frequency.linearRampToValueAtTime(200, now + 0.25);
// //         osc.frequency.linearRampToValueAtTime(140, now + 0.45);
// //         env.gain.setValueAtTime(vol * 0.4, now);
// //         env.gain.linearRampToValueAtTime(vol * 0.5, now + 0.25);
// //         env.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
// //         osc.start(now); osc.stop(now + 0.51);
// //         break;
// //       }

// //       // ── Delete beam — short scrape ────────────────────────────
// //       case 'delete': {
// //         const osc = ac.createOscillator();
// //         const env = ac.createGain();
// //         osc.connect(env); env.connect(ac.destination);
// //         osc.type = 'sawtooth';
// //         osc.frequency.setValueAtTime(300, now);
// //         osc.frequency.exponentialRampToValueAtTime(100, now + 0.07);
// //         env.gain.setValueAtTime(vol * 0.2, now);
// //         env.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
// //         osc.start(now); osc.stop(now + 0.09);
// //         break;
// //       }

// //       // ── Budget warning — error beep ───────────────────────────
// //       case 'budget': {
// //         [0, 0.1].forEach(delay => {
// //           const osc = ac.createOscillator();
// //           const env = ac.createGain();
// //           osc.connect(env); env.connect(ac.destination);
// //           osc.type = 'square';
// //           osc.frequency.value = 220;
// //           env.gain.setValueAtTime(vol * 0.3, now + delay);
// //           env.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.08);
// //           osc.start(now + delay); osc.stop(now + delay + 0.09);
// //         });
// //         break;
// //       }
// //     }
// //   } catch(e){ /* audio can fail silently */ }
// // }

// // // ── Rolling sound timer ───────────────────────────────────────
// // let rollTimer = 0;

// // // ═══════════════════════════════════════════════════════════════
// // // NAVIGATION
// // // ═══════════════════════════════════════════════════════════════
// // function exitGame(){
// //   stopSim();
// //   window.location.href = 'levelselect.html';
// // }
// // function goNextLevel(){
// //   document.getElementById('winModal').classList.add('hidden');
// //   const next = currentLevel < LEVELS.length - 1 ? currentLevel + 1 : currentLevel;
// //   window.location.href = `game.html?level=${next}`;
// // }

// // // ═══════════════════════════════════════════════════════════════
// // // PHYSICS CONSTANTS
// // // ═══════════════════════════════════════════════════════════════
// // const VEHICLE_MASS      = 5;
// // const STRESS_PER_LOAD   = 0.09;
// // const STRESS_FIXED_LOAD = 0.28;
// // const BEAM_FATIGUE_RATE = 0.002;

// // const MAT = {
// //   wood:  { label:'Wood',  costPx:1.0, maxStr:0.12, w:6,  color:'#c07828', hi:'#e8a040' },
// //   steel: { label:'Steel', costPx:2.2, maxStr:1,    w:7,  color:'#c02828', hi:'#e84040' },
// //   cable: { label:'Cable', costPx:0.5, maxStr:0.08, w:3,  color:'#777',    hi:'#aaa'    },
// //   iron:  { label:'Iron',  costPx:1.6, maxStr:2,    w:9,  color:'#3a5a7a', hi:'#6888aa' },
// //   road:  { label:'Road',  costPx:3.0, maxStr:2,    w:11, color:'#2a2a2a', hi:'#555'    },
// // };

// // // ═══════════════════════════════════════════════════════════════
// // // LEVELS
// // // ═══════════════════════════════════════════════════════════════
// // const LEVELS = [
// //   {
// //     name:'Tutorial Gap', tutorial:true, budget:99999,
// //     sky:['#c0bcd4','#d8d4e8'], waterY:0.78, waterC:'#48a8bc',
// //     terrain:[
// //       {pts:[[0,0.70],[0.27,0.70],[0.27,1],[0,1]], type:'grass'},
// //       {pts:[[0.50,0.70],[1,0.70],[1,1],[0.50,1]], type:'grass'},
// //     ],
// //     anchors:[{x:0.27,y:0.70},{x:0.27,y:0.50},{x:0.50,y:0.70},{x:0.50,y:0.50}],
// //     veh:{x:0.04, w:52, h:26, speed:1.3},
// //     goal:{x:0.88, y:0.70},
// //     tips:[
// //       'Click a red anchor to select it',
// //       'Now click another anchor or empty space to draw a beam!',
// //       'The car is HEAVY — add diagonals or it will collapse!',
// //       'Press TEST — watch stress colors appear under load!',
// //     ],
// //   },
// //   {
// //     name:'River Crossing', budget:5000,
// //     sky:['#b8c8d8','#ccdce8'], waterY:0.78, waterC:'#3aa8c0',
// //     terrain:[
// //       {pts:[[0,0.70],[0.22,0.70],[0.22,1],[0,1]], type:'grass'},
// //       {pts:[[0.52,0.70],[1,0.70],[1,1],[0.52,1]], type:'grass'},
// //     ],
// //     anchors:[{x:0.22,y:0.70},{x:0.22,y:0.48},{x:0.10,y:0.48},{x:0.52,y:0.70},{x:0.52,y:0.48},{x:0.64,y:0.48}],
// //     veh:{x:0.04, w:52, h:26, speed:1.1},
// //     goal:{x:0.88, y:0.71},
// //   },
// //   {
// //     name:'Double Span', budget:7000,
// //     sky:['#c0b8cc','#d4cce0'], waterY:0.78, waterC:'#3898b0',
// //     terrain:[
// //       {pts:[[0,0.70],[0.17,0.70],[0.17,1],[0,1]], type:'rock'},
// //       {pts:[[0.37,0.70],[0.50,0.70],[0.50,1],[0.37,1]], type:'rock'},
// //       {pts:[[0.68,0.70],[1,0.70],[1,1],[0.68,1]], type:'rock'},
// //     ],
// //     anchors:[
// //       {x:0.17,y:0.70},{x:0.17,y:0.48},
// //       {x:0.37,y:0.70},{x:0.37,y:0.48},{x:0.50,y:0.70},{x:0.50,y:0.48},
// //       {x:0.68,y:0.70},{x:0.68,y:0.48},
// //     ],
// //     veh:{x:0.04, w:52, h:26, speed:1.1},
// //     goal:{x:0.90, y:0.71},
// //   },
// //   {
// //     name:'Deep Chasm', budget:6500,
// //     sky:['#b0a8c0','#ccc4d8'], waterY:0.88, waterC:'#286888',
// //     terrain:[
// //       {pts:[[0,0.62],[0.20,0.62],[0.20,1],[0,1]], type:'ice'},
// //       {pts:[[0.56,0.62],[1,0.62],[1,1],[0.56,1]], type:'ice'},
// //     ],
// //     anchors:[
// //       {x:0.20,y:0.62},{x:0.20,y:0.40},{x:0.08,y:0.40},
// //       {x:0.56,y:0.62},{x:0.56,y:0.40},{x:0.68,y:0.40},
// //     ],
// //     veh:{x:0.04, w:52, h:26, speed:1.0},
// //     goal:{x:0.88, y:0.63},
// //   },
// //   {
// //     name:'Asymmetric', budget:6000,
// //     sky:['#b8c4cc','#ccd4dc'], waterY:0.80, waterC:'#389898',
// //     terrain:[
// //       {pts:[[0,0.68],[0.24,0.68],[0.24,1],[0,1]], type:'grass'},
// //       {pts:[[0.56,0.61],[1,0.61],[1,1],[0.56,1]], type:'grass'},
// //     ],
// //     anchors:[
// //       {x:0.24,y:0.68},{x:0.24,y:0.46},{x:0.10,y:0.46},
// //       {x:0.56,y:0.61},{x:0.56,y:0.39},{x:0.70,y:0.39},
// //     ],
// //     veh:{x:0.04, w:52, h:26, speed:1.0},
// //     goal:{x:0.90, y:0.62},
// //   },
// //   {
// //     name:'Tight Budget', budget:2200,
// //     sky:['#beb8cc','#d2cce0'], waterY:0.79, waterC:'#48a8bc',
// //     terrain:[
// //       {pts:[[0,0.70],[0.22,0.70],[0.22,1],[0,1]], type:'ice'},
// //       {pts:[[0.50,0.70],[1,0.70],[1,1],[0.50,1]], type:'ice'},
// //     ],
// //     anchors:[{x:0.22,y:0.70},{x:0.22,y:0.50},{x:0.50,y:0.70},{x:0.50,y:0.50}],
// //     veh:{x:0.04, w:52, h:26, speed:1.4},
// //     goal:{x:0.88, y:0.71},
// //   },
// //   {
// //     name:'Mid-River Rock', budget:7500,
// //     sky:['#b4bec8','#c8d2dc'], waterY:0.80, waterC:'#38a0b4',
// //     terrain:[
// //       {pts:[[0,0.70],[0.17,0.70],[0.17,1],[0,1]], type:'rock'},
// //       {pts:[[0.40,0.76],[0.48,0.76],[0.48,1],[0.40,1]], type:'rock'},
// //       {pts:[[0.70,0.70],[1,0.70],[1,1],[0.70,1]], type:'rock'},
// //     ],
// //     anchors:[
// //       {x:0.17,y:0.70},{x:0.17,y:0.48},
// //       {x:0.40,y:0.76},{x:0.48,y:0.76},{x:0.40,y:0.48},{x:0.48,y:0.48},
// //       {x:0.70,y:0.70},{x:0.70,y:0.48},
// //     ],
// //     veh:{x:0.04, w:52, h:26, speed:1.0},
// //     goal:{x:0.90, y:0.71},
// //   },
// //   {
// //     name:'Triple Chasm', budget:10000,
// //     sky:['#acb4c0','#c4ccd8'], waterY:0.81, waterC:'#288898',
// //     terrain:[
// //       {pts:[[0,0.70],[0.13,0.70],[0.13,1],[0,1]], type:'ice'},
// //       {pts:[[0.27,0.70],[0.38,0.70],[0.38,1],[0.27,1]], type:'ice'},
// //       {pts:[[0.52,0.70],[0.63,0.70],[0.63,1],[0.52,1]], type:'ice'},
// //       {pts:[[0.77,0.70],[1,0.70],[1,1],[0.77,1]], type:'ice'},
// //     ],
// //     anchors:[
// //       {x:0.13,y:0.70},{x:0.13,y:0.46},
// //       {x:0.27,y:0.70},{x:0.38,y:0.70},{x:0.27,y:0.46},{x:0.38,y:0.46},
// //       {x:0.52,y:0.70},{x:0.63,y:0.70},{x:0.52,y:0.46},{x:0.63,y:0.46},
// //       {x:0.77,y:0.70},{x:0.77,y:0.46},
// //     ],
// //     veh:{x:0.03, w:52, h:26, speed:0.9},
// //     goal:{x:0.91, y:0.71},
// //   },
// //   {
// //     name:'Steep Canyon', budget:8000,
// //     sky:['#a8b0be','#bcc4d2'], waterY:0.92, waterC:'#185068',
// //     terrain:[
// //       {pts:[[0,0.58],[0.19,0.58],[0.19,1],[0,1]], type:'rock'},
// //       {pts:[[0.56,0.58],[1,0.58],[1,1],[0.56,1]], type:'rock'},
// //     ],
// //     anchors:[
// //       {x:0.19,y:0.58},{x:0.19,y:0.35},{x:0.06,y:0.35},
// //       {x:0.56,y:0.58},{x:0.56,y:0.35},{x:0.70,y:0.35},
// //     ],
// //     veh:{x:0.04, w:56, h:28, speed:1.3},
// //     goal:{x:0.90, y:0.59},
// //   },
// //   {
// //     name:'Grand Finale', budget:14000,
// //     sky:['#a0a8b4','#b8c0cc'], waterY:0.82, waterC:'#185878',
// //     terrain:[
// //       {pts:[[0,0.65],[0.13,0.65],[0.13,1],[0,1]], type:'ice'},
// //       {pts:[[0.30,0.72],[0.38,0.72],[0.38,1],[0.30,1]], type:'rock'},
// //       {pts:[[0.55,0.70],[0.63,0.70],[0.63,1],[0.55,1]], type:'rock'},
// //       {pts:[[0.78,0.65],[1,0.65],[1,1],[0.78,1]], type:'ice'},
// //     ],
// //     anchors:[
// //       {x:0.13,y:0.65},{x:0.13,y:0.42},{x:0.03,y:0.42},
// //       {x:0.30,y:0.72},{x:0.38,y:0.72},{x:0.30,y:0.42},{x:0.38,y:0.42},
// //       {x:0.55,y:0.70},{x:0.63,y:0.70},{x:0.55,y:0.42},{x:0.63,y:0.42},
// //       {x:0.78,y:0.65},{x:0.78,y:0.42},{x:0.90,y:0.42},
// //     ],
// //     veh:{x:0.03, w:58, h:30, speed:1.5},
// //     goal:{x:0.92, y:0.66},
// //   },
// // ];

// // // ═══════════════════════════════════════════════════════════════
// // // GAME STATE
// // // ═══════════════════════════════════════════════════════════════
// // let mode       = 'build';
// // let currentMat = 'steel';
// // let nodes      = [];
// // let beams      = [];
// // let veh        = null;
// // let nid        = 0;
// // let selNode    = null;
// // let hovNode    = null;
// // let hovBeam    = null;
// // let mouseX     = 0, mouseY = 0;
// // let won        = false, failed = false;
// // let showGrid   = true;
// // let raf        = null;
// // let history    = [];
// // let budget     = 0;
// // let tutStep    = 0;

// // // track which beams already snapped (to play snap sound once per beam)
// // const snappedBeams = new Set();

// // const SNAP  = 18;
// // const G     = 0.38;
// // const DAMP  = 0.982;
// // const ITERS = 24;

// // // ═══════════════════════════════════════════════════════════════
// // // INIT
// // // ═══════════════════════════════════════════════════════════════
// // function resizeCanvas(){
// //   canvas.width  = window.innerWidth;
// //   canvas.height = window.innerHeight - 46 - 58;
// // }

// // function resetLevel(){
// //   stopSim();
// //   resizeCanvas();
// //   const lv = LEVELS[currentLevel];
// //   nodes=[]; beams=[]; history=[];
// //   selNode=null; hovNode=null; hovBeam=null;
// //   won=false; failed=false; veh=null; nid=0;
// //   tutStep=0;
// //   snappedBeams.clear();
// //   budget = lv.budget;
// //   document.getElementById('levelLabel').textContent = `LVL ${currentLevel + 1}`;
// //   updateBudget();
// //   lv.anchors.forEach(a => nodes.push(mkNode(a.x * canvas.width, a.y * canvas.height, true)));
// //   setMode('build');
// //   updateTut();
// //   raf = requestAnimationFrame(loop);
// // }

// // function mkNode(x, y, fixed=false){
// //   return { id:nid++, x, y, px:x, py:y, fixed, bx:x, by:y };
// // }

// // // ═══════════════════════════════════════════════════════════════
// // // MATERIAL
// // // ═══════════════════════════════════════════════════════════════
// // function selectMat(m){
// //   currentMat = m;
// //   document.querySelectorAll('.mat-btn').forEach(b => b.classList.remove('selected'));
// //   const el = document.getElementById('mat-' + m);
// //   if(el) el.classList.add('selected');
// //   const lbl = document.getElementById('matCostLabel');
// //   if(lbl && MAT[m]) lbl.textContent = `${MAT[m].label} — $${MAT[m].costPx.toFixed(1)}/px`;
// // }

// // // ═══════════════════════════════════════════════════════════════
// // // MODE
// // // ═══════════════════════════════════════════════════════════════
// // function setMode(m){
// //   mode = m;
// //   document.getElementById('btnBuild').className = 'tb-btn mode-btn' + (m==='build' ? ' active-build' : '');
// //   document.getElementById('btnTest').className  = 'tb-btn mode-btn' + (m==='test'  ? ' active-test'  : '');
// //   canvas.style.cursor = m === 'build' ? 'crosshair' : 'default';
// //   selNode = null;
// //   if(m === 'test'){
// //     nodes.forEach(n => { n.bx=n.x; n.by=n.y; n.px=n.x; n.py=n.y; });
// //     beams.forEach(b => { b.broken=false; b.stress=0; b.fatigue=0; });
// //     snappedBeams.clear();
// //     spawnVehicle();
// //     updateTut('test');
// //     playSound('teststart');
// //   } else {
// //     veh = null;
// //     nodes.forEach(n => { n.x=n.bx; n.y=n.by; n.px=n.bx; n.py=n.by; });
// //     beams.forEach(b => { b.broken=false; b.stress=0; b.fatigue=0; });
// //     snappedBeams.clear();
// //   }
// // }

// // function spawnVehicle(){
// //   const lv = LEVELS[currentLevel];
// //   const vd = lv.veh;
// //   const sx = vd.x * canvas.width;
// //   let ty = lv.terrain[0].pts[0][1] * canvas.height;
// //   lv.terrain.forEach(tr => {
// //     const xs = tr.pts.map(p => p[0] * canvas.width);
// //     const ys = tr.pts.map(p => p[1] * canvas.height);
// //     if(sx >= Math.min(...xs) && sx <= Math.max(...xs)) ty = Math.min(...ys);
// //   });
// //   veh = { x:sx, y:ty-vd.h-1, w:vd.w, h:vd.h, speed:vd.speed, vy:0, spin:0, done:false, onBridge:false, wasOnBridge:false };
// // }

// // // ═══════════════════════════════════════════════════════════════
// // // PHYSICS
// // // ═══════════════════════════════════════════════════════════════
// // function simulate(){
// //   if(mode !== 'test') return;

// //   nodes.forEach(n => {
// //     if(n.fixed) return;
// //     const vx = (n.x-n.px)*DAMP, vy = (n.y-n.py)*DAMP + G;
// //     n.px=n.x; n.py=n.y;
// //     n.x+=vx; n.y+=vy;
// //   });

// //   for(let it=0; it<ITERS; it++){
// //     beams.forEach(b => {
// //       if(b.broken) return;
// //       const na=nodes[b.a], nb=nodes[b.b];
// //       if(!na||!nb) return;
// //       const dx=nb.x-na.x, dy=nb.y-na.y;
// //       const d=Math.sqrt(dx*dx+dy*dy)||0.001;
// //       const err=(d-b.restLen)/d;
// //       if(b.mat==='cable' && err<0){ b.stress*=0.92; return; }
// //       b.stress=Math.abs(err);
// //       if(b.stress > MAT[b.mat].maxStr*0.40) b.fatigue=(b.fatigue||0)+BEAM_FATIGUE_RATE;
// //       const eMax = MAT[b.mat].maxStr-(b.fatigue||0);
// //       if(b.stress > eMax){
// //         b.broken=true;
// //         // Play snap sound once per beam
// //         if(!snappedBeams.has(b.id)){
// //           snappedBeams.add(b.id);
// //           playSound('snap');
// //         }
// //         return;
// //       }
// //       if(na.fixed && nb.fixed) return;
// //       const fx=dx*err*0.5, fy=dy*err*0.5;
// //       if(!na.fixed){ na.x+=fx; na.y+=fy; }
// //       if(!nb.fixed){ nb.x-=fx; nb.y-=fy; }
// //     });
// //     floorNodes();
// //   }

// //   applyLoad();
// //   moveVehicle();

// //   // Rolling sound: play every ~30 frames while on bridge
// //   if(veh && !veh.done && veh.onBridge){
// //     rollTimer++;
// //     if(rollTimer % 28 === 0) playSound('roll');
// //   } else {
// //     rollTimer = 0;
// //   }
// // }

// // function floorNodes(){
// //   const lv = LEVELS[currentLevel];
// //   nodes.forEach(n => {
// //     if(n.fixed) return;
// //     lv.terrain.forEach(tr => {
// //       const xs=tr.pts.map(p=>p[0]*canvas.width), ys=tr.pts.map(p=>p[1]*canvas.height);
// //       const topY=Math.min(...ys);
// //       if(n.x>=Math.min(...xs)&&n.x<=Math.max(...xs)&&n.y>topY){ n.y=topY; n.py=topY+0.5; }
// //     });
// //   });
// // }

// // function applyLoad(){
// //   if(!veh||veh.done) return;
// //   const samples=[
// //     veh.x+veh.w*0.10, veh.x+veh.w*0.28, veh.x+veh.w*0.50,
// //     veh.x+veh.w*0.72, veh.x+veh.w*0.90,
// //   ];
// //   const wPer = VEHICLE_MASS / samples.length;
// //   veh.onBridge = false;
// //   samples.forEach(wx => {
// //     beams.forEach(b => {
// //       if(b.broken) return;
// //       const na=nodes[b.a], nb=nodes[b.b];
// //       if(!na||!nb||!isDeck(na,nb)) return;
// //       const lo=Math.min(na.x,nb.x), hi=Math.max(na.x,nb.x);
// //       if(wx<lo||wx>hi) return;
// //       const t=sat((wx-na.x)/((nb.x-na.x)||0.001));
// //       const sy=na.y+t*(nb.y-na.y);
// //       if(Math.abs(veh.y+veh.h-sy)>28) return;
// //       veh.onBridge=true;
// //       if(!na.fixed){ na.y+=wPer*(1-t); na.py=na.y+0.2; }
// //       if(!nb.fixed){ nb.y+=wPer*t;     nb.py=nb.y+0.2; }
// //       const sAdd = (na.fixed&&nb.fixed) ? STRESS_FIXED_LOAD : STRESS_PER_LOAD;
// //       b.stress = Math.min(b.stress+sAdd, MAT[b.mat].maxStr+0.15);
// //       b.fatigue = (b.fatigue||0)+BEAM_FATIGUE_RATE*2;
// //       if(b.stress > MAT[b.mat].maxStr-(b.fatigue||0)){
// //         if(!snappedBeams.has(b.id)){
// //           snappedBeams.add(b.id);
// //           playSound('snap');
// //         }
// //         b.broken=true;
// //       }
// //     });
// //   });

// //   // Sound: vehicle just landed on bridge
// //   if(veh.onBridge && !veh.wasOnBridge) playSound('land');
// //   veh.wasOnBridge = veh.onBridge;
// // }

// // function isDeck(na,nb){
// //   const dx=nb.x-na.x, dy=nb.y-na.y, len=Math.sqrt(dx*dx+dy*dy)||1;
// //   return Math.abs(dy/len)<0.55;
// // }
// // function sat(v){ return Math.max(0,Math.min(1,v)); }

// // function moveVehicle(){
// //   if(!veh||veh.done) return;
// //   const lv = LEVELS[currentLevel];
// //   veh.x+=veh.speed; veh.vy+=G*0.55; veh.spin+=veh.speed*0.1;
// //   const xs=[veh.x+veh.w*0.15, veh.x+veh.w*0.5, veh.x+veh.w*0.85];
// //   let surfY=null;
// //   xs.forEach(wx=>{
// //     beams.forEach(b=>{
// //       if(b.broken) return;
// //       const na=nodes[b.a], nb=nodes[b.b];
// //       if(!na||!nb||!isDeck(na,nb)) return;
// //       const lo=Math.min(na.x,nb.x), hi=Math.max(na.x,nb.x);
// //       if(wx<lo||wx>hi) return;
// //       const t=sat((wx-na.x)/((nb.x-na.x)||0.001));
// //       const sy=na.y+t*(nb.y-na.y);
// //       if(surfY===null||sy<surfY) surfY=sy;
// //     });
// //     lv.terrain.forEach(tr=>{
// //       const xs2=tr.pts.map(p=>p[0]*canvas.width), ys2=tr.pts.map(p=>p[1]*canvas.height);
// //       if(wx>=Math.min(...xs2)&&wx<=Math.max(...xs2)){
// //         const topY=Math.min(...ys2);
// //         if(surfY===null||topY<surfY) surfY=topY;
// //       }
// //     });
// //   });
// //   if(surfY!==null){
// //     const gap=surfY-(veh.y+veh.h);
// //     if(gap<=3 && gap>=-veh.h*1.2 && veh.vy>=0){ veh.y=surfY-veh.h; veh.vy=0; }
// //   }
// //   veh.y+=veh.vy;
// //   if(veh.y>canvas.height+100 && !won){
// //     veh.done=true;
// //     const bc=beams.filter(b=>b.broken).length;
// //     const msg=bc>0
// //       ? `${bc} beam${bc>1?'s':''} snapped! Add stronger supports — the car is heavy.`
// //       : 'The vehicle fell! Make sure the deck spans the full crossing.';
// //     showFail(msg);
// //     return;
// //   }
// //   if(veh.x+veh.w >= lv.goal.x*canvas.width) showWin();
// // }

// // // ═══════════════════════════════════════════════════════════════
// // // WIN / FAIL
// // // ═══════════════════════════════════════════════════════════════
// // function showWin(){
// //   if(won||failed) return; won=true;
// //   playSound('win');
// //   const sp=spent(), lv=LEVELS[currentLevel];
// //   document.getElementById('winMsg').textContent=`Spent $${sp.toLocaleString()} of $${lv.budget>90000?'∞':lv.budget.toLocaleString()}`;
// //   document.getElementById('winModal').classList.remove('hidden');
// // }
// // function showFail(msg){
// //   if(won||failed) return; failed=true;
// //   playSound('fail');
// //   document.getElementById('failMsg').textContent=msg;
// //   document.getElementById('failModal').classList.remove('hidden');
// // }

// // // ═══════════════════════════════════════════════════════════════
// // // BUDGET
// // // ═══════════════════════════════════════════════════════════════
// // function spent(){
// //   return Math.round(beams.reduce((s,b)=>s+b.restLen*MAT[b.mat].costPx, 0));
// // }
// // function updateBudget(){
// //   const s=spent(), lv=LEVELS[currentLevel];
// //   document.getElementById('budgetSpent').textContent='$'+s.toLocaleString();
// //   document.getElementById('budgetSpent').className='budget-spent'+(s>lv.budget&&lv.budget<90000?' budget-over':'');
// //   document.getElementById('budgetLabel').textContent='Budget: $'+(lv.budget>90000?'∞':lv.budget.toLocaleString());
// // }
// // function flashBudget(){
// //   playSound('budget');
// //   const el=document.getElementById('budgetSpent');
// //   el.textContent='OVER BUDGET!'; el.className='budget-spent budget-over';
// //   setTimeout(updateBudget,900);
// // }

// // // ═══════════════════════════════════════════════════════════════
// // // UNDO / CLEAR
// // // ═══════════════════════════════════════════════════════════════
// // function undoLast(){
// //   if(mode!=='build'||!history.length) return;
// //   const last=history.pop();
// //   if(last.type==='beam'){ beams=beams.filter(b=>b.id!==last.id); playSound('delete'); }
// //   else {
// //     beams=beams.filter(b=>b.naid!==last.id&&b.nbid!==last.id);
// //     nodes=nodes.filter(n=>n.id!==last.id);
// //     rebuildIdx();
// //     playSound('delete');
// //   }
// //   selNode=null; updateBudget();
// // }
// // function clearAll(){
// //   if(mode!=='build') return;
// //   if(beams.length > 0) playSound('delete');
// //   nodes=nodes.filter(n=>n.fixed);
// //   beams=[]; history=[]; selNode=null;
// //   rebuildIdx(); updateBudget();
// // }
// // function rebuildIdx(){
// //   const m={};
// //   nodes.forEach((n,i)=>m[n.id]=i);
// //   beams=beams.filter(b=>m[b.naid]!==undefined&&m[b.nbid]!==undefined);
// //   beams.forEach(b=>{ b.a=m[b.naid]; b.b=m[b.nbid]; });
// // }

// // // ═══════════════════════════════════════════════════════════════
// // // GRID
// // // ═══════════════════════════════════════════════════════════════
// // function toggleGrid(){
// //   showGrid=!showGrid;
// //   document.getElementById('gridBtn').classList.toggle('active-icon',showGrid);
// // }

// // // ═══════════════════════════════════════════════════════════════
// // // INPUT
// // // ═══════════════════════════════════════════════════════════════
// // function flashBudgetOnly(){
// //   const el=document.getElementById('budgetSpent');
// //   el.textContent='OVER BUDGET!'; el.className='budget-spent budget-over';
// //   setTimeout(updateBudget,900);
// // }

// // canvas.addEventListener('mousemove',e=>{
// //   const r=canvas.getBoundingClientRect();
// //   mouseX=e.clientX-r.left; mouseY=e.clientY-r.top;
// //   if(mode!=='build') return;
// //   hovNode=null; let md=SNAP;
// //   nodes.forEach(n=>{ const d=Math.hypot(n.x-mouseX,n.y-mouseY); if(d<md){md=d;hovNode=n;} });
// //   hovBeam=null;
// //   if(!hovNode) beams.forEach(b=>{ const na=nodes[b.a],nb=nodes[b.b]; if(na&&nb&&segDist(mouseX,mouseY,na.x,na.y,nb.x,nb.y)<9) hovBeam=b; });
// // });

// // canvas.addEventListener('click',e=>{
// //   if(mode!=='build') return;
// //   // Unlock audio context on first user click
// //   getAudioCtx();

// //   const r=canvas.getBoundingClientRect();
// //   const cx=e.clientX-r.left, cy=e.clientY-r.top;
// //   let snap=null, sd=SNAP;
// //   nodes.forEach(n=>{ const d=Math.hypot(n.x-cx,n.y-cy); if(d<sd){sd=d;snap=n;} });

// //   if(!selNode){
// //     if(snap){ selNode=snap; advTut(1); }
// //     else if(!inTerrain(cx,cy)){
// //       const n=mkNode(cx,cy,false);
// //       nodes.push(n); history.push({type:'node',id:n.id});
// //       playSound('node');
// //       selNode=n; advTut(1);
// //     }
// //   } else {
// //     let target=snap;
// //     if(!target&&!inTerrain(cx,cy)){
// //       const n=mkNode(cx,cy,false);
// //       nodes.push(n); history.push({type:'node',id:n.id});
// //       playSound('node');
// //       target=n;
// //     }
// //     if(target&&target.id!==selNode.id){
// //       const dup=beams.some(b=>(b.naid===selNode.id&&b.nbid===target.id)||(b.naid===target.id&&b.nbid===selNode.id));
// //       if(!dup){
// //         const dx=target.x-selNode.x, dy=target.y-selNode.y, len=Math.sqrt(dx*dx+dy*dy);
// //         if(len>4){
// //           const cost=Math.round(len*MAT[currentMat].costPx);
// //           const lv=LEVELS[currentLevel];
// //           if(spent()+cost>lv.budget&&lv.budget<90000){ flashBudget(); selNode=null; return; }
// //           const ai=nodes.indexOf(selNode), bi=nodes.indexOf(target), bid=nid++;
// //           beams.push({id:bid,a:ai,b:bi,naid:selNode.id,nbid:target.id,restLen:len,mat:currentMat,stress:0,broken:false,fatigue:0});
// //           history.push({type:'beam',id:bid});
// //           playSound('place');
// //           updateBudget(); advTut(2);
// //         }
// //       }
// //       selNode=target;
// //     } else if(!target){ selNode=null; }
// //   }
// // });

// // canvas.addEventListener('contextmenu',e=>{
// //   e.preventDefault();
// //   if(mode!=='build') return;
// //   const r=canvas.getBoundingClientRect();
// //   const cx=e.clientX-r.left, cy=e.clientY-r.top;
// //   selNode=null;
// //   let hit=null,hd=SNAP;
// //   nodes.forEach(n=>{ const d=Math.hypot(n.x-cx,n.y-cy); if(d<hd){hd=d;hit=n;} });
// //   if(hit&&!hit.fixed){
// //     beams=beams.filter(b=>b.naid!==hit.id&&b.nbid!==hit.id);
// //     nodes=nodes.filter(n=>n.id!==hit.id);
// //     history=history.filter(h=>h.id!==hit.id);
// //     playSound('delete');
// //     rebuildIdx(); updateBudget(); return;
// //   }
// //   const bi=beams.findIndex(b=>{ const na=nodes[b.a],nb=nodes[b.b]; return na&&nb&&segDist(cx,cy,na.x,na.y,nb.x,nb.y)<10; });
// //   if(bi!==-1){
// //     history=history.filter(h=>h.id!==beams[bi].id);
// //     beams.splice(bi,1);
// //     playSound('delete');
// //     updateBudget();
// //   }
// // });

// // window.addEventListener('keydown',e=>{
// //   if(e.key==='Escape') selNode=null;
// //   if((e.key==='z'||e.key==='Z')&&(e.ctrlKey||e.metaKey)) undoLast();
// // });

// // // ═══════════════════════════════════════════════════════════════
// // // HELPERS
// // // ═══════════════════════════════════════════════════════════════
// // function segDist(px,py,ax,ay,bx,by){
// //   const dx=bx-ax,dy=by-ay,l=dx*dx+dy*dy;
// //   if(l<0.001) return Math.hypot(px-ax,py-ay);
// //   const t=sat(((px-ax)*dx+(py-ay)*dy)/l);
// //   return Math.hypot(px-(ax+t*dx),py-(ay+t*dy));
// // }
// // function inTerrain(x,y){
// //   return LEVELS[currentLevel].terrain.some(tr=>{
// //     const pts=tr.pts.map(p=>[p[0]*canvas.width,p[1]*canvas.height]);
// //     let inside=false;
// //     for(let i=0,j=pts.length-1;i<pts.length;j=i++){
// //       const [xi,yi]=pts[i],[xj,yj]=pts[j];
// //       if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi) inside=!inside;
// //     }
// //     return inside;
// //   });
// // }

// // // ═══════════════════════════════════════════════════════════════
// // // DRAW
// // // ═══════════════════════════════════════════════════════════════
// // function draw(){
// //   const W=canvas.width,H=canvas.height,lv=LEVELS[currentLevel];
// //   const sky=ctx.createLinearGradient(0,0,0,H);
// //   sky.addColorStop(0,lv.sky[0]); sky.addColorStop(1,lv.sky[1]);
// //   ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);

// //   if(showGrid){
// //     ctx.strokeStyle='rgba(0,0,0,0.065)'; ctx.lineWidth=1;
// //     for(let x=0;x<W;x+=50){ ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke(); }
// //     for(let y=0;y<H;y+=50){ ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke(); }
// //   }

// //   ctx.fillStyle='rgba(150,145,175,0.18)';
// //   [[0.09,0.57,0.16,0.21],[0.26,0.60,0.13,0.17],[0.72,0.54,0.17,0.22],[0.90,0.59,0.12,0.16]].forEach(([cx,by,bw,bh])=>{
// //     ctx.beginPath();ctx.moveTo((cx-bw/2)*W,by*H);ctx.lineTo(cx*W,(by-bh)*H);ctx.lineTo((cx+bw/2)*W,by*H);ctx.closePath();ctx.fill();
// //   });

// //   const wy=lv.waterY*H;
// //   const wg=ctx.createLinearGradient(0,wy,0,H);
// //   wg.addColorStop(0,lv.waterC); wg.addColorStop(0.5,'#186070'); wg.addColorStop(1,'#082838');
// //   ctx.fillStyle=wg; ctx.fillRect(0,wy,W,H-wy);
// //   const t=Date.now()*0.001;
// //   ctx.strokeStyle='rgba(255,255,255,0.10)'; ctx.lineWidth=1;
// //   for(let i=0;i<5;i++){ ctx.beginPath();ctx.moveTo(0,wy+10+i*14+Math.sin(t+i)*3);ctx.lineTo(W,wy+10+i*14+Math.sin(t+i+1)*3);ctx.stroke(); }

// //   lv.terrain.forEach(tr=>drawTerrain(tr.pts.map(p=>[p[0]*W,p[1]*H]),tr.type));

// //   const gx=lv.goal.x*W, gy=lv.goal.y*H;
// //   ctx.strokeStyle='#555'; ctx.lineWidth=3;
// //   ctx.beginPath();ctx.moveTo(gx,gy);ctx.lineTo(gx,gy-52);ctx.stroke();
// //   ctx.fillStyle='#38b018';
// //   ctx.beginPath();ctx.moveTo(gx,gy-52);ctx.lineTo(gx+26,gy-41);ctx.lineTo(gx,gy-31);ctx.closePath();ctx.fill();
// //   ctx.font='bold 11px Nunito';ctx.fillStyle='#555';ctx.textAlign='center';
// //   ctx.fillText('GOAL',gx,gy+16);ctx.textAlign='left';

// //   beams.forEach(drawBeam);

// //   if(selNode&&mode==='build'){
// //     const tx=hovNode?hovNode.x:mouseX,ty2=hovNode?hovNode.y:mouseY;
// //     const m=MAT[currentMat];
// //     ctx.save();
// //     ctx.strokeStyle=m.color+'cc';ctx.lineWidth=m.w+2;ctx.lineCap='round';
// //     ctx.setLineDash([8,6]);ctx.lineDashOffset=-(Date.now()*0.06%14);
// //     ctx.beginPath();ctx.moveTo(selNode.x,selNode.y);ctx.lineTo(tx,ty2);ctx.stroke();
// //     ctx.setLineDash([]);
// //     const dx=tx-selNode.x,dy=ty2-selNode.y,plen=Math.sqrt(dx*dx+dy*dy);
// //     if(plen>30){
// //       const pcost=Math.round(plen*m.costPx),mx2=(selNode.x+tx)/2,my2=(selNode.y+ty2)/2;
// //       ctx.fillStyle='rgba(0,0,0,0.7)';
// //       const lw=ctx.measureText('$'+pcost).width;
// //       ctx.fillRect(mx2-lw/2-5,my2-16,lw+10,20);
// //       ctx.fillStyle='#fff';ctx.font='bold 12px Nunito';ctx.textAlign='center';
// //       ctx.fillText('$'+pcost,mx2,my2-1);ctx.textAlign='left';
// //     }
// //     ctx.restore();
// //   }

// //   nodes.forEach(drawNode);
// //   if(veh&&!veh.done) drawVehicle();
// // }

// // function drawTerrain(pts,type){
// //   ctx.save();
// //   ctx.shadowColor='rgba(0,0,0,0.12)';ctx.shadowBlur=8;ctx.shadowOffsetY=4;
// //   ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();
// //   let g;
// //   if(type==='ice'){ g=ctx.createLinearGradient(pts[0][0],pts[0][1],pts[0][0]+60,pts[0][1]+120);g.addColorStop(0,'#b8e0ef');g.addColorStop(0.4,'#80c0d8');g.addColorStop(1,'#387898'); }
// //   else if(type==='grass'){ g=ctx.createLinearGradient(0,pts[0][1],0,pts[0][1]+80);g.addColorStop(0,'#68b048');g.addColorStop(0.18,'#488030');g.addColorStop(1,'#284818'); }
// //   else { g=ctx.createLinearGradient(0,pts[0][1],0,pts[0][1]+100);g.addColorStop(0,'#888078');g.addColorStop(1,'#404038'); }
// //   ctx.fillStyle=g;ctx.fill();ctx.shadowColor='transparent';
// //   ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);ctx.lineTo(pts[1][0],pts[1][1]);
// //   ctx.strokeStyle=type==='grass'?'#88d060':type==='ice'?'rgba(255,255,255,0.7)':'rgba(255,255,255,0.2)';
// //   ctx.lineWidth=type==='grass'?7:4;ctx.stroke();
// //   ctx.restore();
// // }

// // function stressColor(b){
// //   if(b.broken) return 'rgba(150,20,20,0.4)';
// //   const eMax=MAT[b.mat].maxStr-(b.fatigue||0);
// //   const r=Math.min(b.stress/Math.max(eMax,0.01),1);
// //   if(r<0.45) return MAT[b.mat].color;
// //   if(r<0.80) return '#d89020';
// //   return '#d82020';
// // }

// // function drawBeam(b){
// //   const na=nodes[b.a],nb=nodes[b.b];
// //   if(!na||!nb) return;
// //   const m=MAT[b.mat],col=stressColor(b);
// //   ctx.save();
// //   if(b===hovBeam&&mode==='build'){ctx.shadowColor='rgba(255,140,40,0.7)';ctx.shadowBlur=12;}

// //   if(b.mat==='road'&&!b.broken){
// //     const ang=Math.atan2(nb.y-na.y,nb.x-na.x),len=Math.hypot(nb.x-na.x,nb.y-na.y);
// //     ctx.translate(na.x,na.y);ctx.rotate(ang);
// //     ctx.fillStyle='#1e1e1e';ctx.fillRect(0,-m.w/2,len,m.w);
// //     ctx.fillStyle='#2e2e2e';ctx.fillRect(0,-m.w/2+1,len,m.w-2);
// //     ctx.strokeStyle='rgba(255,255,180,0.45)';ctx.lineWidth=1.5;ctx.setLineDash([14,10]);
// //     ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(len,0);ctx.stroke();ctx.setLineDash([]);
// //     ctx.fillStyle='#a0a0a0';ctx.fillRect(0,-m.w/2,len,2);ctx.fillRect(0,m.w/2-2,len,2);
// //     if(b.stress>0.02){ctx.globalAlpha=Math.min(0.7,b.stress/m.maxStr);ctx.fillStyle='#e02020';ctx.fillRect(0,-m.w/2,len,m.w);}
// //     ctx.restore();return;
// //   }
// //   if(b.mat==='cable'){
// //     ctx.strokeStyle=b.broken?'rgba(80,80,80,0.35)':col;ctx.lineWidth=b.broken?1:m.w;ctx.lineCap='round';
// //     ctx.setLineDash(b.broken?[4,4]:[]);
// //     ctx.beginPath();ctx.moveTo(na.x,na.y);ctx.lineTo(nb.x,nb.y);ctx.stroke();
// //     ctx.setLineDash([]);ctx.restore();return;
// //   }
// //   if(b.mat==='wood'&&!b.broken){
// //     const ang=Math.atan2(nb.y-na.y,nb.x-na.x),len=Math.hypot(nb.x-na.x,nb.y-na.y);
// //     ctx.translate(na.x,na.y);ctx.rotate(ang);
// //     const wg=ctx.createLinearGradient(0,-m.w/2,0,m.w/2);
// //     wg.addColorStop(0,'#c88030');wg.addColorStop(0.5,'#a06020');wg.addColorStop(1,'#785010');
// //     ctx.fillStyle=wg;ctx.fillRect(0,-m.w/2,len,m.w);
// //     ctx.strokeStyle='rgba(0,0,0,0.09)';ctx.lineWidth=1;
// //     for(let px=12;px<len;px+=15){ctx.beginPath();ctx.moveTo(px,-m.w/2);ctx.lineTo(px,m.w/2);ctx.stroke();}
// //     ctx.fillStyle='rgba(255,255,255,0.09)';ctx.fillRect(0,-m.w/2,len,2);
// //     if(b.stress>0.04){ctx.globalAlpha=Math.min(0.6,b.stress/m.maxStr);ctx.fillStyle=col;ctx.fillRect(0,-m.w/2,len,m.w);}
// //     ctx.restore();return;
// //   }

// //   ctx.strokeStyle=col;ctx.lineWidth=b.broken?3:m.w;ctx.lineCap='round';
// //   ctx.setLineDash(b.broken?[5,5]:[]);
// //   ctx.beginPath();ctx.moveTo(na.x,na.y);ctx.lineTo(nb.x,nb.y);ctx.stroke();
// //   ctx.setLineDash([]);
// //   if(!b.broken){
// //     ctx.globalAlpha=0.18;ctx.strokeStyle='#fff';ctx.lineWidth=2;
// //     ctx.beginPath();ctx.moveTo(na.x,na.y);ctx.lineTo(nb.x,nb.y);ctx.stroke();
// //     ctx.globalAlpha=1;ctx.fillStyle=col;
// //     [[na.x,na.y],[(na.x+nb.x)/2,(na.y+nb.y)/2],[nb.x,nb.y]].forEach(([rx,ry])=>{
// //       ctx.beginPath();ctx.arc(rx,ry,3.5,0,Math.PI*2);ctx.fill();
// //     });
// //   }
// //   ctx.restore();
// // }

// // function drawNode(n){
// //   const isSel=selNode&&selNode.id===n.id,isHov=hovNode&&hovNode.id===n.id;
// //   const r=n.fixed?11:8;
// //   ctx.save();
// //   if(isSel){ctx.shadowColor='#fff';ctx.shadowBlur=24;}
// //   else if(isHov){ctx.shadowColor=n.fixed?'#ff8060':'#ffe060';ctx.shadowBlur=18;}
// //   if(isSel||isHov){
// //     ctx.beginPath();ctx.arc(n.x,n.y,r+5,0,Math.PI*2);
// //     ctx.fillStyle=n.fixed?'rgba(255,80,40,0.15)':'rgba(255,220,40,0.15)';ctx.fill();
// //   }
// //   if(n.fixed){
// //     ctx.beginPath();ctx.arc(n.x,n.y,r+3,0,Math.PI*2);
// //     ctx.strokeStyle='rgba(255,255,255,0.5)';ctx.lineWidth=2;
// //     ctx.setLineDash([4,3]);ctx.stroke();ctx.setLineDash([]);
// //   }
// //   ctx.beginPath();ctx.arc(n.x,n.y,r,0,Math.PI*2);
// //   const ng=ctx.createRadialGradient(n.x-2,n.y-2,1,n.x,n.y,r);
// //   if(n.fixed){ng.addColorStop(0,'#ff6050');ng.addColorStop(1,'#b81818');}
// //   else{ng.addColorStop(0,'#ffe068');ng.addColorStop(1,'#c09010');}
// //   ctx.fillStyle=ng;ctx.fill();
// //   ctx.strokeStyle=n.fixed?'#801010':'#a07800';ctx.lineWidth=2;ctx.stroke();
// //   ctx.beginPath();ctx.arc(n.x,n.y,r*0.3,0,Math.PI*2);
// //   ctx.fillStyle='rgba(255,255,255,0.5)';ctx.fill();
// //   ctx.restore();
// // }

// // function drawVehicle(){
// //   const v=veh;
// //   ctx.save();
// //   ctx.fillStyle='rgba(0,0,0,0.12)';
// //   ctx.beginPath();ctx.ellipse(v.x+v.w/2,v.y+v.h+10,v.w*0.38,5,0,0,Math.PI*2);ctx.fill();
// //   const bg=ctx.createLinearGradient(v.x,v.y,v.x,v.y+v.h);
// //   bg.addColorStop(0,'#6090e0');bg.addColorStop(0.5,'#3860b0');bg.addColorStop(1,'#1c3878');
// //   ctx.fillStyle=bg;ctx.beginPath();ctx.roundRect(v.x,v.y+v.h*0.28,v.w,v.h*0.55,4);ctx.fill();
// //   ctx.strokeStyle='#284880';ctx.lineWidth=1.5;ctx.stroke();
// //   const cg=ctx.createLinearGradient(v.x,v.y,v.x,v.y+v.h*0.44);
// //   cg.addColorStop(0,'#80b0e8');cg.addColorStop(1,'#3860b0');
// //   ctx.fillStyle=cg;ctx.beginPath();ctx.roundRect(v.x+v.w*0.15,v.y,v.w*0.55,v.h*0.44,[4,4,0,0]);ctx.fill();
// //   ctx.fillStyle='rgba(170,225,255,0.8)';
// //   ctx.beginPath();ctx.roundRect(v.x+v.w*0.2,v.y+3,v.x+v.w*0.42,v.h*0.27,3); // fixed width
// //   ctx.beginPath();ctx.roundRect(v.x+v.w*0.2,v.y+3,v.w*0.42,v.h*0.27,3);ctx.fill();
// //   if(v.onBridge){ctx.globalAlpha=0.25;ctx.fillStyle='#ff4020';ctx.beginPath();ctx.roundRect(v.x,v.y+v.h*0.28,v.w,v.h*0.55,4);ctx.fill();ctx.globalAlpha=1;}
// //   const wr=v.h*0.27,ws=v.spin;
// //   [[v.x+wr+3,v.y+v.h],[v.x+v.w-wr-3,v.y+v.h]].forEach(([wx,wy])=>{
// //     ctx.beginPath();ctx.arc(wx,wy,wr,0,Math.PI*2);ctx.fillStyle='#181818';ctx.fill();ctx.strokeStyle='#383838';ctx.lineWidth=1.5;ctx.stroke();
// //     for(let i=0;i<6;i++){const a=ws+i*Math.PI/3;ctx.strokeStyle='#484848';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(wx,wy,wr*0.72,a,a+0.30);ctx.stroke();}
// //     const rg=ctx.createRadialGradient(wx-1,wy-1,1,wx,wy,wr*0.42);
// //     rg.addColorStop(0,'#ccc');rg.addColorStop(1,'#777');
// //     ctx.beginPath();ctx.arc(wx,wy,wr*0.42,0,Math.PI*2);ctx.fillStyle=rg;ctx.fill();
// //     ctx.beginPath();ctx.arc(wx,wy,wr*0.1,0,Math.PI*2);ctx.fillStyle='#eee';ctx.fill();
// //   });
// //   ctx.restore();
// // }

// // // ═══════════════════════════════════════════════════════════════
// // // GAME LOOP
// // // ═══════════════════════════════════════════════════════════════
// // function loop(){ simulate(); draw(); if(!won&&!failed) raf=requestAnimationFrame(loop); }
// // function stopSim(){
// //   if(raf){cancelAnimationFrame(raf);raf=null;}
// //   document.getElementById('winModal').classList.add('hidden');
// //   document.getElementById('failModal').classList.add('hidden');
// // }

// // // ═══════════════════════════════════════════════════════════════
// // // TUTORIAL
// // // ═══════════════════════════════════════════════════════════════
// // function updateTut(override){
// //   const bar=document.getElementById('tutHint'),el=document.getElementById('tutText');
// //   const lv=LEVELS[currentLevel];
// //   if(!lv.tutorial){bar.style.display='none';return;}
// //   bar.style.display='flex';
// //   if(override==='test'){el.textContent='🚗 Watch the stress colors — red means about to snap!';return;}
// //   el.textContent=lv.tips[Math.min(tutStep,lv.tips.length-1)];
// // }
// // function advTut(s){if(LEVELS[currentLevel].tutorial&&s>tutStep){tutStep=s;updateTut();}}

// // // ═══════════════════════════════════════════════════════════════
// // // RESIZE
// // // ═══════════════════════════════════════════════════════════════
// // window.addEventListener('resize',()=>{
// //   if(!nodes.length) return;
// //   const ow=canvas.width,oh=canvas.height;
// //   resizeCanvas();
// //   const sx=canvas.width/ow,sy=canvas.height/oh;
// //   nodes.forEach(n=>{n.x*=sx;n.y*=sy;n.px=n.x;n.py=n.y;n.bx*=sx;n.by*=sy;});
// //   beams.forEach(b=>{const na=nodes[b.a],nb=nodes[b.b];if(na&&nb)b.restLen=Math.hypot(nb.x-na.x,nb.y-na.y);});
// // });

// // // ═══════════════════════════════════════════════════════════════
// // // BOOT
// // // ═══════════════════════════════════════════════════════════════
// // window.addEventListener('load',()=>{
// //   loadAudioSettings();   // read sound settings before anything plays
// //   resizeCanvas();
// //   selectMat('steel');
// //   document.getElementById('gridBtn').classList.add('active-icon');
// //   resetLevel();
// // });



// // ── Read level index from URL: game.html?level=0
// const params       = new URLSearchParams(window.location.search);
// let   currentLevel = parseInt(params.get('level') || '0', 10);

// const canvas = document.getElementById('gameCanvas');
// const ctx    = canvas.getContext('2d');

// // ── Rolling sound timer
// let rollTimer = 0;

// // ═══════════════════════════════════════════════════════════════
// //  NAVIGATION
// // ═══════════════════════════════════════════════════════════════
// function exitGame(){
//   stopSim();
//   BSAudio.stopBg(0.3);
//   window.location.href = 'levelselect.html';
// }
// function goNextLevel(){
//   document.getElementById('winModal').classList.add('hidden');
//   BSAudio.stopBg(0.2);
//   const next = currentLevel < LEVELS.length - 1 ? currentLevel + 1 : currentLevel;
//   window.location.href = `game.html?level=${next}`;
// }

// // ═══════════════════════════════════════════════════════════════
// //  PHYSICS CONSTANTS
// // ═══════════════════════════════════════════════════════════════
// const VEHICLE_MASS      = 5;
// const STRESS_PER_LOAD   = 0.09;
// const STRESS_FIXED_LOAD = 0.28;
// const BEAM_FATIGUE_RATE = 0.002;

// const MAT = {
//   wood:  { label:'Wood',  costPx:1.0, maxStr:0.12, w:6,  color:'#c07828' },
//   steel: { label:'Steel', costPx:2.2, maxStr:1,    w:7,  color:'#c02828' },
//   cable: { label:'Cable', costPx:0.5, maxStr:0.08, w:3,  color:'#777'    },
//   iron:  { label:'Iron',  costPx:1.6, maxStr:2,    w:9,  color:'#3a5a7a' },
//   road:  { label:'Road',  costPx:3.0, maxStr:2,    w:11, color:'#2a2a2a' },
// };

// // ═══════════════════════════════════════════════════════════════
// //  LEVELS
// // ═══════════════════════════════════════════════════════════════
// const LEVELS = [
//   { name:'Tutorial Gap', tutorial:true, budget:99999,
//     sky:['#c0bcd4','#d8d4e8'], waterY:0.78, waterC:'#48a8bc',
//     terrain:[{pts:[[0,0.70],[0.27,0.70],[0.27,1],[0,1]],type:'grass'},{pts:[[0.50,0.70],[1,0.70],[1,1],[0.50,1]],type:'grass'}],
//     anchors:[{x:0.27,y:0.70},{x:0.27,y:0.50},{x:0.50,y:0.70},{x:0.50,y:0.50}],
//     veh:{x:0.04,w:52,h:26,speed:1.3}, goal:{x:0.88,y:0.70},
//     tips:['Click a red anchor to select it','Now click another anchor or empty space to draw a beam!','The car is HEAVY — add diagonals or it will collapse!','Press TEST — watch stress colors appear under load!'] },
//   { name:'River Crossing', budget:5000, sky:['#b8c8d8','#ccdce8'], waterY:0.78, waterC:'#3aa8c0',
//     terrain:[{pts:[[0,0.70],[0.22,0.70],[0.22,1],[0,1]],type:'grass'},{pts:[[0.52,0.70],[1,0.70],[1,1],[0.52,1]],type:'grass'}],
//     anchors:[{x:0.22,y:0.70},{x:0.22,y:0.48},{x:0.10,y:0.48},{x:0.52,y:0.70},{x:0.52,y:0.48},{x:0.64,y:0.48}],
//     veh:{x:0.04,w:52,h:26,speed:1.1}, goal:{x:0.88,y:0.71} },
//   { name:'Double Span', budget:7000, sky:['#c0b8cc','#d4cce0'], waterY:0.78, waterC:'#3898b0',
//     terrain:[{pts:[[0,0.70],[0.17,0.70],[0.17,1],[0,1]],type:'rock'},{pts:[[0.37,0.70],[0.50,0.70],[0.50,1],[0.37,1]],type:'rock'},{pts:[[0.68,0.70],[1,0.70],[1,1],[0.68,1]],type:'rock'}],
//     anchors:[{x:0.17,y:0.70},{x:0.17,y:0.48},{x:0.37,y:0.70},{x:0.37,y:0.48},{x:0.50,y:0.70},{x:0.50,y:0.48},{x:0.68,y:0.70},{x:0.68,y:0.48}],
//     veh:{x:0.04,w:52,h:26,speed:1.1}, goal:{x:0.90,y:0.71} },
//   { name:'Deep Chasm', budget:6500, sky:['#b0a8c0','#ccc4d8'], waterY:0.88, waterC:'#286888',
//     terrain:[{pts:[[0,0.62],[0.20,0.62],[0.20,1],[0,1]],type:'ice'},{pts:[[0.56,0.62],[1,0.62],[1,1],[0.56,1]],type:'ice'}],
//     anchors:[{x:0.20,y:0.62},{x:0.20,y:0.40},{x:0.08,y:0.40},{x:0.56,y:0.62},{x:0.56,y:0.40},{x:0.68,y:0.40}],
//     veh:{x:0.04,w:52,h:26,speed:1.0}, goal:{x:0.88,y:0.63} },
//   { name:'Asymmetric', budget:6000, sky:['#b8c4cc','#ccd4dc'], waterY:0.80, waterC:'#389898',
//     terrain:[{pts:[[0,0.68],[0.24,0.68],[0.24,1],[0,1]],type:'grass'},{pts:[[0.56,0.61],[1,0.61],[1,1],[0.56,1]],type:'grass'}],
//     anchors:[{x:0.24,y:0.68},{x:0.24,y:0.46},{x:0.10,y:0.46},{x:0.56,y:0.61},{x:0.56,y:0.39},{x:0.70,y:0.39}],
//     veh:{x:0.04,w:52,h:26,speed:1.0}, goal:{x:0.90,y:0.62} },
//   { name:'Tight Budget', budget:2200, sky:['#beb8cc','#d2cce0'], waterY:0.79, waterC:'#48a8bc',
//     terrain:[{pts:[[0,0.70],[0.22,0.70],[0.22,1],[0,1]],type:'ice'},{pts:[[0.50,0.70],[1,0.70],[1,1],[0.50,1]],type:'ice'}],
//     anchors:[{x:0.22,y:0.70},{x:0.22,y:0.50},{x:0.50,y:0.70},{x:0.50,y:0.50}],
//     veh:{x:0.04,w:52,h:26,speed:1.4}, goal:{x:0.88,y:0.71} },
//   { name:'Mid-River Rock', budget:7500, sky:['#b4bec8','#c8d2dc'], waterY:0.80, waterC:'#38a0b4',
//     terrain:[{pts:[[0,0.70],[0.17,0.70],[0.17,1],[0,1]],type:'rock'},{pts:[[0.40,0.76],[0.48,0.76],[0.48,1],[0.40,1]],type:'rock'},{pts:[[0.70,0.70],[1,0.70],[1,1],[0.70,1]],type:'rock'}],
//     anchors:[{x:0.17,y:0.70},{x:0.17,y:0.48},{x:0.40,y:0.76},{x:0.48,y:0.76},{x:0.40,y:0.48},{x:0.48,y:0.48},{x:0.70,y:0.70},{x:0.70,y:0.48}],
//     veh:{x:0.04,w:52,h:26,speed:1.0}, goal:{x:0.90,y:0.71} },
//   { name:'Triple Chasm', budget:10000, sky:['#acb4c0','#c4ccd8'], waterY:0.81, waterC:'#288898',
//     terrain:[{pts:[[0,0.70],[0.13,0.70],[0.13,1],[0,1]],type:'ice'},{pts:[[0.27,0.70],[0.38,0.70],[0.38,1],[0.27,1]],type:'ice'},{pts:[[0.52,0.70],[0.63,0.70],[0.63,1],[0.52,1]],type:'ice'},{pts:[[0.77,0.70],[1,0.70],[1,1],[0.77,1]],type:'ice'}],
//     anchors:[{x:0.13,y:0.70},{x:0.13,y:0.46},{x:0.27,y:0.70},{x:0.38,y:0.70},{x:0.27,y:0.46},{x:0.38,y:0.46},{x:0.52,y:0.70},{x:0.63,y:0.70},{x:0.52,y:0.46},{x:0.63,y:0.46},{x:0.77,y:0.70},{x:0.77,y:0.46}],
//     veh:{x:0.03,w:52,h:26,speed:0.9}, goal:{x:0.91,y:0.71} },
//   { name:'Steep Canyon', budget:8000, sky:['#a8b0be','#bcc4d2'], waterY:0.92, waterC:'#185068',
//     terrain:[{pts:[[0,0.58],[0.19,0.58],[0.19,1],[0,1]],type:'rock'},{pts:[[0.56,0.58],[1,0.58],[1,1],[0.56,1]],type:'rock'}],
//     anchors:[{x:0.19,y:0.58},{x:0.19,y:0.35},{x:0.06,y:0.35},{x:0.56,y:0.58},{x:0.56,y:0.35},{x:0.70,y:0.35}],
//     veh:{x:0.04,w:56,h:28,speed:1.3}, goal:{x:0.90,y:0.59} },
//   { name:'Grand Finale', budget:14000, sky:['#a0a8b4','#b8c0cc'], waterY:0.82, waterC:'#185878',
//     terrain:[{pts:[[0,0.65],[0.13,0.65],[0.13,1],[0,1]],type:'ice'},{pts:[[0.30,0.72],[0.38,0.72],[0.38,1],[0.30,1]],type:'rock'},{pts:[[0.55,0.70],[0.63,0.70],[0.63,1],[0.55,1]],type:'rock'},{pts:[[0.78,0.65],[1,0.65],[1,1],[0.78,1]],type:'ice'}],
//     anchors:[{x:0.13,y:0.65},{x:0.13,y:0.42},{x:0.03,y:0.42},{x:0.30,y:0.72},{x:0.38,y:0.72},{x:0.30,y:0.42},{x:0.38,y:0.42},{x:0.55,y:0.70},{x:0.63,y:0.70},{x:0.55,y:0.42},{x:0.63,y:0.42},{x:0.78,y:0.65},{x:0.78,y:0.42},{x:0.90,y:0.42}],
//     veh:{x:0.03,w:58,h:30,speed:1.5}, goal:{x:0.92,y:0.66} },
// ];

// // ═══════════════════════════════════════════════════════════════
// //  GAME STATE
// // ═══════════════════════════════════════════════════════════════
// let mode='build', currentMat='steel';
// let nodes=[], beams=[], veh=null;
// let nid=0, selNode=null, hovNode=null, hovBeam=null;
// let mouseX=0, mouseY=0;
// let won=false, failed=false;
// let showGrid=true, raf=null, history=[], budget=0, tutStep=0;
// const snappedBeams = new Set();
// const SNAP=18, G=0.38, DAMP=0.982, ITERS=24;

// // ═══════════════════════════════════════════════════════════════
// //  INIT
// // ═══════════════════════════════════════════════════════════════
// function resizeCanvas(){
//   canvas.width  = window.innerWidth;
//   canvas.height = window.innerHeight - 46 - 58;
// }

// function resetLevel(){
//   stopSim();
//   resizeCanvas();
//   const lv = LEVELS[currentLevel];
//   nodes=[]; beams=[]; history=[];
//   selNode=null; hovNode=null; hovBeam=null;
//   won=false; failed=false; veh=null; nid=0;
//   tutStep=0; snappedBeams.clear();
//   budget=lv.budget;
//   document.getElementById('levelLabel').textContent=`LVL ${currentLevel+1}`;
//   updateBudget();
//   lv.anchors.forEach(a=>nodes.push(mkNode(a.x*canvas.width,a.y*canvas.height,true)));
//   setMode('build');
//   updateTut();
//   raf=requestAnimationFrame(loop);
// }
// function mkNode(x,y,fixed=false){ return{id:nid++,x,y,px:x,py:y,fixed,bx:x,by:y}; }

// // ═══════════════════════════════════════════════════════════════
// //  MATERIAL / MODE
// // ═══════════════════════════════════════════════════════════════
// function selectMat(m){
//   currentMat=m;
//   document.querySelectorAll('.mat-btn').forEach(b=>b.classList.remove('selected'));
//   const el=document.getElementById('mat-'+m); if(el) el.classList.add('selected');
//   const lbl=document.getElementById('matCostLabel');
//   if(lbl&&MAT[m]) lbl.textContent=`${MAT[m].label} — $${MAT[m].costPx.toFixed(1)}/px`;
// }

// function setMode(m){
//   mode=m;
//   document.getElementById('btnBuild').className='tb-btn mode-btn'+(m==='build'?' active-build':'');
//   document.getElementById('btnTest').className ='tb-btn mode-btn'+(m==='test' ?' active-test' :'');
//   canvas.style.cursor=m==='build'?'crosshair':'default';
//   selNode=null;
//   if(m==='test'){
//     nodes.forEach(n=>{n.bx=n.x;n.by=n.y;n.px=n.x;n.py=n.y;});
//     beams.forEach(b=>{b.broken=false;b.stress=0;b.fatigue=0;});
//     snappedBeams.clear(); spawnVehicle(); updateTut('test');
//     BSAudio.sfx('teststart');
//   } else {
//     veh=null;
//     nodes.forEach(n=>{n.x=n.bx;n.y=n.by;n.px=n.bx;n.py=n.by;});
//     beams.forEach(b=>{b.broken=false;b.stress=0;b.fatigue=0;});
//     snappedBeams.clear();
//   }
// }

// function spawnVehicle(){
//   const lv=LEVELS[currentLevel],vd=lv.veh,sx=vd.x*canvas.width;
//   let ty=lv.terrain[0].pts[0][1]*canvas.height;
//   lv.terrain.forEach(tr=>{
//     const xs=tr.pts.map(p=>p[0]*canvas.width),ys=tr.pts.map(p=>p[1]*canvas.height);
//     if(sx>=Math.min(...xs)&&sx<=Math.max(...xs)) ty=Math.min(...ys);
//   });
//   veh={x:sx,y:ty-vd.h-1,w:vd.w,h:vd.h,speed:vd.speed,vy:0,spin:0,done:false,onBridge:false,wasOnBridge:false};
// }

// // ═══════════════════════════════════════════════════════════════
// //  PHYSICS
// // ═══════════════════════════════════════════════════════════════
// function simulate(){
//   if(mode!=='test') return;
//   nodes.forEach(n=>{
//     if(n.fixed)return;
//     const vx=(n.x-n.px)*DAMP,vy=(n.y-n.py)*DAMP+G;
//     n.px=n.x;n.py=n.y;n.x+=vx;n.y+=vy;
//   });
//   for(let it=0;it<ITERS;it++){
//     beams.forEach(b=>{
//       if(b.broken)return;
//       const na=nodes[b.a],nb=nodes[b.b]; if(!na||!nb)return;
//       const dx=nb.x-na.x,dy=nb.y-na.y,d=Math.sqrt(dx*dx+dy*dy)||0.001;
//       const err=(d-b.restLen)/d;
//       if(b.mat==='cable'&&err<0){b.stress*=0.92;return;}
//       b.stress=Math.abs(err);
//       if(b.stress>MAT[b.mat].maxStr*0.40) b.fatigue=(b.fatigue||0)+BEAM_FATIGUE_RATE;
//       const eMax=MAT[b.mat].maxStr-(b.fatigue||0);
//       if(b.stress>eMax){
//         b.broken=true;
//         if(!snappedBeams.has(b.id)){snappedBeams.add(b.id);BSAudio.sfx('snap');}
//         return;
//       }
//       if(na.fixed&&nb.fixed)return;
//       const fx=dx*err*0.5,fy=dy*err*0.5;
//       if(!na.fixed){na.x+=fx;na.y+=fy;} if(!nb.fixed){nb.x-=fx;nb.y-=fy;}
//     });
//     floorNodes();
//   }
//   applyLoad(); moveVehicle();
//   if(veh&&!veh.done&&veh.onBridge){
//     rollTimer++; if(rollTimer%28===0) BSAudio.sfx('roll');
//   } else { rollTimer=0; }
// }

// function floorNodes(){
//   const lv=LEVELS[currentLevel];
//   nodes.forEach(n=>{
//     if(n.fixed)return;
//     lv.terrain.forEach(tr=>{
//       const xs=tr.pts.map(p=>p[0]*canvas.width),ys=tr.pts.map(p=>p[1]*canvas.height),topY=Math.min(...ys);
//       if(n.x>=Math.min(...xs)&&n.x<=Math.max(...xs)&&n.y>topY){n.y=topY;n.py=topY+0.5;}
//     });
//   });
// }

// function applyLoad(){
//   if(!veh||veh.done)return;
//   const samples=[veh.x+veh.w*0.10,veh.x+veh.w*0.28,veh.x+veh.w*0.50,veh.x+veh.w*0.72,veh.x+veh.w*0.90];
//   const wPer=VEHICLE_MASS/samples.length; veh.onBridge=false;
//   samples.forEach(wx=>{
//     beams.forEach(b=>{
//       if(b.broken)return;
//       const na=nodes[b.a],nb=nodes[b.b]; if(!na||!nb||!isDeck(na,nb))return;
//       const lo=Math.min(na.x,nb.x),hi=Math.max(na.x,nb.x); if(wx<lo||wx>hi)return;
//       const t=sat((wx-na.x)/((nb.x-na.x)||0.001));
//       const sy=na.y+t*(nb.y-na.y); if(Math.abs(veh.y+veh.h-sy)>28)return;
//       veh.onBridge=true;
//       if(!na.fixed){na.y+=wPer*(1-t);na.py=na.y+0.2;} if(!nb.fixed){nb.y+=wPer*t;nb.py=nb.y+0.2;}
//       const sAdd=(na.fixed&&nb.fixed)?STRESS_FIXED_LOAD:STRESS_PER_LOAD;
//       b.stress=Math.min(b.stress+sAdd,MAT[b.mat].maxStr+0.15);
//       b.fatigue=(b.fatigue||0)+BEAM_FATIGUE_RATE*2;
//       if(b.stress>MAT[b.mat].maxStr-(b.fatigue||0)){
//         if(!snappedBeams.has(b.id)){snappedBeams.add(b.id);BSAudio.sfx('snap');} b.broken=true;
//       }
//     });
//   });
//   if(veh.onBridge&&!veh.wasOnBridge) BSAudio.sfx('land');
//   veh.wasOnBridge=veh.onBridge;
// }

// function isDeck(na,nb){ const dx=nb.x-na.x,dy=nb.y-na.y,len=Math.sqrt(dx*dx+dy*dy)||1; return Math.abs(dy/len)<0.55; }
// function sat(v){ return Math.max(0,Math.min(1,v)); }

// function moveVehicle(){
//   if(!veh||veh.done)return;
//   const lv=LEVELS[currentLevel];
//   veh.x+=veh.speed; veh.vy+=G*0.55; veh.spin+=veh.speed*0.1;
//   const xs=[veh.x+veh.w*0.15,veh.x+veh.w*0.5,veh.x+veh.w*0.85];
//   let surfY=null;
//   xs.forEach(wx=>{
//     beams.forEach(b=>{
//       if(b.broken)return; const na=nodes[b.a],nb=nodes[b.b]; if(!na||!nb||!isDeck(na,nb))return;
//       const lo=Math.min(na.x,nb.x),hi=Math.max(na.x,nb.x); if(wx<lo||wx>hi)return;
//       const t=sat((wx-na.x)/((nb.x-na.x)||0.001)); const sy=na.y+t*(nb.y-na.y);
//       if(surfY===null||sy<surfY) surfY=sy;
//     });
//     lv.terrain.forEach(tr=>{
//       const xs2=tr.pts.map(p=>p[0]*canvas.width),ys2=tr.pts.map(p=>p[1]*canvas.height);
//       if(wx>=Math.min(...xs2)&&wx<=Math.max(...xs2)){ const topY=Math.min(...ys2); if(surfY===null||topY<surfY) surfY=topY; }
//     });
//   });
//   if(surfY!==null){ const gap=surfY-(veh.y+veh.h); if(gap<=3&&gap>=-veh.h*1.2&&veh.vy>=0){veh.y=surfY-veh.h;veh.vy=0;} }
//   veh.y+=veh.vy;
//   if(veh.y>canvas.height+100&&!won){
//     veh.done=true;
//     const bc=beams.filter(b=>b.broken).length;
//     showFail(bc>0?`${bc} beam${bc>1?'s':''} snapped! Add stronger supports.`:'Vehicle fell! Make sure the deck spans the full gap.');
//     return;
//   }
//   if(veh.x+veh.w>=lv.goal.x*canvas.width) showWin();
// }

// // ═══════════════════════════════════════════════════════════════
// //  WIN / FAIL
// // ═══════════════════════════════════════════════════════════════
// function showWin(){
//   if(won||failed)return; won=true;
//   BSAudio.stopBg(0.5); BSAudio.sfx('win');
//   const sp=spent(),lv=LEVELS[currentLevel];
//   document.getElementById('winMsg').textContent=`Spent $${sp.toLocaleString()} of $${lv.budget>90000?'∞':lv.budget.toLocaleString()}`;
//   document.getElementById('winModal').classList.remove('hidden');
// }
// function showFail(msg){
//   if(won||failed)return; failed=true;
//   BSAudio.stopBg(0.5); BSAudio.sfx('fail');
//   document.getElementById('failMsg').textContent=msg;
//   document.getElementById('failModal').classList.remove('hidden');
// }

// // ═══════════════════════════════════════════════════════════════
// //  BUDGET
// // ═══════════════════════════════════════════════════════════════
// function spent(){ return Math.round(beams.reduce((s,b)=>s+b.restLen*MAT[b.mat].costPx,0)); }
// function updateBudget(){
//   const s=spent(),lv=LEVELS[currentLevel];
//   document.getElementById('budgetSpent').textContent='$'+s.toLocaleString();
//   document.getElementById('budgetSpent').className='budget-spent'+(s>lv.budget&&lv.budget<90000?' budget-over':'');
//   document.getElementById('budgetLabel').textContent='Budget: $'+(lv.budget>90000?'∞':lv.budget.toLocaleString());
// }
// function flashBudget(){
//   BSAudio.sfx('budget');
//   const el=document.getElementById('budgetSpent');
//   el.textContent='OVER BUDGET!'; el.className='budget-spent budget-over';
//   setTimeout(updateBudget,900);
// }

// // ═══════════════════════════════════════════════════════════════
// //  UNDO / CLEAR / GRID
// // ═══════════════════════════════════════════════════════════════
// function undoLast(){
//   if(mode!=='build'||!history.length)return;
//   const last=history.pop();
//   if(last.type==='beam'){beams=beams.filter(b=>b.id!==last.id);}
//   else{beams=beams.filter(b=>b.naid!==last.id&&b.nbid!==last.id);nodes=nodes.filter(n=>n.id!==last.id);rebuildIdx();}
//   BSAudio.sfx('delete'); selNode=null; updateBudget();
// }
// function clearAll(){
//   if(mode!=='build')return;
//   if(beams.length>0) BSAudio.sfx('delete');
//   nodes=nodes.filter(n=>n.fixed); beams=[]; history=[]; selNode=null; rebuildIdx(); updateBudget();
// }
// function rebuildIdx(){
//   const m={};nodes.forEach((n,i)=>m[n.id]=i);
//   beams=beams.filter(b=>m[b.naid]!==undefined&&m[b.nbid]!==undefined);
//   beams.forEach(b=>{b.a=m[b.naid];b.b=m[b.nbid];});
// }
// function toggleGrid(){ showGrid=!showGrid; document.getElementById('gridBtn').classList.toggle('active-icon',showGrid); }

// // ═══════════════════════════════════════════════════════════════
// //  INPUT
// // ═══════════════════════════════════════════════════════════════
// let musicStarted = false;
// function tryStartMusic(){
//   if(musicStarted)return; musicStarted=true;
//   BSAudio.unlock();
//   if(BSAudio.cfg.soundOn) BSAudio.playBg('game');
// }

// canvas.addEventListener('mousemove',e=>{
//   const r=canvas.getBoundingClientRect(); mouseX=e.clientX-r.left; mouseY=e.clientY-r.top;
//   if(mode!=='build')return;
//   hovNode=null; let md=SNAP;
//   nodes.forEach(n=>{const d=Math.hypot(n.x-mouseX,n.y-mouseY);if(d<md){md=d;hovNode=n;}});
//   hovBeam=null;
//   if(!hovNode) beams.forEach(b=>{const na=nodes[b.a],nb=nodes[b.b];if(na&&nb&&segDist(mouseX,mouseY,na.x,na.y,nb.x,nb.y)<9)hovBeam=b;});
// });

// canvas.addEventListener('click',e=>{
//   if(mode!=='build')return;
//   tryStartMusic();
//   const r=canvas.getBoundingClientRect(); const cx=e.clientX-r.left,cy=e.clientY-r.top;
//   let snap=null,sd=SNAP; nodes.forEach(n=>{const d=Math.hypot(n.x-cx,n.y-cy);if(d<sd){sd=d;snap=n;}});
//   if(!selNode){
//     if(snap){selNode=snap;advTut(1);}
//     else if(!inTerrain(cx,cy)){const n=mkNode(cx,cy,false);nodes.push(n);history.push({type:'node',id:n.id});BSAudio.sfx('node');selNode=n;advTut(1);}
//   } else {
//     let target=snap;
//     if(!target&&!inTerrain(cx,cy)){const n=mkNode(cx,cy,false);nodes.push(n);history.push({type:'node',id:n.id});BSAudio.sfx('node');target=n;}
//     if(target&&target.id!==selNode.id){
//       const dup=beams.some(b=>(b.naid===selNode.id&&b.nbid===target.id)||(b.naid===target.id&&b.nbid===selNode.id));
//       if(!dup){
//         const dx=target.x-selNode.x,dy=target.y-selNode.y,len=Math.sqrt(dx*dx+dy*dy);
//         if(len>4){
//           const cost=Math.round(len*MAT[currentMat].costPx),lv=LEVELS[currentLevel];
//           if(spent()+cost>lv.budget&&lv.budget<90000){flashBudget();selNode=null;return;}
//           const ai=nodes.indexOf(selNode),bi=nodes.indexOf(target),bid=nid++;
//           beams.push({id:bid,a:ai,b:bi,naid:selNode.id,nbid:target.id,restLen:len,mat:currentMat,stress:0,broken:false,fatigue:0});
//           history.push({type:'beam',id:bid});
//           BSAudio.sfx('place'); updateBudget(); advTut(2);
//         }
//       }
//       selNode=target;
//     } else if(!target){selNode=null;}
//   }
// });

// canvas.addEventListener('contextmenu',e=>{
//   e.preventDefault(); if(mode!=='build')return;
//   const r=canvas.getBoundingClientRect(); const cx=e.clientX-r.left,cy=e.clientY-r.top;
//   selNode=null; let hit=null,hd=SNAP;
//   nodes.forEach(n=>{const d=Math.hypot(n.x-cx,n.y-cy);if(d<hd){hd=d;hit=n;}});
//   if(hit&&!hit.fixed){
//     beams=beams.filter(b=>b.naid!==hit.id&&b.nbid!==hit.id); nodes=nodes.filter(n=>n.id!==hit.id);
//     history=history.filter(h=>h.id!==hit.id); BSAudio.sfx('delete'); rebuildIdx(); updateBudget(); return;
//   }
//   const bi=beams.findIndex(b=>{const na=nodes[b.a],nb=nodes[b.b];return na&&nb&&segDist(cx,cy,na.x,na.y,nb.x,nb.y)<10;});
//   if(bi!==-1){history=history.filter(h=>h.id!==beams[bi].id);beams.splice(bi,1);BSAudio.sfx('delete');updateBudget();}
// });

// window.addEventListener('keydown',e=>{
//   if(e.key==='Escape') selNode=null;
//   if((e.key==='z'||e.key==='Z')&&(e.ctrlKey||e.metaKey)) undoLast();
// });

// // ── Toolbar buttons also start music
// document.getElementById('btnBuild').addEventListener('click', tryStartMusic);
// document.getElementById('btnTest').addEventListener('click', tryStartMusic);

// // ═══════════════════════════════════════════════════════════════
// //  HELPERS
// // ═══════════════════════════════════════════════════════════════
// function segDist(px,py,ax,ay,bx,by){
//   const dx=bx-ax,dy=by-ay,l=dx*dx+dy*dy; if(l<0.001)return Math.hypot(px-ax,py-ay);
//   const t=sat(((px-ax)*dx+(py-ay)*dy)/l); return Math.hypot(px-(ax+t*dx),py-(ay+t*dy));
// }
// function inTerrain(x,y){
//   return LEVELS[currentLevel].terrain.some(tr=>{
//     const pts=tr.pts.map(p=>[p[0]*canvas.width,p[1]*canvas.height]); let inside=false;
//     for(let i=0,j=pts.length-1;i<pts.length;j=i++){
//       const[xi,yi]=pts[i],[xj,yj]=pts[j];
//       if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi) inside=!inside;
//     }
//     return inside;
//   });
// }

// // ═══════════════════════════════════════════════════════════════
// //  DRAW
// // ═══════════════════════════════════════════════════════════════
// function draw(){
//   const W=canvas.width,H=canvas.height,lv=LEVELS[currentLevel];
//   const sky=ctx.createLinearGradient(0,0,0,H);
//   sky.addColorStop(0,lv.sky[0]);sky.addColorStop(1,lv.sky[1]);
//   ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
//   if(showGrid){
//     ctx.strokeStyle='rgba(0,0,0,0.065)';ctx.lineWidth=1;
//     for(let x=0;x<W;x+=50){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
//     for(let y=0;y<H;y+=50){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
//   }
//   ctx.fillStyle='rgba(150,145,175,0.18)';
//   [[0.09,0.57,0.16,0.21],[0.26,0.60,0.13,0.17],[0.72,0.54,0.17,0.22],[0.90,0.59,0.12,0.16]].forEach(([cx,by,bw,bh])=>{
//     ctx.beginPath();ctx.moveTo((cx-bw/2)*W,by*H);ctx.lineTo(cx*W,(by-bh)*H);ctx.lineTo((cx+bw/2)*W,by*H);ctx.closePath();ctx.fill();
//   });
//   const wy=lv.waterY*H;
//   const wg=ctx.createLinearGradient(0,wy,0,H);
//   wg.addColorStop(0,lv.waterC);wg.addColorStop(0.5,'#186070');wg.addColorStop(1,'#082838');
//   ctx.fillStyle=wg;ctx.fillRect(0,wy,W,H-wy);
//   const t=Date.now()*0.001;
//   ctx.strokeStyle='rgba(255,255,255,0.10)';ctx.lineWidth=1;
//   for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(0,wy+10+i*14+Math.sin(t+i)*3);ctx.lineTo(W,wy+10+i*14+Math.sin(t+i+1)*3);ctx.stroke();}
//   lv.terrain.forEach(tr=>drawTerrain(tr.pts.map(p=>[p[0]*W,p[1]*H]),tr.type));
//   const gx=lv.goal.x*W,gy=lv.goal.y*H;
//   ctx.strokeStyle='#555';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(gx,gy);ctx.lineTo(gx,gy-52);ctx.stroke();
//   ctx.fillStyle='#38b018';ctx.beginPath();ctx.moveTo(gx,gy-52);ctx.lineTo(gx+26,gy-41);ctx.lineTo(gx,gy-31);ctx.closePath();ctx.fill();
//   ctx.font='bold 11px Nunito';ctx.fillStyle='#555';ctx.textAlign='center';ctx.fillText('GOAL',gx,gy+16);ctx.textAlign='left';
//   beams.forEach(drawBeam);
//   if(selNode&&mode==='build'){
//     const tx=hovNode?hovNode.x:mouseX,ty2=hovNode?hovNode.y:mouseY,m=MAT[currentMat];
//     ctx.save();ctx.strokeStyle=m.color+'cc';ctx.lineWidth=m.w+2;ctx.lineCap='round';
//     ctx.setLineDash([8,6]);ctx.lineDashOffset=-(Date.now()*0.06%14);
//     ctx.beginPath();ctx.moveTo(selNode.x,selNode.y);ctx.lineTo(tx,ty2);ctx.stroke();ctx.setLineDash([]);
//     const dx=tx-selNode.x,dy=ty2-selNode.y,plen=Math.sqrt(dx*dx+dy*dy);
//     if(plen>30){
//       const pcost=Math.round(plen*m.costPx),mx2=(selNode.x+tx)/2,my2=(selNode.y+ty2)/2;
//       ctx.fillStyle='rgba(0,0,0,0.7)';const lw=ctx.measureText('$'+pcost).width;
//       ctx.fillRect(mx2-lw/2-5,my2-16,lw+10,20);
//       ctx.fillStyle='#fff';ctx.font='bold 12px Nunito';ctx.textAlign='center';ctx.fillText('$'+pcost,mx2,my2-1);ctx.textAlign='left';
//     }
//     ctx.restore();
//   }
//   nodes.forEach(drawNode);
//   if(veh&&!veh.done) drawVehicle();
// }

// function drawTerrain(pts,type){
//   ctx.save();ctx.shadowColor='rgba(0,0,0,0.12)';ctx.shadowBlur=8;ctx.shadowOffsetY=4;
//   ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();
//   let g;
//   if(type==='ice'){g=ctx.createLinearGradient(pts[0][0],pts[0][1],pts[0][0]+60,pts[0][1]+120);g.addColorStop(0,'#b8e0ef');g.addColorStop(0.4,'#80c0d8');g.addColorStop(1,'#387898');}
//   else if(type==='grass'){g=ctx.createLinearGradient(0,pts[0][1],0,pts[0][1]+80);g.addColorStop(0,'#68b048');g.addColorStop(0.18,'#488030');g.addColorStop(1,'#284818');}
//   else{g=ctx.createLinearGradient(0,pts[0][1],0,pts[0][1]+100);g.addColorStop(0,'#888078');g.addColorStop(1,'#404038');}
//   ctx.fillStyle=g;ctx.fill();ctx.shadowColor='transparent';
//   ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);ctx.lineTo(pts[1][0],pts[1][1]);
//   ctx.strokeStyle=type==='grass'?'#88d060':type==='ice'?'rgba(255,255,255,0.7)':'rgba(255,255,255,0.2)';
//   ctx.lineWidth=type==='grass'?7:4;ctx.stroke();ctx.restore();
// }

// function stressColor(b){
//   if(b.broken)return 'rgba(150,20,20,0.4)';
//   const eMax=MAT[b.mat].maxStr-(b.fatigue||0),r=Math.min(b.stress/Math.max(eMax,0.01),1);
//   if(r<0.45)return MAT[b.mat].color; if(r<0.80)return '#d89020'; return '#d82020';
// }

// function drawBeam(b){
//   const na=nodes[b.a],nb=nodes[b.b]; if(!na||!nb)return;
//   const m=MAT[b.mat],col=stressColor(b);
//   ctx.save();
//   if(b===hovBeam&&mode==='build'){ctx.shadowColor='rgba(255,140,40,0.7)';ctx.shadowBlur=12;}
//   if(b.mat==='road'&&!b.broken){
//     const ang=Math.atan2(nb.y-na.y,nb.x-na.x),len=Math.hypot(nb.x-na.x,nb.y-na.y);
//     ctx.translate(na.x,na.y);ctx.rotate(ang);
//     ctx.fillStyle='#1e1e1e';ctx.fillRect(0,-m.w/2,len,m.w);ctx.fillStyle='#2e2e2e';ctx.fillRect(0,-m.w/2+1,len,m.w-2);
//     ctx.strokeStyle='rgba(255,255,180,0.45)';ctx.lineWidth=1.5;ctx.setLineDash([14,10]);
//     ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(len,0);ctx.stroke();ctx.setLineDash([]);
//     ctx.fillStyle='#a0a0a0';ctx.fillRect(0,-m.w/2,len,2);ctx.fillRect(0,m.w/2-2,len,2);
//     if(b.stress>0.02){ctx.globalAlpha=Math.min(0.7,b.stress/m.maxStr);ctx.fillStyle='#e02020';ctx.fillRect(0,-m.w/2,len,m.w);}
//     ctx.restore();return;
//   }
//   if(b.mat==='cable'){
//     ctx.strokeStyle=b.broken?'rgba(80,80,80,0.35)':col;ctx.lineWidth=b.broken?1:m.w;ctx.lineCap='round';
//     ctx.setLineDash(b.broken?[4,4]:[]);ctx.beginPath();ctx.moveTo(na.x,na.y);ctx.lineTo(nb.x,nb.y);ctx.stroke();
//     ctx.setLineDash([]);ctx.restore();return;
//   }
//   if(b.mat==='wood'&&!b.broken){
//     const ang=Math.atan2(nb.y-na.y,nb.x-na.x),len=Math.hypot(nb.x-na.x,nb.y-na.y);
//     ctx.translate(na.x,na.y);ctx.rotate(ang);
//     const wg=ctx.createLinearGradient(0,-m.w/2,0,m.w/2);
//     wg.addColorStop(0,'#c88030');wg.addColorStop(0.5,'#a06020');wg.addColorStop(1,'#785010');
//     ctx.fillStyle=wg;ctx.fillRect(0,-m.w/2,len,m.w);
//     ctx.strokeStyle='rgba(0,0,0,0.09)';ctx.lineWidth=1;
//     for(let px=12;px<len;px+=15){ctx.beginPath();ctx.moveTo(px,-m.w/2);ctx.lineTo(px,m.w/2);ctx.stroke();}
//     ctx.fillStyle='rgba(255,255,255,0.09)';ctx.fillRect(0,-m.w/2,len,2);
//     if(b.stress>0.04){ctx.globalAlpha=Math.min(0.6,b.stress/m.maxStr);ctx.fillStyle=col;ctx.fillRect(0,-m.w/2,len,m.w);}
//     ctx.restore();return;
//   }
//   ctx.strokeStyle=col;ctx.lineWidth=b.broken?3:m.w;ctx.lineCap='round';
//   ctx.setLineDash(b.broken?[5,5]:[]);ctx.beginPath();ctx.moveTo(na.x,na.y);ctx.lineTo(nb.x,nb.y);ctx.stroke();ctx.setLineDash([]);
//   if(!b.broken){
//     ctx.globalAlpha=0.18;ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(na.x,na.y);ctx.lineTo(nb.x,nb.y);ctx.stroke();
//     ctx.globalAlpha=1;ctx.fillStyle=col;
//     [[na.x,na.y],[(na.x+nb.x)/2,(na.y+nb.y)/2],[nb.x,nb.y]].forEach(([rx,ry])=>{ctx.beginPath();ctx.arc(rx,ry,3.5,0,Math.PI*2);ctx.fill();});
//   }
//   ctx.restore();
// }

// function drawNode(n){
//   const isSel=selNode&&selNode.id===n.id,isHov=hovNode&&hovNode.id===n.id,r=n.fixed?11:8;
//   ctx.save();
//   if(isSel){ctx.shadowColor='#fff';ctx.shadowBlur=24;}
//   else if(isHov){ctx.shadowColor=n.fixed?'#ff8060':'#ffe060';ctx.shadowBlur=18;}
//   if(isSel||isHov){ctx.beginPath();ctx.arc(n.x,n.y,r+5,0,Math.PI*2);ctx.fillStyle=n.fixed?'rgba(255,80,40,0.15)':'rgba(255,220,40,0.15)';ctx.fill();}
//   if(n.fixed){ctx.beginPath();ctx.arc(n.x,n.y,r+3,0,Math.PI*2);ctx.strokeStyle='rgba(255,255,255,0.5)';ctx.lineWidth=2;ctx.setLineDash([4,3]);ctx.stroke();ctx.setLineDash([]);}
//   ctx.beginPath();ctx.arc(n.x,n.y,r,0,Math.PI*2);
//   const ng=ctx.createRadialGradient(n.x-2,n.y-2,1,n.x,n.y,r);
//   if(n.fixed){ng.addColorStop(0,'#ff6050');ng.addColorStop(1,'#b81818');}else{ng.addColorStop(0,'#ffe068');ng.addColorStop(1,'#c09010');}
//   ctx.fillStyle=ng;ctx.fill();ctx.strokeStyle=n.fixed?'#801010':'#a07800';ctx.lineWidth=2;ctx.stroke();
//   ctx.beginPath();ctx.arc(n.x,n.y,r*0.3,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,0.5)';ctx.fill();ctx.restore();
// }

// function drawVehicle(){
//   const v=veh; ctx.save();
//   ctx.fillStyle='rgba(0,0,0,0.12)';ctx.beginPath();ctx.ellipse(v.x+v.w/2,v.y+v.h+10,v.w*0.38,5,0,0,Math.PI*2);ctx.fill();
//   const bg=ctx.createLinearGradient(v.x,v.y,v.x,v.y+v.h);
//   bg.addColorStop(0,'#6090e0');bg.addColorStop(0.5,'#3860b0');bg.addColorStop(1,'#1c3878');
//   ctx.fillStyle=bg;ctx.beginPath();ctx.roundRect(v.x,v.y+v.h*0.28,v.w,v.h*0.55,4);ctx.fill();ctx.strokeStyle='#284880';ctx.lineWidth=1.5;ctx.stroke();
//   const cg=ctx.createLinearGradient(v.x,v.y,v.x,v.y+v.h*0.44);
//   cg.addColorStop(0,'#80b0e8');cg.addColorStop(1,'#3860b0');
//   ctx.fillStyle=cg;ctx.beginPath();ctx.roundRect(v.x+v.w*0.15,v.y,v.w*0.55,v.h*0.44,[4,4,0,0]);ctx.fill();
//   ctx.fillStyle='rgba(170,225,255,0.8)';ctx.beginPath();ctx.roundRect(v.x+v.w*0.2,v.y+3,v.w*0.42,v.h*0.27,3);ctx.fill();
//   if(v.onBridge){ctx.globalAlpha=0.25;ctx.fillStyle='#ff4020';ctx.beginPath();ctx.roundRect(v.x,v.y+v.h*0.28,v.w,v.h*0.55,4);ctx.fill();ctx.globalAlpha=1;}
//   const wr=v.h*0.27,ws=v.spin;
//   [[v.x+wr+3,v.y+v.h],[v.x+v.w-wr-3,v.y+v.h]].forEach(([wx,wy])=>{
//     ctx.beginPath();ctx.arc(wx,wy,wr,0,Math.PI*2);ctx.fillStyle='#181818';ctx.fill();ctx.strokeStyle='#383838';ctx.lineWidth=1.5;ctx.stroke();
//     for(let i=0;i<6;i++){const a=ws+i*Math.PI/3;ctx.strokeStyle='#484848';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(wx,wy,wr*0.72,a,a+0.30);ctx.stroke();}
//     const rg=ctx.createRadialGradient(wx-1,wy-1,1,wx,wy,wr*0.42);
//     rg.addColorStop(0,'#ccc');rg.addColorStop(1,'#777');
//     ctx.beginPath();ctx.arc(wx,wy,wr*0.42,0,Math.PI*2);ctx.fillStyle=rg;ctx.fill();
//     ctx.beginPath();ctx.arc(wx,wy,wr*0.1,0,Math.PI*2);ctx.fillStyle='#eee';ctx.fill();
//   });
//   ctx.restore();
// }

// // ═══════════════════════════════════════════════════════════════
// //  LOOP / TUTORIAL / RESIZE / BOOT
// // ═══════════════════════════════════════════════════════════════
// function loop(){ simulate(); draw(); if(!won&&!failed) raf=requestAnimationFrame(loop); }
// function stopSim(){
//   if(raf){cancelAnimationFrame(raf);raf=null;}
//   document.getElementById('winModal').classList.add('hidden');
//   document.getElementById('failModal').classList.add('hidden');
// }
// function updateTut(override){
//   const bar=document.getElementById('tutHint'),el=document.getElementById('tutText');
//   const lv=LEVELS[currentLevel]; if(!lv.tutorial){bar.style.display='none';return;}
//   bar.style.display='flex';
//   if(override==='test'){el.textContent='🚗 Watch the stress colors — red means about to snap!';return;}
//   el.textContent=lv.tips[Math.min(tutStep,lv.tips.length-1)];
// }
// function advTut(s){ if(LEVELS[currentLevel].tutorial&&s>tutStep){tutStep=s;updateTut();} }
// window.addEventListener('resize',()=>{
//   if(!nodes.length)return;
//   const ow=canvas.width,oh=canvas.height; resizeCanvas();
//   const sx=canvas.width/ow,sy=canvas.height/oh;
//   nodes.forEach(n=>{n.x*=sx;n.y*=sy;n.px=n.x;n.py=n.y;n.bx*=sx;n.by*=sy;});
//   beams.forEach(b=>{const na=nodes[b.a],nb=nodes[b.b];if(na&&nb)b.restLen=Math.hypot(nb.x-na.x,nb.y-na.y);});
// });
// window.addEventListener('load',()=>{
//   BSAudio.loadSettings();
//   resizeCanvas(); selectMat('steel');
//   document.getElementById('gridBtn').classList.add('active-icon');
//   resetLevel();
// });



// ── Read level index and game mode from URL: game.html?level=0&mode=classic
const params       = new URLSearchParams(window.location.search);
let   currentLevel = parseInt(params.get('level') || '0', 10);
const gameMode     = params.get('mode') || 'classic';  // 'classic' or 'ranked'

const canvas = document.getElementById('gameCanvas');
const ctx    = canvas.getContext('2d');

// ═══════════════════════════════════════════════════════════════
//  LOCAL STORAGE — RANKED PROGRESS
// ═══════════════════════════════════════════════════════════════
function loadProgress(){
  try{ return JSON.parse(localStorage.getItem('bridgeProgress')||'{}'); }
  catch(e){ return {}; }
}
function saveProgress(p){
  try{ localStorage.setItem('bridgeProgress', JSON.stringify(p)); }
  catch(e){}
}
// Calculate stars: 3=under 50% budget, 2=under 75%, 1=completed
function calcStars(spentCost, budget){
  if(budget > 90000) return 3; // tutorial always 3 stars
  if(spentCost <= budget * 0.50) return 3;
  if(spentCost <= budget * 0.75) return 2;
  return 1;
}
function saveRankedWin(levelIdx, stars, spentCost){
  const p = loadProgress();
  if(!p.completed) p.completed = new Array(10).fill(false);
  if(!p.stars)     p.stars     = new Array(10).fill(0);
  if(!p.bestCost)  p.bestCost  = new Array(10).fill(0);

  p.completed[levelIdx] = true;
  // Only upgrade stars, never downgrade
  if(stars > (p.stars[levelIdx]||0)) p.stars[levelIdx] = stars;
  // Save best (lowest) cost
  if(!p.bestCost[levelIdx] || spentCost < p.bestCost[levelIdx]) p.bestCost[levelIdx] = spentCost;
  // Unlock next level
  if(levelIdx >= (p.unlockedLevel||0)) p.unlockedLevel = Math.min(levelIdx+1, 9);

  saveProgress(p);
  return p;
}
// Check if a level is playable in ranked mode
function isLevelUnlocked(idx){
  if(gameMode !== 'ranked') return true;
  const p = loadProgress();
  return idx <= (p.unlockedLevel||0);
}

// ── Rolling sound timer
let rollTimer = 0;

// ═══════════════════════════════════════════════════════════════
//  NAVIGATION
// ═══════════════════════════════════════════════════════════════
function exitGame(){
  stopSim();
  BSAudio.stopBg(0.3);
  window.location.href = 'levelselect.html?mode=' + gameMode;
}
function goNextLevel(){
  document.getElementById('winModal').classList.add('hidden');
  BSAudio.stopBg(0.2);
  const next = currentLevel < LEVELS.length - 1 ? currentLevel + 1 : currentLevel;
  window.location.href = `game.html?level=${next}&mode=${gameMode}`;
}

// ═══════════════════════════════════════════════════════════════
//  PHYSICS CONSTANTS
// ═══════════════════════════════════════════════════════════════
const VEHICLE_MASS      = 5;
const STRESS_PER_LOAD   = 0.09;
const STRESS_FIXED_LOAD = 0.28;
const BEAM_FATIGUE_RATE = 0.002;

const MAT = {
  wood:  { label:'Wood',  costPx:1.0, maxStr:0.12, w:6,  color:'#c07828' },
  steel: { label:'Steel', costPx:2.2, maxStr:1,    w:7,  color:'#c02828' },
  cable: { label:'Cable', costPx:0.5, maxStr:0.08, w:3,  color:'#777'    },
  iron:  { label:'Iron',  costPx:1.6, maxStr:2,    w:9,  color:'#3a5a7a' },
  road:  { label:'Road',  costPx:3.0, maxStr:2,    w:11, color:'#2a2a2a' },
};

// ═══════════════════════════════════════════════════════════════
//  LEVELS
// ═══════════════════════════════════════════════════════════════
const LEVELS = [
  { name:'Tutorial Gap', tutorial:true, budget:99999,
    sky:['#c0bcd4','#d8d4e8'], waterY:0.78, waterC:'#48a8bc',
    terrain:[{pts:[[0,0.70],[0.27,0.70],[0.27,1],[0,1]],type:'grass'},{pts:[[0.50,0.70],[1,0.70],[1,1],[0.50,1]],type:'grass'}],
    anchors:[{x:0.27,y:0.70},{x:0.27,y:0.50},{x:0.50,y:0.70},{x:0.50,y:0.50}],
    veh:{x:0.04,w:52,h:26,speed:1.3}, goal:{x:0.88,y:0.70},
    tips:['Click a red anchor to select it','Now click another anchor or empty space to draw a beam!','The car is HEAVY — add diagonals or it will collapse!','Press TEST — watch stress colors appear under load!'] },
  { name:'River Crossing', budget:5000, sky:['#b8c8d8','#ccdce8'], waterY:0.78, waterC:'#3aa8c0',
    terrain:[{pts:[[0,0.70],[0.22,0.70],[0.22,1],[0,1]],type:'grass'},{pts:[[0.52,0.70],[1,0.70],[1,1],[0.52,1]],type:'grass'}],
    anchors:[{x:0.22,y:0.70},{x:0.22,y:0.48},{x:0.10,y:0.48},{x:0.52,y:0.70},{x:0.52,y:0.48},{x:0.64,y:0.48}],
    veh:{x:0.04,w:52,h:26,speed:1.1}, goal:{x:0.88,y:0.71} },
  { name:'Double Span', budget:7000, sky:['#c0b8cc','#d4cce0'], waterY:0.78, waterC:'#3898b0',
    terrain:[{pts:[[0,0.70],[0.17,0.70],[0.17,1],[0,1]],type:'rock'},{pts:[[0.37,0.70],[0.50,0.70],[0.50,1],[0.37,1]],type:'rock'},{pts:[[0.68,0.70],[1,0.70],[1,1],[0.68,1]],type:'rock'}],
    anchors:[{x:0.17,y:0.70},{x:0.17,y:0.48},{x:0.37,y:0.70},{x:0.37,y:0.48},{x:0.50,y:0.70},{x:0.50,y:0.48},{x:0.68,y:0.70},{x:0.68,y:0.48}],
    veh:{x:0.04,w:52,h:26,speed:1.1}, goal:{x:0.90,y:0.71} },
  { name:'Deep Chasm', budget:6500, sky:['#b0a8c0','#ccc4d8'], waterY:0.88, waterC:'#286888',
    terrain:[{pts:[[0,0.62],[0.20,0.62],[0.20,1],[0,1]],type:'ice'},{pts:[[0.56,0.62],[1,0.62],[1,1],[0.56,1]],type:'ice'}],
    anchors:[{x:0.20,y:0.62},{x:0.20,y:0.40},{x:0.08,y:0.40},{x:0.56,y:0.62},{x:0.56,y:0.40},{x:0.68,y:0.40}],
    veh:{x:0.04,w:52,h:26,speed:1.0}, goal:{x:0.88,y:0.63} },
  { name:'Asymmetric', budget:6000, sky:['#b8c4cc','#ccd4dc'], waterY:0.80, waterC:'#389898',
    terrain:[{pts:[[0,0.68],[0.24,0.68],[0.24,1],[0,1]],type:'grass'},{pts:[[0.56,0.61],[1,0.61],[1,1],[0.56,1]],type:'grass'}],
    anchors:[{x:0.24,y:0.68},{x:0.24,y:0.46},{x:0.10,y:0.46},{x:0.56,y:0.61},{x:0.56,y:0.39},{x:0.70,y:0.39}],
    veh:{x:0.04,w:52,h:26,speed:1.0}, goal:{x:0.90,y:0.62} },
  { name:'Tight Budget', budget:2200, sky:['#beb8cc','#d2cce0'], waterY:0.79, waterC:'#48a8bc',
    terrain:[{pts:[[0,0.70],[0.22,0.70],[0.22,1],[0,1]],type:'ice'},{pts:[[0.50,0.70],[1,0.70],[1,1],[0.50,1]],type:'ice'}],
    anchors:[{x:0.22,y:0.70},{x:0.22,y:0.50},{x:0.50,y:0.70},{x:0.50,y:0.50}],
    veh:{x:0.04,w:52,h:26,speed:1.4}, goal:{x:0.88,y:0.71} },
  { name:'Mid-River Rock', budget:7500, sky:['#b4bec8','#c8d2dc'], waterY:0.80, waterC:'#38a0b4',
    terrain:[{pts:[[0,0.70],[0.17,0.70],[0.17,1],[0,1]],type:'rock'},{pts:[[0.40,0.76],[0.48,0.76],[0.48,1],[0.40,1]],type:'rock'},{pts:[[0.70,0.70],[1,0.70],[1,1],[0.70,1]],type:'rock'}],
    anchors:[{x:0.17,y:0.70},{x:0.17,y:0.48},{x:0.40,y:0.76},{x:0.48,y:0.76},{x:0.40,y:0.48},{x:0.48,y:0.48},{x:0.70,y:0.70},{x:0.70,y:0.48}],
    veh:{x:0.04,w:52,h:26,speed:1.0}, goal:{x:0.90,y:0.71} },
  { name:'Triple Chasm', budget:10000, sky:['#acb4c0','#c4ccd8'], waterY:0.81, waterC:'#288898',
    terrain:[{pts:[[0,0.70],[0.13,0.70],[0.13,1],[0,1]],type:'ice'},{pts:[[0.27,0.70],[0.38,0.70],[0.38,1],[0.27,1]],type:'ice'},{pts:[[0.52,0.70],[0.63,0.70],[0.63,1],[0.52,1]],type:'ice'},{pts:[[0.77,0.70],[1,0.70],[1,1],[0.77,1]],type:'ice'}],
    anchors:[{x:0.13,y:0.70},{x:0.13,y:0.46},{x:0.27,y:0.70},{x:0.38,y:0.70},{x:0.27,y:0.46},{x:0.38,y:0.46},{x:0.52,y:0.70},{x:0.63,y:0.70},{x:0.52,y:0.46},{x:0.63,y:0.46},{x:0.77,y:0.70},{x:0.77,y:0.46}],
    veh:{x:0.03,w:52,h:26,speed:0.9}, goal:{x:0.91,y:0.71} },
  { name:'Steep Canyon', budget:8000, sky:['#a8b0be','#bcc4d2'], waterY:0.92, waterC:'#185068',
    terrain:[{pts:[[0,0.58],[0.19,0.58],[0.19,1],[0,1]],type:'rock'},{pts:[[0.56,0.58],[1,0.58],[1,1],[0.56,1]],type:'rock'}],
    anchors:[{x:0.19,y:0.58},{x:0.19,y:0.35},{x:0.06,y:0.35},{x:0.56,y:0.58},{x:0.56,y:0.35},{x:0.70,y:0.35}],
    veh:{x:0.04,w:56,h:28,speed:1.3}, goal:{x:0.90,y:0.59} },
  { name:'Grand Finale', budget:14000, sky:['#a0a8b4','#b8c0cc'], waterY:0.82, waterC:'#185878',
    terrain:[{pts:[[0,0.65],[0.13,0.65],[0.13,1],[0,1]],type:'ice'},{pts:[[0.30,0.72],[0.38,0.72],[0.38,1],[0.30,1]],type:'rock'},{pts:[[0.55,0.70],[0.63,0.70],[0.63,1],[0.55,1]],type:'rock'},{pts:[[0.78,0.65],[1,0.65],[1,1],[0.78,1]],type:'ice'}],
    anchors:[{x:0.13,y:0.65},{x:0.13,y:0.42},{x:0.03,y:0.42},{x:0.30,y:0.72},{x:0.38,y:0.72},{x:0.30,y:0.42},{x:0.38,y:0.42},{x:0.55,y:0.70},{x:0.63,y:0.70},{x:0.55,y:0.42},{x:0.63,y:0.42},{x:0.78,y:0.65},{x:0.78,y:0.42},{x:0.90,y:0.42}],
    veh:{x:0.03,w:58,h:30,speed:1.5}, goal:{x:0.92,y:0.66} },
];

// ═══════════════════════════════════════════════════════════════
//  GAME STATE
// ═══════════════════════════════════════════════════════════════
let mode='build', currentMat='steel';
let nodes=[], beams=[], veh=null;
let nid=0, selNode=null, hovNode=null, hovBeam=null;
let mouseX=0, mouseY=0;
let won=false, failed=false;
let showGrid=true, raf=null, history=[], budget=0, tutStep=0;
const snappedBeams = new Set();
const SNAP=18, G=0.38, DAMP=0.982, ITERS=24;

// ═══════════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════════
function resizeCanvas(){
  const toolbar = document.querySelector('.poly-toolbar');
  const matbar  = document.querySelector('.material-bar');
  const tbH = toolbar ? toolbar.offsetHeight : 46;
  const mbH = matbar  ? matbar.offsetHeight  : 58;
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight - tbH - mbH;
}

function resetLevel(){
  // Ranked mode: guard against accessing locked levels
  if(gameMode === 'ranked' && !isLevelUnlocked(currentLevel)){
    window.location.href = 'levelselect.html?mode=ranked';
    return;
  }
  stopSim();
  resizeCanvas();
  const lv = LEVELS[currentLevel];
  nodes=[]; beams=[]; history=[];
  selNode=null; hovNode=null; hovBeam=null;
  won=false; failed=false; veh=null; nid=0;
  tutStep=0; snappedBeams.clear();
  // Classic mode: unlimited budget
  budget = (gameMode === 'classic') ? 99999 : lv.budget;
  document.getElementById('levelLabel').textContent=`LVL ${currentLevel+1}`;
  // Set mode badge
  const mb = document.getElementById('modeBadge');
  if(mb){
    mb.textContent = gameMode === 'ranked' ? '🏆 RANKED' : '🎮 CLASSIC';
    mb.className   = 'mode-badge ' + gameMode;
  }
  updateBudget();
  lv.anchors.forEach(a=>nodes.push(mkNode(a.x*canvas.width,a.y*canvas.height,true)));
  setMode('build');
  updateTut();
  raf=requestAnimationFrame(loop);
}
function mkNode(x,y,fixed=false){ return{id:nid++,x,y,px:x,py:y,fixed,bx:x,by:y}; }

// ═══════════════════════════════════════════════════════════════
//  MATERIAL / MODE
// ═══════════════════════════════════════════════════════════════
function selectMat(m){
  currentMat=m;
  document.querySelectorAll('.mat-btn').forEach(b=>b.classList.remove('selected'));
  const el=document.getElementById('mat-'+m); if(el) el.classList.add('selected');
  const lbl=document.getElementById('matCostLabel');
  if(lbl&&MAT[m]) lbl.textContent=`${MAT[m].label} — $${MAT[m].costPx.toFixed(1)}/px`;
}

function setMode(m){
  mode=m;
  document.getElementById('btnBuild').className='tb-btn mode-btn'+(m==='build'?' active-build':'');
  document.getElementById('btnTest').className ='tb-btn mode-btn'+(m==='test' ?' active-test' :'');
  canvas.style.cursor=m==='build'?'crosshair':'default';
  selNode=null;
  if(m==='test'){
    nodes.forEach(n=>{n.bx=n.x;n.by=n.y;n.px=n.x;n.py=n.y;});
    beams.forEach(b=>{b.broken=false;b.stress=0;b.fatigue=0;});
    snappedBeams.clear(); spawnVehicle(); updateTut('test');
    BSAudio.sfx('teststart');
  } else {
    veh=null;
    nodes.forEach(n=>{n.x=n.bx;n.y=n.by;n.px=n.bx;n.py=n.by;});
    beams.forEach(b=>{b.broken=false;b.stress=0;b.fatigue=0;});
    snappedBeams.clear();
  }
}

function spawnVehicle(){
  const lv=LEVELS[currentLevel],vd=lv.veh,sx=vd.x*canvas.width;
  let ty=lv.terrain[0].pts[0][1]*canvas.height;
  lv.terrain.forEach(tr=>{
    const xs=tr.pts.map(p=>p[0]*canvas.width),ys=tr.pts.map(p=>p[1]*canvas.height);
    if(sx>=Math.min(...xs)&&sx<=Math.max(...xs)) ty=Math.min(...ys);
  });
  veh={x:sx,y:ty-vd.h-1,w:vd.w,h:vd.h,speed:vd.speed,vy:0,spin:0,done:false,onBridge:false,wasOnBridge:false};
}

// ═══════════════════════════════════════════════════════════════
//  PHYSICS
// ═══════════════════════════════════════════════════════════════
function simulate(){
  if(mode!=='test') return;
  nodes.forEach(n=>{
    if(n.fixed)return;
    const vx=(n.x-n.px)*DAMP,vy=(n.y-n.py)*DAMP+G;
    n.px=n.x;n.py=n.y;n.x+=vx;n.y+=vy;
  });
  for(let it=0;it<ITERS;it++){
    beams.forEach(b=>{
      if(b.broken)return;
      const na=nodes[b.a],nb=nodes[b.b]; if(!na||!nb)return;
      const dx=nb.x-na.x,dy=nb.y-na.y,d=Math.sqrt(dx*dx+dy*dy)||0.001;
      const err=(d-b.restLen)/d;
      if(b.mat==='cable'&&err<0){b.stress*=0.92;return;}
      b.stress=Math.abs(err);
      if(b.stress>MAT[b.mat].maxStr*0.40) b.fatigue=(b.fatigue||0)+BEAM_FATIGUE_RATE;
      const eMax=MAT[b.mat].maxStr-(b.fatigue||0);
      if(b.stress>eMax){
        b.broken=true;
        if(!snappedBeams.has(b.id)){snappedBeams.add(b.id);BSAudio.sfx('snap');}
        return;
      }
      if(na.fixed&&nb.fixed)return;
      const fx=dx*err*0.5,fy=dy*err*0.5;
      if(!na.fixed){na.x+=fx;na.y+=fy;} if(!nb.fixed){nb.x-=fx;nb.y-=fy;}
    });
    floorNodes();
  }
  applyLoad(); moveVehicle();
  if(veh&&!veh.done&&veh.onBridge){
    rollTimer++; if(rollTimer%28===0) BSAudio.sfx('roll');
  } else { rollTimer=0; }
}

function floorNodes(){
  const lv=LEVELS[currentLevel];
  nodes.forEach(n=>{
    if(n.fixed)return;
    lv.terrain.forEach(tr=>{
      const xs=tr.pts.map(p=>p[0]*canvas.width),ys=tr.pts.map(p=>p[1]*canvas.height),topY=Math.min(...ys);
      if(n.x>=Math.min(...xs)&&n.x<=Math.max(...xs)&&n.y>topY){n.y=topY;n.py=topY+0.5;}
    });
  });
}

function applyLoad(){
  if(!veh||veh.done)return;
  const samples=[veh.x+veh.w*0.10,veh.x+veh.w*0.28,veh.x+veh.w*0.50,veh.x+veh.w*0.72,veh.x+veh.w*0.90];
  const wPer=VEHICLE_MASS/samples.length; veh.onBridge=false;
  samples.forEach(wx=>{
    beams.forEach(b=>{
      if(b.broken)return;
      const na=nodes[b.a],nb=nodes[b.b]; if(!na||!nb||!isDeck(na,nb))return;
      const lo=Math.min(na.x,nb.x),hi=Math.max(na.x,nb.x); if(wx<lo||wx>hi)return;
      const t=sat((wx-na.x)/((nb.x-na.x)||0.001));
      const sy=na.y+t*(nb.y-na.y); if(Math.abs(veh.y+veh.h-sy)>28)return;
      veh.onBridge=true;
      if(!na.fixed){na.y+=wPer*(1-t);na.py=na.y+0.2;} if(!nb.fixed){nb.y+=wPer*t;nb.py=nb.y+0.2;}
      const sAdd=(na.fixed&&nb.fixed)?STRESS_FIXED_LOAD:STRESS_PER_LOAD;
      b.stress=Math.min(b.stress+sAdd,MAT[b.mat].maxStr+0.15);
      b.fatigue=(b.fatigue||0)+BEAM_FATIGUE_RATE*2;
      if(b.stress>MAT[b.mat].maxStr-(b.fatigue||0)){
        if(!snappedBeams.has(b.id)){snappedBeams.add(b.id);BSAudio.sfx('snap');} b.broken=true;
      }
    });
  });
  if(veh.onBridge&&!veh.wasOnBridge) BSAudio.sfx('land');
  veh.wasOnBridge=veh.onBridge;
}

function isDeck(na,nb){ const dx=nb.x-na.x,dy=nb.y-na.y,len=Math.sqrt(dx*dx+dy*dy)||1; return Math.abs(dy/len)<0.55; }
function sat(v){ return Math.max(0,Math.min(1,v)); }

function moveVehicle(){
  if(!veh||veh.done)return;
  const lv=LEVELS[currentLevel];
  veh.x+=veh.speed; veh.vy+=G*0.55; veh.spin+=veh.speed*0.1;
  const xs=[veh.x+veh.w*0.15,veh.x+veh.w*0.5,veh.x+veh.w*0.85];
  let surfY=null;
  xs.forEach(wx=>{
    beams.forEach(b=>{
      if(b.broken)return; const na=nodes[b.a],nb=nodes[b.b]; if(!na||!nb||!isDeck(na,nb))return;
      const lo=Math.min(na.x,nb.x),hi=Math.max(na.x,nb.x); if(wx<lo||wx>hi)return;
      const t=sat((wx-na.x)/((nb.x-na.x)||0.001)); const sy=na.y+t*(nb.y-na.y);
      if(surfY===null||sy<surfY) surfY=sy;
    });
    lv.terrain.forEach(tr=>{
      const xs2=tr.pts.map(p=>p[0]*canvas.width),ys2=tr.pts.map(p=>p[1]*canvas.height);
      if(wx>=Math.min(...xs2)&&wx<=Math.max(...xs2)){ const topY=Math.min(...ys2); if(surfY===null||topY<surfY) surfY=topY; }
    });
  });
  if(surfY!==null){ const gap=surfY-(veh.y+veh.h); if(gap<=3&&gap>=-veh.h*1.2&&veh.vy>=0){veh.y=surfY-veh.h;veh.vy=0;} }
  veh.y+=veh.vy;
  if(veh.y>canvas.height+100&&!won){
    veh.done=true;
    const bc=beams.filter(b=>b.broken).length;
    showFail(bc>0?`${bc} beam${bc>1?'s':''} snapped! Add stronger supports.`:'Vehicle fell! Make sure the deck spans the full gap.');
    return;
  }
  if(veh.x+veh.w>=lv.goal.x*canvas.width) showWin();
}

// ═══════════════════════════════════════════════════════════════
//  WIN / FAIL
// ═══════════════════════════════════════════════════════════════
function showWin(){
  if(won||failed)return; won=true;
  BSAudio.stopBg(0.5); BSAudio.sfx('win');
  const sp  = spent();
  const lv  = LEVELS[currentLevel];
  const budgetDisplay = (gameMode==='classic'||lv.budget>90000) ? '∞' : '$'+lv.budget.toLocaleString();

  document.getElementById('winMsg').textContent =
    `Spent $${sp.toLocaleString()} of ${budgetDisplay}`;

  // ── Stars logic ──────────────────────────────────────────────
  const starRow   = document.getElementById('starRow');
  const bestBadge = document.getElementById('bestBadge');
  let earnedStars = 3; // Classic always gets 3

  if(gameMode === 'ranked'){
    earnedStars = calcStars(sp, lv.budget);
    const prog  = saveRankedWin(currentLevel, earnedStars, sp);

    // Best cost badge — show if this run beat a previous record
    const best = (prog.bestCost||[])[currentLevel] || sp;
    const prevBest = best < sp ? best : null; // old best was lower = truly a new worst
    // Actually: saveRankedWin already stored the min. Show best cost.
    if(prog.bestCost && prog.bestCost[currentLevel]){
      bestBadge.textContent = `🏅 Best cost: $${prog.bestCost[currentLevel].toLocaleString()}`;
      bestBadge.classList.add('show');
    }
  } else {
    if(bestBadge) bestBadge.classList.remove('show');
  }

  // Render stars with animated pop-in
  if(starRow){
    starRow.innerHTML = '';
    for(let i=1;i<=3;i++){
      const s = document.createElement('span');
      if(i <= earnedStars){
        s.textContent = '⭐';
        s.className   = 'star-earned';
        s.style.animationDelay = `${0.15*i}s`;
      } else {
        s.textContent = '⭐';
        s.className   = 'dim';
        s.style.opacity = '0.18';
      }
      starRow.appendChild(s);
    }
  }

  // ── V6: Save to leaderboard & replay ────────────────────────
  const playerName = localStorage.getItem('bridgePlayerName') || 'Anonymous';
  lbAddScore(playerName, currentLevel, earnedStars, sp, gameMode);
  rpSaveSnapshot(currentLevel, nodes, beams, canvas.width, canvas.height, sp, earnedStars, gameMode);

  // Show rank badge
  const rank = lbGetRank(currentLevel, earnedStars, sp);
  const rankBadge = document.getElementById('rankBadge');
  if(rankBadge){
    rankBadge.textContent = rank <= 3 ? `#${rank} on this level! 🎉` : `Rank #${rank} on this level`;
    rankBadge.classList.add('show');
  }

  document.getElementById('winModal').classList.remove('hidden');
}
function showFail(msg){
  if(won||failed)return; failed=true;
  BSAudio.stopBg(0.5); BSAudio.sfx('fail');
  document.getElementById('failMsg').textContent=msg;
  document.getElementById('failModal').classList.remove('hidden');
}

// ═══════════════════════════════════════════════════════════════
//  BUDGET
// ═══════════════════════════════════════════════════════════════
function spent(){ return Math.round(beams.reduce((s,b)=>s+b.restLen*MAT[b.mat].costPx,0)); }
function updateBudget(){
  const s=spent(), lv=LEVELS[currentLevel];
  const isClassic = (gameMode==='classic');
  const effectiveBudget = isClassic ? 99999 : lv.budget;
  document.getElementById('budgetSpent').textContent='$'+s.toLocaleString();
  // Never show over-budget in classic mode
  document.getElementById('budgetSpent').className='budget-spent'+(s>effectiveBudget&&!isClassic?' budget-over':'');
  document.getElementById('budgetLabel').textContent= isClassic ? 'Budget: ∞ (Classic)' : 'Budget: $'+(lv.budget>90000?'∞':lv.budget.toLocaleString());
}
function flashBudget(){
  BSAudio.sfx('budget');
  const el=document.getElementById('budgetSpent');
  el.textContent='OVER BUDGET!'; el.className='budget-spent budget-over';
  setTimeout(updateBudget,900);
}

// ═══════════════════════════════════════════════════════════════
//  UNDO / CLEAR / GRID
// ═══════════════════════════════════════════════════════════════
function undoLast(){
  if(mode!=='build'||!history.length)return;
  const last=history.pop();
  if(last.type==='beam'){beams=beams.filter(b=>b.id!==last.id);}
  else{beams=beams.filter(b=>b.naid!==last.id&&b.nbid!==last.id);nodes=nodes.filter(n=>n.id!==last.id);rebuildIdx();}
  BSAudio.sfx('delete'); selNode=null; updateBudget();
}
function clearAll(){
  if(mode!=='build')return;
  if(beams.length>0) BSAudio.sfx('delete');
  nodes=nodes.filter(n=>n.fixed); beams=[]; history=[]; selNode=null; rebuildIdx(); updateBudget();
}
function rebuildIdx(){
  const m={};nodes.forEach((n,i)=>m[n.id]=i);
  beams=beams.filter(b=>m[b.naid]!==undefined&&m[b.nbid]!==undefined);
  beams.forEach(b=>{b.a=m[b.naid];b.b=m[b.nbid];});
}
function toggleGrid(){ showGrid=!showGrid; document.getElementById('gridBtn').classList.toggle('active-icon',showGrid); }

// ═══════════════════════════════════════════════════════════════
//  V6 — REPLAY: load saved bridge snapshot for this level
// ═══════════════════════════════════════════════════════════════
function loadReplay(){
  if(mode!=='build'){ alert('Switch to BUILD mode first, then load replay.'); return; }
  const snap = rpLoadSnapshot(currentLevel, canvas.width, canvas.height);
  if(!snap){ alert('No saved replay for this level yet.\nComplete a run first!'); return; }
  if(beams.length > 0 && !confirm('Load saved replay? This will replace your current build.')) return;

  // Keep fixed anchor nodes, rebuild free nodes + beams from snapshot
  const fixedNodes = nodes.filter(n => n.fixed);
  const fixedSnap  = snap.nodes.filter(n => n.fixed);
  const allIdMap   = {};

  // Map snapshot fixed ids → our live fixed nodes
  fixedSnap.forEach((sn, i) => { if(fixedNodes[i]) allIdMap[sn.id] = fixedNodes[i]; });

  // Add free nodes
  nodes = [...fixedNodes];
  nid   = fixedNodes.length;
  snap.nodes.filter(n => !n.fixed).forEach(sn => {
    const nn = { id:nid++, x:sn.x, y:sn.y, px:sn.x, py:sn.y, bx:sn.x, by:sn.y, fixed:false };
    nodes.push(nn);
    allIdMap[sn.id] = nn;
  });

  // Rebuild beams
  beams = [];
  snap.beams.forEach(sb => {
    const na = allIdMap[sb.naid], nb = allIdMap[sb.nbid];
    if(!na || !nb) return;
    beams.push({ id:nid++, a:nodes.indexOf(na), b:nodes.indexOf(nb),
      naid:na.id, nbid:nb.id, restLen:sb.restLen,
      mat:sb.mat, stress:0, broken:false, fatigue:0 });
  });

  history=[]; selNode=null;
  updateBudget();
  BSAudio.sfx('place');
  const meta = rpGetMeta(currentLevel);
  if(meta) alert(`Replay loaded! ${'⭐'.repeat(meta.stars)}\nCost: $${meta.cost.toLocaleString()}  ·  ${meta.date}`);
}

// ═══════════════════════════════════════════════════════════════
//  INPUT
// ═══════════════════════════════════════════════════════════════
let musicStarted = false;
function tryStartMusic(){
  if(musicStarted)return; musicStarted=true;
  BSAudio.unlock();
  if(BSAudio.cfg.soundOn) BSAudio.playBg('game');
}

canvas.addEventListener('mousemove',e=>{
  const r=canvas.getBoundingClientRect(); mouseX=e.clientX-r.left; mouseY=e.clientY-r.top;
  if(mode!=='build')return;
  hovNode=null; let md=SNAP;
  nodes.forEach(n=>{const d=Math.hypot(n.x-mouseX,n.y-mouseY);if(d<md){md=d;hovNode=n;}});
  hovBeam=null;
  if(!hovNode) beams.forEach(b=>{const na=nodes[b.a],nb=nodes[b.b];if(na&&nb&&segDist(mouseX,mouseY,na.x,na.y,nb.x,nb.y)<9)hovBeam=b;});
});

canvas.addEventListener('click',e=>{
  if(mode!=='build')return;
  tryStartMusic();
  const r=canvas.getBoundingClientRect(); const cx=e.clientX-r.left,cy=e.clientY-r.top;
  let snap=null,sd=SNAP; nodes.forEach(n=>{const d=Math.hypot(n.x-cx,n.y-cy);if(d<sd){sd=d;snap=n;}});
  if(!selNode){
    if(snap){selNode=snap;advTut(1);}
    else if(!inTerrain(cx,cy)){const n=mkNode(cx,cy,false);nodes.push(n);history.push({type:'node',id:n.id});BSAudio.sfx('node');selNode=n;advTut(1);}
  } else {
    let target=snap;
    if(!target&&!inTerrain(cx,cy)){const n=mkNode(cx,cy,false);nodes.push(n);history.push({type:'node',id:n.id});BSAudio.sfx('node');target=n;}
    if(target&&target.id!==selNode.id){
      const dup=beams.some(b=>(b.naid===selNode.id&&b.nbid===target.id)||(b.naid===target.id&&b.nbid===selNode.id));
      if(!dup){
        const dx=target.x-selNode.x,dy=target.y-selNode.y,len=Math.sqrt(dx*dx+dy*dy);
        if(len>4){
          const cost=Math.round(len*MAT[currentMat].costPx),lv=LEVELS[currentLevel];
          if(gameMode==='ranked'&&spent()+cost>lv.budget&&lv.budget<90000){flashBudget();selNode=null;return;}
          const ai=nodes.indexOf(selNode),bi=nodes.indexOf(target),bid=nid++;
          beams.push({id:bid,a:ai,b:bi,naid:selNode.id,nbid:target.id,restLen:len,mat:currentMat,stress:0,broken:false,fatigue:0});
          history.push({type:'beam',id:bid});
          BSAudio.sfx('place'); updateBudget(); advTut(2);
          if(beams.length>=3) advTut(3);
          if(beams.length>=5) advTut(4);
        }
      }
      selNode=target;
    } else if(!target){selNode=null;}
  }
});

canvas.addEventListener('contextmenu',e=>{
  e.preventDefault(); if(mode!=='build')return;
  const r=canvas.getBoundingClientRect(); const cx=e.clientX-r.left,cy=e.clientY-r.top;
  selNode=null; let hit=null,hd=SNAP;
  nodes.forEach(n=>{const d=Math.hypot(n.x-cx,n.y-cy);if(d<hd){hd=d;hit=n;}});
  if(hit&&!hit.fixed){
    beams=beams.filter(b=>b.naid!==hit.id&&b.nbid!==hit.id); nodes=nodes.filter(n=>n.id!==hit.id);
    history=history.filter(h=>h.id!==hit.id); BSAudio.sfx('delete'); rebuildIdx(); updateBudget(); return;
  }
  const bi=beams.findIndex(b=>{const na=nodes[b.a],nb=nodes[b.b];return na&&nb&&segDist(cx,cy,na.x,na.y,nb.x,nb.y)<10;});
  if(bi!==-1){history=history.filter(h=>h.id!==beams[bi].id);beams.splice(bi,1);BSAudio.sfx('delete');updateBudget();}
});

window.addEventListener('keydown',e=>{
  if(e.key==='Escape') selNode=null;
  if((e.key==='z'||e.key==='Z')&&(e.ctrlKey||e.metaKey)) undoLast();
});

// ── Toolbar buttons also start music
document.getElementById('btnBuild').addEventListener('click', tryStartMusic);
document.getElementById('btnTest').addEventListener('click', tryStartMusic);

// ═══════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════
function segDist(px,py,ax,ay,bx,by){
  const dx=bx-ax,dy=by-ay,l=dx*dx+dy*dy; if(l<0.001)return Math.hypot(px-ax,py-ay);
  const t=sat(((px-ax)*dx+(py-ay)*dy)/l); return Math.hypot(px-(ax+t*dx),py-(ay+t*dy));
}
function inTerrain(x,y){
  return LEVELS[currentLevel].terrain.some(tr=>{
    const pts=tr.pts.map(p=>[p[0]*canvas.width,p[1]*canvas.height]); let inside=false;
    for(let i=0,j=pts.length-1;i<pts.length;j=i++){
      const[xi,yi]=pts[i],[xj,yj]=pts[j];
      if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi) inside=!inside;
    }
    return inside;
  });
}

// ═══════════════════════════════════════════════════════════════
//  DRAW
// ═══════════════════════════════════════════════════════════════
// ── Level-specific backgrounds ────────────────────────────────
function drawLevelBg(lvIdx, W, H, t){
  const lv = LEVELS[lvIdx];

  // helpers
  const grad = (x0,y0,x1,y1,stops) => {
    const g=ctx.createLinearGradient(x0,y0,x1,y1);
    stops.forEach(([p,c])=>g.addColorStop(p,c)); return g;
  };
  const circle = (x,y,r,fill)=>{ ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=fill;ctx.fill(); };
  const cloud = (cx,cy,scale=1)=>{
    ctx.save();ctx.translate(cx,cy);ctx.scale(scale,scale);
    ctx.fillStyle='rgba(255,255,255,0.82)';
    [[0,0,28],[25,-10,22],[50,0,26],[75,-6,20],[100,0,24]].forEach(([x,y,r])=>circle(x,y,r,'rgba(255,255,255,0.82)'));
    ctx.restore();
  };
  const mountain = (px,py,pw,ph,col1,col2,snow=false)=>{
    ctx.save();
    const g=ctx.createLinearGradient(px,py-ph,px,py);
    g.addColorStop(0,col1);g.addColorStop(1,col2);
    ctx.fillStyle=g;
    ctx.beginPath();ctx.moveTo(px-pw/2,py);ctx.lineTo(px,py-ph);ctx.lineTo(px+pw/2,py);ctx.closePath();ctx.fill();
    if(snow){
      ctx.fillStyle='rgba(255,255,255,0.75)';
      ctx.beginPath();ctx.moveTo(px-pw*0.15,py-ph*0.72);ctx.lineTo(px,py-ph);ctx.lineTo(px+pw*0.15,py-ph*0.72);ctx.closePath();ctx.fill();
    }
    ctx.restore();
  };
  const tree = (x,y,h,col='#2a6820')=>{
    ctx.fillStyle='#5a3010';ctx.fillRect(x-3,y-h*0.3,6,h*0.3);
    ctx.fillStyle=col;
    ctx.beginPath();ctx.moveTo(x-h*0.38,y-h*0.3);ctx.lineTo(x,y-h);ctx.lineTo(x+h*0.38,y-h*0.3);ctx.closePath();ctx.fill();
    ctx.beginPath();ctx.moveTo(x-h*0.28,y-h*0.55);ctx.lineTo(x,y-h*1.15);ctx.lineTo(x+h*0.28,y-h*0.55);ctx.closePath();ctx.fill();
  };
  const star = (x,y,r,alpha=1)=>{ ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=`rgba(255,255,220,${alpha})`;ctx.fill(); };

  switch(lvIdx){

    // ── LVL 1 · Tutorial · Sunny spring meadow ──────────────────
    case 0:{
      ctx.fillStyle=grad(0,0,0,H,[
        [0,'#87ceeb'],[0.5,'#b8e4f8'],[1,'#d4eef8']]);ctx.fillRect(0,0,W,H);
      // Sun
      const sunX=W*0.82,sunY=H*0.12;
      ctx.save();ctx.shadowColor='rgba(255,220,60,0.5)';ctx.shadowBlur=40;
      circle(sunX,sunY,45,'#ffe060');ctx.restore();
      circle(sunX,sunY,38,'#ffd020');
      // Sun rays
      ctx.strokeStyle='rgba(255,220,80,0.35)';ctx.lineWidth=3;
      for(let i=0;i<12;i++){const a=i/12*Math.PI*2+t*0.2;ctx.beginPath();ctx.moveTo(sunX+Math.cos(a)*50,sunY+Math.sin(a)*50);ctx.lineTo(sunX+Math.cos(a)*70,sunY+Math.sin(a)*70);ctx.stroke();}
      // Puffy clouds
      cloud(W*0.05,H*0.18,1.2); cloud(W*0.35,H*0.12,0.9); cloud(W*0.6,H*0.20,1.1);
      // Rolling green hills in bg
      ctx.fillStyle='rgba(100,180,70,0.22)';
      ctx.beginPath();ctx.moveTo(0,H*0.72);
      for(let x=0;x<=W;x+=20) ctx.lineTo(x,H*0.72-Math.sin(x/W*Math.PI*2+0.5)*H*0.06);
      ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();
      // Birds
      [[0.2,0.25],[0.25,0.22],[0.55,0.18],[0.59,0.20]].forEach(([bx,by])=>{
        ctx.strokeStyle='rgba(60,60,80,0.5)';ctx.lineWidth=1.5;ctx.beginPath();
        const xx=bx*W+Math.sin(t+bx*10)*6,yy=by*H;
        ctx.moveTo(xx-6,yy);ctx.quadraticCurveTo(xx-3,yy-4,xx,yy);ctx.quadraticCurveTo(xx+3,yy-4,xx+6,yy);ctx.stroke();
      });
      break;
    }

    // ── LVL 2 · River Crossing · Tropical jungle ────────────────
    case 1:{
      ctx.fillStyle=grad(0,0,0,H,[
        [0,'#2a8a4a'],[0.4,'#4aaa68'],[0.7,'#60c88a'],[1,'#48b878']]);ctx.fillRect(0,0,W,H);
      // Sky through canopy
      ctx.fillStyle=grad(0,0,0,H*0.5,[[0,'rgba(60,190,120,0)'],[1,'rgba(90,210,140,0.18)']]);ctx.fillRect(0,0,W,H*0.5);
      // Distant jungle haze
      [0.08,0.22,0.42,0.58,0.72,0.88].forEach((x,i)=>{
        const h2=H*(0.25+i%2*0.08),w2=H*0.22;
        ctx.fillStyle=`rgba(30,100,50,${0.25+i%3*0.07})`;
        ctx.beginPath();ctx.ellipse(x*W,H*0.62-h2*0.5,w2*0.5,h2*0.7,0,0,Math.PI*2);ctx.fill();
      });
      // Hanging vines
      [0.1,0.3,0.52,0.7,0.9].forEach((x,i)=>{
        ctx.strokeStyle=`rgba(40,120,40,0.45)`;ctx.lineWidth=2+i%2;
        ctx.beginPath();ctx.moveTo(x*W,0);
        const len=H*(0.25+i%3*0.1);
        ctx.bezierCurveTo(x*W+20,len*0.3,x*W-15,len*0.6,x*W+10,len);ctx.stroke();
        // Leaf at bottom
        ctx.fillStyle='rgba(50,160,50,0.6)';
        ctx.beginPath();ctx.ellipse(x*W+10,len,12,6,-0.4,0,Math.PI*2);ctx.fill();
      });
      // Sunlight shafts
      ctx.save();ctx.globalAlpha=0.07;
      [0.15,0.45,0.75].forEach(x=>{
        ctx.fillStyle='#d0f8c0';
        ctx.beginPath();ctx.moveTo(x*W-30,0);ctx.lineTo(x*W+30,0);ctx.lineTo(x*W+80,H*0.7);ctx.lineTo(x*W-80,H*0.7);ctx.closePath();ctx.fill();
      });
      ctx.restore();
      // Lily pads on water (drawn after water)
      break;
    }

    // ── LVL 3 · Double Span · Rocky mountain pass ───────────────
    case 2:{
      ctx.fillStyle=grad(0,0,0,H,[
        [0,'#4a4060'],[0.35,'#7a6880'],[0.65,'#aaa0b8'],[1,'#c8c0d0']]);ctx.fillRect(0,0,W,H);
      // Far mountains (light purple)
      [[0.12,0.72,0.28,0.45],[0.35,0.68,0.22,0.38],[0.65,0.70,0.25,0.42],[0.88,0.65,0.20,0.35]].forEach(([x,y,w,h2])=>{
        mountain(x*W,y*H,w*W,h2*H,'#9880b0','#c0b0cc',true);
      });
      // Mid mountains (darker)
      [[0.05,0.75,0.22,0.38],[0.28,0.78,0.28,0.45],[0.55,0.76,0.26,0.42],[0.80,0.74,0.30,0.48]].forEach(([x,y,w,h2])=>{
        mountain(x*W,y*H,w*W,h2*H,'#605870','#908898',true);
      });
      // Mist layer
      const mist=ctx.createLinearGradient(0,H*0.5,0,H*0.72);
      mist.addColorStop(0,'rgba(200,195,210,0)');mist.addColorStop(1,'rgba(200,195,210,0.38)');
      ctx.fillStyle=mist;ctx.fillRect(0,H*0.5,W,H*0.22);
      // Moving clouds low
      [0.1,0.42,0.70].forEach((x,i)=>{cloud((x*W+t*8*(i+1))%W-50,H*0.45,0.7+(i%2)*0.2);});
      break;
    }

    // ── LVL 4 · Deep Chasm · Arctic tundra + aurora ─────────────
    case 3:{
      ctx.fillStyle=grad(0,0,0,H,[
        [0,'#0a1a2a'],[0.4,'#0f2a3a'],[0.7,'#1a3a4a'],[1,'#2a4a5a']]);ctx.fillRect(0,0,W,H);
      // Stars
      const seed=[0.12,0.34,0.56,0.78,0.23,0.45,0.67,0.89,0.11,0.33,0.55,0.77,0.22,0.44,0.66,0.88,0.15,0.37];
      seed.forEach((v,i)=>{
        const x=(v*W*1.7)%W,y=(seed[(i+3)%18]*H*0.6)%H*0.55;
        const flicker=0.4+0.6*Math.abs(Math.sin(t*1.5+i*1.2));
        star(x,y,1+i%2*0.8,flicker);
      });
      // Aurora borealis — wavy curtains
      const auroraColors=['rgba(40,200,120,','rgba(60,160,220,','rgba(140,80,220,'];
      auroraColors.forEach((col,ai)=>{
        ctx.save();ctx.globalAlpha=0.18+Math.sin(t*0.5+ai)*0.06;
        ctx.beginPath();ctx.moveTo(0,H*0.12);
        for(let x=0;x<=W;x+=20){
          const y=H*(0.10+ai*0.06)+Math.sin(x/W*Math.PI*3+t*0.6+ai*1.2)*H*0.08;
          ctx.lineTo(x,y);
        }
        ctx.lineTo(W,0);ctx.lineTo(0,0);ctx.closePath();
        ctx.fillStyle=col+'0.7)';ctx.fill();ctx.restore();
      });
      // Snow-covered distant hills
      [[0.1,0.68,0.30,0.30],[0.4,0.66,0.28,0.35],[0.75,0.70,0.32,0.28]].forEach(([x,y,w,h2])=>{
        mountain(x*W,y*H,w*W,h2*H,'#1a3050','#2a4060',true);
      });
      // Snowflakes
      [0.08,0.22,0.38,0.52,0.66,0.80,0.94].forEach((x,i)=>{
        const sy=(((t*18*(i+1)*0.6)%H*0.65));
        circle(x*W+Math.sin(t+i)*10,sy,2,'rgba(220,240,255,0.6)');
      });
      break;
    }

    // ── LVL 5 · Asymmetric · Desert sunset ──────────────────────
    case 4:{
      ctx.fillStyle=grad(0,0,0,H,[
        [0,'#1a0a38'],[0.25,'#8a2040'],[0.5,'#d85020'],[0.75,'#f08820'],[1,'#f8c040']]);ctx.fillRect(0,0,W,H);
      // Setting sun large and low
      const sunX=W*0.68,sunY=H*0.78;
      ctx.save();ctx.shadowColor='rgba(255,160,40,0.7)';ctx.shadowBlur=60;
      circle(sunX,sunY,70,'rgba(255,200,60,0.25)');
      circle(sunX,sunY,55,'rgba(255,180,40,0.45)');
      circle(sunX,sunY,38,'#ffb020');ctx.restore();
      // Sun glow streaks on water
      const sunGlow=ctx.createRadialGradient(sunX,sunY,20,sunX,sunY,W*0.5);
      sunGlow.addColorStop(0,'rgba(255,160,40,0.22)');sunGlow.addColorStop(1,'rgba(255,100,20,0)');
      ctx.fillStyle=sunGlow;ctx.fillRect(0,0,W,H);
      // Sand dune silhouettes
      ctx.fillStyle='rgba(80,35,10,0.7)';
      ctx.beginPath();ctx.moveTo(0,H*0.78);
      ctx.bezierCurveTo(W*0.15,H*0.58,W*0.25,H*0.62,W*0.38,H*0.78);
      ctx.lineTo(W*0.38,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();
      ctx.fillStyle='rgba(60,25,8,0.65)';
      ctx.beginPath();ctx.moveTo(W*0.55,H);
      ctx.bezierCurveTo(W*0.65,H*0.65,W*0.78,H*0.60,W,H*0.75);
      ctx.lineTo(W,H);ctx.closePath();ctx.fill();
      // Cactus
      [[0.28,0.78],[0.32,0.80],[0.72,0.75]].forEach(([x,y])=>{
        const cx2=x*W,cy=y*H,ch=H*0.14;
        ctx.fillStyle='#1a4a18';
        ctx.fillRect(cx2-5,cy-ch,10,ch);
        ctx.fillRect(cx2-20,cy-ch*0.55,15,6);ctx.fillRect(cx2-20,cy-ch*0.55-12,6,14);
        ctx.fillRect(cx2+5,cy-ch*0.35,15,6);ctx.fillRect(cx2+14,cy-ch*0.35-10,6,12);
      });
      // Star strip at top
      [0.05,0.18,0.32,0.48,0.62,0.75,0.90].forEach((x,i)=>star(x*W,H*(0.05+i%3*0.04),1.2,0.7));
      break;
    }

    // ── LVL 6 · Tight Budget · Foggy misty morning ──────────────
    case 5:{
      ctx.fillStyle=grad(0,0,0,H,[
        [0,'#c8d8e8'],[0.4,'#d8e4ee'],[0.7,'#e0eaf2'],[1,'#eef2f6']]);ctx.fillRect(0,0,W,H);
      // Faint sun through fog
      ctx.save();ctx.globalAlpha=0.35;
      const sg=ctx.createRadialGradient(W*0.4,H*0.22,0,W*0.4,H*0.22,160);
      sg.addColorStop(0,'rgba(255,240,200,0.9)');sg.addColorStop(0.4,'rgba(255,220,160,0.35)');sg.addColorStop(1,'rgba(255,200,120,0)');
      ctx.fillStyle=sg;ctx.fillRect(0,0,W,H);ctx.restore();
      // Ghostly tree silhouettes
      [[0.05,0.74],[0.10,0.71],[0.18,0.76],[0.82,0.72],[0.88,0.70],[0.93,0.75],[0.97,0.73]].forEach(([x,y],i)=>{
        ctx.save();ctx.globalAlpha=0.18+i%3*0.06;
        tree(x*W,y*H,H*(0.18+i%2*0.06),'#606870');
        ctx.restore();
      });
      // Multiple fog layers moving
      [0.75,0.68,0.60].forEach((yFrac,li)=>{
        const fg=ctx.createLinearGradient(0,yFrac*H-30,0,yFrac*H+60);
        fg.addColorStop(0,'rgba(235,242,248,0)');fg.addColorStop(0.5,`rgba(235,242,248,${0.55-li*0.1})`);fg.addColorStop(1,'rgba(235,242,248,0)');
        ctx.fillStyle=fg;
        ctx.beginPath();
        ctx.moveTo(0,yFrac*H);
        for(let x=0;x<=W;x+=30){ctx.lineTo(x,yFrac*H+Math.sin(x/W*Math.PI*4+t*0.4+li)*10);}
        ctx.lineTo(W,yFrac*H+60);ctx.lineTo(0,yFrac*H+60);ctx.closePath();ctx.fill();
      });
      // Drizzle dots
      ctx.fillStyle='rgba(160,185,210,0.35)';
      [0.12,0.28,0.44,0.60,0.76,0.92].forEach((x,i)=>{
        const dy=((t*40+i*60)%H*0.8);
        ctx.fillRect(x*W+Math.sin(t+i)*8,dy,1.5,8);
      });
      break;
    }

    // ── LVL 7 · Mid-River Rock · Volcanic lava glow ─────────────
    case 6:{
      ctx.fillStyle=grad(0,0,0,H,[
        [0,'#0a0808'],[0.3,'#200808'],[0.55,'#3a1008'],[0.8,'#500a00'],[1,'#701000']]);ctx.fillRect(0,0,W,H);
      // Glowing lava horizon
      const lavaGlow=ctx.createLinearGradient(0,H*0.55,0,H*0.85);
      lavaGlow.addColorStop(0,'rgba(255,80,0,0)');lavaGlow.addColorStop(0.5,'rgba(255,60,0,0.35)');lavaGlow.addColorStop(1,'rgba(200,40,0,0)');
      ctx.fillStyle=lavaGlow;ctx.fillRect(0,H*0.55,W,H*0.3);
      // Volcano silhouette far background
      ctx.fillStyle='#0a0404';
      ctx.beginPath();ctx.moveTo(W*0.3,H*0.78);ctx.lineTo(W*0.5,H*0.28);ctx.lineTo(W*0.7,H*0.78);ctx.closePath();ctx.fill();
      // Lava glow from volcano top
      const vg=ctx.createRadialGradient(W*0.5,H*0.28,0,W*0.5,H*0.28,120);
      vg.addColorStop(0,'rgba(255,120,20,0.6)');vg.addColorStop(0.4,'rgba(255,60,0,0.2)');vg.addColorStop(1,'rgba(200,40,0,0)');
      ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
      // Smoke puffs rising
      [0,1,2,3].forEach(i=>{
        const sx=W*0.5+i*12-18,sy=H*0.28-(((t*20+i*30)%H*0.35));
        const sz=12+i*4;
        ctx.save();ctx.globalAlpha=0.18-sy/H*0.15;ctx.fillStyle='#402020';
        ctx.beginPath();ctx.ellipse(sx,sy,sz,sz*0.6,0,0,Math.PI*2);ctx.fill();ctx.restore();
      });
      // Rock silhouettes with lava glow edges
      [[0.05,0.80,0.20,0.32],[0.82,0.78,0.22,0.28]].forEach(([x,y,w,h2])=>{
        mountain(x*W,y*H,w*W,h2*H,'#100505','#1a0808');
        // glow outline
        ctx.save();ctx.strokeStyle='rgba(255,80,20,0.4)';ctx.lineWidth=2;
        ctx.beginPath();ctx.moveTo((x-w/2)*W,y*H);ctx.lineTo(x*W,(y-h2)*H);ctx.lineTo((x+w/2)*W,y*H);ctx.stroke();ctx.restore();
      });
      // Floating embers
      [0.1,0.25,0.4,0.55,0.7,0.85,0.95].forEach((x,i)=>{
        const ey=H*0.85-((t*22+i*40)%H*0.7);
        const er=1.5+i%3*1;
        ctx.save();ctx.globalAlpha=0.8;ctx.shadowColor='#ff6000';ctx.shadowBlur=8;
        circle(x*W+Math.sin(t+i)*14,ey,er,'#ff8020');ctx.restore();
      });
      break;
    }

    // ── LVL 8 · Triple Chasm · Ancient desert ruins ─────────────
    case 7:{
      ctx.fillStyle=grad(0,0,0,H,[
        [0,'#c8a860'],[0.35,'#d4b870'],[0.6,'#c8a858'],[1,'#b09040']]);ctx.fillRect(0,0,W,H);
      // Hot sun high
      ctx.save();ctx.shadowColor='rgba(255,200,100,0.5)';ctx.shadowBlur=30;
      circle(W*0.15,H*0.10,32,'#ffe080');ctx.restore();
      // Ancient columns in bg
      [[0.08,0.72],[0.14,0.68],[0.20,0.70],[0.72,0.70],[0.78,0.65],[0.84,0.71]].forEach(([x,y],i)=>{
        const ch=H*(0.22+i%2*0.08),cw=14,cx2=x*W,cy=y*H;
        const cg=ctx.createLinearGradient(cx2-cw/2,0,cx2+cw/2,0);
        cg.addColorStop(0,'#c09050');cg.addColorStop(0.5,'#e0b870');cg.addColorStop(1,'#b08040');
        ctx.fillStyle=cg;ctx.fillRect(cx2-cw/2,cy-ch,cw,ch);
        // Capital
        ctx.fillStyle='#c8a860';ctx.fillRect(cx2-cw*0.8,cy-ch-6,cw*1.6,8);
        // Broken top
        if(i%3===1){ctx.fillStyle='#1a0a00';ctx.fillRect(cx2-4,cy-ch+8,8,ch*0.3);}
      });
      // Sand drifts
      ctx.fillStyle='rgba(200,170,100,0.22)';
      for(let x=0;x<=W;x+=60){
        const dy=Math.sin(x/W*Math.PI*5)*H*0.02;
        ctx.beginPath();ctx.ellipse(x,H*0.76+dy,40,8,0,0,Math.PI*2);ctx.fill();
      }
      // Heat haze shimmer
      ctx.save();ctx.globalAlpha=0.08+Math.sin(t*2)*0.03;
      ctx.fillStyle=grad(0,H*0.5,0,H*0.75,[[0,'rgba(255,210,140,0)'],[0.5,'rgba(255,200,120,1)'],[1,'rgba(255,210,140,0)']]);
      ctx.fillRect(0,H*0.5,W,H*0.25);ctx.restore();
      // Hieroglyph-style marks on terrain (tiny)
      ctx.fillStyle='rgba(90,60,20,0.4)';ctx.font='bold 11px serif';
      ['𓀀','𓂀','𓃒','𓆣','𓇯'].forEach((g2,i)=>{ctx.fillText(g2,W*(0.05+i*0.08),H*0.73);});
      break;
    }

    // ── LVL 9 · Steep Canyon · Moonlit night ────────────────────
    case 8:{
      ctx.fillStyle=grad(0,0,0,H,[
        [0,'#060812'],[0.4,'#0a0e20'],[0.7,'#0e1428'],[1,'#121820']]);ctx.fillRect(0,0,W,H);
      // Stars — lots
      const st2=[0.05,0.12,0.19,0.28,0.36,0.44,0.52,0.60,0.68,0.76,0.84,0.91,0.97,
                 0.08,0.17,0.25,0.33,0.41,0.49,0.57,0.65,0.73,0.81,0.89,0.96];
      st2.forEach((x,i)=>{
        const y=(i<13?0.08:0.22)+(i%5)*0.05;
        const flicker=0.5+0.5*Math.abs(Math.sin(t*1.8+i*0.9));
        star(x*W,y*H,i%4===0?1.8:i%3===0?1.3:0.8,flicker);
      });
      // Moon
      const mx=W*0.80,my=H*0.14;
      ctx.save();ctx.shadowColor='rgba(200,220,255,0.5)';ctx.shadowBlur=40;
      circle(mx,my,38,'rgba(200,220,255,0.15)');ctx.restore();
      circle(mx,my,28,'#d0ddf0');
      // Moon craters
      ctx.fillStyle='rgba(150,165,190,0.4)';
      // moon craters drawn below
      circle(mx+6,my+4,5,'rgba(150,165,190,0.4)');
      circle(mx-8,my-6,4,'rgba(150,165,190,0.4)');
      // Moonlight column on water
      const ml=ctx.createLinearGradient(mx-30,0,mx+30,0);
      ml.addColorStop(0,'rgba(180,200,240,0)');ml.addColorStop(0.5,'rgba(180,200,240,0.12)');ml.addColorStop(1,'rgba(180,200,240,0)');
      ctx.fillStyle=ml;ctx.fillRect(mx-80,0,160,H);
      // Canyon walls silhouette
      ctx.fillStyle='#080c18';
      ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,H*0.65);
      ctx.lineTo(W*0.12,H*0.60);ctx.lineTo(W*0.08,H*0.72);ctx.lineTo(W*0.16,H*0.58);ctx.lineTo(W*0.22,H*0.70);
      ctx.lineTo(W*0.22,0);ctx.closePath();ctx.fill();
      ctx.beginPath();ctx.moveTo(W,0);ctx.lineTo(W,H*0.62);
      ctx.lineTo(W*0.88,H*0.58);ctx.lineTo(W*0.92,H*0.70);ctx.lineTo(W*0.82,H*0.60);ctx.lineTo(W*0.78,H*0.68);
      ctx.lineTo(W*0.78,0);ctx.closePath();ctx.fill();
      // Fireflies
      [0.3,0.45,0.55,0.62,0.50].forEach((x,i)=>{
        const fx=x*W+Math.sin(t*0.8+i*2)*20;
        const fy=H*(0.5+i%2*0.1)+Math.cos(t*0.6+i)*15;
        const ff=0.4+0.6*Math.abs(Math.sin(t*2+i*1.5));
        ctx.save();ctx.shadowColor='rgba(180,255,120,0.8)';ctx.shadowBlur=12;
        circle(fx,fy,2.5,`rgba(160,255,80,${ff})`);ctx.restore();
      });
      break;
    }

    // ── LVL 10 · Grand Finale · Epic storm ──────────────────────
    case 9:{
      ctx.fillStyle=grad(0,0,0,H,[
        [0,'#0a0a14'],[0.3,'#141428'],[0.55,'#1e1e38'],[0.8,'#181828'],[1,'#101020']]);ctx.fillRect(0,0,W,H);
      // Rolling dark storm clouds
      const cloudOffsets=[0,W*0.3,W*0.6,W*0.9,W*1.2];
      cloudOffsets.forEach((ox,ci)=>{
        const cx3=((ox+t*15)%(W*1.5))-W*0.15;
        ctx.save();ctx.globalAlpha=0.7+ci%2*0.15;
        // Giant dark cloud mass
        const cg2=ctx.createRadialGradient(cx3,H*0.18,20,cx3,H*0.22,150);
        cg2.addColorStop(0,'rgba(30,30,50,0.9)');cg2.addColorStop(0.6,'rgba(20,20,38,0.7)');cg2.addColorStop(1,'rgba(10,10,20,0)');
        ctx.fillStyle=cg2;ctx.fillRect(cx3-160,0,320,H*0.45);ctx.restore();
      });
      // Lightning bolts (animated, occasional)
      const lt=Math.floor(t*2)%8;
      if(lt===0||lt===5){
        const lx=W*(0.3+Math.sin(t*5)*0.2);
        ctx.save();ctx.strokeStyle=`rgba(200,220,255,${0.8+Math.sin(t*20)*0.2})`;ctx.lineWidth=2;
        ctx.shadowColor='rgba(180,200,255,0.9)';ctx.shadowBlur=20;
        ctx.beginPath();ctx.moveTo(lx,0);ctx.lineTo(lx+20,H*0.15);ctx.lineTo(lx-10,H*0.25);ctx.lineTo(lx+15,H*0.40);ctx.stroke();
        // Flash the sky
        ctx.globalAlpha=0.08;ctx.fillStyle='rgba(200,220,255,1)';ctx.fillRect(0,0,W,H);
        ctx.restore();
      }
      if(lt===3){
        const lx2=W*0.72;
        ctx.save();ctx.strokeStyle='rgba(200,220,255,0.7)';ctx.lineWidth=1.5;ctx.shadowColor='rgba(180,200,255,0.9)';ctx.shadowBlur=15;
        ctx.beginPath();ctx.moveTo(lx2,0);ctx.lineTo(lx2-15,H*0.18);ctx.lineTo(lx2+8,H*0.32);ctx.stroke();ctx.restore();
      }
      // Rain streaks
      ctx.strokeStyle='rgba(140,160,200,0.25)';ctx.lineWidth=1;
      for(let i=0;i<35;i++){
        const rx=((i*97+t*180)%W);
        const ry=((i*61+t*220)%H);
        ctx.beginPath();ctx.moveTo(rx,ry);ctx.lineTo(rx-4,ry+14);ctx.stroke();
      }
      // Dramatic distant mountains
      [[0.1,0.75,0.30,0.40],[0.4,0.72,0.28,0.45],[0.72,0.76,0.32,0.38]].forEach(([x,y,w,h2])=>{
        mountain(x*W,y*H,w*W,h2*H,'#0c0c1c','#141428');
      });
      // Atmospheric glow (purple/blue)
      const agl=ctx.createRadialGradient(W*0.5,H*0.4,0,W*0.5,H*0.4,W*0.6);
      agl.addColorStop(0,'rgba(60,40,120,0.10)');agl.addColorStop(1,'rgba(20,10,50,0)');
      ctx.fillStyle=agl;ctx.fillRect(0,0,W,H);
      break;
    }
  }
}

// ── Water drawing (shared) ────────────────────────────────────
function drawWater(lv, W, H, t){
  const wy=lv.waterY*H;
  const wg=ctx.createLinearGradient(0,wy,0,H);
  // Each level has a slightly different water vibe
  const darkW = currentLevel===9?'#050510':currentLevel===8?'#050818':currentLevel===6?'#200000':'#082838';
  wg.addColorStop(0,lv.waterC);wg.addColorStop(0.4,'#186070');wg.addColorStop(1,darkW);
  ctx.fillStyle=wg;ctx.fillRect(0,wy,W,H-wy);

  // Ripples
  const rippleAlpha = currentLevel===9?0.18:currentLevel===8?0.08:0.10;
  ctx.strokeStyle=`rgba(255,255,255,${rippleAlpha})`;ctx.lineWidth=1;
  for(let i=0;i<5;i++){
    ctx.beginPath();ctx.moveTo(0,wy+10+i*14+Math.sin(t+i)*3);ctx.lineTo(W,wy+10+i*14+Math.sin(t+i+1)*3);ctx.stroke();
  }

  // Level-specific water extras
  if(currentLevel===1){
    // Lily pads
    [[0.35,0.88],[0.50,0.92],[0.65,0.86]].forEach(([x,y])=>{
      const lx=x*W,ly=y*H;
      ctx.fillStyle='#2a7a28';ctx.beginPath();ctx.ellipse(lx,ly,16,10,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='rgba(255,100,120,0.7)';ctx.beginPath();ctx.arc(lx,ly-4,4,0,Math.PI*2);ctx.fill();
    });
  }
  if(currentLevel===6){
    // Lava river glow
    const lg=ctx.createLinearGradient(0,wy,0,wy+40);
    lg.addColorStop(0,'rgba(255,80,0,0.5)');lg.addColorStop(1,'rgba(200,40,0,0)');
    ctx.fillStyle=lg;ctx.fillRect(0,wy,W,40);
    // Lava bubbles
    [0.25,0.5,0.75].forEach((x,i)=>{
      const bx=x*W+Math.sin(t+i)*20;
      const by=wy+8+Math.abs(Math.sin(t*2+i))*12;
      ctx.save();ctx.shadowColor='#ff4000';ctx.shadowBlur=12;
      circle(bx,by,4+i%3*2,'#ff6000');ctx.restore();
    });
  }
  if(currentLevel===8){
    // Moonlight reflection on water
    const mr=ctx.createLinearGradient(W*0.7,wy,W*0.9,wy);
    mr.addColorStop(0,'rgba(180,200,240,0)');mr.addColorStop(0.5,'rgba(180,200,240,0.15)');mr.addColorStop(1,'rgba(180,200,240,0)');
    ctx.fillStyle=mr;ctx.fillRect(W*0.65,wy,W*0.3,H-wy);
  }
}

function draw(){
  const W=canvas.width,H=canvas.height,lv=LEVELS[currentLevel];
  const t=Date.now()*0.001;

  // Draw level-specific background
  drawLevelBg(currentLevel, W, H, t);

  if(showGrid){
    ctx.strokeStyle='rgba(0,0,0,0.055)';ctx.lineWidth=1;
    for(let x=0;x<W;x+=50){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
    for(let y=0;y<H;y+=50){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  }

  // Water
  drawWater(lv, W, H, t);

  lv.terrain.forEach(tr=>drawTerrain(tr.pts.map(p=>[p[0]*W,p[1]*H]),tr.type));
  const gx=lv.goal.x*W,gy=lv.goal.y*H;
  ctx.strokeStyle='#555';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(gx,gy);ctx.lineTo(gx,gy-52);ctx.stroke();
  ctx.fillStyle='#38b018';ctx.beginPath();ctx.moveTo(gx,gy-52);ctx.lineTo(gx+26,gy-41);ctx.lineTo(gx,gy-31);ctx.closePath();ctx.fill();
  ctx.font='bold 11px Nunito';ctx.fillStyle='#555';ctx.textAlign='center';ctx.fillText('GOAL',gx,gy+16);ctx.textAlign='left';
  beams.forEach(drawBeam);
  if(selNode&&mode==='build'){
    const tx=hovNode?hovNode.x:mouseX,ty2=hovNode?hovNode.y:mouseY,m=MAT[currentMat];
    ctx.save();ctx.strokeStyle=m.color+'cc';ctx.lineWidth=m.w+2;ctx.lineCap='round';
    ctx.setLineDash([8,6]);ctx.lineDashOffset=-(Date.now()*0.06%14);
    ctx.beginPath();ctx.moveTo(selNode.x,selNode.y);ctx.lineTo(tx,ty2);ctx.stroke();ctx.setLineDash([]);
    const dx=tx-selNode.x,dy=ty2-selNode.y,plen=Math.sqrt(dx*dx+dy*dy);
    if(plen>30){
      const pcost=Math.round(plen*m.costPx),mx2=(selNode.x+tx)/2,my2=(selNode.y+ty2)/2;
      ctx.fillStyle='rgba(0,0,0,0.7)';const lw=ctx.measureText('$'+pcost).width;
      ctx.fillRect(mx2-lw/2-5,my2-16,lw+10,20);
      ctx.fillStyle='#fff';ctx.font='bold 12px Nunito';ctx.textAlign='center';ctx.fillText('$'+pcost,mx2,my2-1);ctx.textAlign='left';
    }
    ctx.restore();
  }
  nodes.forEach(drawNode);
  if(veh&&!veh.done) drawVehicle();
}

function drawTerrain(pts,type){
  ctx.save();ctx.shadowColor='rgba(0,0,0,0.12)';ctx.shadowBlur=8;ctx.shadowOffsetY=4;
  ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();
  let g;
  if(type==='ice'){g=ctx.createLinearGradient(pts[0][0],pts[0][1],pts[0][0]+60,pts[0][1]+120);g.addColorStop(0,'#b8e0ef');g.addColorStop(0.4,'#80c0d8');g.addColorStop(1,'#387898');}
  else if(type==='grass'){g=ctx.createLinearGradient(0,pts[0][1],0,pts[0][1]+80);g.addColorStop(0,'#68b048');g.addColorStop(0.18,'#488030');g.addColorStop(1,'#284818');}
  else{g=ctx.createLinearGradient(0,pts[0][1],0,pts[0][1]+100);g.addColorStop(0,'#888078');g.addColorStop(1,'#404038');}
  ctx.fillStyle=g;ctx.fill();ctx.shadowColor='transparent';
  ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);ctx.lineTo(pts[1][0],pts[1][1]);
  ctx.strokeStyle=type==='grass'?'#88d060':type==='ice'?'rgba(255,255,255,0.7)':'rgba(255,255,255,0.2)';
  ctx.lineWidth=type==='grass'?7:4;ctx.stroke();ctx.restore();
}

function stressColor(b){
  if(b.broken)return 'rgba(150,20,20,0.4)';
  const eMax=MAT[b.mat].maxStr-(b.fatigue||0),r=Math.min(b.stress/Math.max(eMax,0.01),1);
  if(r<0.45)return MAT[b.mat].color; if(r<0.80)return '#d89020'; return '#d82020';
}

function drawBeam(b){
  const na=nodes[b.a],nb=nodes[b.b]; if(!na||!nb)return;
  const m=MAT[b.mat],col=stressColor(b);
  ctx.save();
  if(b===hovBeam&&mode==='build'){ctx.shadowColor='rgba(255,140,40,0.7)';ctx.shadowBlur=12;}
  if(b.mat==='road'&&!b.broken){
    const ang=Math.atan2(nb.y-na.y,nb.x-na.x),len=Math.hypot(nb.x-na.x,nb.y-na.y);
    ctx.translate(na.x,na.y);ctx.rotate(ang);
    ctx.fillStyle='#1e1e1e';ctx.fillRect(0,-m.w/2,len,m.w);ctx.fillStyle='#2e2e2e';ctx.fillRect(0,-m.w/2+1,len,m.w-2);
    ctx.strokeStyle='rgba(255,255,180,0.45)';ctx.lineWidth=1.5;ctx.setLineDash([14,10]);
    ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(len,0);ctx.stroke();ctx.setLineDash([]);
    ctx.fillStyle='#a0a0a0';ctx.fillRect(0,-m.w/2,len,2);ctx.fillRect(0,m.w/2-2,len,2);
    if(b.stress>0.02){ctx.globalAlpha=Math.min(0.7,b.stress/m.maxStr);ctx.fillStyle='#e02020';ctx.fillRect(0,-m.w/2,len,m.w);}
    ctx.restore();return;
  }
  if(b.mat==='cable'){
    ctx.strokeStyle=b.broken?'rgba(80,80,80,0.35)':col;ctx.lineWidth=b.broken?1:m.w;ctx.lineCap='round';
    ctx.setLineDash(b.broken?[4,4]:[]);ctx.beginPath();ctx.moveTo(na.x,na.y);ctx.lineTo(nb.x,nb.y);ctx.stroke();
    ctx.setLineDash([]);ctx.restore();return;
  }
  if(b.mat==='wood'&&!b.broken){
    const ang=Math.atan2(nb.y-na.y,nb.x-na.x),len=Math.hypot(nb.x-na.x,nb.y-na.y);
    ctx.translate(na.x,na.y);ctx.rotate(ang);
    const wg=ctx.createLinearGradient(0,-m.w/2,0,m.w/2);
    wg.addColorStop(0,'#c88030');wg.addColorStop(0.5,'#a06020');wg.addColorStop(1,'#785010');
    ctx.fillStyle=wg;ctx.fillRect(0,-m.w/2,len,m.w);
    ctx.strokeStyle='rgba(0,0,0,0.09)';ctx.lineWidth=1;
    for(let px=12;px<len;px+=15){ctx.beginPath();ctx.moveTo(px,-m.w/2);ctx.lineTo(px,m.w/2);ctx.stroke();}
    ctx.fillStyle='rgba(255,255,255,0.09)';ctx.fillRect(0,-m.w/2,len,2);
    if(b.stress>0.04){ctx.globalAlpha=Math.min(0.6,b.stress/m.maxStr);ctx.fillStyle=col;ctx.fillRect(0,-m.w/2,len,m.w);}
    ctx.restore();return;
  }
  ctx.strokeStyle=col;ctx.lineWidth=b.broken?3:m.w;ctx.lineCap='round';
  ctx.setLineDash(b.broken?[5,5]:[]);ctx.beginPath();ctx.moveTo(na.x,na.y);ctx.lineTo(nb.x,nb.y);ctx.stroke();ctx.setLineDash([]);
  if(!b.broken){
    ctx.globalAlpha=0.18;ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(na.x,na.y);ctx.lineTo(nb.x,nb.y);ctx.stroke();
    ctx.globalAlpha=1;ctx.fillStyle=col;
    [[na.x,na.y],[(na.x+nb.x)/2,(na.y+nb.y)/2],[nb.x,nb.y]].forEach(([rx,ry])=>{ctx.beginPath();ctx.arc(rx,ry,3.5,0,Math.PI*2);ctx.fill();});
  }
  ctx.restore();
}

function drawNode(n){
  const isSel=selNode&&selNode.id===n.id,isHov=hovNode&&hovNode.id===n.id,r=n.fixed?11:8;
  ctx.save();
  if(isSel){ctx.shadowColor='#fff';ctx.shadowBlur=24;}
  else if(isHov){ctx.shadowColor=n.fixed?'#ff8060':'#ffe060';ctx.shadowBlur=18;}
  if(isSel||isHov){ctx.beginPath();ctx.arc(n.x,n.y,r+5,0,Math.PI*2);ctx.fillStyle=n.fixed?'rgba(255,80,40,0.15)':'rgba(255,220,40,0.15)';ctx.fill();}
  if(n.fixed){ctx.beginPath();ctx.arc(n.x,n.y,r+3,0,Math.PI*2);ctx.strokeStyle='rgba(255,255,255,0.5)';ctx.lineWidth=2;ctx.setLineDash([4,3]);ctx.stroke();ctx.setLineDash([]);}
  ctx.beginPath();ctx.arc(n.x,n.y,r,0,Math.PI*2);
  const ng=ctx.createRadialGradient(n.x-2,n.y-2,1,n.x,n.y,r);
  if(n.fixed){ng.addColorStop(0,'#ff6050');ng.addColorStop(1,'#b81818');}else{ng.addColorStop(0,'#ffe068');ng.addColorStop(1,'#c09010');}
  ctx.fillStyle=ng;ctx.fill();ctx.strokeStyle=n.fixed?'#801010':'#a07800';ctx.lineWidth=2;ctx.stroke();
  ctx.beginPath();ctx.arc(n.x,n.y,r*0.3,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,0.5)';ctx.fill();ctx.restore();
}

function drawVehicle(){
  const v=veh; ctx.save();
  ctx.fillStyle='rgba(0,0,0,0.12)';ctx.beginPath();ctx.ellipse(v.x+v.w/2,v.y+v.h+10,v.w*0.38,5,0,0,Math.PI*2);ctx.fill();
  const bg=ctx.createLinearGradient(v.x,v.y,v.x,v.y+v.h);
  bg.addColorStop(0,'#6090e0');bg.addColorStop(0.5,'#3860b0');bg.addColorStop(1,'#1c3878');
  ctx.fillStyle=bg;ctx.beginPath();ctx.roundRect(v.x,v.y+v.h*0.28,v.w,v.h*0.55,4);ctx.fill();ctx.strokeStyle='#284880';ctx.lineWidth=1.5;ctx.stroke();
  const cg=ctx.createLinearGradient(v.x,v.y,v.x,v.y+v.h*0.44);
  cg.addColorStop(0,'#80b0e8');cg.addColorStop(1,'#3860b0');
  ctx.fillStyle=cg;ctx.beginPath();ctx.roundRect(v.x+v.w*0.15,v.y,v.w*0.55,v.h*0.44,[4,4,0,0]);ctx.fill();
  ctx.fillStyle='rgba(170,225,255,0.8)';ctx.beginPath();ctx.roundRect(v.x+v.w*0.2,v.y+3,v.w*0.42,v.h*0.27,3);ctx.fill();
  if(v.onBridge){ctx.globalAlpha=0.25;ctx.fillStyle='#ff4020';ctx.beginPath();ctx.roundRect(v.x,v.y+v.h*0.28,v.w,v.h*0.55,4);ctx.fill();ctx.globalAlpha=1;}
  const wr=v.h*0.27,ws=v.spin;
  [[v.x+wr+3,v.y+v.h],[v.x+v.w-wr-3,v.y+v.h]].forEach(([wx,wy])=>{
    ctx.beginPath();ctx.arc(wx,wy,wr,0,Math.PI*2);ctx.fillStyle='#181818';ctx.fill();ctx.strokeStyle='#383838';ctx.lineWidth=1.5;ctx.stroke();
    for(let i=0;i<6;i++){const a=ws+i*Math.PI/3;ctx.strokeStyle='#484848';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(wx,wy,wr*0.72,a,a+0.30);ctx.stroke();}
    const rg=ctx.createRadialGradient(wx-1,wy-1,1,wx,wy,wr*0.42);
    rg.addColorStop(0,'#ccc');rg.addColorStop(1,'#777');
    ctx.beginPath();ctx.arc(wx,wy,wr*0.42,0,Math.PI*2);ctx.fillStyle=rg;ctx.fill();
    ctx.beginPath();ctx.arc(wx,wy,wr*0.1,0,Math.PI*2);ctx.fillStyle='#eee';ctx.fill();
  });
  ctx.restore();
}

// ═══════════════════════════════════════════════════════════════
//  LOOP / TUTORIAL / RESIZE / BOOT
// ═══════════════════════════════════════════════════════════════
function loop(){ simulate(); draw(); if(!won&&!failed) raf=requestAnimationFrame(loop); }
function stopSim(){
  if(raf){cancelAnimationFrame(raf);raf=null;}
  document.getElementById('winModal').classList.add('hidden');
  document.getElementById('failModal').classList.add('hidden');
}
function updateTut(override){
  const panel=document.getElementById('tutPanel');
  const lv=LEVELS[currentLevel]; if(!lv.tutorial){panel.style.display='none';return;}
  panel.style.display='block';
  const STEPS=[
    {icon:'👆', title:'Select an Anchor',    text:'Click any glowing red anchor node on the canvas to select it'},
    {icon:'🔗', title:'Draw Your First Beam', text:'Now click another anchor (or empty space) to connect a beam'},
    {icon:'🏗️', title:'Span the Gap',         text:'Keep connecting anchors — build a deck all the way across!'},
    {icon:'📐', title:'Add Diagonal Braces',  text:'Draw diagonal beams — triangles make structures far stronger'},
    {icon:'▶',  title:'Test Your Bridge',     text:'Click the TEST button to launch the vehicle and see if it holds!'},
  ];
  const idx = override==='test' ? 4 : Math.min(tutStep, STEPS.length-1);
  const s = STEPS[idx];
  document.getElementById('tutStepIcon').textContent = s.icon;
  document.getElementById('tutText').innerHTML = `<b>${s.title}</b>${s.text}`;
  document.getElementById('tutProgress').textContent = `Step ${idx+1} / 5`;
  const dots = document.getElementById('tutDots').children;
  for(let i=0;i<dots.length;i++){
    dots[i].className='tut-dot'+(i<idx?' done':i===idx?' active':'');
  }
}
function advTut(s){ if(LEVELS[currentLevel].tutorial&&s>tutStep){tutStep=s;updateTut();} }
window.addEventListener('resize',()=>{
  if(!nodes.length)return;
  const ow=canvas.width,oh=canvas.height; resizeCanvas();
  const sx=canvas.width/ow,sy=canvas.height/oh;
  nodes.forEach(n=>{n.x*=sx;n.y*=sy;n.px=n.x;n.py=n.y;n.bx*=sx;n.by*=sy;});
  beams.forEach(b=>{const na=nodes[b.a],nb=nodes[b.b];if(na&&nb)b.restLen=Math.hypot(nb.x-na.x,nb.y-na.y);});
});

// ── V6: Submit name from the name modal ──────────────────────────
function submitName(){
  const input = document.getElementById('nameInput');
  const val   = (input.value || '').trim().slice(0, 20);
  if(!val){
    input.classList.add('shake');
    setTimeout(()=>input.classList.remove('shake'), 500);
    document.getElementById('nameError').style.display = 'block';
    input.focus();
    return;
  }
  localStorage.setItem('bridgePlayerName', val);
  document.getElementById('nameModal').classList.add('hidden');
  resizeCanvas(); selectMat('steel');
  document.getElementById('gridBtn').classList.add('active-icon');
  resetLevel();
}

window.addEventListener('load',()=>{
  BSAudio.loadSettings();

  // ── V6: Require player name before game starts ────────────────
  const pn = localStorage.getItem('bridgePlayerName');
  if(pn){
    // Name already saved — boot straight in
    resizeCanvas(); selectMat('steel');
    document.getElementById('gridBtn').classList.add('active-icon');
    resetLevel();
  } else {
    // Show name modal — game does NOT start until name is submitted
    document.getElementById('nameModal').classList.remove('hidden');
    setTimeout(()=>document.getElementById('nameInput').focus(), 80);
  }
});