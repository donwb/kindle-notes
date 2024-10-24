import React from 'react';
import { Highlight } from '../types';
import { BookOpen, Calendar, MapPin } from 'lucide-react';

interface HighlightCardProps {
  highlight: Highlight;
}

export function HighlightCard({ highlight }: HighlightCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{highlight.book}</h3>
          <p className="text-sm text-gray-600">{highlight.author}</p>
        </div>
      </div>
      <blockquote className="mt-4 italic text-gray-700 border-l-4 border-blue-500 pl-4">
        {highlight.content}
      </blockquote>
      <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span>Location {highlight.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{highlight.date}</span>
        </div>
      </div>
    </div>
  );
}