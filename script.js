// ============================================================
// script.js — 全ページ共通JavaScript
// ============================================================

// ----------------------------------------
// カスタムカーソルの生成と追従
// ----------------------------------------
const cursor     = document.createElement('div');
const cursorRing = document.createElement('div');
cursor.className     = 'cursor';
cursorRing.className = 'cursor-ring';
document.body.appendChild(cursor);
document.body.appendChild(cursorRing);

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

// マウス移動でカーソル（点）を即座に動かす
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// リング（外側の円）はなめらかに遅延追従
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// リンク・ボタンにホバーするとカーソルが大きくなる
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '20px';
    cursor.style.height = '20px';
    cursor.style.background = 'var(--m)';
    cursorRing.style.width  = '56px';
    cursorRing.style.height = '56px';
    cursorRing.style.borderColor = 'var(--m)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '10px';
    cursor.style.height = '10px';
    cursor.style.background = 'var(--c)';
    cursorRing.style.width  = '36px';
    cursorRing.style.height = '36px';
    cursorRing.style.borderColor = 'var(--c)';
  });
});

// ----------------------------------------
// ヘッダー：スクロールで背景を締める
// ----------------------------------------
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ----------------------------------------
// ハンバーガーメニューの開閉
// ----------------------------------------
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    // メニュー表示中はページのスクロールを止める
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // メニュー内リンクをクリックしたら閉じる
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ----------------------------------------
// スクロール時のフェードイン
// .js-reveal クラスがついた要素を監視する
// ----------------------------------------
const revealEls = document.querySelectorAll('.js-reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      // 兄弟要素は少しずつ遅延させてスタッガー表示
      const siblings = Array.from(e.target.parentElement.children);
      const delay    = siblings.indexOf(e.target) * 80;
      setTimeout(() => e.target.classList.add('visible'), delay);
      revealObs.unobserve(e.target); // 一度表示したら監視を外す
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObs.observe(el));

// ----------------------------------------
// マーキー：コンテンツを複製してシームレスループ
// ----------------------------------------
(function() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;
  track.innerHTML += track.innerHTML; // 2セットに複製
  track.style.animation = 'none';
  requestAnimationFrame(() => { track.style.animation = ''; });
})();
