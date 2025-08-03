/* 纯 SM-2 SRS 实现 */
export function updateCardSRS(card, quality) {
  Object.assign(card, {
    repetitions: card.repetitions ?? 0,
    easeFactor:  card.easeFactor  ?? 2.5,
    interval:    card.interval    ?? 1
  });

  if (quality < 3) {
    card.repetitions = 0;
    card.interval = 1;
  } else {
    card.repetitions += 1;
    card.easeFactor = Math.max(
      1.3,
      card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    );
    card.interval =
      card.repetitions === 1 ? 1 :
      card.repetitions === 2 ? 6 :
      Math.round(card.interval * card.easeFactor);
  }
  const due = new Date();
  due.setDate(due.getDate() + card.interval);
  card.dueDate = due.toISOString();
  return card;
}
