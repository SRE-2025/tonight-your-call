(function(root){
'use strict';
const date='2026-10-23';
const venues={
 docs:{id:'docs',name:'Doc’s Backyard Grill',short:'Doc’s',address:'5207 Brodie Lane, Suite 100, Sunset Valley',artist:'Nick Moceri',time:'7–10 p.m.',start:19,end:22,description:'Dinner and Americana/country on the outdoor patio. Burgers, tacos, wings, and a relaxed backyard setting.',tags:['OUTDOOR MUSIC','NO COVER','PATIO DINNER'],phone:'5128925200',website:'https://eatdrinkdocs.com/',schedule:'https://eatdrinkdocs.com/events',map:'https://www.google.com/maps/search/?api=1&query=Docs+Backyard+Grill+5207+Brodie+Lane',cover:'No cover is explicitly confirmed on Doc’s website.',lineup:'Nick Moceri plays Americana and country, 7–10 p.m.'},
 abgb:{id:'abgb',name:'The ABGB',short:'ABGB',address:'1305 West Oltorf Street, Austin',artist:'Friday Night Rock & Roll',time:'7–10 p.m. event',start:19,end:21.5,description:'Pizza, house-brewed beer, an outdoor beer garden, and bands on the indoor stage. Plan to go inside for the performance; patio audibility is not confirmed.',tags:['INDOOR STAGE','OUTDOOR BEER GARDEN','COVER UNCONFIRMED'],phone:'5122982242',website:'https://theabgb.com/',schedule:'https://theabgb.com/events',map:'https://www.google.com/maps/search/?api=1&query=The+ABGB+1305+West+Oltorf',cover:'Tonight’s show is on ABGB’s own calendar. The listing does not state a cover charge; call before going if free admission matters.',lineup:'7:00 Forever Miles · 8:00 Billy King and the Bad, Bad, Bad · 9:00 Lewd Dudes · 9:30 DJ Sam. All times p.m.'}
};
const questions=[
 {id:'food',kicker:'01 / THE FIRST BITE',title:'What sounds delicious?',description:'Let your stomach have the opening statement.',options:[
  {id:'pizza',title:'Pizza. That is my love language.',detail:'A pizza to share and a brewery kind of evening.',scores:{docs:0,abgb:4}},
  {id:'grill',title:'Burgers, tacos, and patio food.',detail:'A proper dinner and something good to snack on.',scores:{docs:4,abgb:0}},
  {id:'either',title:'The company is the main course.',detail:'I can happily make either menu work.',scores:{docs:1,abgb:1}}]},
 {id:'music',kicker:'02 / PICK THE SOUNDTRACK',title:'What’s our Friday sound?',description:'Two actual shows tonight. Two different ways to get into the weekend.',options:[
  {id:'rock',title:'A little rock & roll, please.',detail:'A three-band bill, then a DJ at 9:30.',scores:{docs:0,abgb:4}},
  {id:'country',title:'Give me country and Americana.',detail:'Nick Moceri playing a patio set.',scores:{docs:4,abgb:0}},
  {id:'either',title:'Surprise me. I just want live music.',detail:'The place and the company can break the tie.',scores:{docs:1,abgb:1}}]},
 {id:'outside',kicker:'03 / SET THE SCENE',title:'How outdoorsy is this date?',description:'The little difference that matters: Doc’s music is on the patio. ABGB has a beer garden, but its stage is indoors.',options:[
  {id:'all',title:'Outside for dinner AND the music.',detail:'Find us a patio table. I want to stay there.',scores:{docs:4,abgb:0}},
  {id:'move',title:'Patio first. Inside for the band.',detail:'I’m happy moving between a beer garden and a show.',scores:{docs:0,abgb:3}},
  {id:'either',title:'Wherever the night takes us.',detail:'An indoor stage or an outdoor set both work.',scores:{docs:1,abgb:1}}]},
 {id:'cover',kicker:'04 / THE LITTLE FINE PRINT',title:'Any cover-charge rules?',description:'Doc’s explicitly says no cover. ABGB’s listing doesn’t say whether tonight is free.',options:[
  {id:'free',title:'Free music is a must.',detail:'Let’s stick with confirmed no-cover admission.',scores:{docs:3,abgb:0}},
  {id:'check',title:'We can call ABGB before we go.',detail:'I’d consider it once we know the cover.',scores:{docs:0,abgb:0}},
  {id:'flex',title:'That won’t decide my night.',detail:'Pick my vibe; we’ll confirm the cover if needed.',scores:{docs:0,abgb:0}}]},
 {id:'arrival',kicker:'05 / MAKE AN ENTRANCE',title:'When could we get there?',description:'Pick an arrival time, not when we leave home. Both events start at 7; ABGB switches to a DJ at 9:30.',options:[
  {id:'seven',title:'By about 7:00.',detail:'Dinner and the beginning of the show.',time:19,scores:{docs:1,abgb:1}},
  {id:'eight',title:'Around 8:00.',detail:'A little dinner, a little music, a good Friday.',time:20,scores:{docs:1,abgb:1}},
  {id:'nine',title:'Around 9:00.',detail:'A later start, but still time for a live set.',time:21,scores:{docs:1,abgb:1}},
  {id:'dj',title:'Around 9:30.',detail:'ABGB’s DJ starts; Doc’s live set continues to 10.',time:21.5,scores:{docs:1,abgb:0}},
  {id:'late',title:'10:00 or later.',detail:'Our evening is getting a late start.',time:22,scores:{docs:0,abgb:0}}]}
];
function recommend(answers){
 if(questions.some(q=>!q.options.some(o=>o.id===answers[q.id])))return {error:'incomplete'};
 const scores={docs:0,abgb:0};questions.forEach(q=>{const o=q.options.find(o=>o.id===answers[q.id]);Object.keys(scores).forEach(k=>scores[k]+=o.scores[k]);});
 const arrival=questions.find(q=>q.id==='arrival').options.find(o=>o.id===answers.arrival).time;
 const strict=answers.outside==='all'||answers.cover==='free';
 let eligible=Object.values(venues).filter(v=>v.end>arrival&&(!strict||v.id==='docs'));
 eligible.sort((a,b)=>scores[b.id]-scores[a.id]||(a.id==='docs'?-1:1));
 return{winner:eligible[0]?.id??null,eligible:eligible.map(v=>v.id),scores,arrival,tie:eligible.length>1&&scores[eligible[0].id]===scores[eligible[1].id],strict};
}
root.NightQuiz={date,venues,questions,recommend};if(typeof module!=='undefined'&&module.exports)module.exports=root.NightQuiz;
})(typeof window==='undefined'?globalThis:window);
