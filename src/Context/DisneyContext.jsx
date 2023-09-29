import { createContext, useState } from "react";
import { useAccount, useContractRead } from 'wagmi';
import { DISNEY_ADDRESS, ABI } from '../Constants/index'

export const DisneyContext = createContext("");

const ContextProvider = ({ children }) => {
    const { address } = useAccount();
    const [account, setAccount] = useState(null)
    const [selectedMovie, setSelectedMovie] = useState({})

    const [finalDate, setFinalDate] = useState(null)

    const isSubscribed = useContractRead({
        abi: ABI,
        address: DISNEY_ADDRESS,
        functionName: "isSubscribed",
        args: [address]
    })

    const hasCurrentSubscription = useContractRead({
        abi: ABI,
        address: DISNEY_ADDRESS,
        functionName: "hasCurrentSubscription",
        account: address
    })

    const checkSubscription = async() => {
        try {
            console.log(isSubscribed.data)
            const dateTimestamp = isSubscribed.data[1];
            const date = Number(dateTimestamp) * 1000;
            const formatDate = new Date(date);
            console.log(formatDate)
            setFinalDate(formatDate.getHours() + ":" + formatDate.getMinutes() + ", "+ formatDate.toDateString());
        } catch (error) {
            console.log(error)
        }
    } 

    const data = {
        account,
        setAccount,
        selectedMovie,
        setSelectedMovie,
        checkSubscription,
        finalDate,
        hasCurrentSubscription
    }

    return(
        <DisneyContext.Provider value={data}>
            {children}
        </DisneyContext.Provider>
    )
}

export { ContextProvider }