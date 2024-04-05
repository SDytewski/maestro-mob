import { useEffect, useState } from "react";
import './App.css';
import { Auth } from "./components/auth";
import { db } from "./config/firebase";
import { getDocs, collection, addDoc } from 'firebase/firestore'

function App() {
  const [movieList, setMovieList] = useState([]);

  const moviesCollectionRef = collection(db, "musicians")

  useEffect(() => {
    const getMovieList = async () => {
      try {

        // Read the dAta
        // Set the movie list
        const data = await getDocs(moviesCollectionRef);
        const filteredData = data.docs.map((doc) =>
        ({
          ...doc.data(),
          id: doc.id

        }))
        console.log(filteredData);
        setMovieList(filteredData);

      } catch (err) {
        console.error(err);
      }
    };

    getMovieList();
  }, []);

  // const onSubmitMovie = async ()=> {
  //   awaut addDoc(moviesCollectionRef,{title: newMovieTitle, rel} )
  // }

  return (
    <div className="App">
      <Auth />
      {movieList.map((movie) => (
        <div>
          <h1>
            {movie.name}
          </h1>
          <p>Level: {movie.level}</p>
          <p>Instrument: {movie.instrument}</p>
          <p>Location: {movie.location}</p>
          
        </div>
      )
      )}
    </div>
  );
}

export default App;
