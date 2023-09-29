import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import Detail from './components/Detail'
import { useAccount, useContractRead } from 'wagmi';
import { useContext, useEffect, useState } from "react"
import { DISNEY_ADDRESS, ABI } from './Constants/index'
import { readContract } from 'wagmi/actions';
import { ContextProvider, DisneyContext } from './Context/DisneyContext';

function App() {

  const { address } = useAccount();  
  const [currentlySuscribe, setCurrentlySuscribe] = useState("")
  
  const hasCurrentSubscription = async() => {
    const tx = await readContract({
        abi: ABI,
        address: DISNEY_ADDRESS,
        functionName: "hasCurrentSubscription",
        account: address
    })
    setCurrentlySuscribe(tx)
  }

    const isSubscribed = useContractRead({
      abi: ABI,
      address: DISNEY_ADDRESS,
      functionName: "isSubscribed",
      args: [address]
  })


useEffect(()=>{
  isSubscribed ? hasCurrentSubscription() : setCurrentlySuscribe(false);
},[address])

  return (
    <div className="App">
      <BrowserRouter>
      <ContextProvider >
        <Header />
          <Routes>
            {address && currentlySuscribe ? (
              <>
                <Route path='/' element={<Home />}/>
                <Route path='/detail/:title' element={<Detail />}/>
              </>
              ) : (
              <Route path='/' element={<Login />}/>
            )}
          </Routes>
        </ContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
