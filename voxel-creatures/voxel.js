const add=(a,b)=>a.map((x,i)=>x+b[i]);
const mul=(a,s)=>a.map(x=>x*s);
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const norm=a=>{const l=Math.hypot(...a)||1;return a.map(x=>x/l);};
const mix=(a,b,t)=>a.map((x,i)=>x+(b[i]-x)*t);
function tone(hex,n){const k=parseInt(hex.slice(1),16),f=.94+n*.1;return'#'+[k>>16,(k>>8)&255,k&255].map(x=>Math.max(0,Math.min(255,Math.round(x*f))).toString(16).padStart(2,'0')).join('');}
function noise(x,y,z){return Math.abs(Math.sin(x*12.9898+y*78.233+z*37.719)*43758.5453)%1;}
function paint(color,x,y,z){return typeof color==='function'?color(x,y,z):tone(color,noise(x,y,z)-.5);}

function ctx(){const bones=[],parts=[];return{bones,parts,
 b(name,parent,pos,rot){bones.push({name,parent,pos,rot});},
 p(bone,pos,size,color,rot=[0,0,0],glow=false,faces){parts.push({bone,pos,size,color,rot,glow,faces,shape:'box'});},
 c(bone,pos,size,color,rot=[0,0,0],glow=true){parts.push({bone,pos,size,color,rot,glow,shape:'crystal'});}
};}
function base(v,y=1){v.b('root',null,[0,0,0]);v.b('body','root',[0,y,0]);}
function legs4(v,x,z,y){const a=[];for(const[n,sx,sz]of[['legFL',-x,z],['legFR',x,z],['legBL',-x,-z],['legBR',x,-z]]){v.b(n,'body',[sx,y,sz]);a.push(n);}return a;}
function meta(v,data){return{...data,bones:v.bones,parts:v.parts};}

function volume(v,bone,step=.1){
 const cells=new Map(),key=(x,y,z)=>`${x},${y},${z}`;
 const put=(x,y,z,color)=>{const ix=Math.round(x/step),iy=Math.round(y/step),iz=Math.round(z/step);cells.set(key(ix,iy,iz),{ix,iy,iz,color:paint(color,ix,iy,iz)});};
 const ellipsoid=(c,r,color,filter)=>{const min=c.map((x,i)=>Math.floor((x-r[i])/step)),max=c.map((x,i)=>Math.ceil((x+r[i])/step));for(let x=min[0];x<=max[0];x++)for(let y=min[1];y<=max[1];y++)for(let z=min[2];z<=max[2];z++){const p=[x*step,y*step,z*step],d=p.map((n,i)=>(n-c[i])/r[i]),q=d[0]**2+d[1]**2+d[2]**2;if(q<=1&&(!filter||filter(...p,d,q)))put(...p,typeof color==='function'?color(...p,d,q):color);}};
 const sphere=(c,r,color)=>ellipsoid(c,[r,r,r],color);
 const tube=(points,radii,color)=>{for(let j=0;j<points.length-1;j++){const a=points[j],b=points[j+1],len=Math.hypot(...b.map((x,i)=>x-a[i])),n=Math.max(1,Math.ceil(len/(step*.65)));for(let i=0;i<=n;i++){const t=i/n,r=Array.isArray(radii)?radii[j]+(radii[j+1]-radii[j])*t:radii;sphere(mix(a,b,t),r,color);}}};
 const leaf=o=>{const dir=norm(o.dir),normalHint=norm(o.normal||[0,0,1]),side=norm(cross(dir,normalHint)),normal=norm(cross(side,dir));const n=Math.ceil(o.length/step);for(let i=1;i<n;i++){const t=i/n,w=o.width*Math.sin(Math.PI*t)**.7*(1-.12*t),thick=(o.depth||.1)*(.35+.65*Math.sin(Math.PI*t));for(let s=-w;s<=w;s+=step){for(let d=-thick/2;d<=thick/2;d+=step){const ridge=(o.bulge||.035)*(1-(s/(w||1))**2)*Math.sin(Math.PI*t),center=add(add(o.base,mul(dir,t*o.length)),mul(normal,(o.curve||0)*Math.sin(Math.PI*t)+ridge));put(...add(add(center,mul(side,s)),mul(normal,d)),o.color?o.color(t,s/(w||1),d):o.colors[Math.min(o.colors.length-1,Math.floor(t*o.colors.length))]);}}};
 const crystal=(c,h,w,color,lean=[0,0])=>{for(let y=0;y<=h;y+=step){const t=y/h,r=w*Math.sin(Math.PI*(.06+.9*t))*(1-.45*t);for(let x=-r;x<=r;x+=step)for(let z=-r;z<=r;z+=step)if(Math.abs(x)+Math.abs(z)<=r*1.25)put(c[0]+x+lean[0]*t,c[1]+y,c[2]+z+lean[1]*t,typeof color==='function'?color(t,x,z):color);}};
 const finish=()=>{const dirs=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];for(const cell of cells.values()){let faces=0;dirs.forEach((d,i)=>{if(!cells.has(key(cell.ix+d[0],cell.iy+d[1],cell.iz+d[2])))faces|=1<<i;});if(faces)v.p(bone,[cell.ix*step,cell.iy*step,cell.iz*step],[step*1.012,step*1.012,step*1.012],cell.color,[0,0,0],false,faces);}};
 return{put,ellipsoid,sphere,tube,leaf,crystal,finish,step,cells};
}

function eye(v,bone,c,rx,ry,iris,step=.055){
 for(let x=-rx;x<=rx;x+=step)for(let y=-ry;y<=ry;y+=step){const outer=(x/rx)**2+(y/ry)**2;if(outer>1)continue;let color='#10101c',z=c[2];const white=(x/(rx*.86))**2+(y/(ry*.9))**2;if(white<1){color='#e8edf2';z+=step*.32;}const ix=x+rx*.12,iy=y+ry*.08,ir=(ix/(rx*.66))**2+(iy/(ry*.77))**2;if(ir<1){color=ir>.65?iris:'#111526';z+=step*.7;}if((x+rx*.27)**2+(y-ry*.36)**2<(rx*.19)**2){color='#ffffff';z+=step*.45;}if((x-rx*.18)**2+(y+ry*.32)**2<(rx*.09)**2){color='#baf5ff';z+=step*.4;}v.p(bone,[c[0]+x,c[1]+y,z],[step*1.04,step*1.04,step*.8],color,[0,0,0],color==='#ffffff'||color==='#baf5ff');}
}
function smile(v,bone,c,width=.22,color='#352638',step=.045){for(let i=-4;i<=4;i++){const t=i/4;v.p(bone,[c[0]+t*width,c[1]+Math.abs(t)*width*.18,c[2]],[step,step,step*.6],color);}v.p(bone,[c[0],c[1]+width*.18,c[2]+.015],[width*.34,width*.2,step],color);}
function rune(v,bone,c,r,color,plane='xy'){for(let i=0;i<20;i++){const a=i/20*Math.PI*2,u=Math.cos(a)*r,w=Math.sin(a)*r,p=plane==='yz'?[c[0],c[1]+u,c[2]+w]:[c[0]+u,c[1]+w,c[2]];v.p(bone,p,[.065,.065,.065],color,[0,0,0],true);}v.p(bone,c,[.09,.09,.09],'#e9ffff',[0,0,0],true);}
function ring(v,bone,r,colorA,colorB,step=.095){const n=Math.ceil(Math.PI*2*r/(step*.8));for(let i=0;i<n;i++){const a=i/n*Math.PI*2;v.p(bone,[Math.cos(a)*r,0,Math.sin(a)*r],[step,step*.65,step],i%7<2?colorB:colorA,[0,-a,0],i%7<2);}}

module.exports={ctx,base,legs4,meta,volume,eye,smile,rune,ring,tone,noise,add,mul,mix,norm};
