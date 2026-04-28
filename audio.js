// ═══════════════════════════════════════════════════════
//  BRIDGE SIMULATOR — SHARED AUDIO ENGINE  v2
// ═══════════════════════════════════════════════════════
const BSAudio = (() => {
  let ac = null;
  let bgNode = null;
  let bgOscList = [];
  let bgActive = false;
  let bgScheduleTimer = null;
  let currentTheme = null;
  let cfg = { soundOn:true, master:0.8, music:0.6, sfx:1.0 };

  function loadSettings(){
    try{
      const s=localStorage.getItem('bridgeSettings');
      if(s){ const p=JSON.parse(s);
        cfg.soundOn=p.soundOn!==undefined?p.soundOn:true;
        cfg.master=(p.master!==undefined?p.master:80)/100;
        cfg.music=(p.music!==undefined?p.music:60)/100;
        cfg.sfx=(p.sfx!==undefined?p.sfx:100)/100;
      }
    }catch(e){}
  }

  function getCtx(){
    if(!ac) ac=new(window.AudioContext||window.webkitAudioContext)();
    if(ac.state==='suspended') ac.resume();
    return ac;
  }

  // ── SFX ────────────────────────────────────────────
  function sfx(type){
    if(!cfg.soundOn) return;
    const vol=cfg.master*cfg.sfx; if(vol<=0) return;
    try{
      const a=getCtx(),now=a.currentTime,out=a.destination;
      switch(type){
        case 'place':{ const o=a.createOscillator(),g=a.createGain(); o.type='triangle'; o.connect(g);g.connect(out); o.frequency.setValueAtTime(420,now); o.frequency.exponentialRampToValueAtTime(200,now+0.08); g.gain.setValueAtTime(vol*0.35,now); g.gain.exponentialRampToValueAtTime(0.001,now+0.12); o.start(now);o.stop(now+0.13); break; }
        case 'node':{ const o=a.createOscillator(),g=a.createGain(); o.type='sine'; o.connect(g);g.connect(out); o.frequency.setValueAtTime(880,now); o.frequency.exponentialRampToValueAtTime(600,now+0.04); g.gain.setValueAtTime(vol*0.18,now); g.gain.exponentialRampToValueAtTime(0.001,now+0.06); o.start(now);o.stop(now+0.07); break; }
        case 'snap':{ const n=Math.floor(a.sampleRate*0.18),buf=a.createBuffer(1,n,a.sampleRate),d=buf.getChannelData(0); for(let i=0;i<n;i++) d[i]=(Math.random()*2-1)*(1-i/n); const src=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain(); src.buffer=buf;f.type='bandpass';f.frequency.value=1800;f.Q.value=1.2; src.connect(f);f.connect(g);g.connect(out); g.gain.setValueAtTime(vol*1.2,now);g.gain.exponentialRampToValueAtTime(0.001,now+0.18); src.start(now);src.stop(now+0.19); const o=a.createOscillator(),g2=a.createGain(); o.type='sawtooth';o.connect(g2);g2.connect(out); o.frequency.setValueAtTime(180,now);o.frequency.exponentialRampToValueAtTime(60,now+0.15); g2.gain.setValueAtTime(vol*0.5,now);g2.gain.exponentialRampToValueAtTime(0.001,now+0.15); o.start(now);o.stop(now+0.16); break; }
        case 'land':{ const o=a.createOscillator(),g=a.createGain(); o.type='sine';o.connect(g);g.connect(out); o.frequency.setValueAtTime(120,now);o.frequency.exponentialRampToValueAtTime(55,now+0.12); g.gain.setValueAtTime(vol*0.6,now);g.gain.exponentialRampToValueAtTime(0.001,now+0.14); o.start(now);o.stop(now+0.15); break; }
        case 'roll':{ const n=Math.floor(a.sampleRate*0.08),buf=a.createBuffer(1,n,a.sampleRate),d=buf.getChannelData(0); for(let i=0;i<n;i++) d[i]=(Math.random()*2-1)*0.3; const src=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain(); src.buffer=buf;f.type='lowpass';f.frequency.value=280; src.connect(f);f.connect(g);g.connect(out); g.gain.setValueAtTime(vol*0.25,now);g.gain.exponentialRampToValueAtTime(0.001,now+0.08); src.start(now);src.stop(now+0.09); break; }
        case 'win':{ [523,659,784,1047].forEach((fr,i)=>{ const o=a.createOscillator(),g=a.createGain(); o.type='triangle';o.connect(g);g.connect(out); const t=now+i*0.13; o.frequency.value=fr; g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol*0.5,t+0.03);g.gain.exponentialRampToValueAtTime(0.001,t+0.28); o.start(t);o.stop(t+0.31); }); break; }
        case 'fail':{ [392,330,262,196].forEach((fr,i)=>{ const o=a.createOscillator(),g=a.createGain(); o.type='sawtooth';o.connect(g);g.connect(out); const t=now+i*0.14; o.frequency.setValueAtTime(fr,t);o.frequency.exponentialRampToValueAtTime(fr*0.92,t+0.22); g.gain.setValueAtTime(vol*0.38,t);g.gain.exponentialRampToValueAtTime(0.001,t+0.28); o.start(t);o.stop(t+0.29); }); break; }
        case 'teststart':{ const o=a.createOscillator(),g=a.createGain(); o.type='sawtooth';o.connect(g);g.connect(out); o.frequency.setValueAtTime(80,now);o.frequency.linearRampToValueAtTime(200,now+0.25);o.frequency.linearRampToValueAtTime(140,now+0.45); g.gain.setValueAtTime(vol*0.4,now);g.gain.exponentialRampToValueAtTime(0.001,now+0.5); o.start(now);o.stop(now+0.51); break; }
        case 'delete':{ const o=a.createOscillator(),g=a.createGain(); o.type='sawtooth';o.connect(g);g.connect(out); o.frequency.setValueAtTime(300,now);o.frequency.exponentialRampToValueAtTime(100,now+0.07); g.gain.setValueAtTime(vol*0.2,now);g.gain.exponentialRampToValueAtTime(0.001,now+0.08); o.start(now);o.stop(now+0.09); break; }
        case 'budget':{ [0,0.1].forEach(d=>{ const o=a.createOscillator(),g=a.createGain(); o.type='square';o.frequency.value=220;o.connect(g);g.connect(out); g.gain.setValueAtTime(vol*0.3,now+d);g.gain.exponentialRampToValueAtTime(0.001,now+d+0.08); o.start(now+d);o.stop(now+d+0.09); }); break; }
        case 'click':{ const o=a.createOscillator(),g=a.createGain(); o.type='sine';o.frequency.value=700;o.connect(g);g.connect(out); g.gain.setValueAtTime(vol*0.12,now);g.gain.exponentialRampToValueAtTime(0.001,now+0.05); o.start(now);o.stop(now+0.06); break; }
        case 'hover':{ const o=a.createOscillator(),g=a.createGain(); o.type='sine';o.frequency.value=500;o.connect(g);g.connect(out); g.gain.setValueAtTime(vol*0.06,now);g.gain.exponentialRampToValueAtTime(0.001,now+0.04); o.start(now);o.stop(now+0.05); break; }
      }
    }catch(e){}
  }

  // ── Background Music ────────────────────────────────
  const THEMES = {
    home:{
      chords:[[196,246.94,293.66],[220,261.63,329.63],[174.61,220,261.63],[261.63,329.63,392]],
      melody:[[784,880,987.77,784],[880,987.77,1046.5,880],[698.46,784,880,698.46],[523.25,659.26,783.99,523.25]],
      bpm:60, oscType:'sine', padVol:0.06, melVol:0.08
    },
    levelsel:{
      chords:[[329.63,415.3,493.88],[293.66,369.99,440],[261.63,329.63,392],[246.94,311.13,369.99]],
      melody:[[659.25,739.99,830.61,659.25],[587.33,659.25,739.99,587.33],[523.25,587.33,659.25,523.25],[493.88,554.37,659.25,493.88]],
      bpm:88, oscType:'triangle', padVol:0.055, melVol:0.09
    },
    game:{
      chords:[[261.63,329.63,392],[220,261.63,329.63],[174.61,220,261.63],[196,246.94,293.66]],
      melody:[[523.25,587.33,659.25,523.25],[440,493.88,523.25,440],[349.23,392,440,349.23],[392,440,493.88,392]],
      bpm:74, oscType:'sine', padVol:0.065, melVol:0.085
    }
  };

  function stopBg(fadeSecs=1.2){
    bgActive=false; currentTheme=null;
    if(bgScheduleTimer){clearTimeout(bgScheduleTimer);bgScheduleTimer=null;}
    if(bgNode){
      try{ const a=getCtx(),now=a.currentTime; bgNode.gain.cancelScheduledValues(now); bgNode.gain.setValueAtTime(bgNode.gain.value,now); bgNode.gain.linearRampToValueAtTime(0,now+fadeSecs); }catch(e){}
      bgNode=null;
    }
    const toStop=bgOscList.slice(); bgOscList=[];
    setTimeout(()=>toStop.forEach(o=>{try{o.stop();}catch(e){}}),(fadeSecs+0.3)*1000);
  }

  function playBg(theme){
    if(!cfg.soundOn) return;
    const vol=cfg.master*cfg.music; if(vol<=0) return;
    if(currentTheme===theme) return;
    stopBg(0.7);
    setTimeout(()=>{ if(!cfg.soundOn) return; _startBg(theme,vol); }, 800);
  }

  function _startBg(theme,vol){
    try{
      const a=getCtx(), T=THEMES[theme];
      bgActive=true; currentTheme=theme;

      const master=a.createGain();
      master.gain.setValueAtTime(0,a.currentTime);
      master.gain.linearRampToValueAtTime(vol*0.5,a.currentTime+2.5);
      master.connect(a.destination);
      bgNode=master;

      // Reverb
      const conv=a.createConvolver(),rlen=a.sampleRate*2.2,rbuf=a.createBuffer(2,rlen,a.sampleRate);
      for(let c=0;c<2;c++){const d=rbuf.getChannelData(c);for(let i=0;i<rlen;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/rlen,2.4);}
      conv.buffer=rbuf;
      const rvg=a.createGain(); rvg.gain.value=0.25; conv.connect(rvg); rvg.connect(master);
      const lpf=a.createBiquadFilter(); lpf.type='lowpass'; lpf.frequency.value=3000;
      lpf.connect(master); lpf.connect(conv);

      const BEAT=60/T.bpm, BAR=BEAT*4, BPC=2, LOOP=BAR*BPC*T.chords.length;
      let loopStart=a.currentTime+0.15;

      function scheduleLoop(){
        if(!bgActive) return;
        const t0=loopStart;
        T.chords.forEach((chord,ci)=>{
          const barT=t0+ci*BAR*BPC;
          // Pads
          chord.forEach(freq=>{
            [0,0.004,-0.004].forEach((det,ti)=>{
              const o=a.createOscillator(),g=a.createGain();
              o.type=T.oscType; o.frequency.value=freq*(1+det);
              o.connect(g); g.connect(lpf);
              const pv=ti===0?T.padVol:T.padVol*0.5;
              g.gain.setValueAtTime(0,barT); g.gain.linearRampToValueAtTime(pv,barT+0.8);
              g.gain.setValueAtTime(pv,barT+BAR*BPC-0.6); g.gain.linearRampToValueAtTime(0,barT+BAR*BPC+0.1);
              o.start(barT); o.stop(barT+BAR*BPC+0.2); bgOscList.push(o);
            });
          });
          // Bass
          const bo=a.createOscillator(),bg=a.createGain();
          bo.type='triangle'; bo.frequency.value=chord[0]/2; bo.connect(bg); bg.connect(lpf);
          bg.gain.setValueAtTime(0,barT); bg.gain.linearRampToValueAtTime(0.14,barT+0.2);
          bg.gain.setValueAtTime(0.11,barT+BAR*0.9); bg.gain.linearRampToValueAtTime(0.001,barT+BAR*BPC);
          bo.start(barT); bo.stop(barT+BAR*BPC+0.1); bgOscList.push(bo);
          // Melody bars 1 & 2
          [0,1].forEach(barOff=>{
            const bt=barT+barOff*BAR;
            T.melody[ci].forEach((freq,bi)=>{
              const t=bt+bi*BEAT;
              const f=barOff===1&&bi%2===1?freq*2:freq;
              const mo=a.createOscillator(),mg=a.createGain();
              mo.type='sine'; mo.frequency.value=f; mo.connect(mg); mg.connect(lpf);
              const mv=barOff===1&&bi%2===1?T.melVol*0.55:T.melVol;
              mg.gain.setValueAtTime(0,t); mg.gain.linearRampToValueAtTime(mv,t+0.04);
              mg.gain.exponentialRampToValueAtTime(0.001,t+BEAT*0.82);
              mo.start(t); mo.stop(t+BEAT+0.05); bgOscList.push(mo);
            });
          });
        });
        loopStart+=LOOP;
        bgScheduleTimer=setTimeout(()=>{ if(bgActive) scheduleLoop(); },Math.max(0,(loopStart-a.currentTime-0.6)*1000));
      }
      scheduleLoop();
    }catch(e){bgActive=false;}
  }

  function updateBgVolume(){
    if(!bgNode) return;
    try{ const a=getCtx(),now=a.currentTime,vol=cfg.soundOn?cfg.master*cfg.music*0.5:0;
      bgNode.gain.cancelScheduledValues(now); bgNode.gain.setValueAtTime(bgNode.gain.value,now);
      bgNode.gain.linearRampToValueAtTime(vol,now+0.3);
    }catch(e){}
  }

  function unlock(){ getCtx(); }

  return { sfx, playBg, stopBg, updateBgVolume, loadSettings, unlock, get cfg(){ return cfg; } };
})();