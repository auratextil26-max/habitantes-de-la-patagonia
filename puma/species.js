
const buttons=document.querySelectorAll('[data-lang]');
const translated=document.querySelectorAll('[data-es][data-en]');
function setLang(lang){
 document.documentElement.lang=lang;
 translated.forEach(el=>el.textContent=el.dataset[lang]);
 buttons.forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));
 localStorage.setItem('aura-language',lang);
}
buttons.forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));
setLang(localStorage.getItem('aura-language')||'es');
