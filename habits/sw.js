const C='pink-habits-v2.1';const A=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
const put=(req,res)=>{if(res.ok||res.type==='opaque'){const cl=res.clone();caches.open(C).then(c=>c.put(req,cl))}return res};
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>put(r,res)).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))));return}
 e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>(r.url.startsWith(self.location.origin)||r.url.includes('fonts.g'))?put(r,res):res)))});
