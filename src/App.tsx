import React, { useState, useMemo, useEffect } from 'react';
import { FileUpload } from './components/FileUpload';
import { SearchBar } from './components/SearchBar';
import { HighlightCard } from './components/HighlightCard';
import { SortSelector, SortOrder } from './components/SortSelector';
import { Sidebar } from './components/Sidebar';
import { parseClippings } from './utils/parseClippings';
import { Highlight, GroupedHighlights } from './types';
import { BookOpen, Menu } from 'lucide-react';
import { clsx } from 'clsx';
import { api } from './utils/api';

function App() {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHighlights = async () => {
      try {
        const savedHighlights = await api.loadHighlights();
        setHighlights(savedHighlights);
      } catch (error) {
        console.error('Failed to load highlights:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadHighlights();
  }, []);

  const handleFileUpload = async (content: string) => {
    const parsedHighlights = parseClippings(content);
    try {
      const savedHighlights = await api.saveHighlights(parsedHighlights);
      setHighlights(savedHighlights);
    } catch (error) {
      console.error('Failed to save highlights:', error);
    }
  };

  const filteredAndGroupedHighlights = useMemo(() => {
    const filtered = highlights.filter(
      (h) =>
        (selectedBook ? h.book === selectedBook : true) &&
        (h.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.book.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.author.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'newest' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });

    return sorted.reduce((acc: GroupedHighlights, highlight) => {
      if (!acc[highlight.book]) {
        acc[highlight.book] = [];
      }
      acc[highlight.book].push(highlight);
      return acc;
    }, {});
  }, [highlights, searchTerm, sortOrder, selectedBook]);

  const bookStats = useMemo(() => {
    return highlights.reduce((acc: { [key: string]: number }, highlight) => {
      acc[highlight.book] = (acc[highlight.book] || 0) + 1;
      return acc;
    }, {});
  }, [highlights]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
              <BookOpen className="h-8 w-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-900">Kindle Highlights</h1>
            </div>
            {highlights.length > 0 && (
              <div className="flex items-center space-x-4">
                <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
                <SortSelector sortOrder={sortOrder} onSortChange={setSortOrder} />
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="pt-20">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading highlights...</div>
          </div>
        ) : highlights.length === 0 ? (
          <FileUpload onFileUpload={handleFileUpload} />
        ) : (
          <div className="flex">
            <Sidebar
              books={bookStats}
              selectedBook={selectedBook}
              onSelectBook={setSelectedBook}
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
            <main 
              className={clsx(
                "flex-1 transition-all duration-300 px-4 sm:px-6 lg:px-8 py-8",
                isSidebarOpen ? "lg:ml-64" : ""
              )}
            >
              <div className="max-w-7xl mx-auto space-y-8">
                {Object.entries(filteredAndGroupedHighlights).map(([book, bookHighlights]) => (
                  <div key={book} className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {book} ({bookHighlights.length})
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {bookHighlights.map((highlight) => (
                        <HighlightCard key={highlight.id} highlight={highlight} />
                      ))}
                    </div>
                  </div>
                ))}
                {Object.keys(filteredAndGroupedHighlights).length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No highlights found</p>
                  </div>
                )}
              </div>
            </main>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;