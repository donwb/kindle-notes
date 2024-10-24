import { Highlight } from '../types';

export function parseClippings(text: string): Highlight[] {
  const entries = text.split('==========');
  const highlights: Highlight[] = [];

  entries.forEach((entry) => {
    const lines = entry.trim().split('\n');
    if (lines.length < 4) return;

    const titleLine = lines[0].trim();
    const metaLine = lines[1].trim();
    const content = lines.slice(3).join('\n').trim();

    if (!content) return;

    const bookMatch = titleLine.match(/(.*?) \((.*?)\)/);
    const book = bookMatch ? bookMatch[1] : titleLine;
    const author = bookMatch ? bookMatch[2] : 'Unknown Author';

    const locationMatch = metaLine.match(/Location (\d+-?\d*)/);
    const location = locationMatch ? locationMatch[1] : '';

    const dateMatch = metaLine.match(/Added on (.*)/);
    const date = dateMatch ? dateMatch[1] : '';

    highlights.push({
      id: Math.random().toString(36).substr(2, 9),
      book,
      author,
      content,
      location,
      date,
    });
  });

  return highlights;
}