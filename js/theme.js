const sel  = document.getElementById('themeSel');
const root = document.documentElement;

sel.value = localStorage.getItem('theme') || 'light';
apply(sel.value);

sel.onchange = () => {
  localStorage.setItem('theme', sel.value);
  apply(sel.value);
};

function apply(theme) { root.dataset.theme = theme; }
