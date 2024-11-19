import { useState, useEffect } from 'react';

import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedType, setFeedType] = useState('ai-intel');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/articles?feedType=${feedType}`);
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArticles();
  }, [feedType]);

  if (loading) return <div>Loading articles...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Investment News</h1>
        <div className="feed-toggle">
          <button 
            className={feedType === 'ai-intel' ? 'active' : ''}
            onClick={() => setFeedType('ai-intel')}
          >
            AI Intel
          </button>
          <button 
            className={feedType === 'slack' ? 'active' : ''}
            onClick={() => setFeedType('slack')}
          >
            Slack Feed
          </button>
        </div>
      </header>
      <main>
        {articles.map((article, index) => (
          <div key={index} className="article-card">
            <h2>{article.title}</h2>
            <p><strong>Source:</strong> {article.source}</p>
            <p><strong>Published:</strong> {new Date(article.pubDate).toLocaleDateString()}</p>
            <p>{article.description}</p>
            <a href={article.link} target="_blank" rel="noopener noreferrer">Read more</a>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
