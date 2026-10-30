const {ctx,base,legs4,meta,volume,eye,smile,rune,ring,tone,noise}=require('./voxel');
const drizzle=require('./creatures')[2];

function mosswisp(){
 const v=ctx();base(v,1.12);v.b('head','body',[0,.58,0]);for(const[n,x]of[['legL',-.28],['legR',.28]])v.b(n,'body',[x,-.88,.02]);for(const[n,x]of[['armL',-.57],['armR',.57]])v.b(n,'body',[x,.3,0]);v.b('leafL','head',[-.23,.63,0]);v.b('leafR','head',[.23,.63,0]);
 let g=volume(v,'body',.085);g.ellipsoid([0,-.03,0],[.68,.88,.54],(x,y,z,d)=>y<-.45?'#65846a':z>.25?'#86a58a':'#769578');g.finish();
 g=volume(v,'head',.075);g.ellipsoid([0,.02,0],[.64,.7,.55],(x,y,z,d)=>y>.25?'#a0bca0':z>.25?'#91af93':'#84a287');g.finish();
 for(const[i,n]of['armL','armR'].entries()){const s=i?1:-1;g=volume(v,n,.075);g.tube([[0,0,0],[s*.09,-.3,.02],[s*.02,-.65,.1]],[.21,.23,.16],(x,y)=>y<-.35?'#86a287':'#365f3d');g.leaf({base:[s*.03,.08,.19],dir:[s*.18,-1,.03],length:.63,width:.2,depth:.06,curve:.04,color:t=>t<.75?'#315c39':'#4d7649'});g.finish();}
 for(const n of['legL','legR']){g=volume(v,n,.065);g.ellipsoid([0,-.08,.06],[.2,.2,.25],(x,y,z)=>z>.1?'#8b6742':'#684c35');g.finish();}
 eye(v,'head',[-.26,.07,.53],.125,.155,'#263b35',.04);eye(v,'head',[.26,.07,.53],.125,.155,'#263b35',.04);
 for(let y=-.28;y<=.28;y+=.055)for(let x=-.22;x<=.22;x+=.055)if(Math.abs(x)/.22+Math.abs(y)/.28<1)v.p('body',[x,-.2+y,.535],[.057,.057,.06],Math.abs(x)/.22+Math.abs(y)/.28>.75?'#5de8d0':'#b5fff0',[0,0,0],true);
 for(const[i,n]of['leafL','leafR'].entries()){const s=i?1:-1;g=volume(v,n,.055);g.tube([[0,0,0],[s*.04,.18,0]],.045,'#b6d5b2');g.leaf({base:[s*.03,.12,0],dir:[s*.7,1,.05],length:.58,width:.19,depth:.055,curve:.09,color:t=>t>.75?'#d1e4c8':'#a8c8a6'});g.finish();}
 return meta(v,{number:'01',name:'Mosswisp',kind:'ЛЕСНОЙ ДУХ',description:'Мягкий зелёный дух с листьями-антеннами и светящимся сердцем.',accent:'#9be7c1',vfx:'moss',vfxName:'Кружащиеся листья',vfxColors:['#9cffb5','#d9ffb0','#4ddb93'],target:[0,1.55,0],distance:7.1,rig:{body:'body',head:'head',legs:['legL','legR'],arms:['armL','armR'],extra:['leafL','leafR']}});
}

function flaremop(){
 const v=ctx();base(v,1.0);v.b('head','body',[0,.48,.6]);const legs=legs4(v,.39,.48,-.28);v.b('tail','body',[0,.12,-.78]);v.b('tailTip','tail',[0,.65,-.35]);v.b('earL','head',[-.4,.4,-.04]);v.b('earR','head',[.4,.4,-.04]);
 let g=volume(v,'body',.085);g.ellipsoid([0,0,-.15],[.54,.48,.82],(x,y,z)=>y>.15?'#f28b22':z>.3?'#e97518':'#d95b14');g.ellipsoid([0,-.03,.42],[.5,.52,.45],'#f58b20');g.finish();
 g=volume(v,'head',.07);g.ellipsoid([0,0,0],[.64,.59,.53],(x,y,z)=>y>.28?'#ff9e24':z>.25?'#f68a20':'#e97518');g.ellipsoid([0,-.2,.4],[.47,.28,.28],(x,y,z)=>'#ffc05a');g.ellipsoid([-.48,-.12,.16],[.25,.32,.3],'#f79b2c');g.ellipsoid([.48,-.12,.16],[.25,.32,.3],'#f79b2c');g.finish();
 eye(v,'head',[-.27,.04,.5],.245,.31,'#d96b18',.047);eye(v,'head',[.27,.04,.5],.245,.31,'#d96b18',.047);smile(v,'head',[0,-.23,.665],.2,'#5a342b',.04);v.p('head',[0,-.13,.69],[.14,.1,.09],'#3d3030');
 g=volume(v,'head',.065);g.leaf({base:[-.18,.44,.14],dir:[-.3,1,0],length:.45,width:.17,depth:.12,curve:.05,colors:['#ff9c20','#ffb633']});g.leaf({base:[.02,.48,.1],dir:[.35,1,-.05],length:.5,width:.18,depth:.12,curve:.04,colors:['#ff8c19','#ffc33c']});g.leaf({base:[0,-.33,.25],dir:[0,-1,.08],length:.48,width:.28,depth:.12,curve:.06,colors:['#ffc263','#ffae3f']});g.finish();
 for(const[i,n]of['earL','earR'].entries()){const s=i?1:-1;g=volume(v,n,.065);g.leaf({base:[0,0,0],dir:[s*.35,1,-.05],length:.92,width:.29,depth:.17,curve:.04,color:t=>t>.64?'#3b3030':t>.35?'#a94c18':'#f68a1d'});g.leaf({base:[0,.08,.1],dir:[s*.28,1,0],length:.58,width:.18,depth:.055,curve:.03,colors:['#ffaf36','#b95820']});g.finish();}
 legs.forEach((n,i)=>{g=volume(v,n,.07);g.tube([[0,0,0],[0,-.35,.02],[0,-.62,.1]],[.23,.18,.15],i<2?'#ee7719':'#d96716');g.ellipsoid([0,-.64,.18],[.25,.17,.3],(x,y,z)=>'#403335');for(const x of[-.11,.11])g.ellipsoid([x,-.67,.32],[.105,.12,.14],'#4b3a39');g.finish();});
 g=volume(v,'tail',.075);g.tube([[0,0,0],[0,.22,-.3],[.03,.65,-.4],[0,.9,-.25]],[.24,.34,.4,.3],(x,y)=>'#f17818');g.finish();
 g=volume(v,'tailTip',.075);g.leaf({base:[0,-.1,0],dir:[.15,1,.05],length:1.35,width:.42,depth:.28,curve:.12,color:t=>t>.72?'#ffe45c':t>.35?'#ffad24':'#f27417'});g.leaf({base:[0,.05,.16],dir:[-.18,1,0],length:1.05,width:.25,depth:.1,curve:.1,color:t=>t>.55?'#fff49a':'#ffd43e'});g.leaf({base:[.18,.2,0],dir:[.7,1,-.05],length:.72,width:.18,depth:.13,curve:.08,colors:['#ff8c1c','#ffd83e']});g.finish();
 return meta(v,{number:'02',name:'Flaremop',kind:'ОГНЕННЫЙ ЛИС',description:'Огненный лисёнок с тёмными лапами, пышными щеками и пламенным хвостом.',accent:'#ffad42',vfx:'flare',vfxName:'Пламя хвоста',vfxColors:['#ff6a20','#ffc638','#fff0a0'],target:[0,1.65,0],distance:8.1,rig:{body:'body',head:'head',legs,tail:'tail',tailTip:'tailTip',extra:['earL','earR']}});
}

function craggle(){
 const v=ctx();base(v,.95);v.b('head','body',[0,.02,.68]);const legs=legs4(v,.62,.48,-.25);v.b('tail','body',[0,-.12,-.83]);
 let g=volume(v,'body',.09);g.ellipsoid([0,0,-.12],[.8,.55,.92],(x,y,z)=>y>.22?'#596c3d':z>.3?'#4b5b3c':'#37473b');g.ellipsoid([-.4,.25,-.2],[.48,.36,.66],'#52623e');g.ellipsoid([.38,.27,-.28],[.46,.38,.62],'#45563d');g.finish();
 g=volume(v,'head',.075);g.ellipsoid([0,0,0],[.73,.45,.58],(x,y,z)=>y<-.1?'#829064':'#596a49');g.ellipsoid([0,-.19,.38],[.57,.25,.3],'#91a172');g.ellipsoid([0,.02,.47],[.3,.22,.2],'#6c7a54');g.finish();
 eye(v,'head',[-.34,.09,.5],.18,.14,'#36f0a1',.04);eye(v,'head',[.34,.09,.5],.18,.14,'#36f0a1',.04);
 for(const s of[-1,1]){g=volume(v,'head',.055);g.crystal([s*.42,-.35,.5],.26,.08,'#4cf0ad');g.finish();}
 legs.forEach((n,i)=>{g=volume(v,n,.08);g.ellipsoid([0,-.12,0],[i<2?.36:.3,.4,.36],i<2?'#4b5b43':'#3c4c3e');g.ellipsoid([0,-.43,.16],[.37,.2,.4],'#35433b');for(const x of[-.2,0,.2])g.crystal([x,-.48,.38],.16,.07,'#899573');g.finish();});
 const crystals=[[-.43,.43,-.48,.85,.2],[.02,.52,-.42,1.22,.25],[.42,.4,-.17,.72,.18],[-.3,.36,.13,.55,.16],[.3,.42,.22,.68,.18]];
 g=volume(v,'body',.07);for(const[i,[x,y,z,h,w]]of crystals.entries()){g.ellipsoid([x,y-.05,z],[w*1.4,.18,w*1.3],'#667849');g.crystal([x,y,z],h,w,(t,a,b)=>a+b>0?'#76f5a6':t>.55?'#2ed68e':'#1b9f70',[i%2?.12:-.08,.04]);}g.finish();
 g=volume(v,'tail',.075);g.tube([[0,0,0],[0,-.06,-.4]],[.28,.16],'#3d4d3d');g.crystal([0,.02,-.35],.48,.15,'#36c98a');g.finish();
 return meta(v,{number:'04',name:'Craggle',kind:'КАМЕННЫЙ СТРАЖ',description:'Мохнатый каменный зверь с тяжёлыми лапами и изумрудной грядой.',accent:'#59efa2',vfx:'craggle',vfxName:'Рост изумрудов',vfxColors:['#4cf0a0','#b5ff77','#25b985'],target:[0,1.35,0],distance:8.1,rig:{body:'body',head:'head',legs,tail:'tail'}});
}

function bloombyte(){
 const v=ctx();base(v,.95);v.b('head','body',[0,.72,.08]);v.b('petalsBack','head',[0,0,-.18]);v.b('petalsFront','head',[0,-.05,.14]);v.b('leafSkirt','body',[0,.2,0]);for(const[n,x]of[['legL',-.27],['legR',.27]])v.b(n,'body',[x,-.42,0]);
 let g=volume(v,'body',.075);g.ellipsoid([0,0,0],[.5,.6,.43],(x,y,z)=>z>.15?'#527a3c':'#3d6338');g.finish();
 g=volume(v,'head',.06);g.ellipsoid([0,0,.09],[.49,.43,.36],(x,y,z)=>y<-.1?'#ffc492':'#ffdba9');g.finish();eye(v,'head',[-.23,.02,.42],.22,.275,'#dc4d9a',.042);eye(v,'head',[.23,.02,.42],.22,.275,'#dc4d9a',.042);smile(v,'head',[0,-.18,.455],.16,'#a65b5a',.033);
 const petals=[[-1.35,1.12,.36,'#ed7690'],[-.95,1.28,.4,'#b77bd2'],[-.48,1.23,.36,'#ff9b91'],[0,1.45,.4,'#f28ca0'],[.48,1.27,.37,'#ffad8c'],[.95,1.2,.4,'#bd83d7'],[1.35,1.08,.37,'#ed809d'],[2.15,.92,.36,'#f490a3'],[-2.15,.92,.36,'#f490a3']];
 g=volume(v,'petalsBack',.065);for(const[a,l,w,c]of petals)g.leaf({base:[0,-.1,0],dir:[Math.sin(a),Math.cos(a),-.04],length:l,width:w,depth:.13,curve:-.12,bulge:.055,color:(t,s)=>Math.abs(s)>.75?'#ffc0b0':t>.8?tone(c,.35):c});g.finish();
 const front=[[-.85,.8,.23,'#c98bde'],[-.38,.87,.25,'#ffba8d'],[.1,.82,.24,'#f28b9f'],[.7,.7,.23,'#ffc18e'],[2.65,.64,.3,'#f08ba5'],[-2.65,.64,.3,'#ffb198']];g=volume(v,'petalsFront',.055);for(const[a,l,w,c]of front)g.leaf({base:[0,-.12,.04],dir:[Math.sin(a),Math.cos(a),.08],length:l,width:w,depth:.1,curve:.12,bulge:.04,color:t=>t>.75?tone(c,.4):c});g.finish();
 g=volume(v,'leafSkirt',.065);for(let i=0;i<9;i++){const a=i/9*Math.PI*2,x=Math.sin(a)*.32,z=Math.cos(a)*.28;g.leaf({base:[x,0,z],dir:[Math.sin(a)*.48,-1,Math.cos(a)*.35],normal:[Math.sin(a),.1,Math.cos(a)],length:.83+(i%3)*.09,width:.24,depth:.12,curve:.1,color:t=>t>.75?'#91a64e':i%2?'#587d3e':'#6d9144'});}g.finish();
 for(const[i,n]of['legL','legR'].entries()){const s=i?1:-1;g=volume(v,n,.065);g.tube([[0,0,0],[s*.04,-.32,.03],[s*.09,-.48,.12]],[.14,.12,.1],(x,y)=>'#77603d');for(const d of[-1,0,1])g.tube([[s*.06,-.4,.08],[s*.09+d*.15,-.5,.3]],[.09,.055],'#8a6e44');g.finish();}
 return meta(v,{number:'05',name:'Bloombyte',kind:'ЦВЕТОЧНЫЙ ДУХ',description:'Маленький цветочный дух с лепестковой короной, лиственной юбкой и корнями.',accent:'#ff9fba',vfx:'bloom',vfxName:'Лепестковый вальс',vfxColors:['#ff9bb8','#ffc38d','#c394ee'],target:[0,1.65,0],distance:7.8,rig:{body:'body',head:'head',legs:['legL','legR'],extra:['petalsBack','petalsFront','leafSkirt']}});
}

function voltik(){
 const v=ctx();base(v,1.02);v.b('head','body',[0,.47,.55]);const legs=legs4(v,.39,.46,-.25);v.b('tail','body',[0,.12,-.72]);v.b('tailTip','tail',[-.08,.55,-.36]);v.b('earL','head',[-.34,.32,-.05]);v.b('earR','head',[.34,.32,-.05]);
 let g=volume(v,'body',.075);g.ellipsoid([0,0,-.13],[.48,.44,.72],(x,y,z)=>y>.15?'#4b4395':'#373474');g.ellipsoid([0,.02,.35],[.46,.46,.42],'#42408a');g.finish();
 g=volume(v,'head',.06);g.ellipsoid([0,0,0],[.57,.48,.48],(x,y,z)=>y>.2?'#554a9d':'#403a85');g.ellipsoid([0,-.18,.35],[.45,.25,.28],(x,y,z)=>'#91c6d3');g.ellipsoid([-.44,-.03,.17],[.2,.27,.28],'#49408c');g.ellipsoid([.44,-.03,.17],[.2,.27,.28],'#49408c');g.finish();eye(v,'head',[-.26,.02,.45],.235,.29,'#38cfea',.042);eye(v,'head',[.26,.02,.45],.235,.29,'#38cfea',.042);smile(v,'head',[0,-.2,.6],.17,'#31335d',.035);
 for(const[i,n]of['earL','earR'].entries()){const s=i?1:-1;g=volume(v,n,.06);g.tube([[0,0,0],[s*.12,.42,-.02],[s*.26,.85,-.08],[s*.12,1.28,-.12]],[.2,.18,.13,.025],(x,y)=>y>.7?'#45438b':'#343572');g.leaf({base:[0,.08,.13],dir:[s*.22,1,-.06],length:1.08,width:.14,depth:.065,curve:.03,color:t=>t>.72?'#fff45c':t>.35?'#f7d943':'#4ce5ef'});g.finish();}
 legs.forEach((n,i)=>{const s=n.endsWith('L')?-1:1;g=volume(v,n,.065);g.ellipsoid([0,-.12,0],[i<2?.3:.25,.36,.3],i<2?'#49408c':'#373474');g.tube([[0,-.25,0],[0,-.52,.07],[0,-.66,.15]],[.19,.13,.15],'#34336f');g.ellipsoid([0,-.67,.22],[.22,.14,.27],'#292b5c');g.finish();rune(v,n,[0,-.42,.18],.105,'#fff255');});
 g=volume(v,'head',.045);g.tube([[0,.4,.39],[-.08,.25,.49],[.03,.13,.5],[-.04,.02,.51]],.055,'#ffeb4d');g.finish();rune(v,'head',[-.47,-.08,.32],.105,'#6df5ff');
 g=volume(v,'tail',.065);g.tube([[0,0,0],[-.12,.22,-.3],[.04,.52,-.46],[-.08,.78,-.34]],[.19,.23,.19,.13],(x,y)=>'#3b3c82');g.finish();g=volume(v,'tailTip',.06);g.leaf({base:[0,-.1,0],dir:[-.22,1,-.12],length:1.35,width:.28,depth:.17,curve:.02,color:t=>t>.45?'#fff04e':'#3ddfec'});g.leaf({base:[-.08,.38,.02],dir:[.75,.4,-.1],length:.64,width:.16,depth:.12,curve:0,colors:['#42dcec','#fff25c']});g.leaf({base:[-.1,.7,0],dir:[-.6,.5,0],length:.55,width:.14,depth:.12,curve:0,colors:['#42dcec','#fff25c']});g.finish();
 return meta(v,{number:'06',name:'Voltik',kind:'ГРОЗОВОЙ ЗВЕРЁК',description:'Сине-фиолетовый зверь с длинными ушами, светящимися рунами и молниевым хвостом.',accent:'#fff06a',vfx:'volt',vfxName:'Дуги между рогами',vfxColors:['#fff25c','#65efff','#ffffff'],target:[0,1.7,0],distance:8.1,rig:{body:'body',head:'head',legs,tail:'tail',tailTip:'tailTip',extra:['earL','earR']}});
}

function noctilume(){
 const v=ctx();base(v,1.45);v.b('head','body',[0,.35,.38]);v.b('finL','head',[-.35,.08,-.12]);v.b('finR','head',[.35,.08,-.12]);v.b('crest','head',[0,.3,-.12]);v.b('tail','body',[0,-.32,-.22]);v.b('tailTip','tail',[0,-.35,-.28]);
 let g=volume(v,'body',.065);g.ellipsoid([0,-.03,0],[.34,.57,.34],(x,y,z)=>z>.12?'#4b478d':'#302d69');g.finish();g=volume(v,'head',.055);g.ellipsoid([0,0,0],[.49,.42,.43],(x,y,z)=>z>.15?'#454387':'#302c69');g.ellipsoid([0,-.15,.32],[.33,.19,.23],'#6663a0');g.finish();eye(v,'head',[-.22,.02,.4],.22,.285,'#96f4ff',.04);eye(v,'head',[.22,.02,.4],.22,.285,'#96f4ff',.04);smile(v,'head',[0,-.16,.51],.12,'#272651',.028);
 for(const[i,n]of['finL','finR'].entries()){const s=i?1:-1;g=volume(v,n,.06);for(let j=0;j<3;j++)g.leaf({base:[0,-j*.12,0],dir:[s*(1-j*.12),.7-j*.5,-.15-j*.12],length:1.25+j*.18,width:.26+j*.035,depth:.075,curve:.1,color:(t,u)=>t>.82?'#d7d4ff':Math.abs(u)>.75?'#8d9fff':j%2?'#655ac0':'#7774d5'});g.finish();}
 g=volume(v,'crest',.055);for(const s of[-1,0,1])g.leaf({base:[s*.12,0,0],dir:[s*.4,1,-.28],length:1.05-Math.abs(s)*.15,width:.19,depth:.07,curve:.08,color:t=>t>.75?'#d6c7ff':'#7165c5'});g.finish();
 g=volume(v,'tail',.06);for(const s of[-1,0,1])g.leaf({base:[s*.12,0,0],dir:[s*.65,-.65,-.5],length:1.15,width:.24,depth:.08,curve:.12,color:t=>t>.8?'#a4cfff':'#514caa'});g.finish();g=volume(v,'tailTip',.06);for(const s of[-1,1])g.leaf({base:[0,0,0],dir:[s*.55,-.8,-.35],length:1.05,width:.26,depth:.075,curve:.12,color:t=>t>.8?'#c1c8ff':'#655fc0'});g.finish();
 for(const[x,y,z]of[[-.3,.25,.35],[.33,.16,.35],[-.13,-.22,.36],[.1,.31,.3]])v.p('head',[x,y,z],[.045,.045,.04],'#d7f7ff',[0,0,.785],true);
 return meta(v,{number:'07',name:'Noctilume',kind:'ЗВЁЗДНЫЙ ДУХ',description:'Парящий дух с глазами-галактиками, лучистыми плавниками и звёздным хвостом.',accent:'#b5b0ff',vfx:'noctilume',vfxName:'Живые созвездия',vfxColors:['#b7a4ff','#83f8ef','#e1d8ff'],target:[0,1.45,0],distance:8.1,rig:{body:'body',head:'head',wings:['finL','finR'],tail:'tail',tailTip:'tailTip',extra:['crest']}});
}

function prismole(){
 const v=ctx();base(v,.92);v.b('head','body',[0,.06,.67]);const legs=legs4(v,.58,.45,-.2);v.b('tail','body',[0,-.12,-.76]);
 let g=volume(v,'body',.085);g.ellipsoid([0,0,-.1],[.75,.53,.86],(x,y,z)=>y>.18?'#5b4c75':'#413953');g.ellipsoid([-.38,.2,-.18],[.42,.34,.6],'#594a70');g.ellipsoid([.36,.22,-.2],[.43,.34,.62],'#4c4166');g.finish();g=volume(v,'head',.065);g.ellipsoid([0,0,0],[.68,.44,.54],(x,y,z)=>y<-.08?'#91829f':'#675776');g.ellipsoid([0,-.18,.4],[.5,.22,.28],'#a897ad');g.finish();eye(v,'head',[-.3,.04,.48],.21,.22,'#52cdef',.04);eye(v,'head',[.3,.04,.48],.21,.22,'#52cdef',.04);v.p('head',[0,-.12,.65],[.16,.11,.1],'#30293e');
 legs.forEach((n,i)=>{g=volume(v,n,.07);g.ellipsoid([0,-.14,0],[i<2?.34:.29,.36,.34],i<2?'#574967':'#40384e');g.ellipsoid([0,-.41,.16],[.36,.18,.38],'#383243');for(const x of[-.2,0,.2])g.crystal([x,-.46,.39],.28,.075,(t)=>'#b6a6c5',[0,.15]);g.finish();});
 const crystals=[[-.4,.4,-.43,.92,.21],[.02,.48,-.42,1.3,.26],[.4,.42,-.18,.82,.2],[-.28,.34,.16,.58,.17],[.29,.38,.22,.7,.18]],colors=['#59dff4','#7284ff','#bb78f1','#68e7e1','#b28cff'];g=volume(v,'body',.065);crystals.forEach(([x,y,z,h,w],i)=>g.crystal([x,y,z],h,w,(t,a,b)=>a+b>0?tone(colors[i],.4):colors[i],[i%2?.12:-.08,.03]));g.finish();g=volume(v,'tail',.07);g.tube([[0,0,0],[0,-.05,-.38]],[.24,.13],'#3d354e');g.crystal([0,0,-.32],.43,.13,'#aa7ce8');g.finish();
 return meta(v,{number:'08',name:'Prismole',kind:'КРИСТАЛЬНЫЙ ЗВЕРЁК',description:'Призматический зверь с огромными глазами, сияющей спиной и кристальными когтями.',accent:'#b394ff',vfx:'prism',vfxName:'Призменные геоды',vfxColors:['#64e8ff','#8b83ff','#df8cff','#ffb3ed'],target:[0,1.35,0],distance:8.1,rig:{body:'body',head:'head',legs,tail:'tail'}});
}

function aeronook(){
 const v=ctx();base(v,1.32);v.b('head','body',[0,.62,.54]);const legs=legs4(v,.37,.46,-.3);v.b('tail','body',[0,.08,-.77]);v.b('antlerL','head',[-.23,.32,-.08]);v.b('antlerR','head',[.23,.32,-.08]);v.b('earL','head',[-.36,.12,-.02]);v.b('earR','head',[.36,.12,-.02]);
 let g=volume(v,'body',.08);g.ellipsoid([0,0,-.12],[.54,.47,.74],(x,y,z)=>y<-.15?'#b9d9e5':'#e7f0ec');g.ellipsoid([0,.3,.35],[.36,.53,.36],'#e5efec');g.finish();
 const tufts=[[-.38,.22,-.52],[0,.37,-.55],[.36,.2,-.42],[-.43,.16,-.1],[.4,.2,.02],[-.32,.16,.33],[.28,.25,.35],[-.2,.48,.38],[.12,.52,.38],[-.3,-.12,-.35],[.35,-.12,-.18]];g=volume(v,'body',.07);for(const[i,p]of tufts.entries())g.sphere(p,.22+(i%3)*.025,i%2?'#edf5f0':'#d9eaf0');g.finish();
 g=volume(v,'head',.06);g.ellipsoid([0,0,0],[.46,.4,.42],(x,y,z)=>z>.18?'#f0f4e9':'#dbe9e9');g.ellipsoid([0,-.15,.32],[.34,.2,.24],'#f3f2df');g.finish();eye(v,'head',[-.21,.03,.39],.19,.245,'#7399cf',.038);eye(v,'head',[.21,.03,.39],.19,.245,'#7399cf',.038);smile(v,'head',[0,-.16,.52],.12,'#87949a',.028);
 legs.forEach((n,i)=>{g=volume(v,n,.065);g.tube([[0,0,0],[0,-.4,.02],[0,-.82,.08]],[.16,.105,.075],(x,y)=>y<-.45?'#c5e2eb':'#e4efec');g.sphere([0,-.12,0],.19,'#e9f2ee');g.sphere([0,-.72,.08],.13,'#d5e9ec');g.ellipsoid([0,-.9,.13],[.14,.16,.2],'#e7dcc0');g.finish();});
 for(const[i,n]of['earL','earR'].entries()){const s=i?1:-1;g=volume(v,n,.055);g.leaf({base:[0,0,0],dir:[s,0.25,-.08],length:.75,width:.22,depth:.1,curve:.05,colors:['#eef4ec','#d3e8ee']});g.leaf({base:[s*.06,.02,.07],dir:[s,.25,0],length:.52,width:.13,depth:.04,curve:.03,colors:['#9dd8ed','#c3e6ee']});g.finish();}
 for(const[i,n]of['antlerL','antlerR'].entries()){const s=i?1:-1;g=volume(v,n,.06);g.tube([[0,0,0],[s*.12,.38,0],[s*.32,.67,-.04],[s*.28,1.04,-.08],[s*.08,1.28,-.1]],[.105,.09,.075,.055,.015],(x,y)=>y>.75?'#c9f5fa':'#85d4e7');g.tube([[s*.16,.45,0],[s*.48,.68,.02],[s*.57,.98,0]],[.075,.055,.015],'#a8e8f2');g.tube([[s*.3,.76,-.04],[s*.05,.94,.02],[-s*.04,1.13,.03]],[.06,.04,.012],'#b7eef5');g.finish();}
 g=volume(v,'tail',.065);g.sphere([0,0,-.05],.32,'#e3eff0');g.sphere([0,.17,-.25],.25,'#eef5ef');g.sphere([0,-.12,-.29],.25,'#cde5ee');g.finish();
 for(const s of[-1,1]){for(let i=0;i<38;i++){const t=i/37*Math.PI*2.2,r=.25*(1-i/50);v.p('body',[s*.535,.02+Math.cos(t)*r,-.08+Math.sin(t)*r],[.055,.055,.055],'#a8d7e8');}}
 return meta(v,{number:'09',name:'Aeronook',kind:'ОБЛАЧНЫЙ ОЛЕНЬ',description:'Облачный олень с вьющейся шерстью, ледяными рогами и мягкими копытцами.',accent:'#b9eff4',vfx:'aero',vfxName:'Облачные завитки',vfxColors:['#e8ffff','#a5e4ef','#ffffff'],target:[0,1.85,0],distance:8.4,rig:{body:'body',head:'head',legs,tail:'tail',extra:['antlerL','antlerR','earL','earR']}});
}

function eclipseed(){
 const v=ctx();base(v,1.55);v.b('head','body',[0,0,0]);v.b('ringA','body',[0,0,0],[.38,0,.28]);v.b('ringB','body',[0,0,0],[-.65,.2,-.42]);
 let g=volume(v,'body',.075);g.sphere([0,0,0],.98,(x,y,z)=>{const lon=Math.atan2(z,x),lat=Math.asin(y/.99),crack=Math.abs(Math.sin(lon*4+Math.sin(lat*3)*1.6));if(crack<.12)return'#a551f2';if(crack<.2)return'#5d2a99';const stars=noise(x*9,y*9,z*9);return stars>.91?'#594185':stars>.78?'#251837':'#15111f';});g.finish();
 g=volume(v,'head',.065);for(let i=0;i<6;i++){const a=(i-2.5)*.42,x=Math.sin(a)*.7,y=-.62+Math.abs(a)*.08,z=Math.sqrt(Math.max(.1,.98**2-x*x-y*y))+.025;g.leaf({base:[x,y,z],dir:[-Math.sin(a)*.22,1,-.16],length:1.22-Math.abs(a)*.12,width:.25,depth:.09,curve:.08,color:(t,s)=>Math.abs(s)>.82?'#4e2a68':t>.85?'#35213f':'#211728'});}g.finish();
 ring(v,'ringA',1.38,'#7d203d','#ffd376',.09);ring(v,'ringB',1.23,'#531b42','#e9aa52',.085);
 for(const[bone,x]of[['ringA',1.38],['ringA',-1.38],['ringB',1.23],['ringB',-1.23]]){v.p(bone,[x,0,0],[.32,.065,.065],'#ffe69a',[0,0,0],true);v.p(bone,[x,0,0],[.065,.32,.065],'#ffe69a',[0,0,0],true);v.p(bone,[x,0,0],[.12,.12,.12],'#fff7ce',[0,0,.785],true);}
 for(const[x,y]of[[0,0],[-.34,.27],[.38,-.2],[-.22,-.4]]){const z=Math.sqrt(.98**2-x*x-y*y)+.04;v.p('head',[x,y,z],[.28,.045,.045],'#e5b3ff',[0,0,0],true);v.p('head',[x,y,z],[.045,.28,.045],'#e5b3ff',[0,0,0],true);v.p('head',[x,y,z+.015],[.08,.08,.05],'#fff1ff',[0,0,.785],true);}
 return meta(v,{number:'10',name:'Eclipseed',kind:'СЕМЯ ЗАТМЕНИЯ',description:'Обсидиановая сфера с галактическими трещинами, золотыми орбитами и звёздными вспышками.',accent:'#d1a0ff',vfx:'eclipse',vfxName:'Гравитационная линза',vfxColors:['#c184ff','#ffd378','#8e55d4'],target:[0,1.55,0],distance:7.6,rig:{body:'body',head:'head',extra:['ringA','ringB']}});
}

module.exports=[mosswisp(),flaremop(),drizzle,craggle(),bloombyte(),voltik(),noctilume(),prismole(),aeronook(),eclipseed()];
