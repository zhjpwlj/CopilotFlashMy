export function parseCSV(text) {
  return text
    .split(/\r?\n/)
    .filter(Boolean)
    .map(line => {
      const [term, definition] = line.split(',');
      return { term: term.trim(), definition: (definition ?? '').trim() };
    });
}

export function exportToCSV(cards) {
  const csv  = cards.map(c => `${c.term},${c.definition}`).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  Object.assign(document.createElement('a'), {
    href: url, download: 'flashcards.csv'
  }).click();
  URL.revokeObjectURL(url);
}
