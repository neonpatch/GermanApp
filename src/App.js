// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Home from "./pages/Home";
// import AddWord from "./pages/AddWord";
// import UpdateWord from "./pages/UpdateWord";

// import ArticleHomePage from "./pages/ArticleHomePage";
// import AddArticlePage from "./pages/AddArticlePage";
// //import UpdateArticlePage from "./pages/UpdateArticlePage";
// import ArticleDetailPage from "./pages/ArticleDetailPage";
// import UpdateArticlePage from "./pages/UpdateArticlePage";
// import GermanAppHomePage from "./pages/GermanAppHomePage";



// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         <Route path="/" element={<GermanAppHomePage />} />
//         <Route path="/dictionary" element={<Home />} />
//         <Route path="/article-home" element={<ArticleHomePage />} />

//         <Route path="/" element={<Home />} />
//         <Route path="/add" element={<AddWord />} />
//         <Route path="/update/:id" element={<UpdateWord />} />

//         <Route path="/article-home" element={<ArticleHomePage />} />
//         <Route path="/add-article" element={<AddArticlePage />} />
      
//         <Route path="/article/:englishWord" element={<ArticleDetailPage />} />
//         <Route path="/article-detail/:type" element={<ArticleDetailPage />} />
//         <Route path="/update-article/:type" element={<UpdateArticlePage />}/>

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import GermanAppHomePage from "./pages/GermanAppHomePage";

import Home from "./pages/Home";
import AddWord from "./pages/AddWord";
import UpdateWord from "./pages/UpdateWord";

import ArticleHomePage from "./pages/ArticleHomePage";
import AddArticlePage from "./pages/AddArticlePage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import UpdateArticlePage from "./pages/UpdateArticlePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main Home Page */}
        <Route path="/" element={<GermanAppHomePage />} />

        {/* Dictionary */}
        <Route path="/dictionary" element={<Home />} />
        <Route path="/add" element={<AddWord />} />
        <Route path="/update/:id" element={<UpdateWord />} />

        {/* Article Tables */}
        <Route path="/article-home" element={<ArticleHomePage />} />
        <Route path="/add-article" element={<AddArticlePage />} />
        <Route path="/article-detail/:type" element={<ArticleDetailPage />} />
        <Route path="/update-article/:type" element={<UpdateArticlePage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
