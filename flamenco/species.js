const buttons=document.querySelectorAll('[data-lang]');
const translated=document.querySelectorAll('[data-es][data-en]');
const customPlayers=[];

function formatTime(value){
  if(!Number.isFinite(value)) return '0:00';
  const min=Math.floor(value/60);
  const sec=Math.floor(value%60).toString().padStart(2,'0');
  return `${min}:${sec}`;
}

function updatePlayerLabels(lang){
  customPlayers.forEach(({audio,button,status})=>{
    const playing=!audio.paused&&!audio.ended;
    button.setAttribute('aria-label',playing?(lang==='en'?'Pause sound':'Pausar sonido'):(lang==='en'?'Play sound':'Reproducir sonido'));
    status.textContent=playing?(lang==='en'?'PLAYING · PATAGONIA':'REPRODUCIENDO · PATAGONIA'):(lang==='en'?'SOUND OF PATAGONIA':'SONIDO DE LA PATAGONIA');
  });
}

function setLang(lang){
 document.documentElement.lang=lang;
 translated.forEach(el=>el.textContent=el.dataset[lang]);
 buttons.forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));
 localStorage.setItem('aura-language',lang);
 updatePlayerLabels(lang);
}

function initCustomPlayers(){
  const style=document.createElement('style');
  style.textContent=`
  .player audio{display:none!important}
  .patagonia-player{display:grid;grid-template-columns:auto 1fr auto;gap:18px;align-items:center;width:100%}
  .audio-play{width:58px;height:58px;border:1px solid color-mix(in srgb,var(--accent) 70%,transparent);border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.22);color:var(--species-text);cursor:pointer;transition:transform .25s ease,background .25s ease,border-color .25s ease;font-size:1.05rem;padding:0}
  .audio-play:hover{transform:scale(1.06);background:rgba(255,255,255,.42);border-color:var(--accent)}
  .audio-main{min-width:0}.audio-status{margin:0 0 10px!important;font-size:.64rem!important;font-weight:700;letter-spacing:.18em;line-height:1!important;color:var(--accent)}
  .audio-track-row{display:grid;grid-template-columns:1fr auto;gap:14px;align-items:center}
  .audio-progress{width:100%;height:3px;appearance:none;-webkit-appearance:none;background:linear-gradient(to right,var(--accent) 0 var(--progress,0%),rgba(0,0,0,.18) var(--progress,0%) 100%);border-radius:99px;outline:none;cursor:pointer}
  .audio-progress::-webkit-slider-thumb{-webkit-appearance:none;width:13px;height:13px;border-radius:50%;background:var(--accent);border:2px solid rgba(255,255,255,.8);box-shadow:0 2px 7px rgba(0,0,0,.15)}
  .audio-progress::-moz-range-thumb{width:11px;height:11px;border-radius:50%;background:var(--accent);border:2px solid rgba(255,255,255,.8)}
  .audio-time{font-size:.72rem;white-space:nowrap;opacity:.72;font-variant-numeric:tabular-nums}
  .audio-mark{width:38px;height:38px;border-radius:50%;border:1px solid rgba(0,0,0,.12);display:grid;place-items:center;font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-style:italic;opacity:.7}
  @media(max-width:560px){.patagonia-player{grid-template-columns:auto 1fr;gap:14px}.audio-play{width:52px;height:52px}.audio-mark{display:none}.audio-track-row{grid-template-columns:1fr}.audio-time{font-size:.68rem}}
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.player audio').forEach(audio=>{
    audio.removeAttribute('controls');
    const shell=document.createElement('div');
    shell.className='patagonia-player';
    const play=document.createElement('button');
    play.type='button';
    play.className='audio-play';
    play.textContent='▶';
    const main=document.createElement('div');
    main.className='audio-main';
    const status=document.createElement('p');
    status.className='audio-status';
    const row=document.createElement('div');
    row.className='audio-track-row';
    const progress=document.createElement('input');
    progress.className='audio-progress';
    progress.type='range';
    progress.min='0';progress.max='100';progress.value='0';progress.step='0.1';
    progress.setAttribute('aria-label','Progreso del audio');
    const time=document.createElement('span');
    time.className='audio-time';time.textContent='0:00 / 0:00';
    const mark=document.createElement('div');mark.className='audio-mark';mark.textContent='AT';mark.setAttribute('aria-hidden','true');
    row.append(progress,time);main.append(status,row);shell.append(play,main,mark);audio.after(shell);
    customPlayers.push({audio,button:play,status,progress,time});

    const sync=()=>{
      const duration=audio.duration||0;
      const percent=duration?(audio.currentTime/duration)*100:0;
      progress.value=percent;
      progress.style.setProperty('--progress',`${percent}%`);
      time.textContent=`${formatTime(audio.currentTime)} / ${formatTime(duration)}`;
    };
    play.addEventListener('click',()=>{audio.paused?audio.play():audio.pause()});
    progress.addEventListener('input',()=>{if(audio.duration)audio.currentTime=(Number(progress.value)/100)*audio.duration});
    audio.addEventListener('loadedmetadata',sync);
    audio.addEventListener('durationchange',sync);
    audio.addEventListener('timeupdate',sync);
    audio.addEventListener('play',()=>{play.textContent='Ⅱ';updatePlayerLabels(document.documentElement.lang||'es')});
    audio.addEventListener('pause',()=>{play.textContent='▶';updatePlayerLabels(document.documentElement.lang||'es')});
    audio.addEventListener('ended',()=>{play.textContent='▶';progress.value='0';progress.style.setProperty('--progress','0%');updatePlayerLabels(document.documentElement.lang||'es')});
  });
}

buttons.forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));
initCustomPlayers();
setLang(localStorage.getItem('aura-language')||'es');
