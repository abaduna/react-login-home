
import { db} from "../../confic/Firebace";
import { useEffect, useState } from 'react';
import {Grid,Input,TextField} from "@mui/material"
import { getDocs, collection, addDoc,deleteDoc,doc,updateDoc } from "firebase/firestore";
import Button from '@mui/material/Button';
import { auth  } from "../../confic/Firebace";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Add from '@mui/icons-material/Add';

import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";


function Movies() {
  const [movieList,setMovieList]=useState([])
  const [titleUpDate,SetTitleUpDate] =useState("")
  const [newMovie,setNewMovie]=useState({
    title:"",
    releaseDate:0,
    receivedAnOscar:false,
    id:""})
    const [fileUpload,setFileUpload]=useState(null)
    const navigate = useNavigate();
    // colecion de referencis 
    const moviesCollectionRef = collection(db,"movies")
    const getMovieList = async () => {
        try {
            const data = await getDocs(moviesCollectionRef);
            
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id, titleUpDate: "" }));
            setMovieList(filteredData);
        } catch (error) {
            console.error(`mensaje de error ${error}`);
        }
        
   
}
    const verificarSiElUsuarioEsAutenticado=()=>{
      auth().onAuthStateChanged(function(user) {
        if (!user) {
          navigate("/login")
        } 
      });
    }
    useEffect(() => {
       
            
      verificarSiElUsuarioEsAutenticado()
         getMovieList();
    }, []);
    const handleInputChange = (e) => {
        
        
            const { name, value, type, checked } = e.target;
            setNewMovie(prevState => ({
              ...prevState,
              [name]: type === 'checkbox' ? checked : value
            }));
          };
    const handleUpload = async () => {
            try {
              // Add the new movie to the Firestore collection
              const docRef = await addDoc(moviesCollectionRef, newMovie);

              // Obtener el ID del documento recién agregado
             const newMovieId = docRef.id;
                console.log(`newMovie`);
                console.log(newMovie);
              // upDate the movie list
              setMovieList(prevList => [...prevList, { ...newMovie, id: newMovieId }]);
                
              // Clear the input fields
              setNewMovie({
                title: "",
                releaseDate: 0,
                receivedAnOscar: false,
                id:""
              });
            } catch (error) {
              console.error(`Error uploading movie: ${error}`);
            }
          };
  
    const deleteMovie= async(id)=>{
        
            console.log(`delete`);
            console.log(id);
            const movieDoc = doc(db,"movies",id)
            console.log(movieDoc);
            try {
                console.log(`try`);
              await deleteDoc(movieDoc)  
               // Actualiza el estado local para reflejar la eliminación
            setMovieList((prevList) =>prevList.filter((movie) => movie.id !== id) 
            );
            } catch (error) {
                console.error(`deleteMovie error${error}`);
            }
            
            
             
          }
        
    const handleTitleInputChange = (id, value) => {
            setMovieList((prevList) =>
              prevList.map((movie) => (movie.id === id ? { ...movie, titleUpDate: value } : movie))
            );
          };
    const upDate = async (id) => {
            const movieToUpdate = movieList.find((movie) => movie.id === id);
            const updatedTitle = Array.isArray(movieToUpdate.titleUpDate) ? [...movieToUpdate.titleUpDate] : movieToUpdate.titleUpDate;
        
            const movieDoc = doc(db, "movies", id);
            await updateDoc(movieDoc, { title: updatedTitle });
        
            setMovieList((prevList) =>
              prevList.map((movie) =>
                movie.id === id ? { ...movie, title: updatedTitle, titleUpDate: "" } : movie
              )
            );
          };


          const cardStyle = {
            minWidth: '50%', // Ancho del 50%
            
            margin: 'auto', // Centra el card
            marginTop: '20vh', // Mueve el card hacia abajo (puedes ajustar según sea necesario)
            padding: '20px', // Agrega algún relleno si es necesario
          };
        


          
          return (
            <div >
              <div>
                <Grid container="row" justifyContent={"center"} alignContent={"center"}>
                <Input
                     color="success"
                     placeholder="Titulo de la pelicula"
                     size="lg"
                     name="title"
                     variant="solid"
                     value={newMovie.title}
                    onChange={handleInputChange}
                    />     
                    <Input
                    type="number"
                     color="success"
                     placeholder="Año de la pelicula"
                     name="releaseDate"
                     size="lg"
                     variant="solid"
                     value={newMovie.releaseDate}
                    onChange={handleInputChange}
                    />   
                     <div>
                        <span>gano un oscar</span>
                        <input
                        type='checkbox'
                        name="receivedAnOscar"
                        checked={newMovie.receivedAnOscar}
                        onChange={handleInputChange}/>   
                     </div>
                                 
                    <Button  variant="solid" onClick={handleUpload}  startDecorator={<Add />}>
                         Subir
                    </Button>
                </Grid>
              </div>
            
            <div>
              {movieList.map((movie)=>(

                <div key={movie.id} >
                    <Card  sx={cardStyle} style={{ backgroundColor : movie.receivedAnOscar ? "rgba(0, 255, 0, 0.3)" : "rgba(255, 0, 0, 0.3)" }}>
                    <CardContent>
                      <Typography  sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      {movie.title}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Fecha: {movie.releaseDate}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      <h3>Gano el oscar?<span>{movie.receivedAnOscar? "gano un oscar":"no gano"}</span></h3>
                      </Typography>
                      <Typography variant="body2">
                      <input 
                placeholder="Nuevo titulo"
                value={movie.titleUpDate}
                onChange={(e) => handleTitleInputChange(movie.id, e.target.value)}/>
                <Button onClick={() => upDate(movie.id)} size="small">Actualizar</Button>        
                        
                      </Typography>
                    </CardContent>
                    <Grid justifyContent={"center"} alignContent={"center"} >
                    <CardActions> 
                      
                    <Button 
                      fullWidth color="error" 
                      onClick={()=> deleteMovie(movie.id)}size="small">
                        Eliminar
                    </Button>
                    </CardActions>                        
                    </Grid>

                  </Card>                    

                  
                  
                  
        
        
                  
                
                </div>
              ))}
            </div>
            
            </div>
          );
}

export default Movies