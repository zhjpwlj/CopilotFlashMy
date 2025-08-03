/* 首页：卡组列表 + IndexedDB 离线缓存 */
import { db }                              from './firebase.js';
import { collection, getDocs }
  from 'https://cdn.jsdelivr.net/npm/firebase@10.12.2/firestore/lite/index.esm.js';
import { openDB } from 'https://cdn.jsdelivr.net/npm/idb@8/+esm';

const setList  = document.getElementById('setList');
const idbReady = openDB('flashmaster', 1, {
  upgrade(db) { db.createObjectStore('sets'); }
});

(async function loadSets() {
  let snap;
  try {
    snap = await getDocs(collection(db, 'sets'));
    cacheIDB(snap);
  } catch {
    snap = await readIDB();
  }
  renderSets(snap);
})();

async function cacheIDB(snap) {
  const dbIDB = await idbReady;
  snap.forEach(d => dbIDB.put('sets', d.data(), d.id));
}

async function readIDB() {
  const dbIDB = await idbReady;
  const all   = await dbIDB.getAll('sets');
  return all.map((data, i) => ({ id: `local-${i}`, data: () => data }));
}

function renderSets(snap) {
  setList.innerHTML = '';
  if (snap.length === 0 || snap.empty)
    return setList.innerHTML = '<p class="hint">暂无卡组</p>';

  snap.forEach(doc => {
    const div = document.createElement('div');
    div.className = 'cardLink';
    div.textContent = doc.data().title || '未命名卡组';
    div.onclick = () => location.href = `study.html?set=${doc.id}`;
    setList.appendChild(div);
  });
}
