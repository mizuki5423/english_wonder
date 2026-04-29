// ============================================================
// gallery.js — フォトギャラリーページ専用JavaScript
// ライトボックス（クリックで拡大・前後移動・キーボード操作）
// ============================================================

const lightbox   = document.getElementById('glLightbox');
const lbImg      = document.getElementById('glLbImg');
const lbCaption  = document.getElementById('glLbCaption');
const lbClose    = document.getElementById('glLbClose');
const lbPrev     = document.getElementById('glLbPrev');
const lbNext     = document.getElementById('glLbNext');

// ギャラリーの全アイテムを取得
const items = Array.from(document.querySelectorAll('.gl-item'));
let current = 0;

// ----------------------------------------
// 指定インデックスの画像をライトボックスに表示
// ----------------------------------------
function openLightbox(index) {
  current = (index + items.length) % items.length;
  const img     = items[current].querySelector('img');
  const caption = items[current].querySelector('.gl-title');

  lbImg.src     = img.src;
  lbImg.alt     = img.alt;
  lbCaption.textContent = caption ? caption.textContent.trim() : '';

  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden'; // 背景スクロールを止める
}

// ライトボックスを閉じる
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

// 次の画像へ
function nextImage() { openLightbox(current + 1); }

// 前の画像へ
function prevImage() { openLightbox(current - 1); }

// ----------------------------------------
// 各アイテムのクリックでライトボックスを開く
// ----------------------------------------
items.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});

// 閉じるボタン
lbClose.addEventListener('click', closeLightbox);

// 前後ボタン
lbNext.addEventListener('click', nextImage);
lbPrev.addEventListener('click', prevImage);

// 背景クリックで閉じる
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

// キーボード操作
// Esc：閉じる / ←→：前後移動
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft')  prevImage();
});

// ----------------------------------------
// スワイプ操作（スマホ対応）
// ----------------------------------------
let touchStartX = 0;

lightbox.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

lightbox.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    // 左スワイプ → 次へ・右スワイプ → 前へ
    if (diff > 0) nextImage();
    else          prevImage();
  }
});
