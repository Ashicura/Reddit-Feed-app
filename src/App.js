import React, { useState, useEffect } from 'react';
import Article from './components/Article';

function App() {
  // set up states for articles and search bar
  const [articles, setArticles] = useState([]);
  const [subreddit, setSubreddit] = useState('webdev');

  // fetch data from reddit
  useEffect(() => {
    fetch("https://www.reddit.com/r/"+ subreddit +".json").then(res => {
      if(res.status !== 200) {
        console.log("Error!!!!");
        return;
      }
  // list the articles to the screen
      res.json().then(data => {
        if (data !== null) {
          setArticles(data.data.children);
        }
      });
    })
  }, [subreddit]);
  
  return (
    <div className="App">
      <header className="App-header">
        <input type="text" className="input" value={subreddit} onChange={e => setSubreddit(e.target.value)} />
      </header>
      <div className="articles">
        {
          (articles !== null) ? articles.map((article, index) => <Article key={index} article={article.data} />) : ''
          }
      </div>
    </div>
  );
}

export default App;
