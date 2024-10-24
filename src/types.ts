export interface Highlight {
  id: string;
  book: string;
  author: string;
  content: string;
  location: string;
  date: string;
}

export interface GroupedHighlights {
  [key: string]: Highlight[];
}