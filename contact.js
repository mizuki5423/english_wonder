// ============================================================
// contact.js — お問い合わせフォーム専用JavaScript
// ============================================================

// ============================================================
// ★★★ 受信メールアドレスの設定方法 ★★★
// ============================================================
//
// フォームの送信内容を自分のメールで受け取るには
// 「Formspree」という無料サービスを使います。
//
// 【設定手順】
//   1. https://formspree.io にアクセス
//   2. 「Get Started」でアカウント作成（Googleアカウントでも可）
//   3. 「+ New Form」をクリック
//   4. 「Email」欄に受信したいメールアドレスを入力
//      例：englishwonder@gmail.com
//   5. フォームが作成されると URL が発行される
//      例：https://formspree.io/f/xpwzabcd
//   6. その URL を下の FORM_ACTION_URL に貼り付ける
//
// ↓↓↓ ここを変更してください ↓↓↓
const FORM_ACTION_URL = 'https://formspree.io/f/xeevypnl';
//                                               ↑ここにFormspreeのIDを貼る
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//
// ============================================================

const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const name  = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const type  = form.querySelector('input[name="type"]:checked');
    if (!name || !email || !type) return;

    const submitBtn = form.querySelector('.form-submit');
    submitBtn.disabled = true;
    submitBtn.style.opacity = '.5';

    // Formspree URLが未設定の場合はデモ表示
    if (FORM_ACTION_URL.includes('YOUR_FORM_ID')) {
      setTimeout(() => {
        form.style.display = 'none';
        if (formSuccess) formSuccess.style.display = 'block';
      }, 800);
      return;
    }

    try {
      const response = await fetch(FORM_ACTION_URL, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        form.style.display = 'none';
        if (formSuccess) formSuccess.style.display = 'block';
      } else {
        alert('送信に失敗しました。お電話にてお問い合わせください。');
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }
    } catch {
      alert('通信エラーが発生しました。お電話にてお問い合わせください。');
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
    }
  });
}
