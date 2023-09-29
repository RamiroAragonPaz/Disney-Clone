import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { faPlay, faCirclePlus, faUsers } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'

import { DISNEY_ADDRESS, ABI } from '../Constants/index'
import { useContractRead } from 'wagmi'


import moviesData from './disneyPlusMoviesData.json'



const Detail = () => {

  const [play, setPlay] = useState(false)
  const amount = useContractRead({
    abi: ABI,
    address: DISNEY_ADDRESS,
    functionName: "amount"
  })

    const { title } = useParams()
    const [movieData, setMovieData] = useState({})

    const startVideo = () => {
      play ? setPlay(false) : setPlay(true)
      console.log(play)
    }

   
    const showSelectedData = () => {
        const data = moviesData;
        const selectedMovie = data.filter((el)=>el.title === title)
        setMovieData(selectedMovie[0])
    }


    useEffect(()=>{
        showSelectedData();
    },[])

    return(
        <Container>
            <Background>
                <img src={movieData.backgroundImg} alt={movieData.title}/>
            </Background>
            {play ? 
            <div className='video-container'>
              <iframe className='video' src={movieData.trailer} title={movieData.title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading='lazy' /> 
              <button onClick={startVideo} className='closeButton'>X</button>
            </div> : ""}
            <ImageTitle>
                <img alt={movieData.title} src={movieData.titleImg} />
            </ImageTitle>
            <ContentMeta>
                <Controls>
                    <Player onClick={startVideo}>
                        <span>
                            <FontAwesomeIcon className='playIcon' icon={faPlay} /> Play
                        </span>
                    </Player>
                    <Trailer>
                        <span><FontAwesomeIcon className='trailerIcon' icon={faPlay} />Trailer</span>
                    </Trailer>
                      <FontAwesomeIcon className='circlePlus' icon={faCirclePlus}  />
                    <FontAwesomeIcon className='circleUsers' icon={faUsers} />
                </Controls>
                <Subtitle>
                    {movieData.subTitle}
                </Subtitle>
                <Description>
                    {movieData.description}
                </Description>
            </ContentMeta>
        </Container>
    )
}

const Container = styled.div`
 padding: 0 calc(3.5vw + 5px);
position: relative;
width: 100%;
height: calc(100% - 70px);
margin-top: 72px;
overflow: hidden;

.video-container{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  background-color: black;
}

.video{
  position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100vw;
    height: 100vh;
  }

  .closeButton {
    border: none;
    border-radius: 4px;
    position: absolute;
    top: 10px;
    left: 10px;
    color: white;
    background-color: #0063e5;
    width: 50px;
    height: 50px;
    z-index: 1000;
    cursor: pointer;
    
    &:hover {
        transform: scale(1.05);
        transition: all 0.1s ease-in-out;
        background-color: #0483ee;
    }

  }

`;

const Background = styled.div`
left: 0px;
opacity: 0.8;
position: fixed;
right: 0px;
top: 0px;
z-index: -1;

  img {
    width: 100vw;
    height: 100vh;

    @media (max-width: 768px) {
      min-height: 100%;
      object-fit: cover;
    }
  }
`;

const ImageTitle = styled.div`
  align-items: flex-end;
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  margin: 0px auto;
  height: 50%;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;

  img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
`;

const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;

  .circlePlus{
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
    margin-right: 20px;
    overflow: hidden;
    border: 1px solid rgb(249, 249, 249);
    border-radius: 50%;
    width: 50px;
    height: 50px;

    &:hover {
        color: rgba(0, 0, 0, 0.4);
        background: rgba(255,255, 255, 0.9);
    }
  }

  .circleUsers{
    border: 1px solid rgb(249, 249, 249);
    background-color: rgb(255, 255, 255);
    color:  rgb(0, 0, 0);
    border-radius: 50%;
    width: 50px;
    height: 50px;

    &:hover {
        color:  rgba(255, 255, 255, 0.7);
        background: rgba(255,255, 255, 0.5);
    }
  }
`;

const Player = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgb(249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);

  
  .playIcon {
    color: black;
    width: 32px;
  }

  &:hover {
    background: rgb(198, 198, 198);
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0px 12px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;

    .playIcon {
      width: 25px;
    }
  }
`;

const Trailer = styled(Player)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);

  .trailerIcon {
    width: 32px;
  }
`;

const Subtitle = styled.div`
 color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;


const Description = styled.div`
line-height: 1.4;
  font-size: 20px;
  padding: 16px 0px;
  color: rgb(249, 249, 249);

  @media (max-width: 768px) {
    font-size: 14px;
  }

`;

export default Detail
