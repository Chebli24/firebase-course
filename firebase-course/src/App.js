import './App.css';
import { useState, useEffect } from 'react';
import { Auth } from "./components/auth";
import {db, auth, storage} from "./config/firebase-config";
import {getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore';
import {ref, uploadBytes} from 'firebase/storage'

function App() {
  const [MovieList, setMovieList] = useState([]);

  //New Movie State
  const [newMoiveTitle, setNewMovieTitle] = useState("")
  const [newReleaseDate, setNewReleaseDate] = useState(0)
  const [newMoiveOscar, setMovieOscar] = useState(false)

  //Update Title State
  const [updatedTitle, setUpdatedTitle] = useState("")

  //File upload state
  const[fileUpload, setFileUpload] = useState(null);

  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    //READ DATA 
    //SET THE MOVIE LIST
    try{
      const data = await getDocs(moviesCollectionRef)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(), 
        id: doc.id,
      }));
      setMovieList(filteredData )
    } catch(err){
      console.error(err)
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, {title: updatedTitle});
    getMovieList();
  };

  const uploadFile = async () => {
     if(!fileUpload) return;
     const fileFolderRef = ref(storage, `projectFiles/${fileUpload.name}`); 
     try{
      await uploadBytes(fileFolderRef, fileUpload);
     } catch(err){
        console.error(err);
     }
  }

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try{
      await addDoc(moviesCollectionRef, {
        title: newMoiveTitle, 
        releaseDate: newReleaseDate, 
        recievedAnOscar: newMoiveOscar,
        userId: auth?.currentUser?.uid,
      })
      getMovieList();
    }catch(err) {
      console.error(err);
    }
  };
  
  return (
    <div className="App">
      <Auth/>
      <div>
        <input placeholder='Movie title....' onChange={(e) => setNewMovieTitle(e.target.value)}/>
        <input placeholder='Release Date ....' type="number" onChange={(e) => setNewReleaseDate(Number(e.target.value)) }/>
        <label>Recieved An Oscar</label>
        <input type="checkbox" onChange={(e) => setMovieOscar(e.target.checked )}/> 
        <button onClick={onSubmitMovie}> Submit Movie </button>
      </div>
      <div>
        {MovieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.recievedAnOscar ? "green" : "red"}}>
            {" "}
            {movie.title}{" "}
            </h1>
            <p> Date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input placeholder='new title....' onChange={(e) => setUpdatedTitle(e.target.value)}/>
            <button onClick={()=> updateMovieTitle(movie.id)}>Update title</button>

          </div>
        ))}
      </div>

      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}> Upload File </button>
      </div>

    </div>
    
  ); 
}

export default App;
