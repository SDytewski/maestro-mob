import {useEffect, useState} from "react";
import './App.css';
import { Auth } from "./components/auth";
import { db } from "./config/firebase";
import { getDocs, collection } from 'firebase/firestore'

function App() {
  const [movieList, setMovieList] = useState([]);
  
  const moviesCollectionRef = collection(db, "musicians")

  useEffect(() => {
   const getMovieList = async () => {
    try {
      
        // Read the dAta
        // Set the movie list
        const data = await getDocs();
        console.log(data);

      } catch (err) {
        console.error(err);
      }
    };

    getMovieList();
  }, []);

  return (
    <div className="App">
      <Auth />
    </div>

  );
}

export default App;
