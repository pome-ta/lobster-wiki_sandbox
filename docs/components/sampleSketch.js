import p5 from 'p5';
//console.log(p5);



const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(400, 400);
  };

  p.draw = () => {
    p.background(220);
    p.ellipse(50, 50, 80, 80);
  };
};



export default function mount(container) {
  // 1. 渡されたコンテナの中にHTMLを展開
  
  //appendChild
  container.innerHTML = `
    <div style="padding: 1rem; border: 1px solid #ccc; border-radius: 8px;">
      <p>このコンポーネントはJSから生成されています</p>
      <button class="action-btn">クリック!</button>
    </div>
  `;

  // 2. イベントリスナーの設定
  // 🌟 重要: document 全体ではなく、自分の container の中だけを探せばよい!
  // だから IDの衝突 (UUID問題) を気にする必要がありません。
  const btn = container.querySelector('.action-btn');
  btn.addEventListener('click', () => {
    alert('JSファイルからマウントされたボタンです!');
  });
}



const p5sketch = new p5(sketch);

//export default p5sketch;
