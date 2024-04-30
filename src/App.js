import { useEffect, useState } from "react";
import './App.css';
import { Auth } from "./components/auth";
import { db } from "./config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc } from 'firebase/firestore'

function App() {
  const [movieList, setMovieList] = useState([]);


  // New Musician State
  const [newName, setNewName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newLevel, setNewLevel] = useState("");
  const [newInstrument, setNewInstrument] = useState("");



  const moviesCollectionRef = collection(db, "musicians")

  const getMovieList = async () => {
    try {

      // Read the dAta
      // Set the movie list
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) =>
      ({
        ...doc.data(),
        id: doc.id

      }));
      console.log(filteredData);
      setMovieList(filteredData);

    } catch (err) {
      console.error(err);
    }
  };

  
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "musicians",id)
    await deleteDoc(movieDoc);
  }  


  useEffect(() => {
   
  getMovieList();
  }, []);
  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        name: newName,
        location: newLocation,
        level: newLevel,
        instrument: newInstrument,

      });

      getMovieList();
      
      

    } catch (err) {
      console.error(err)
    }


  }
  return (
    <div className="App">
      <Auth />
      <div>
         <input placeholder="name" onChange={(e) => setNewName(e.target.value)} /> 
        <input placeholder="location" onChange={(e) => setNewLocation(e.target.value)} />
        <input placeholder="level" onChange={(e) => setNewLevel(e.target.value)} />
        <input placeholder="instrument" onChange={(e) => setNewInstrument(e.target.value)} />
 

        <button onClick={onSubmitMovie}> Submit Musician</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div>
            <h1>
              {movie.name}
            </h1>
            <p>Location: {movie.location}</p>
            <p>Level: {movie.level}</p>
            <p>Instrument: {movie.instrument}</p>
            <button onClick={()=> deleteMovie(movie.id)}>Delete Musician</button>


          </div>

        )
        )}
      </div>
    </div>
  );
}

export default App;
