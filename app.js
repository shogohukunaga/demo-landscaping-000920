const body=document.body, menu=document.querySelector('#site-menu'), menuButton=document.querySelector('.menu-button'), detail=document.querySelector('#detail-dialog');
const items={about:['緑との向き合い方','住まいの庭づくりから店舗・施設の植栽管理まで、過ごす人と植物の時間が心地よく重なる場所を考える架空の造園サービス紹介です。光や風、窓からの眺めを手がかりに、緑のある暮らしを描きます。'],trees:['木を選ぶヒント','日当たり、土、庭の広さやお手入れに使える時間。木を選ぶときに大切にしたいことを紹介するサンプルです。実際には場所ごとの確認が必要です。'],garden:['庭のイメージ','植物の高さと小道のつながりを考えた庭のイメージです。掲載写真はフリー素材で、実際の施工事例ではありません。','garden'],space:['緑の空間のイメージ','歩く場所と緑の距離を考え、気持ちよく過ごせる空間へ。施設の植栽を紹介するサンプルです。掲載写真は実績ではありません。','green'],flow:['ご相談の流れ','<ol><li>お庭・植栽の様子と、気になっていることをお聞きします。</li><li>広さや日当たり、お手入れの状況を確認します。</li><li>内容・時期・費用の目安をご案内します。</li></ol><p>上記は架空のサービス案内です。料金や作業の受付は行っていません。</p>'],faq:['よくあるご質問','<p><b>小さな庭でも相談できますか？</b><br>広さに合わせた植栽の案内を想定したサンプルです。</p><p><b>庭木のお手入れだけでも？</b><br>手入れの目的や季節を確認する流れを想定しています。</p>'],contact:['お問い合わせの表示例','このページは架空の企業情報を使用したデザインサンプルです。予約・見積もり・送信は行われません。<br><br>所在地：サンプル表示（架空）<br>電話：XXX-XXXX-XXXX'],journal:['木陰を楽しむ、庭の過ごし方。','葉の重なりがつくる光の模様。足元を通りぬける風。庭に小さな居場所を見つけて、季節の変化を楽しむ。そんな日々を紹介する、架空の記事サンプルです。']};
let returnFocus=null;
function closeMenu(){menu.close();body.classList.remove('menu-open');menuButton.setAttribute('aria-expanded','false');menuButton.querySelector('span').textContent='MENU';menuButton.focus()}
menuButton.addEventListener('click',()=>{if(menu.open){closeMenu();return}menu.showModal();menu.scrollTop=0;body.classList.add('menu-open');menuButton.setAttribute('aria-expanded','true');menuButton.querySelector('span').textContent='CLOSE'});
menu.addEventListener('cancel',e=>{e.preventDefault();closeMenu()});
document.querySelector('.menu-close').addEventListener('click',closeMenu);
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.querySelectorAll('[data-detail]').forEach(b=>b.addEventListener('click',()=>{returnFocus=b;const [title,text,img]=items[b.dataset.detail];if(menu.open){closeMenu();returnFocus=menuButton;}document.querySelector('#detail-title').textContent=title;document.querySelector('#detail-body').innerHTML=(img?`<img src="assets/${img}.jpg" alt="庭のイメージ写真">`:'')+text;detail.showModal();detail.scrollTop=0}));
document.querySelector('.detail-close').addEventListener('click',()=>detail.close());detail.addEventListener('close',()=>returnFocus?.focus());
window.addEventListener('scroll',()=>body.classList.toggle('scrolled',scrollY>120),{passive:true});
document.querySelector('.motion-control').addEventListener('click',e=>{const paused=body.classList.toggle('motion-paused');e.currentTarget.setAttribute('aria-pressed',String(paused));e.currentTarget.innerHTML=paused?'動きを再開する <span aria-hidden="true">▶</span>':'動きを止める <span aria-hidden="true">Ⅱ</span>'});

const targets=document.querySelectorAll('.photo,.reveal');
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('seen');observer.unobserve(entry.target)}}),{threshold:0.05});
targets.forEach(el=>observer.observe(el));
const gallery=document.querySelector('.gallery-track');
function setTravel(){const children=gallery.children;const distance=children[5].offsetLeft-children[0].offsetLeft;gallery.style.setProperty('--travel',distance+'px')}
setTravel();window.addEventListener('resize',setTravel);
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function motionPreference(){if(reduced.matches){body.classList.add('motion-paused');const button=document.querySelector('.motion-control');button.setAttribute('aria-pressed','true');button.textContent='動き軽減設定により停止中';button.disabled=true}}
motionPreference();reduced.addEventListener('change',()=>{if(!reduced.matches){const button=document.querySelector('.motion-control');button.disabled=false;button.textContent='動きを再開する';}else motionPreference()});
