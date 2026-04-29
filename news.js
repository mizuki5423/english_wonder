// ============================================================
// news.js — お知らせページ専用JS
// フィルターボタンとカード表示制御
// ============================================================

// フィルターボタン（.nl-filter-btn）
// フィルター対象（.nl-card、.nl-featured）
const filterBtns = document.querySelectorAll('.nl-filter-btn');
const featured   = document.querySelector('.nl-featured');
const cards      = document.querySelectorAll('.nl-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // アクティブ切替
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    // フィーチャードカードの表示制御
    if (featured) {
      const fc = featured.dataset.category;
      const show = filter === 'all' || fc === filter;
      featured.style.display = show ? 'grid' : 'none';
    }

    // 通常カードの表示制御
    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      if (match) {
        card.classList.remove('hidden');
        card.style.opacity = '0';
        card.style.transform = 'translateY(12px)';
        setTimeout(() => {
          card.style.transition = 'opacity .4s, transform .4s';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 10);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});
