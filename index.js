// ============================================================
// index.js — トップページ専用JavaScript
// ============================================================

// ----------------------------------------
// コース一覧：アコーディオン開閉
// .ca-head をクリックすると .ca-item に .is-open クラスを付与
// ----------------------------------------
document.querySelectorAll('.ca-head').forEach(head => {
  head.addEventListener('click', () => {
    const item   = head.closest('.ca-item');
    const isOpen = item.classList.contains('is-open');

    // 他のアコーディオンをすべて閉じる
    document.querySelectorAll('.ca-item').forEach(el => {
      el.classList.remove('is-open');
      el.querySelector('.ca-head').setAttribute('aria-expanded', 'false');
    });

    // クリックしたものが閉じていたら開く（開いていたら閉じたまま）
    if (!isOpen) {
      item.classList.add('is-open');
      head.setAttribute('aria-expanded', 'true');
    }
  });
});
