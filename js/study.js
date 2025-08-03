/* 学习页：多模式切换 + SRS 记录 */
import { db }                                   from './firebase.js';
import { doc, getDoc }
  from 'https://cdn.jsdelivr.net/npm/firebase@10.12.2/firestore/lite/index.esm.js';
import { updateCardSRS } from './srs.js';

const params     = new URLSearchParams(location.search);
const setId      = params.get('set');
const studyArea  = document.getElementById('studyArea');
const modePicker = document.getElementById('modePicker');

let cards = [];
let mode  = 'flip';

modePicker.onclick = e => {
  if (e.target.dataset.mode) {
    mode = e.target.dataset.mode;
    runStudy();
  }
};

await loadCards();
runStudy();

async function loadCards() {
  if (setId) {
    try {
      const snap = await getDoc(doc(db, 'sets', setId));
      cards = snap.data().cards || [];
      localStorage.setItem('currentSet', JSON.stringify(cards));
    } catch {
      studyArea.textContent = '网络错误：无法加载卡组';
    }
  } else {
    cards = JSON.parse(localStorage.getItem('importedSet') || '[]');
  }
}

function runStudy() {
  if (!cards.length)
    return studyArea.innerHTML = '<p class="hint">无可学习的卡片</p>';

  const card = cards[Math.floor(Math.random() * cards.length)];

  if (mode === 'flip') flipMode(card);
  else if (mode === 'spell') spellMode(card);
  else studyArea.textContent = '该模式待实现';
}

/* ---- 模式实现 ---- */

function flipMode(card) {
  studyArea.innerHTML =
    `<div class="card">${card.term}</div>
     <button id="show">显示答案</button>`;

  document.getElementById('show').onclick = () => {
    studyArea.innerHTML =
      `<div class="card">${card.definition}</div>
       <div id="gradeBtns">
         <button data-q="2">😣 忘记</button>
         <button data-q="3">😐 模糊</button>
         <button data-q="4">🙂 记住</button>
         <button data-q="5">👌 简单</button>
       </div>`;
    document.querySelectorAll('[data-q]').forEach(btn =>
      btn.onclick = () => {
        updateCardSRS(card, Number(btn.dataset.q));
        queueMicrotask(runStudy);
      });
  };
}

function spellMode(card) {
  studyArea.innerHTML =
    `<p>请输入「${card.definition}」的拼写:</p>
     <input id="ans" /><button id="ok">确定</button>`;

  document.getElementById('ok').onclick = () => {
    const val = document.getElementById('ans').value.trim();
    const correct = val === card.term;
    alert(correct ? '正确!' : `错误, 正确答案: ${card.term}`);
    updateCardSRS(card, correct ? 4 : 2);
    queueMicrotask(runStudy);
  };
}
