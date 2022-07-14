import React, { useState, useContext, useEffect } from "react";
// make sure to use https
const REACT_APP_MOVIE_API_KEY = "f2e1b9c0";
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${REACT_APP_MOVIE_API_KEY}`;
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("batman");


  const useDebounce = (value,delay)=>{
    const [debounceValue,setDebounceValue] = useState(value);
   useEffect(()=>{
    const Check = setTimeout(()=>{
      setDebounceValue(value);
},delay)
   },[debounceValue])
   return debounceValue;
     
  }

  const fetchMovies = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        setMovies(data.Search);
        setError({ show: false, msg: "" });
      } else {
        setError({ show: true, msg: data.Error });
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}&s=${query}`);
  }, [query]);
  return (
    <AppContext.Provider
      value={{
        query,
        setQuery,
        isLoading,
        error,
        movies,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
