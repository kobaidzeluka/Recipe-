import React, { useState, useEffect } from "react";
import "./App.css";
import Recipe from './Recipe';

const App = () => {

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('khachapuri')

  useEffect(() => {
    getRecipes();
  }, [query]);

  const APP_ID = "c9f639f5";
  const APP_KEY = "2c85416bd70f5b38482ebe963e81c65b";

  const getRecipes = async () => {
    const respose = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await respose.json();
    setRecipes(data.hits)
    console.log(recipes)
  };

  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault()
    setQuery(search);
    setSearch('')
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className='recipes'>
      {recipes.map(recipe => (
        <Recipe key={recipe.recipe.label} title={recipe.recipe.label}
        ingredients={recipe.recipe.ingredients}
         calories={recipe.recipe.calories}
         image={recipe.recipe.image}
          />
      ))}
      </div>
    </div>
  );
};

export default App;
