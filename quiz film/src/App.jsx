
// import axios from "axios"
// import './App.css'
// import { useEffect, useState } from "react";

// function App() {


//   const [data,setdata] = useState()
//   const [Loading,setLoading] = useState(true)
//   const [Error,setError] = useState("")

//   useEffect(()=> {

//     axios.get(
//       {
//         "Title": "Spider-Man: No Way Home",
//         "Year": "2021",
//         "imdbID": "tt10872600",
//         "Type": "movie",
//         "Poster": "https://m.media-amazon.com/images/M/MV5BMmFiZGZjMmEtMTA0Ni00MzA2LTljMTYtZGI2MGJmZWYzZTQ2XkEyXkFqcGc@._V1_SX300.jpg"
//     },

//   //  "api-fulfill.dataexchange.us-east-1.amazonaws.com/v1"
//     )
//     .then((response)=>{
//         setdata(response.data)
//         setLoading(false)
//     })
//     .catch((Error)=>{
//       setError("TELAH TERJADI ERROR 404")
//       setLoading(false)
//     })

//   },[])
//   return (
//     <>
//       <body className='backcolor'>

//         <div>

//           {/* Judul */}

//           <div className='ContainerMovieCollection'>
//             <p>Movie Collection</p>
//           </div>

//           {/* Tempat pencarian */}

//           <div>
//             <input
//               className='search'
//               placeholder='Please type the movie here'
//               type='search'></input>


//             {/* button search */}

//             <button className='buttonSearch' type='submit'>search</button>
//           </div>



//           {/* Gambar */}
          
//           <div>
//           {Loading && <p>Loading...</p>}
//           {Error && <p>{Error}</p>}       
//           </div>
          
//           {/* {data.map(item => (
//           <img key={item.id}>
//             <h3>{item.title}</h3>
//             <p>{item.body}</p>
//           </img>
//         ))} */}


//         </div>

//       </body>
//     </>
//   )
// }

// export default App;


import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import { gsap } from 'gsap';

function App() {
  const buttonRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Button animations
  useEffect(() => {
    const button = buttonRef.current;
    
    // Hover animation
    button.addEventListener('mouseenter', () => {
      gsap.to(button, { scale: 1.2, duration: 0.2 });
    });
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, { scale: 1, duration: 0.2 });
    });

    // Click animation
    button.addEventListener('click', () => {
      const tl = gsap.timeline();
      tl.to(button, { scale: 0.7, duration: 0.1 })
        .to(button, { scale: 1, duration: 0.2 });
    });
  }, []);

  // Card animations
  useEffect(() => {
    gsap.from('.movie-card', {
      y: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    });
  }, [movies]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async (term = '') => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://imdb.iamidiotareyoutoo.com/search?q=${term || 'Spiderman'}`);
      console.log("API Response:", response.data);
      if (Array.isArray(response.data.description)) {
        setMovies(response.data.description);
      } else if (response.data.movies) {
        setMovies(response.data.movies);
      } else {
        setMovies([]);
        setError('No movies found.');
      }
    } catch (err) {
      setError('Error fetching movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchMovies(searchTerm);
  };

  return (
    <>
     <h1 class="Title-PS">Movie Collection</h1>
      <input
        type="text" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder="Search for a movie..." 
      />
      <button ref={buttonRef} onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="movie-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 3fr)', gap: '16px' }}>
        {movies.map((movie, index) => (
          <div className="movie-card" key={movie.id ? movie.id : `${movie.title}-${movie.year}-${index}`}>
            <img src={movie['#IMG_POSTER']} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p class="NameFilm">Rating: {movie['#RANK']}</p>
            <p class="NameFilm">Year: {movie['#YEAR']}</p>
            <p class="NameFilm">Actors: {movie['#ACTORS']}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
