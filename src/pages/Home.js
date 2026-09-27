import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";
function Home() {
  const navigate = useNavigate();

  const [words, setWords] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    loadAllWords();
  }, []);

  const loadAllWords = async () => {
    const res = await axios.get("http://localhost:8080/api/words");
    setWords(res.data);
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setSuggestions([]);
      loadAllWords();
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8080/api/words/search?keywords=${value}`
      );

      setSuggestions(res.data);
      setWords(res.data);
      setPage(1);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteWord = async (id) => {

  const username = prompt("Enter Username:");
  if (username === null) return;

  const password = prompt("Enter Password:");
  if (password === null) return;

  if (username !== "Admin" || password !== "@Admin") {
    alert("Invalid Credentials");
    return;
  }

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this word?"
  );

  if (!confirmDelete) return;

  await axios.delete(`http://localhost:8080/api/words/${id}`);

  alert("Deleted Successfully");

  loadAllWords();
};
  // pagination
  const last = page * itemsPerPage;
  const first = last - itemsPerPage;
  const currentWords = words.slice(first, last);

  return (
    <div className="container">
      <div className="topbar">
        <h1>German Dictionary</h1>
        <button onClick={() => navigate("/add")}>+ Add Word</button>
      </div>

      <div className="hero">
        <h2>Search German Words Instantly</h2>

        <input
          type="text"
          placeholder="Type German or English word..."
          value={search}
          onChange={handleSearch}
        />

        {/* Suggestions */}
        {search && suggestions.length > 0 && (
          <div className="suggest-box">
            {suggestions.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="suggest-item"
                onClick={() => {
                  setSearch(item.germanWord);
                  setSuggestions([]);
                }}
              >
                {item.article} {item.germanWord} - {item.englishWord}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cards */}
      <div className="grid">
        {currentWords.map((word) => (
          <div className="card" key={word.id}>
            <h2>
              {word.article} {word.germanWord}
            </h2>
            <p><b>English:</b> {word.englishWord}</p>
            <p><b>Type:</b> {word.type}</p>
            <p><b>German Sentence:</b> {word.germanSentence}</p>
            <p><b>English Sentence:</b> {word.englishSentence}</p>

            <div className="btns">
              <button onClick={() => navigate(`/update/${word.id}`)}>
                Update
              </button>

              <button onClick={() => deleteWord(word.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>Page {page}</span>

        <button
          disabled={last >= words.length}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;


// // src/pages/Home.js

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Home() {
//   const navigate = useNavigate();

//   const [keywords, setKeywords] = useState("");
//   const [allWords, setAllWords] = useState([]);
//   const [filteredWords, setFilteredWords] = useState([]);

//   const [currentPage, setCurrentPage] = useState(1);
//   const wordsPerPage = 3;

//   useEffect(() => {
//     loadAllWords();
//   }, []);

//   const loadAllWords = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/api/words");
//       setAllWords(res.data);
//       setFilteredWords(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const searchWord = async () => {
//     try {
//       if (keywords.trim() === "") {
//         setFilteredWords(allWords);
//         setCurrentPage(1);
//         return;
//       }

//       const res = await axios.get(
//         `http://localhost:8080/api/words/search?keywords=${keywords}`
//       );

//       setFilteredWords(res.data);
//       setCurrentPage(1);
//     } catch (error) {
//       console.log(error);
//       alert("Search Failed");
//     }
//   };

//   const deleteWord = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/words/${id}`);
//       alert("Deleted Successfully");
//       loadAllWords();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Pagination Logic
//   const indexOfLast = currentPage * wordsPerPage;
//   const indexOfFirst = indexOfLast - wordsPerPage;
//   const currentWords = filteredWords.slice(indexOfFirst, indexOfLast);

//   const totalPages = Math.ceil(filteredWords.length / wordsPerPage);

//   return (
//     <div className="container">
//       <div className="card">

//         <h1 className="title">German Dictionary</h1>

//         {/* Search Section */}
//         <div className="search-box">

//           <input
//             className="input"
//             type="text"
//             placeholder="Search German / English Word..."
//             value={keywords}
//             onChange={(e) => setKeywords(e.target.value)}
//           />

//           <button className="btn btn-primary" onClick={searchWord}>
//             Search
//           </button>

//           <button
//             className="btn btn-success"
//             onClick={() => navigate("/add")}
//           >
//             Add Word
//           </button>

//         </div>

//         {/* Results */}
//         {currentWords.map((word) => (
//           <div key={word.id} className="result-card">

//             <h2>{word.article} {word.germanWord}</h2>

//             <p><b>English:</b> {word.englishWord}</p>
//             <p><b>Type:</b> {word.type}</p>
//             <p><b>German Sentence:</b> {word.germanSentence}</p>
//             <p><b>English Sentence:</b> {word.englishSentence}</p>

//             <div className="btn-group">

//               <button
//                 className="btn btn-warning"
//                 onClick={() => navigate(`/update/${word.id}`)}
//               >
//                 Update
//               </button>

//               <button
//                 className="btn btn-danger"
//                 onClick={() => deleteWord(word.id)}
//               >
//                 Delete
//               </button>

//             </div>

//           </div>
//         ))}

//         {/* Pagination */}
//         <div style={{ marginTop: "25px", textAlign: "center" }}>

//           <button
//             className="btn"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage(currentPage - 1)}
//           >
//             Prev
//           </button>

//           <span style={{ margin: "0 15px", fontWeight: "bold" }}>
//             Page {currentPage} / {totalPages || 1}
//           </span>

//           <button
//             className="btn"
//             disabled={currentPage === totalPages || totalPages === 0}
//             onClick={() => setCurrentPage(currentPage + 1)}
//           >
//             Next
//           </button>

//         </div>

//       </div>
//     </div>
//   );
// }

// export default Home;



//-----------------------------------------------------------------------
// src/pages/Home.js
//
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Home() {
//   const [keywords, setKeywords] = useState("");
//   const [words, setWords] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadAllWords();
//   }, []);

//   const loadAllWords = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/api/words");
//       setWords(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const searchWord = async () => {
//     try {
//       if (keywords.trim() === "") {
//         loadAllWords();
//         return;
//       }

//       const res = await axios.get(
//         `http://localhost:8080/api/words/search?keywords=${keywords}`
//       );

//       setWords(res.data);
//     } catch (error) {
//       console.log(error);
//       alert("Search failed");
//     }
//   };

//   const deleteWord = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/words/${id}`);
//       alert("Deleted Successfully");
//       loadAllWords();
//     } catch (error) {
//       console.log(error);
//       alert("Delete failed");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="card">

//         <h1 className="title">German Dictionary</h1>

//         <div className="search-box">
//           <input
//             className="input"
//             type="text"
//             placeholder="Search German / English Word"
//             value={keywords}
//             onChange={(e) => setKeywords(e.target.value)}
//           />

//           <button className="btn btn-primary" onClick={searchWord}>
//             Search
//           </button>

//           <button
//             className="btn btn-success"
//             onClick={() => navigate("/add")}
//           >
//             Add Word
//           </button>
//         </div>

//         {words.length === 0 ? (
//           <p>No words found</p>
//         ) : (
//           words.map((word) => (
//             <div key={word.id} className="result-card">

//               <h2>
//                 {word.article} {word.germanWord}
//               </h2>

//               <p><b>English:</b> {word.englishWord}</p>
//               <p><b>Type:</b> {word.type}</p>
//               <p><b>German Sentence:</b> {word.germanSentence}</p>
//               <p><b>English Sentence:</b> {word.englishSentence}</p>

//               <div className="btn-group">

//                 <button
//                   className="btn btn-warning"
//                   onClick={() => navigate(`/update/${word.id}`)}
//                 >
//                   Update
//                 </button>

//                 <button
//                   className="btn btn-danger"
//                   onClick={() => deleteWord(word.id)}
//                 >
//                   Delete
//                 </button>

//               </div>

//             </div>
//           ))
//         )}

//       </div>
//     </div>
//   );
// }

// export default Home;



//---------------------------------------------------------------------
// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Home(){

// const [keyword,setKeyword]=useState("");
// const [words,setWords]=useState([]);
// const navigate=useNavigate();

// const searchWord = async(e)=>{
// setKeyword(e.target.value);

// if(e.target.value===""){
// setWords([]);
// return;
// }

// const res = await axios.get(`http://localhost:8080/api/words/search?keywords=${e.target.value}`);
// setWords(res.data);
// }

// return(
// <div className="container">

// <div className="header">
// <div className="logo">German Dictionary</div>
// <button className="btn btn-primary" onClick={()=>navigate("/add")}>+ Add Word</button>
// </div>

// <div className="card">
// <h1 className="title">Search German Words</h1>

// <input
// className="search-box"
// placeholder="Type German or English word..."
// value={keyword}
// onChange={searchWord}
// />

// {
// words.map(word=>(
// <div className="result-card" key={word.id}>
// <div className="word">{word.article} {word.germanWord}</div>
// <div className="meaning">{word.englishWord}</div>
// <div>{word.type}</div>

// <div className="actions">
// <button className="btn btn-edit" onClick={()=>navigate(`/edit/${word.id}`)}>Update</button>
// <button className="btn btn-delete">Delete</button>
// </div>
// </div>
// ))
// }

// </div>
// </div>
// )
// }

// export default Home;


//-----------------------------------------------------------------------------------------------
// // src/pages/Home.js

// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Home.css";

// function Home() {
//   const navigate = useNavigate();

//   const [search, setSearch] = useState("");
//   const [results, setResults] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // const searchWord = async (value) => {
//   //   setSearch(value);

//   //   if (value.trim() === "") {
//   //     setResults([]);
//   //     setSelected(null);
//   //     return;
//   //   }

//   //   try {
//   //     setLoading(true);

//   //     const res = await axios.get(
//   //       `http://localhost:8080/api/words/search?keywords=${value}`
//   //     );

//   //     setResults(res.data);
//   //     setLoading(false);
//   //   } catch (error) {
//   //     setLoading(false);
//   //     setResults([]);
//   //   }
//   // };

//   const searchWord = async (value) => {
//   setSearch(value);

//   if (value.trim() === "") {
//     setResults([]);
//     setSelected(null);
//     return;
//   }

//   try {
//     const res = await axios.get(
//       `http://localhost:8080/api/words/search?keywords=${encodeURIComponent(value)}`
//     );

//     console.log("API Data:", res.data);   // debug

//     setResults(Array.isArray(res.data) ? res.data : []);
//     setSelected(null);

//   } catch (error) {
//     console.log("Search Error:", error);
//     setResults([]);
//   }
// };

//   const selectWord = (item) => {
//     setSelected(item);
//     setResults([]);
//     setSearch(item.germanWord);
//   };

//   const deleteWord = async (id) => {
//     await axios.delete(`http://localhost:8080/api/words/${id}`);
//     setSelected(null);
//     setSearch("");
//     alert("Deleted Successfully");
//   };

//   return (
//     <div className="main-page">

//       <nav className="navbar">
//         <h2>German Dictionary</h2>

//         <button onClick={() => navigate("/add")}>
//           + Add Word
//         </button>
//       </nav>

//       <div className="hero">
//         <h1>Search German Words Instantly</h1>
//         <p>Find meanings, grammar type, and example sentences</p>
//       </div>

//       <div className="search-wrapper">
//         <input
//           type="text"
//           placeholder="Type German or English word..."
//           value={search}
//           onChange={(e) => searchWord(e.target.value)}
//         />
//       </div>

//       {loading && <p className="loading">Searching...</p>}

//       {/* { {results.length > 0 && (
//         <div className="dropdown">
//           {results.map((item) => (
//             <div
//               key={item.id}
//               className="dropdown-item"
//               onClick={() => selectWord(item)}
//             >
//               <strong>{item.article} {item.germanWord}</strong>
//               <span>{item.englishWord}</span>
//             </div>
//           ))}
//         </div>
//       )} } */}

//       {results.length > 0 && search.trim() !== "" && (
//   <div className="dropdown">
//     {results.map((item) => (
//       <div
//         key={item.id}
//         className="dropdown-item"
//         onClick={() => selectWord(item)}
//       >
//         <strong>{item.article} {item.germanWord}</strong>
//         <span>{item.englishWord}</span>
//       </div>
//     ))}
//   </div>
// )}

//       {selected && (
//         <div className="premium-card">

//           <div className="card-top">
//             <h2>{selected.article} {selected.germanWord}</h2>
//             <span>{selected.type}</span>
//           </div>

//           <div className="info-row">
//             <label>English Meaning</label>
//             <p>{selected.englishWord}</p>
//           </div>

//           <div className="info-row">
//             <label>German Sentence</label>
//             <p>{selected.germanSentence}</p>
//           </div>

//           <div className="info-row">
//             <label>English Sentence</label>
//             <p>{selected.englishSentence}</p>
//           </div>

//           <div className="action-buttons">
//             <button onClick={() => navigate(`/update/${selected.id}`)}>
//               Update
//             </button>

//             <button className="danger"
//               onClick={() => deleteWord(selected.id)}>
//               Delete
//             </button>
//           </div>

//         </div>
//       )}

//     </div>
//   );
// }

// export default Home;