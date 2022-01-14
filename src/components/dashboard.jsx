import React, { useState, useEffect } from 'react';
import Modal from './modal'

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [articles, setArticles] = useState([])
  const [error, setError] = useState(null);
  const showHideClassName = showModal ? 'display-block' : 'display-none';
  const [articleToDisplay, setArticleToDisplay] = useState(null)

  const handleClick = (id) => { //toggles the modal open and closed state. Also fetches article for modal to display.
    if(id) {
        fetch(`http://localhost:8080/articles/retrieve?id=${id}`)
        .then(res => res.json())
        .then(
        (result) => {
          console.log(result)
          setArticleToDisplay(result.retrieved_article)
          
        },
        (error) => {
          setArticleToDisplay({title: "Failed to load article!"})
        }
        )
        .then(showModal === false ? setShowModal(true) : setShowModal(false))
    };
    
  };
  const handleClose = () => {
    showModal === false ? setShowModal(true) : setShowModal(false);
    setArticleToDisplay(null);
  };

  const useInput = init => {
    const [ value, setValue ] = useState(init);
    const onChange = e => {
      setValue(e.target.value);
    };
    return [ value, onChange ];
  };
  
  useEffect(() => { //fetches the recent articles and displays them on the page. Also hosts the modal.
    fetch("http://localhost:8080/articles/recent")
    .then(res => res.json())
    .then(
    (result) => {
      setIsLoaded(true);
      setArticles(result.recent_articles)
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
        }
        )
  }, [])
  if (error) {
    return <div>Error:{error.message}</div>;
  } else if (!isLoaded){
    return <div>Loading...</div>
  } else{
  return (
    <div>
      <ul> 
        {articles.map(article => (
        <button key= {article._id} value= {article._id} type="button" onClick={(e) => handleClick(e.target.value)}>{article.title}</button>))}
      </ul>
     
      <div className={showHideClassName}>
        <Modal articles={articles} setArticles={setArticles} handleClose= {handleClose} useInput= {useInput} article= {articleToDisplay} />
      </div>

    </div>
  );
}}

export default Dashboard;