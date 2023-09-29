import styled from 'styled-components'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { faHouse, faMagnifyingGlass, faPlus, faStar, faTicket, faTv  } from '@fortawesome/free-solid-svg-icons'
import { useAccount, useContractRead } from 'wagmi';
import { readContract,writeContract, waitForTransaction } from 'wagmi/actions';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { DISNEY_ADDRESS, ABI } from '../Constants';



const Header = () => {
    const { address, isConnected } = useAccount(); 
 
    const navigate = useNavigate();

    const [ finalDate, setFinalDate ] = useState(null)
    const [ isSubscribedStatus, setIsSubscribedStatus ] = useState(null)
    const [ loading, setLoading ] = useState(false)


    const subscribed = useContractRead({
        abi: ABI,
        address: DISNEY_ADDRESS,
        functionName: "isSubscribed",
        args: [address]
    })




    const checkIfIsSuscribed = async() => {
        if(isConnected) {
            setLoading(true)
            const tx = await readContract({
                abi: ABI,
                address: DISNEY_ADDRESS,
                functionName: "isSubscribed",
                args: [address]
            })
            if(tx[0] != 0){
                setIsSubscribedStatus(true)
            }
            else {
                setIsSubscribedStatus(false);
            }
            setLoading(false)
        }
    }

    const checkSubscription = () => {
        setLoading(true)
        try {
            const dateTimestamp = subscribed.data[1];
            const date = Number(dateTimestamp) * 1000;
            if(date !== 0){
                const formatDate = new Date(date);
                setFinalDate(formatDate.toDateString());
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
        console.log("sin problemas")
    } 


    useEffect(()=>{
        if(!address){
            navigate('/')
        }
        checkIfIsSuscribed();
      },[address])

      useEffect(()=>{
        if(isSubscribedStatus){
            checkSubscription()
        };
      },[isSubscribedStatus])
    

    return(
        <Nav>
            <Logo>
                <a href='/' >
                    <img src='/images/logo.svg' alt='disney'/>
                </a>
            </Logo>
            {(address && isSubscribedStatus) ? ( 
                <NavMenu>
                    <a href='/'>
                        <FontAwesomeIcon icon={faHouse}/>
                        <span>HOME</span>
                    </a>
                    <a>
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        <span>SEARCH</span>
                    </a>
                    <a>
                        <FontAwesomeIcon icon={faPlus}/>
                        <span>WATCHLIST</span>
                    </a>
                    <a>
                        <FontAwesomeIcon icon={faStar}/>
                        <span>ORIGINALS</span>
                    </a>
                    <a>
                        <FontAwesomeIcon icon={faTicket}/>
                        <span>MOVIES</span>
                    </a>
                    <a>
                        <FontAwesomeIcon icon={faTv}/>
                        <span>SERIES</span>
                    </a>
                    {loading ? (
                        <div>Fetching data...</div>
                    ):(
                        <>
                        {isSubscribedStatus && (<p>Subscription finish: <br/> {finalDate}</p>)}
                        </>
                    )}
                </NavMenu>
            ):(
                <h2>THIS IS A CLONE. NOT OFFICIAL DISNEY APP</h2>  
            )}
            <ConnectButton />
        </Nav>
    )
}

const Nav = styled.nav`
position: fixed;
top: 0;
height: 70px;
background-color: #090b13;
display: flex;
width: 100%;
justify-content: space-between;
align-items: center;
padding: 0 36px;
letter-spacing: 16px;
z-index: 3;

h2{
    letter-spacing: 1px;
}
`;

const Logo = styled.a`
padding: 0;
width: 80px;
margin-top: 4px;
max-height: 70px;
font-size: 0;
display: inline-block;

img{
    display: block;
    width: 100%;
}
`
const NavMenu = styled.div`
align-items: center;
display: flex;
flex-flow: row nowrap;
height: 100%;
justify-content: flex-end;
margin: 0;
padding: 0;
position: relative;
margin-right: auto;
margin-left: 25px;

a {
    margin-top: 10px;
    display: flex;
    padding: 0 12px 5px;
    cursor: pointer;

    span {
        margin-left: 10px;
        font-size: 15px;
        letter-spacing: 1.42px;
        line-height: 1.08;
        padding: 2px 0px;
        white-space: nowrap;
        position: relative;
    }

    &:hover{
        padding-bottom: 3px;
        border-bottom: 2px solid white;
    }
}

p{  
    width: 20%;
    margin-left: 25px;
    letter-spacing: 1px;
    font-size: 15px;
}

@media (max-width: 768px) {
    display: none;
}
`;

const Login = styled.a`
background-color: rgba(0, 0, 0, 0.6);
padding: 8px 16px;
border: 1px solid white;
border-radius: 4px;
font-weight: bold;
text-align: center;
letter-spacing: 1.5px;
transform: all 0.2s ease;
cursor: pointer;

&:hover {
    background-color: #f9f9f9;
    border-color: transparent;
    color: black;
    transform: all 0.2s ease;
}

`;
export default Header