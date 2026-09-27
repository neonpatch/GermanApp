// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// function UpdateWord() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     article: "",
//     germanWord: "",
//     englishWord: "",
//     type: "",
//     germanSentence: "",
//     englishSentence: ""
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadWord();
//   }, []);

//   const loadWord = async () => {
//     try {
//       const res = await axios.get(`http://localhost:8080/api/words/${id}`);
//       setForm(res.data);
//       setLoading(false);
//     } catch (error) {
//       alert("Word not found");
//       navigate("/");
//     }
//   };

//   const change = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const update = async () => {
//     try {
//       await axios.put(`http://localhost:8080/api/words/${id}`, form);
//       alert("Updated Successfully");
//       navigate("/");
//     } catch (error) {
//       alert("Update Failed");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="container">
//         <div className="form-box">
//           <h2>Loading...</h2>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container">
//       <div className="form-box">
//         <h2>Update Word</h2>

//         <div className="form-group">
//           <input
//             name="article"
//             placeholder="Article"
//             value={form.article}
//             onChange={change}
//           />

//           <input
//             name="germanWord"
//             placeholder="German Word"
//             value={form.germanWord}
//             onChange={change}
//           />

//           <input
//             name="englishWord"
//             placeholder="English Word"
//             value={form.englishWord}
//             onChange={change}
//           />

//           <input
//             name="type"
//             placeholder="Type"
//             value={form.type}
//             onChange={change}
//           />

//           <input
//             name="germanSentence"
//             placeholder="German Sentence"
//             value={form.germanSentence}
//             onChange={change}
//           />

//           <input
//             name="englishSentence"
//             placeholder="English Sentence"
//             value={form.englishSentence}
//             onChange={change}
//           />
//         </div>

//         <div className="form-buttons">
//           <button
//             style={{ background: "#3b82f6", color: "white" }}
//             onClick={update}
//           >
//             Update
//           </button>

//           <button
//             style={{ background: "#ef4444", color: "white" }}
//             onClick={() => navigate("/")}
//           >
//             Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UpdateWord;

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateWord() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [word, setWord] = useState({
    article: "",
    germanWord: "",
    englishWord: "",
    type: "",
    germanSentence: "",
    englishSentence: ""
  });

  useEffect(() => {
    loadWord();
  }, []);

  const loadWord = async () => {
    const res = await axios.get(`http://localhost:8080/api/words/${id}`);
    setWord(res.data);
  };

  const handleChange = (e) => {
    setWord({ ...word, [e.target.name]: e.target.value });
  };

  const updateWord = async () => {
    await axios.put(`http://localhost:8080/api/words/${id}`, word);
    alert("Word Updated Successfully");
    navigate("/dictionary");
  };

  return (
    <>
      <style>{`
        body{
          margin:0;
          font-family:Arial,sans-serif;
        }

        .page{
          min-height:100vh;
          background:linear-gradient(135deg,#0f172a,#1e293b,#334155,#0f172a);
          padding:40px 20px;
        }

        .box{
          max-width:950px;
          margin:auto;
          background:rgba(255,255,255,0.08);
          border:1px solid rgba(255,255,255,0.12);
          border-radius:24px;
          padding:35px;
          backdrop-filter:blur(12px);
          box-shadow:0 20px 45px rgba(0,0,0,.35);
        }

        .title{
          text-align:center;
          color:white;
          font-size:44px;
          font-weight:800;
          margin-bottom:30px;
        }

        .grid{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:18px;
        }

        .full{
          grid-column:1 / -1;
        }

        input{
          width:100%;
          padding:16px;
          border:none;
          outline:none;
          border-radius:14px;
          background:rgba(255,255,255,0.12);
          color:white;
          font-size:16px;
          box-sizing:border-box;
        }

        input::placeholder{
          color:#cbd5e1;
        }

        .btns{
          display:flex;
          gap:15px;
          margin-top:28px;
        }

        button{
          flex:1;
          padding:14px;
          border:none;
          border-radius:14px;
          font-size:17px;
          font-weight:700;
          color:white;
          cursor:pointer;
        }

        .update{
          background:linear-gradient(135deg,#2563eb,#3b82f6);
        }

        .back{
          background:linear-gradient(135deg,#dc2626,#ef4444);
        }

        @media(max-width:768px){
          .grid{
            grid-template-columns:1fr;
          }

          .full{
            grid-column:auto;
          }

          .title{
            font-size:34px;
          }
        }
      `}</style>

      <div className="page">
        <div className="box">

          <h1 className="title">Update Word</h1>

          <div className="grid">

            <input
              name="article"
              placeholder="Article"
              value={word.article}
              onChange={handleChange}
            />

            <input
              name="germanWord"
              placeholder="German Word"
              value={word.germanWord}
              onChange={handleChange}
            />

            <input
              name="englishWord"
              placeholder="English Word"
              value={word.englishWord}
              onChange={handleChange}
            />

            <input
              name="type"
              placeholder="Type"
              value={word.type}
              onChange={handleChange}
            />

            <input
              className="full"
              name="germanSentence"
              placeholder="German Sentence"
              value={word.germanSentence}
              onChange={handleChange}
            />

            <input
              className="full"
              name="englishSentence"
              placeholder="English Sentence"
              value={word.englishSentence}
              onChange={handleChange}
            />

          </div>

          <div className="btns">
            <button className="update" onClick={updateWord}>
              Update
            </button>

            <button
              className="back"
              onClick={() => navigate("/dictionary")}
            >
              Back
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default UpdateWord;
