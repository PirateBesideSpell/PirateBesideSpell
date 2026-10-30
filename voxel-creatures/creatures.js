const TAU = Math.PI;
function ctx() {
  const bones = [], parts = [];
  return {
    bones, parts,
    b(name, parent, pos) { bones.push({ name, parent, pos }); },
    p(bone, pos, size, color, rot = [0, 0, 0], glow = false) { parts.push({ bone, pos, size, color, rot, glow, shape: 'box' }); },
    c(bone, pos, size, color, rot = [0, 0, 0], glow = true) { parts.push({ bone, pos, size, color, rot, glow, shape: 'crystal' }); },
  };
}
function eyes(v, bone, x, y, z, iris, s = .26) {
  for (const side of [-1, 1]) {
    v.p(bone, [side * x, y, z], [s * 1.22, s * 1.28, .12], '#10151b');
    v.p(bone, [side * x, y, z + .072], [s * .72, s * .82, .065], iris, [0, 0, 0], true);
    v.p(bone, [side * x - s * .17, y + s * .22, z + .112], [s * .2, s * .22, .035], '#ffffff', [0, 0, 0], true);
  }
}
function base(v, bodyY = 1) { v.b('root', null, [0, 0, 0]); v.b('body', 'root', [0, bodyY, 0]); }
function quad(v, bodyY, headPos, legX = .52, legZ = .43, legY = -.42) {
  base(v, bodyY); v.b('head', 'body', headPos);
  const legs = [];
  for (const [name, x, z] of [['legFL', -legX, legZ], ['legFR', legX, legZ], ['legBL', -legX, -legZ], ['legBR', legX, -legZ]]) { v.b(name, 'body', [x, legY, z]); legs.push(name); }
  return legs;
}
function meta(v, data) { return { ...data, bones: v.bones, parts: v.parts }; }

function mosswisp() {
  const v = ctx(); base(v, 1.05); v.b('head', 'body', [0, .65, .08]);
  for (const [n, x] of [['legL', -.27], ['legR', .27]]) v.b(n, 'body', [x, -.63, .08]);
  for (const [n, x] of [['armL', -.53], ['armR', .53]]) v.b(n, 'body', [x, .08, 0]);
  v.b('leafL', 'head', [-.3, .48, 0]); v.b('leafR', 'head', [.3, .48, 0]);
  v.p('body', [0, 0, 0], [.86, 1.02, .72], '#35583b'); v.p('body', [0, .12, .05], [.72, .8, .76], '#547947');
  v.p('body', [-.38, .15, .02], [.18, .7, .78], '#698d50'); v.p('body', [.34, -.1, .03], [.2, .54, .75], '#294c38');
  v.p('body', [0, -.05, .41], [.48, .58, .1], '#759658'); v.p('body', [0, -.03, .48], [.18, .25, .06], '#b7e379', [0, 0, .785], true);
  for (const n of ['legL', 'legR']) { v.p(n, [0, -.15, .02], [.36, .4, .42], '#3b5437'); v.p(n, [0, -.32, .15], [.42, .18, .58], '#2b4534'); }
  for (const [i, n] of ['armL', 'armR'].entries()) { const s = i ? 1 : -1; v.p(n, [s * .12, -.12, 0], [.24, .62, .25], '#3e5c3b', [0, 0, s * -.25]); v.p(n, [s * .25, -.36, .02], [.34, .2, .32], '#62814a'); }
  v.p('head', [0, 0, 0], [1.12, .82, .82], '#63844d'); v.p('head', [0, .23, -.03], [.98, .38, .85], '#789a57');
  v.p('head', [0, -.08, .43], [.82, .46, .12], '#c0c58b'); v.p('head', [0, -.3, .47], [.56, .12, .1], '#9ca773'); eyes(v, 'head', .25, .04, .48, '#a8f27c', .24);
  v.p('head', [-.51, .05, .05], [.18, .46, .68], '#3e653f'); v.p('head', [.49, .2, -.05], [.2, .4, .62], '#8ca55b');
  for (const [i, n] of ['leafL', 'leafR'].entries()) { const s = i ? 1 : -1; v.p(n, [s * .14, .1, 0], [.5, .16, .3], '#85b85c', [0, s * .25, s * .45]); v.p(n, [s * .33, .27, -.03], [.46, .14, .26], '#a2cb69', [0, s * -.2, s * .75]); v.p(n, [0, .32, 0], [.16, .55, .18], '#466b3f', [0, 0, s * -.25]); }
  return meta(v, { number: '01', name: 'Mosswisp', kind: 'ЛЕСНОЙ ДУХ', description: 'Маленький хранитель рощи с лиственной короной и тёплым зелёным сиянием.', accent: '#9be76d', vfx: 'moss', vfxName: 'Танец спор', vfxColors: ['#9cff75', '#e1ff9a', '#4ddb93'], target: [0, 1.25, 0], distance: 7.2, rig: { body: 'body', head: 'head', legs: ['legL', 'legR'], arms: ['armL', 'armR'], extra: ['leafL', 'leafR'] } });
}

function flaremop() {
  const v = ctx(), legs = quad(v, .92, [0, .56, .32], .45, .36, -.38); v.b('tail', 'body', [0, .12, -.55]); v.b('tailTip', 'tail', [0, .28, -.45]);
  for (const [n, x] of [['tuftL', -.3], ['tuftR', .3]]) v.b(n, 'head', [x, .48, -.05]);
  v.p('body', [0, 0, 0], [1.18, .98, 1.0], '#a73c25'); v.p('body', [0, .14, .03], [1.28, .7, 1.05], '#e35c2f'); v.p('body', [0, -.12, .52], [.7, .58, .12], '#ffd08a');
  for (const [i, n] of legs.entries()) { const front = i < 2; v.p(n, [0, -.18, 0], [.42, .48, .44], front ? '#c84c29' : '#8e3526'); v.p(n, [0, -.39, .09], [.48, .2, .54], '#f4aa60'); }
  v.p('head', [0, 0, 0], [1.18, .88, .9], '#e96532'); v.p('head', [0, .24, -.02], [1.0, .42, .86], '#f27b37');
  v.p('head', [0, -.17, .47], [.76, .4, .18], '#ffd69a'); v.p('head', [0, -.1, .59], [.22, .16, .12], '#492b2a'); eyes(v, 'head', .29, .08, .47, '#ffbf45', .24);
  for (const [i, n] of ['tuftL', 'tuftR'].entries()) { const s = i ? 1 : -1; v.p(n, [0, .05, 0], [.34, .48, .36], '#f28a38', [0, 0, s * -.28]); v.p(n, [s * .07, .35, 0], [.25, .42, .28], '#ffb43e', [0, 0, s * -.35], true); v.p(n, [s * .12, .58, 0], [.16, .3, .2], '#ffe26f', [0, 0, s * -.4], true); }
  v.p('tail', [0, .05, -.15], [.48, .48, .7], '#b64327', [-.35, 0, 0]); v.p('tail', [0, .25, -.42], [.55, .55, .55], '#f07431', [0, 0, .15]);
  v.p('tailTip', [0, .05, -.1], [.62, .72, .58], '#ff9b35', [0, 0, .15], true); v.p('tailTip', [0, .38, -.12], [.4, .6, .4], '#ffd54d', [0, 0, -.15], true); v.p('tailTip', [0, .68, -.1], [.22, .4, .25], '#fff0８0'.replace('８', '8'), [0, 0, -.2], true);
  return meta(v, { number: '02', name: 'Flaremop', kind: 'ОГНЕННЫЙ ЗВЕРЁК', description: 'Пушистый искродух с жарким хвостом и озорными огненными ушами.', accent: '#ff9b45', vfx: 'flare', vfxName: 'Искры жара', vfxColors: ['#ff6a2d', '#ffc44f', '#fff0a0'], target: [0, 1.2, 0], distance: 7.3, rig: { body: 'body', head: 'head', legs, tail: 'tail', tailTip: 'tailTip', extra: ['tuftL', 'tuftR'] } });
}

function drizzlefin() {
  const v = ctx(); base(v, 1.35); v.b('head', 'body', [0, .02, .58]); v.b('wingL', 'body', [-.5, 0, 0]); v.b('wingR', 'body', [.5, 0, 0]); v.b('tail', 'body', [0, 0, -.68]); v.b('tailTip', 'tail', [0, 0, -.72]);
  v.p('body', [0, 0, 0], [1.18, .46, 1.45], '#287fa5'); v.p('body', [0, .18, -.05], [.82, .22, 1.15], '#4fb7c6'); v.p('body', [0, -.22, .08], [.8, .12, 1.1], '#b6e5dc');
  for (const [i, n] of ['wingL', 'wingR'].entries()) { const s = i ? 1 : -1; v.p(n, [s * .42, 0, -.02], [1.0, .2, 1.22], '#359db6'); v.p(n, [s * 1.0, .015, -.16], [.72, .16, .92], '#2a8fac'); v.p(n, [s * 1.42, .02, -.35], [.42, .12, .58], '#216e94'); v.p(n, [s * .48, -.11, .12], [.85, .08, .8], '#8bd7d2'); v.p(n, [s * 1.05, -.08, -.13], [.55, .06, .55], '#63bfc5'); }
  v.p('head', [0, 0, 0], [1.0, .42, .62], '#4aa9bb'); v.p('head', [0, -.19, .08], [.72, .1, .5], '#c1e9df'); eyes(v, 'head', .28, .12, .3, '#153b5b', .2);
  v.p('head', [0, -.08, .34], [.36, .06, .06], '#163e54'); for (const s of [-1, 1]) v.p('head', [s * .42, .18, -.04], [.14, .22, .42], '#76cbd0', [0, 0, s * .2]);
  v.p('tail', [0, 0, -.36], [.18, .16, .82], '#2b829f'); v.p('tailTip', [0, .03, -.35], [.13, .13, .75], '#246c8d'); v.p('tailTip', [0, .05, -.77], [.32, .1, .32], '#5bb7c0', [0, .785, 0]);
  return meta(v, { number: '03', name: 'Drizzlefin', kind: 'НЕБЕСНЫЙ СКАТ', description: 'Плавный парящий скат с широкими плавниками. Без капель — только потоки воды.', accent: '#64e1e4', vfx: 'drizzle', vfxName: 'Водные ленты · без капель', vfxColors: ['#62e4ed', '#9cf8ec'], target: [0, 1.25, 0], distance: 8.1, rig: { body: 'body', head: 'head', wings: ['wingL', 'wingR'], tail: 'tail', tailTip: 'tailTip' } });
}

function craggle() {
  const v = ctx(), legs = quad(v, .9, [0, .28, .78], .58, .47, -.38); v.b('tail', 'body', [0, -.05, -.8]);
  v.p('body', [0, 0, 0], [1.48, .98, 1.55], '#3e4b43'); v.p('body', [0, .35, -.12], [1.3, .55, 1.35], '#586148'); v.p('body', [-.55, .12, .1], [.38, .65, 1.4], '#4a5545'); v.p('body', [.5, .05, -.15], [.42, .7, 1.25], '#35463e');
  const rocks = [[-.48,.48,-.45,.48],[.05,.57,-.55,.55],[.48,.42,-.2,.42],[-.35,.44,.2,.4],[.25,.52,.25,.38]];
  for (const [x,y,z,s] of rocks) v.p('body', [x,y,z], [s,.24,s*1.1], '#6f7654', [0,.2,0]);
  const crystals = [[-.48,.82,-.5,.5,1.25,.5],[.05,.98,-.48,.62,1.65,.62],[.48,.78,-.25,.48,1.15,.48],[-.38,.68,.18,.38,.9,.4],[.25,.73,.28,.4,1.0,.4]];
  crystals.forEach(([x,y,z,w,h,d],i)=>v.c('body',[x,y,z],[w,h,d],i%2?'#27ce89':'#59ef9c',[.12,0,i%2?-.18:.18]));
  v.p('head', [0, 0, 0], [1.3, .86, .95], '#626c50'); v.p('head', [0, -.22, .48], [1.02, .38, .28], '#9aa173'); v.p('head', [0, .03, .54], [.5, .34, .3], '#777c5d'); eyes(v, 'head', .36, .12, .48, '#45f2aa', .28);
  for (const s of [-1,1]) { v.p('head',[s*.52,.26,.02],[.24,.26,.6],'#4c5946'); v.c('head',[s*.34,-.33,.62],[.13,.25,.13],'#4ff0a5'); }
  legs.forEach((n,i)=>{v.p(n,[0,-.16,0],[.58,.56,.6],i<2?'#535e49':'#414d42');v.p(n,[0,-.42,.12],[.66,.2,.7],'#343f39');for(const x of [-.2,0,.2])v.p(n,[x,-.46,.42],[.16,.18,.24],'#788065');});
  v.p('tail',[0,-.05,-.25],[.55,.42,.65],'#3a483e');v.c('tail',[0,.18,-.42],[.32,.6,.32],'#32c889');
  return meta(v, { number:'04',name:'Craggle',kind:'КАМЕННЫЙ СТРАЖ',description:'Мохнатый каменный зверь с изумрудными кристаллами на спине.',accent:'#59efa2',vfx:'craggle',vfxName:'Изумрудные осколки',vfxColors:['#4cf0a0','#b5ff77','#25b985'],target:[0,1.25,0],distance:8.2,rig:{body:'body',head:'head',legs,tail:'tail'} });
}

function bloombyte() {
  const v = ctx(); base(v, 1.0); v.b('head','body',[0,.7,.06]); for(const[n,x]of[['legL',-.25],['legR',.25]])v.b(n,'body',[x,-.58,0]);for(const[n,x]of[['armL',-.52],['armR',.52]])v.b(n,'body',[x,.12,0]);v.b('earL','head',[-.3,.5,0]);v.b('earR','head',[.3,.5,0]);v.b('tail','body',[0,-.1,-.4]);
  v.p('body',[0,0,0],[.88,.94,.7],'#4d9e8e');v.p('body',[0,.05,.37],[.62,.62,.1],'#173c42');v.p('body',[0,.06,.44],[.4,.36,.05],'#8ff5cf',[0,0,0],true);v.p('body',[.09,.06,.48],[.14,.14,.04],'#ff9fcf',[0,0,0],true);
  v.p('head',[0,0,0],[1.08,.84,.82],'#80d5b7');v.p('head',[0,.25,-.02],[.88,.34,.78],'#a6e4c7');v.p('head',[0,-.1,.43],[.78,.42,.1],'#254b50');eyes(v,'head',.25,.01,.49,'#ff9fd2',.24);v.p('head',[0,-.23,.51],[.14,.08,.05],'#ffacd4');
  for(const[i,n]of['earL','earR'].entries()){const s=i?1:-1;v.p(n,[0,.22,0],[.32,.86,.34],'#73c9ad',[0,0,s*-.12]);v.p(n,[0,.25,.18],[.14,.58,.05],'#f2a4ca',[0,0,s*-.12]);v.p(n,[s*.05,.68,0],[.27,.26,.3],'#b0ead1',[0,0,s*-.12]);}
  for(const n of['legL','legR']){v.p(n,[0,-.13,0],[.34,.4,.38],'#397e78');v.p(n,[0,-.34,.13],[.43,.2,.58],'#a1e1c4');}for(const n of['armL','armR']){v.p(n,[0,-.14,0],[.27,.48,.3],'#5eb29d');v.p(n,[0,-.37,.02],[.3,.18,.34],'#f0a4c9');}v.p('tail',[0,0,-.2],[.4,.4,.4],'#efa1c7');
  for(const s of[-1,1]){v.p('head',[s*.57,.02,0],[.16,.4,.46],'#316d70');v.p('head',[s*.61,.02,.05],[.08,.2,.25],'#ff9dcb',[0,0,0],true);}
  return meta(v,{number:'05',name:'Bloombyte',kind:'ЦИФРОВОЙ ЗАЙЦА',description:'Неоновый зверёк из цветущего цифрового сада с пиксельным сердечком.',accent:'#8ff3ce',vfx:'bloom',vfxName:'Глитч-цветение',vfxColors:['#83f5cd','#ff91cc','#b6a2ff'],target:[0,1.4,0],distance:7.4,rig:{body:'body',head:'head',legs:['legL','legR'],arms:['armL','armR'],tail:'tail',extra:['earL','earR']}});
}

function voltik() {
  const v=ctx(),legs=quad(v,1.0,[0,.58,.42],.43,.4,-.42);v.b('tail','body',[0,.16,-.58]);v.b('tailTip','tail',[.18,.35,-.5]);for(const[n,x]of[['earL',-.32],['earR',.32]])v.b(n,'head',[x,.48,-.02]);
  v.p('body',[0,0,0],[1.0,.86,1.18],'#d9a82f');v.p('body',[0,.16,0],[1.05,.6,1.1],'#f3ca45');v.p('body',[0,-.05,.61],[.58,.5,.12],'#fff0ac');
  legs.forEach((n,i)=>{v.p(n,[0,-.18,0],[.36,.5,.4],i<2?'#e8b83c':'#c28f2c');v.p(n,[0,-.4,.1],[.42,.2,.5],'#fff0ae');});
  v.p('head',[0,0,0],[1.1,.88,.88],'#f2c845');v.p('head',[0,.25,-.02],[.88,.36,.82],'#ffdb55');v.p('head',[0,-.18,.47],[.72,.36,.2],'#fff1b0');v.p('head',[0,-.1,.6],[.18,.14,.12],'#3c3130');eyes(v,'head',.29,.08,.46,'#4fd9ff',.24);
  for(const[i,n]of['earL','earR'].entries()){const s=i?1:-1;v.p(n,[0,.08,0],[.36,.52,.36],'#eebc39',[0,0,s*-.15]);v.p(n,[s*.04,.39,0],[.25,.36,.28],'#3f3b39',[0,0,s*-.2]);v.p(n,[0,.05,.2],[.14,.28,.05],'#ffe889');}
  for(const s of[-1,1]){v.p('head',[s*.48,-.08,.3],[.22,.12,.12],'#fff276',[0,0,s*.35],true);v.p('head',[s*.51,-.18,.28],[.18,.1,.1],'#ffe44f',[0,0,s*-.35],true);}
  v.p('head',[0,.34,.43],[.13,.25,.08],'#fff27a',[0,0,-.3],true);v.p('head',[.07,.23,.44],[.22,.11,.08],'#fff27a',[0,0,.25],true);
  v.p('tail',[0,.08,-.2],[.34,.34,.72],'#e9b632',[-.45,0,0]);v.p('tail',[.13,.28,-.47],[.4,.4,.55],'#ffdb45',[.4,0,-.3],true);v.p('tailTip',[0,.12,-.1],[.46,.46,.6],'#fff06a',[0,0,.35],true);v.p('tailTip',[-.13,.38,-.25],[.3,.52,.4],'#fff4a0',[0,0,-.4],true);
  return meta(v,{number:'06',name:'Voltik',kind:'ГРОЗОВОЙ ЛИС',description:'Быстрый золотой зверёк, накапливающий заряд в молниевом хвосте.',accent:'#ffe768',vfx:'volt',vfxName:'Живые молнии',vfxColors:['#fff179','#8feaff','#ffffff'],target:[0,1.3,0],distance:7.6,rig:{body:'body',head:'head',legs,tail:'tail',tailTip:'tailTip',extra:['earL','earR']}});
}

function noctilume() {
  const v=ctx(),legs=quad(v,1.18,[0,.7,.38],.38,.42,-.52);v.b('tail','body',[0,.15,-.6]);v.b('tailTip','tail',[0,.22,-.65]);for(const[n,x]of[['earL',-.32],['earR',.32]])v.b(n,'head',[x,.48,0]);
  v.p('body',[0,0,0],[.9,1.0,1.15],'#292344');v.p('body',[0,.2,-.05],[.94,.62,1.05],'#39305b');v.p('body',[0,.12,.6],[.42,.5,.1],'#66519a');v.c('body',[0,.1,.68],[.25,.35,.12],'#7af4ef');
  legs.forEach((n,i)=>{v.p(n,[0,-.25,0],[.28,.7,.32],i<2?'#342b52':'#25213e');v.p(n,[0,-.57,.08],[.34,.18,.43],'#716099');v.p(n,[0,-.15,.18],[.1,.1,.06],'#9b8cff',[0,0,.785],true);});
  v.p('head',[0,0,0],[1.02,.86,.84],'#3d325f');v.p('head',[0,.23,-.03],[.84,.38,.8],'#4d3e72');v.p('head',[0,-.18,.43],[.7,.35,.16],'#71668b');v.p('head',[0,-.12,.54],[.16,.12,.1],'#19192c');eyes(v,'head',.28,.06,.44,'#83f5f1',.25);
  for(const[i,n]of['earL','earR'].entries()){const s=i?1:-1;v.p(n,[0,.1,0],[.34,.58,.34],'#392e59',[0,0,s*-.16]);v.p(n,[s*.04,.46,0],[.23,.38,.26],'#6e5590',[0,0,s*-.2]);v.p(n,[0,.1,.19],[.13,.34,.05],'#aa75c2');}
  const moon=[[0,.34],[.09,.28],[.13,.17],[.09,.06],[0,.02],[-.07,.08]];moon.forEach(([x,y])=>v.p('head',[x,y,.45],[.1,.1,.06],'#c0fff2',[0,0,0],true));
  for(const[x,y,z]of[[-.3,.2,.43],[.36,-.05,.43],[-.42,.08,.15],[.2,.32,.4]])v.p('head',[x,y,z],[.08,.08,.05],'#a896ff',[0,0,.785],true);
  v.p('tail',[0,.05,-.3],[.26,.28,.75],'#30274c',[-.25,0,0]);v.p('tailTip',[0,.15,-.3],[.3,.32,.72],'#493866',[-.35,0,0]);v.p('tailTip',[0,.38,-.58],[.42,.5,.45],'#8061a4',[0,0,.2]);v.c('tailTip',[0,.55,-.58],[.22,.4,.22],'#94f6eb');
  return meta(v,{number:'07',name:'Noctilume',kind:'ЛУННЫЙ ДУХ',description:'Тихий ночной зверь со звёздной шерстью и светящейся лунной отметиной.',accent:'#b29aff',vfx:'noctilume',vfxName:'Лунная орбита',vfxColors:['#ae91ff','#83f8ef','#e1d8ff'],target:[0,1.45,0],distance:7.8,rig:{body:'body',head:'head',legs,tail:'tail',tailTip:'tailTip',extra:['earL','earR']}});
}

function prismole() {
  const v=ctx(),legs=quad(v,.88,[0,.3,.76],.57,.45,-.36);v.b('tail','body',[0,-.08,-.78]);
  v.p('body',[0,0,0],[1.45,.94,1.5],'#39344f');v.p('body',[0,.3,-.12],[1.28,.55,1.32],'#4d4568');v.p('body',[-.53,.1,.05],[.35,.62,1.25],'#554b6b');v.p('body',[.52,.06,-.12],[.36,.65,1.2],'#302d49');
  const crystals=[[-.48,.8,-.46,.48,1.25,.5],[.02,1.0,-.48,.62,1.65,.62],[.47,.83,-.25,.48,1.2,.48],[-.35,.68,.2,.4,.9,.4],[.28,.74,.28,.42,1.05,.42]];crystals.forEach(([x,y,z,w,h,d],i)=>v.c('body',[x,y,z],[w,h,d],['#54dffc','#667cff','#b879ff','#68f2ef','#b795ff'][i],[.12,0,i%2?-.18:.18]));
  v.p('head',[0,0,0],[1.25,.82,.94],'#514968');v.p('head',[0,-.22,.46],[.92,.36,.28],'#8a7f9c');v.p('head',[0,-.08,.62],[.24,.2,.18],'#242335');eyes(v,'head',.34,.09,.47,'#62dcff',.28);
  legs.forEach((n,i)=>{v.p(n,[0,-.16,0],[.58,.56,.6],i<2?'#49415e':'#373247');v.p(n,[0,-.4,.12],[.66,.22,.68],'#302d41');for(const x of[-.22,0,.22])v.c(n,[x,-.43,.43],[.17,.2,.42],i<2?'#9188bb':'#69617e',[Math.PI/2,0,0],false);});
  for(const s of[-1,1]){v.c('head',[s*.49,.02,.42],[.16,.28,.1],s<0?'#68e6ff':'#b788ff');v.c('body',[s*.62,.05,.38],[.15,.34,.15],'#63dff5');}
  v.p('tail',[0,-.08,-.22],[.42,.32,.58],'#332f47');v.c('tail',[0,.08,-.43],[.26,.48,.26],'#9b73ef');
  return meta(v,{number:'08',name:'Prismole',kind:'КРИСТАЛЬНЫЙ КРОТ',description:'Червоточинец глубин с призматической спиной и мощными когтями.',accent:'#8fa2ff',vfx:'prism',vfxName:'Призменный рой',vfxColors:['#64e8ff','#7d83ff','#d18cff','#ffb3ed'],target:[0,1.25,0],distance:8.2,rig:{body:'body',head:'head',legs,tail:'tail'}});
}

function aeronook() {
  const v=ctx();base(v,1.08);v.b('head','body',[0,.68,.1]);v.b('wingL','body',[-.48,.18,0]);v.b('wingR','body',[.48,.18,0]);v.b('tail','body',[0,-.25,-.4]);for(const[n,x]of[['legL',-.23],['legR',.23]])v.b(n,'body',[x,-.65,.08]);v.b('crest','head',[0,.48,-.05]);
  v.p('body',[0,0,0],[.9,1.05,.82],'#799fb6');v.p('body',[0,.12,.35],[.72,.78,.22],'#d9e6d8');v.p('body',[0,-.18,.46],[.5,.42,.1],'#f3edcf');
  v.p('head',[0,0,0],[1.08,.84,.84],'#d6e4d9');v.p('head',[0,.24,-.04],[.92,.36,.78],'#edf0db');for(const s of[-1,1])v.p('head',[s*.4,.02,.38],[.34,.46,.12],'#6f93ad');eyes(v,'head',.27,.05,.45,'#4cbfec',.25);
  v.c('head',[0,-.16,.59],[.26,.24,.38],'#efb45e',[Math.PI/2,0,0],false);v.p('head',[0,-.31,.44],[.38,.12,.12],'#9eb9bd');
  for(const[i,n]of['wingL','wingR'].entries()){const s=i?1:-1;v.p(n,[s*.25,0,0],[.65,.42,.8],'#648da9',[0,0,s*-.12]);v.p(n,[s*.65,-.1,-.06],[.55,.26,.9],'#517b9b',[0,0,s*-.18]);v.p(n,[s*.92,-.25,-.13],[.38,.2,.75],'#3e6788',[0,0,s*-.3]);v.p(n,[s*.54,-.25,.28],[.55,.16,.45],'#a9c8ce',[0,0,s*-.15]);}
  for(const n of['legL','legR']){v.p(n,[0,-.15,0],[.18,.4,.2],'#54728a');v.p(n,[0,-.36,.16],[.36,.14,.5],'#d5aa61');}
  v.p('tail',[0,-.05,-.3],[.62,.18,.72],'#4f7897',[-.2,0,0]);for(const x of[-.22,0,.22])v.p('tail',[x,-.1,-.65],[.18,.14,.55],'#789fb1',[-.25,0,0]);
  v.p('crest',[0,.15,0],[.18,.5,.22],'#749db2',[0,0,-.15]);v.p('crest',[-.18,.08,0],[.16,.38,.2],'#9dbbc2',[0,0,.35]);v.p('crest',[.18,.08,0],[.16,.38,.2],'#9dbbc2',[0,0,-.35]);
  return meta(v,{number:'09',name:'Aeronook',kind:'ВЕТРЯНАЯ СОВА',description:'Лёгкий облачный странник с широкими крыльями и воздушными потоками.',accent:'#a3e7ed',vfx:'aero',vfxName:'Потоки ветра',vfxColors:['#d8ffff','#8edce8','#ffffff'],target:[0,1.35,0],distance:7.7,rig:{body:'body',head:'head',legs:['legL','legR'],wings:['wingL','wingR'],tail:'tail',extra:['crest']}});
}

function eclipseed() {
  const v=ctx();base(v,.95);v.b('head','body',[0,.62,.04]);for(const[n,x]of[['legL',-.24],['legR',.24]])v.b(n,'body',[x,-.58,0]);for(const[n,x]of[['armL',-.48],['armR',.48]])v.b(n,'body',[x,.05,0]);v.b('leafL','head',[-.18,.48,0]);v.b('leafR','head',[.18,.48,0]);
  v.p('body',[0,0,0],[.84,.98,.72],'#211c30');v.p('body',[0,.08,.02],[.72,.74,.75],'#342744');v.p('body',[0,-.08,.4],[.46,.52,.1],'#171522');v.c('body',[0,-.02,.48],[.25,.38,.12],'#c486ff');
  v.p('head',[0,0,0],[1.0,.8,.8],'#2b223b');v.p('head',[0,.22,-.03],[.82,.34,.76],'#3b2c4d');v.p('head',[0,-.14,.42],[.72,.38,.12],'#171521');eyes(v,'head',.25,.01,.45,'#ffd875',.23);v.p('head',[0,-.25,.47],[.12,.07,.04],'#ba8cff');
  for(const[i,n]of['leafL','leafR'].entries()){const s=i?1:-1;v.p(n,[s*.15,.12,0],[.52,.18,.34],'#50345e',[0,s*.2,s*.48]);v.p(n,[s*.35,.29,-.02],[.48,.15,.28],'#724578',[0,s*-.15,s*.72]);v.p(n,[s*.42,.38,.01],[.28,.08,.2],'#e0aa67',[0,0,s*.7],true);}
  for(const n of['legL','legR']){v.p(n,[0,-.15,0],[.3,.42,.34],'#251e34');v.p(n,[0,-.36,.12],[.4,.18,.5],'#58405e');}for(const[i,n]of['armL','armR'].entries()){const s=i?1:-1;v.p(n,[s*.08,-.15,0],[.24,.5,.28],'#372842',[0,0,s*-.2]);v.p(n,[s*.15,-.38,.02],[.28,.18,.32],'#8d5c73');}
  for(let i=0;i<8;i++){const a=i/8*TAU*2;v.p('head',[Math.cos(a)*.17,.26+Math.sin(a)*.17,.44],[.075,.075,.05],i<5?'#ffd887':'#9c69cf',[0,0,a],true);}
  return meta(v,{number:'10',name:'Eclipseed',kind:'ДУХ ЗАТМЕНИЯ',description:'Загадочный росток тьмы с золотым затмением и фиолетовым сердцем.',accent:'#d1a0ff',vfx:'eclipse',vfxName:'Орбита затмения',vfxColors:['#c184ff','#ffd378','#6e4aa5'],target:[0,1.25,0],distance:7.2,rig:{body:'body',head:'head',legs:['legL','legR'],arms:['armL','armR'],extra:['leafL','leafR']}});
}

module.exports = [mosswisp(), flaremop(), drizzlefin(), craggle(), bloombyte(), voltik(), noctilume(), prismole(), aeronook(), eclipseed()];
