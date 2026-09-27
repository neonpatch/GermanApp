import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddWord from "./pages/AddWord";
import UpdateWord from "./pages/UpdateWord";
import ArticleTablePage from "./pages/ArticleTablePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddWord />} />
        <Route path="/update/:id" element={<UpdateWord />} />

        {/* NEW PAGE */}
        <Route
          path="/article-table"
          element={<ArticleTablePage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;