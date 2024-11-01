import { Highlight } from '../types';

const API_URL = 'http://localhost:3000/api';

export const api = {
  async saveHighlights(highlights: Highlight[]) {
    const response = await fetch(`${API_URL}/highlights`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(highlights),
    });
    return response.json();
  },

  async loadHighlights(): Promise<Highlight[]> {
    const response = await fetch(`${API_URL}/highlights`);
    return response.json();
  },
}; 