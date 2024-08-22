import { useEffect, useState } from "react";
import './App.css';
import { Auth } from "./components/auth";
import { db, auth } from "./config/firebase";
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore'
import TextField from '@mui/material/TextField';
// import { outlinedInputClasses } from '@mui/material/OutlinedInput';
// import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';

function App() {
  const [movieList, setMovieList] = useState([]);

  // New Musician State
  const [newName, setNewName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newLevel, setNewLevel] = useState("");
  const [newInstrument, setNewInstrument] = useState("");

  const [updatedTitle, setUpdatedTitle] = useState("")


  const musiciansCollectionRef = collection(db, "musicians");

  const getMovieList = async () => {
    try {
      const data = await getDocs(musiciansCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })); console.log(filteredData);
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
    }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(musiciansCollectionRef, {
        name: newName,
        location: newLocation,
        level: newLevel,
        instrument: newInstrument,
        userId: auth?.currentUser?.uid
      });   
      getMovieList();      
    } catch (err) {
      console.error(err)
    }
  };

  //Delete is not working when user wants to authenticate by id and delete only their musician
    const deleteMovie = async (id) => {
      const movieDoc = doc(db, "musicians", id)
      await deleteDoc(movieDoc, );
      getMovieList(); 
    }  

    const updateMovieTitle = async (id) => {
      const movieDoc = doc(db, "musicians", id)
      await updateDoc(movieDoc, {name: updatedTitle});
      getMovieList(); 
    }  




  return (
    <div className="App">
      <Auth />
      <div>
      <ThemeProvider theme={customTheme(outerTheme)}>
          <TextField label="Outlined" />
  <TextField label="Filled" variant="filled" />
  <TextField label="Standard" variant="standard" />
</ThemeProvider>
         <input placeholder="name" onChange={(e) => setNewName(e.target.value)} /> 
        <input placeholder="location" onChange={(e) => setNewLocation(e.target.value)} />
        <input placeholder="level" onChange={(e) => setNewLevel(e.target.value)} />
        <input placeholder="instrument" onChange={(e) => setNewInstrument(e.target.value)} />
 

        <button onClick={onSubmitMovie}> Submit Musician</button>
      </div>
      <div>
        {movieList.map((movie, i) => (
          <div key={i}>
            <h1 >
              {movie.name}
            </h1>
            <p>Location: {movie.location}</p>
            <p>Level: {movie.level}</p>
            <p>Instrument: {movie.instrument}</p>
            <button onClick={()=> deleteMovie(movie.id)}>Delete Musician</button>

            <input placeholder="new title..." 
            onChange={(e) => setUpdatedTitle(e.target.value)} 
            />
            < button onClick={() => updateMovieTitle(movie.id)}>Update Musician</button>
          </div>

        )
        )}
      </div>
    </div>
  );
}

export default App;
