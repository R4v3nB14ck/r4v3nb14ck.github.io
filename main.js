/* R4v3nB14ck · Portfolio — animations and interaction */
(function(){
  var rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Reveal on scroll
  var io = new IntersectionObserver(function(es){es.forEach(function(x,i){if(x.isIntersecting){setTimeout(function(){x.target.classList.add('ver')},(x.target.dataset.d||0));io.unobserve(x.target)}})},{threshold:.15});
  document.querySelectorAll('.rev').forEach(function(el,i){el.dataset.d=(i%3)*120;io.observe(el)});
  // Light that follows the cursor on cards
  document.querySelectorAll('.card').forEach(function(r){r.addEventListener('pointermove',function(ev){var b=r.getBoundingClientRect();r.style.setProperty('--x',(ev.clientX-b.left)+'px');r.style.setProperty('--y',(ev.clientY-b.top)+'px')})});
  if(rm) return;
  // Floating embers
  var c=document.getElementById('embers'),g=c.getContext('2d'),W,H,P=[];
  function size(){W=c.width=innerWidth;H=c.height=innerHeight}
  size();addEventListener('resize',size);
  function nueva(ini){return{x:Math.random()*W,y:ini?Math.random()*H:H+10,r:Math.random()*2+.6,v:Math.random()*.6+.25,d:Math.random()*2-1,o:Math.random()*.6+.3,t:Math.random()*6}}
  for(var i=0;i<55;i++)P.push(nueva(true));
  (function loop(){
    g.clearRect(0,0,W,H);
    P.forEach(function(p,i){
      p.y-=p.v;p.t+=.02;p.x+=Math.sin(p.t)*.4+p.d*.1;
      var a=p.o*Math.min(1,p.y/(H*.5));
      g.beginPath();g.fillStyle='rgba(170,'+(30+p.r*12|0)+',30,'+Math.max(a,0)+')';g.shadowColor='#a3261f';g.shadowBlur=8;
      g.arc(p.x,p.y,p.r,0,6.283);g.fill();
      if(p.y<-10)P[i]=nueva(false);
    });
    requestAnimationFrame(loop);
  })();
})();
