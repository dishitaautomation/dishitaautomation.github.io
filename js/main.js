(function(){
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const nav=$('header.nav'),b=$('.burger'),ul=$('nav ul');
addEventListener('scroll',()=>nav.classList.toggle('sc',scrollY>10),{passive:true});
b&&b.addEventListener('click',()=>{const o=ul.classList.toggle('open');b.setAttribute('aria-expanded',o)});
// reveal
const io='IntersectionObserver'in window?new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12}):null;
$$('.rv').forEach(el=>io?io.observe(el):el.classList.add('in'));
// counters
$$('[data-n]').forEach(el=>{const n=+el.dataset.n,s=el.dataset.s||'';const o=new IntersectionObserver(([e])=>{if(!e.isIntersecting)return;o.disconnect();let t=0;const f=()=>{t+=Math.ceil(n/40);if(t>=n){el.textContent=n+s}else{el.textContent=t+s;requestAnimationFrame(f)}};f()});o.observe(el)});
// filter
$$('.chip').forEach(c=>c.addEventListener('click',()=>{$$('.chip').forEach(x=>x.classList.remove('on'));c.classList.add('on');
 $$('[data-cat]').forEach(p=>p.classList.toggle('hide',c.dataset.f!=='all'&&p.dataset.cat!==c.dataset.f))}));
// lightbox
const lb=$('.lb');if(lb){const im=$('img',lb),close=()=>lb.classList.remove('open');
 document.addEventListener('click',e=>{const t=e.target.closest('.zoom');if(t){const i=$('img',t);im.src=i.dataset.full||i.src;im.alt=i.alt;lb.classList.add('open')}else if(e.target===lb||e.target.closest('.lb button'))close()});
 addEventListener('keydown',e=>{if(e.key==='Escape')close()})}
// pause other videos
$$('.vid video').forEach(v=>v.addEventListener('play',()=>$$('.vid video').forEach(o=>{if(o!==v)o.pause()})));
// contact form -> mail
const f=$('#enq');if(f){const p=new URLSearchParams(location.search).get('product');if(p&&f.product)f.product.value=p;
 f.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(f);
 const body=`Name: ${d.get('name')}\nCompany: ${d.get('company')}\nPhone: ${d.get('phone')}\nEmail: ${d.get('email')}\nProduct: ${d.get('product')}\n\n${d.get('msg')}`;
 $('.note',f).textContent='Opening your email app with the enquiry filled in. Press send there to submit.';
 location.href='mailto:sales@dishitaautomation.com?subject='+encodeURIComponent('Enquiry: '+d.get('product'))+'&body='+encodeURIComponent(body)})}
})();
