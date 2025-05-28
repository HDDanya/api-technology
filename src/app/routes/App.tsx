import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from 'entities/nav-bar';
import Search from 'features/search-book';
import { ImagePage } from 'pages/image-page';
import { SearchLocationPage } from 'pages/search-location-page';
import { TextAnalyzer } from 'pages/text-page';
import { StockPage } from 'pages/stock-page';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<StockPage />} />
          <Route path="/books" element={<Search />} />
          <Route path="/images" element={<ImagePage />} />
          <Route path="/map" element={<SearchLocationPage />} />
          <Route path="/text" element={<TextAnalyzer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
