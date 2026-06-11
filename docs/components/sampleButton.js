export default function mount(container) {
  // 1渡されたコンテナの中にHTMLを展開
  container.innerHTML = `
    <div style="padding: 1rem; border: 1px solid #ccc; border-radius: 8px;">
      <p>このコンポーネントはJSから生成されています</p>
      <button class="action-btn">クリック！</button>
    </div>
  `;

  // イベントリスナーの設定
  const btn = container.querySelector('.action-btn');
  btn.addEventListener('click', () => {
    alert('JSファイルからマウントされたボタンです！');
  });
}
