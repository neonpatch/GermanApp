import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddWord() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    article: "",
    germanWord: "",
    englishWord: "",
    type: "",
    germanSentence: "",
    englishSentence: ""
  });

  const [loading, setLoading] = useState(false);

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const save = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:8080/api/words", form);
      alert("Word Added Successfully");
      navigate("/");
    } catch (error) {
      alert("Failed to save word");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f172a,#1e293b,#334155)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "650px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(14px)",
          borderRadius: "20px",
          padding: "35px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
          border: "1px solid rgba(255,255,255,0.08)"
        }}
      >
        <h2
          style={{
            color: "#fff",
            textAlign: "center",
            marginBottom: "25px",
            fontSize: "30px",
            fontWeight: "700"
          }}
        >
          Add New Word
        </h2>

        <div style={{ display: "grid", gap: "15px" }}>
          <input
            name="article"
            placeholder="Article (Der / Die / Das)"
            value={form.article}
            onChange={change}
            style={inputStyle}
          />

          <input
            name="germanWord"
            placeholder="German Word"
            value={form.germanWord}
            onChange={change}
            style={inputStyle}
          />

          <input
            name="englishWord"
            placeholder="English Meaning"
            value={form.englishWord}
            onChange={change}
            style={inputStyle}
          />

          <input
            name="type"
            placeholder="Type (Noun / Verb / Adj)"
            value={form.type}
            onChange={change}
            style={inputStyle}
          />

          <input
            name="germanSentence"
            placeholder="German Sentence"
            value={form.germanSentence}
            onChange={change}
            style={inputStyle}
          />

          <input
            name="englishSentence"
            placeholder="English Sentence"
            value={form.englishSentence}
            onChange={change}
            style={inputStyle}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "25px"
          }}
        >
          <button
            onClick={save}
            disabled={loading}
            style={{
              flex: 1,
              padding: "14px",
              background: "#22c55e",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            {loading ? "Saving..." : "Save Word"}
          </button>

          <button
            onClick={() => navigate("/")}
            style={{
              flex: 1,
              padding: "14px",
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(255,255,255,0.07)",
  color: "#fff",
  fontSize: "15px",
  outline: "none"
};

export default AddWord;


// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function AddWord() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     article: "",
//     germanWord: "",
//     englishWord: "",
//     type: "",
//     germanSentence: "",
//     englishSentence: ""
//   });

//   const change = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const save = async () => {
//     await axios.post("http://localhost:8080/api/words", form);
//     alert("Saved");
//     navigate("/");
//   };

//   return (
//     <div className="container">
//       <div className="form-box">
//         <h2>Add New Word</h2>

//         <div className="form-group">
//           <input name="article" placeholder="Article" onChange={change} />
//           <input name="germanWord" placeholder="German Word" onChange={change} />
//           <input name="englishWord" placeholder="English Word" onChange={change} />
//           <input name="type" placeholder="Type" onChange={change} />
//           <input name="germanSentence" placeholder="German Sentence" onChange={change} />
//           <input name="englishSentence" placeholder="English Sentence" onChange={change} />
//         </div>

//         <div className="form-buttons">
//           <button style={{background:"#3b82f6",color:"white"}} onClick={save}>
//             Save
//           </button>

//           <button style={{background:"#ef4444",color:"white"}} onClick={() => navigate("/")}>
//             Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddWord;


//========================================================

// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function AddWord() {

// const navigate = useNavigate();

// const [word, setWord] = useState({
// article:"",
// germanWord:"",
// englishWord:"",
// germanSentence:"",
// englishSentence:"",
// type:""
// });

// const handleChange=(e)=>{
// setWord({...word,[e.target.name]:e.target.value});
// };

// const saveWord = async()=>{

// await axios.post("http://localhost:8080/api/words",word);
// navigate("/");
// };

// return(
// <div className="container">
// <div className="card">

// <h1 className="title">Add New Word</h1>

// <div className="form-group">
// <input className="input" name="article" placeholder="Article (Der/Die/Das)" onChange={handleChange}/>
// </div>

// <div className="form-group">
// <input className="input" name="germanWord" placeholder="German Word" onChange={handleChange}/>
// </div>

// <div className="form-group">
// <input className="input" name="englishWord" placeholder="English Meaning" onChange={handleChange}/>
// </div>

// <div className="form-group">
// <input className="input" name="type" placeholder="Type (Noun/Verb)" onChange={handleChange}/>
// </div>

// <div className="form-group">
// <input className="input" name="germanSentence" placeholder="German Sentence" onChange={handleChange}/>
// </div>

// <div className="form-group">
// <input className="input" name="englishSentence" placeholder="English Sentence" onChange={handleChange}/>
// </div>

// <button className="btn btn-primary" onClick={saveWord}>
// Save Word
// </button>

// </div>
// </div>
// )
// }

// export default AddWord;


// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function AddWord() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     article: "",
//     germanWord: "",
//     englishWord: "",
//     germanSentence: "",
//     englishSentence: "",
//     type: ""
//   });

//   const change = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const save = async () => {
//     await axios.post("http://localhost:8080/api/words", form);
//     alert("Saved");
//     navigate("/");
//   };

//   return (
//     <div>
//       <h1>Add Word</h1>

//       <input name="article" placeholder="Article" onChange={change} />
//       <input name="germanWord" placeholder="German Word" onChange={change} />
//       <input name="englishWord" placeholder="English Word" onChange={change} />
//       <input name="type" placeholder="Type" onChange={change} />
//       <input name="germanSentence" placeholder="German Sentence" onChange={change} />
//       <input name="englishSentence" placeholder="English Sentence" onChange={change} />

//       <button onClick={save}>Save</button>
//     </div>
//   );
// }

// export default AddWord;