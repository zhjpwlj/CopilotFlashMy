import Chart from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/+esm';

const logs = JSON.parse(localStorage.getItem('reviewLogs') || '[]');
if (!logs.length) {
  document.body.insertAdjacentHTML('beforeend',
    '<p class="hint">暂无学习记录</p>');
}

const dates      = logs.map(l => l.date);
const retention  = logs.map(l => l.retention);

const ctx = document.getElementById('progressChart');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: dates,
    datasets: [{
      label: '记忆保持率',
      data: retention,
      borderColor: '#4CAF50',
      tension: .3
    }]
  },
  options: { responsive: true, maintainAspectRatio: false }
});
