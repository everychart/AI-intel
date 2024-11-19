import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://ai-intel-backend.onrender.com/api/articles')
      .then(response => response.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Intel</h1>
      </header>
      <main>
        {articles.map((article, index) => (
          <article key={index} className="article-card">
            <h2>{article.title}</h2>
            <p>{article.analysis.summary}</p>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </article>
        ))}
      </main>
    </div>
  );
}

export default App;