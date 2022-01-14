import React, { useState, useEffect } from 'react';
import CreateArticle from './createArticle';
const Modal = ({handleClose, articles, setArticles, article, useInput }) => {
  const [articleCreation, setArticleCreation] = useState(false)
  
  const handleCreate = () => {
  setArticleCreation(true)
  }
  
  const handleDelete = () => {
  fetch(`/articles/${article[0]._id}`, {
        method: 'DELETE',
      })
    .then(data => {
      console.log(data);
      })
    .then(() => {
      fetch("http://localhost:8080/articles/recent")
      .then(res => res.json())
      .then(
        (result) => {
          setArticles(result.recent_articles)
          })})
      .then(handleClose())
 };

  
  if(articleCreation) {
  return(
  <div className = "modal">
      <section className="modal-main">
        <CreateArticle handleClose= {handleClose} useInput= {useInput} />
      </section>
    </div>
  )
  } else if(Array.isArray(article)){
  return (
    <div className = "modal">
      <section className="modal-main">
        <h1>{article[0].title}</h1>
        <p>{article[0].body}</p>
        <button className= "button" type="button" onClick={handleClose}>
        Close
        </button>
         <button className= "button" type="button" onClick={handleCreate}>
        Create
        </button>
        <button className= "button" type="button" onClick={handleDelete}>
        Delete
        </button>
      </section>
    </div>
  );
  } else { return(
    <div className = "modal">
      <section className="modal-main">
        <h1>Loading...</h1>
        <button className= "button" type="button" onClick={handleClose}>
        Close
        </button>
         <button type="button" onClick={handleCreate}>
        Create
        </button>
       </section>
   </div>
   )}
};

export default Modal;