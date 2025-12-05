export function randomWeighted(items: { weight: number; value: any }[]) {
  const total = items.reduce((sum, i) => sum + i.weight, 0);
  const r = Math.random() * total;

  let cumulative = 0;
  for (const item of items) {
    cumulative += item.weight;
    if (r <= cumulative) return item.value;
  }
  return items[items.length - 1].value;
}
