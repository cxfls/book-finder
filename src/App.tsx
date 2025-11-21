import { Route, Routes } from "react-router-dom";
import "./App.css";
import SearchPage from "./pages/SearchPage";
import BookDetailPage from "./pages/BookDetailPage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/book/:id" element={<BookDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
