import styled from 'styled-components'
import ImgSlider from './ImgSlider';
import Viewers from './Viewers';
import Recommended from './Recommended';
import moviesData from './disneyPlusMoviesData.json'
import { useEffect, useState } from 'react'

const Home = () => {
    const [recomended, setRecomended] = useState([])
    const [newest, setNewest] = useState([])
    const [trending, setTrending] = useState([])
    const [original, setOringinal] = useState([])
    

    const data = moviesData

    const getMovies = () => {
        const newMovies = data.filter((movie)=>movie.type === 'new')
        const recomendedMovies = data.filter((movie)=>movie.type === 'recommend')
        const trendingMovies = data.filter((movie)=>movie.type === 'trending')
        const originalMovies = data.filter((movie)=>movie.type === 'original')
        setNewest(newMovies)
        setRecomended(recomendedMovies)
        setTrending(trendingMovies)
        setOringinal(originalMovies)
    }

    useEffect(()=>{
        getMovies();
    },[])

    return(
       <Container>
            <h2>THIS IS A CLONE. NOT OFFICIAL DISNEY APP</h2>  
            <ImgSlider />
            <Viewers />
            <h4>New Movies</h4>
            <Recommended data={newest} />
            <h4>Recommended for You</h4>
            <Recommended data={recomended} />
            <h4>Disney Originals</h4>
            <Recommended data={original} />
            <h4>Trending</h4>
            <Recommended data={trending} />
       </Container>
    )
}

const Container = styled.main`
position: relative;
width: 100%;
min-height: 100vh;
overflow-x: hidden;
background-image: url('/images/home-background.png');
background-repeat: no-repeat;
background-position-x: center;
background-position-y: center;
background-attachment: fixed;
background-size: cover;
top: 70px;
display: block;
padding: 0 calc(3.5vw = 5px );
h2 {
    text-align: center;
    
}
h4 {
    width: 80%;
    margin: 0 auto;
}
`;


export default Home