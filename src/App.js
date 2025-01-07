import { useEffect, useState } from "react";
import './App.css';
import { Auth } from "./components/auth";
import { db, auth } from "./config/firebase";
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [banner, setBanner] = useState("")
  const [isEditing, setIsEditing] = useState(null);


  // const [reset, setReset] = useState("");

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
      setNewName('');
      setNewLocation('');
      setNewLevel('');
      setNewInstrument('');


    } catch (err) {
      console.error(err)

    }
  };


  // function editMusician(id) {
  //   const updatedTodos = [...todos].map((todo) => {
  //     if (todo.id === id) {
  //       todo.taskName = editingText;
  //     }
  //     return todo;
  //   });
  //   setTodos(updatedTodos);
  //   setIsEditing(null);
  // }


  //Delete is not working when user wants to authenticate by id and delete only their musician
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "musicians", id)
    await deleteDoc(movieDoc,);
    getMovieList();
  }

  const updateMovieTitle = async (id) => {
    // console.log(id)
    const movieDoc = doc(db, "musicians", id)
    await updateDoc(movieDoc, { name: updatedTitle })
    getMovieList();
    setIsEditing(false);

  }

  const handleClear = () => {
    setUpdatedTitle('')
    setEmail('')
    setPassword('')
  };

  return (

    <div className="App">

      <Auth token={token} setToken={setToken} handleClear={handleClear} setEmail={setEmail} email={email} setPassword={setPassword} password={password} banner={banner} setBanner={setBanner} />
      <div >
        {/* <ThemeProvider > */}
        <TextField sx={{ m: 2 }} InputProps={{
          inputProps: {
            style: { textAlign: "right" },
          }
        }} label="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />

        <TextField sx={{ m: 2 }} InputProps={{
          inputProps: {
            style: { textAlign: "right" },
          }
        }} label="Location"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
        />

        <TextField sx={{ m: 2 }} InputProps={{
          inputProps: {
            style: { textAlign: "right" },
          }
        }} label="Level"
          value={newLevel}
          onChange={(e) => setNewLevel(e.target.value)}
        />

        <TextField sx={{ m: 2 }} InputProps={{
          inputProps: {
            style: { textAlign: "right" },
          }
        }} label="Instrument"
          value={newInstrument}
          onChange={(e) => setNewInstrument(e.target.value)}
        />


        {/* </ThemeProvider> */}
        {/* <input placeholder="name" onChange={(e) => setNewName(e.target.value)} />
        <input placeholder="location" onChange={(e) => setNewLocation(e.target.value)} />
        <input placeholder="level" onChange={(e) => setNewLevel(e.target.value)} />
        <input placeholder="instrument" onChange={(e) => setNewInstrument(e.target.value)} /> */}


        {/* <button onClick={onSubmitMovie}> Submit Musician</button> */}
        <Button sx={{ m: 2 }} variant="contained" onClick={onSubmitMovie}>Submit Musician</Button>
      </div>
      <div>
        {movieList.map((movie, i) => (
          <div key={movie.id}>
            <h1 >
              {movie.name}
            </h1>
            <p>Location: {movie.location}</p>
            <p>Level: {movie.level}</p>
            <p>Instrument: {movie.instrument}</p>
            {auth?.currentUser?.email &&
              <div style={{ width: "100%" }}>
                <Button variant="outlined" onClick={() => deleteMovie(movie.id)}>Delete Musician</Button>

                <Button sx={{ m: 2 }} variant="contained" onClick={() => { setIsEditing(movie.id); console.log(token) }} >Edit Musician</Button>
              </div>

            }
            <div>

              {token && movie.id === isEditing ? (
                <div>
                  <TextField
                    name={`updateMovieTitle${movie.id}`}
                    placeholder="new title..."
                    reset="name"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />

                  < Button variant="outlined" onClick={() => { updateMovieTitle(movie.id); handleClear() }}>Update Name</Button>
                  < Button variant="outlined" onClick={() => { setIsEditing(false) }}>Cancel</Button>
                </div>
              )
                : (<div>Not Editing</div>)
              }

              {/* 
              {token &&
                < Button variant="outlined" onClick={() => { updateMovieTitle(movie.id); handleClear() }}>Update Name</Button>
              } */}
            </div>
          </div>
        )
        )}
      </div>
    </div>
  );
}

export default App;
