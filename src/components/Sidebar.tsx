import React from 'react';
import { X, BookOpen } from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  books: { [key: string]: number };
  selectedBook: string | null;
  onSelectBook: (book: string | null) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ books, selectedBook, onSelectBook, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={clsx(
          "fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden",
          isOpen ? "opacity-100 z-40" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={clsx(
          "fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg transform transition-transform lg:translate-x-0 lg:static",
          isOpen ? "translate-x-0 z-50" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Table of Contents</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              <button
                onClick={() => onSelectBook(null)}
                className={clsx(
                  "w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors",
                  selectedBook === null
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <span className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>All Books</span>
                </span>
                <span className="text-sm font-medium">
                  {Object.values(books).reduce((a, b) => a + b, 0)}
                </span>
              </button>

              {Object.entries(books)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([book, count]) => (
                  <button
                    key={book}
                    onClick={() => onSelectBook(book)}
                    className={clsx(
                      "w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors",
                      selectedBook === book
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <span className="flex-1 text-left truncate" title={book}>
                      {book}
                    </span>
                    <span className="ml-2 text-sm font-medium">{count}</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}