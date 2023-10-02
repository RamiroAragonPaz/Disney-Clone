import styled from "styled-components"
import { DISNEY_ADDRESS, ABI } from '../Constants/index'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { writeContract, waitForTransaction } from 'wagmi/actions'
import { useEffect, useState } from "react"
import { useAccount } from 'wagmi';
import { parseEther } from "viem"
import Swal from 'sweetalert2'





const Login = () => {

    const { address, isConnected } = useAccount() 
    const [e, setE] = useState(null)
    const [loading, setLoading] = useState(false);



    const subscribe = async(plan, payment) => {
        try {
            const tx = await writeContract({
                address: DISNEY_ADDRESS,
                abi: ABI,
                functionName: "subscribe",
                args: [plan],
                value: parseEther(payment)
            })
            setLoading(true)
            await waitForTransaction(tx)
            .then((tx)=>{
                setLoading(false)
                console.log(tx)
                Swal.fire({
                    title: 'Subscribed!',
                    text: 'You are now subscribed',
                    icon: 'success',
                    iconColor: 'blue',
                    confirmButtonText: 'Watch!'
                }).then((result)=>{
                    if(result.isConfirmed){
                        window.location.reload()
                    }
                })
            })
            .catch((error)=>{
                setE(error);
                Swal.fire({
                    title: 'Error!',
                    text: `${error}`,
                    icon: 'error',
                    confirmButtonText: 'Ok!'
                  })
            });
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: `${error}`,
                icon: 'error',
                confirmButtonText: 'Ok!'
              })
        }
    }
        
      useEffect(()=>{
        if(isConnected){
            
        }
      },[isConnected])

    return(
        <Container>
            <Content>
                <CTA>
                    {loading ? (
                        <div>Loading...</div>
                    ):(
                        <>
                        <CTALogoOne src="/images/cta-logo-one.svg" alt="Logos"/>
                        {isConnected ? (
                            <SingUp>
                                <Plan onClick={()=>subscribe(1, "0.01")}>
                                    <div>
                                    Plan 1
                                    </div>
                                    <div> 0.01 ETH</div><div> 1 Month</div>
                                    <a>Suscribe</a>
                                </Plan>
                                <Plan onClick={()=>subscribe(2, "0.025")}>
                                    <div>
                                    Plan 2
                                    </div>
                                    <div> 0.025 ETH</div><div> 3 Months</div>
                                    <a>Suscribe</a>
                                </Plan>
                                <Plan onClick={()=>subscribe(3, "0.04")}>
                                    <div>Plan 3</div>
                                    <div> 0.04 ETH</div><div> 6 Months</div>
                                    <a>Suscribe</a>
                                </Plan>
                                <Plan onClick={()=>subscribe(4, "0.075")}>
                                    <div>Plan 4</div>
                                    <div> 0.075 ETH</div><div>12 Months</div>
                                    <a>Suscribe</a>
                                </Plan>
                            </SingUp>
                        ):(
                            <ConnectButton />
                        )}
                        </>
                    )}
                    <Description>
                    Get Premier Access to Raya and the Last Dragon for an additional fee
                    with a Disney+ subscription. As of 03/26/25, the price of Disney+
                    and The Disney Bundle will increase by $1.
                    </Description>
                    <CTALogoTwo src='/images/cta-logo-two.png' alt='Logos'/>
                </CTA>
                <BgImage />
            </Content>
        </Container>
    )
}

const Container  = styled.section`
overflow: hidden;
display: flex;
flex-direction: column;
text-align: center;
height: 100vh;

    @media (max-width: 768px) {
        margin-top: 70px;
        height: 100%;
        overflow: unset;
    }

`;

const Content = styled.div`
width: 100%;
position: relative;
min-height: 100vh;
box-sizing: border-box;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
height: 100%;
`;

const BgImage = styled.div`
background-size: cover;
background-image: url("/images/login-background.jpg");
height: 100%;
width: 100%;
position: absolute;
top: 0;
left: 0%;
z-index: -10;
`;

const CTA = styled.div`
max-width: 750px;
flex-wrap: wrap;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 0;
text-align: center;
margin-left: auto;
margin-right: auto;
width: 100%;
height: 90%;
    @media (max-width: 768px) {
        width: 80%;
    }
`;

const CTALogoOne = styled.img`
margin-bottom: 12px;
max-width: 600px;
min-height: 1px;
display: block;
width: 100%;
`;

const SingUp = styled.div`
width: 80%;
height: 45%;
margin: 0 auto;
display: flex;

    @media (max-width: 768px) {
        flex-direction: column;
        width: 100%;
        align-items: center;
    }

`;

const Plan = styled.a`
    text-align: center;
    font-weight: bold;
    color: #f9f9f9;
    background-color: #0063e5;
    margin: 0 10px 12px;
    margin-bottom: 12px;
    width: 80%;
    letter-spacing: 1.5px;
    font-size: 18px;
    padding: 16.5px 0;
    border: 1px solid transparent;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.1s ease-in-out;

      &:hover {
        transform: scale(1.05);
        transition: all 0.1s ease-in-out;
        background-color: #0483ee;
    }

    a {
        color: #0063e5;
        border-radius: 4px;
        background-color: #f9f9f9;
        text-align: center;
        width: 80%;
        height: 10%;
        margin: 0 auto;
    }
`; 

const Description = styled.p`
font-size: 11px;
margin: 10px 0 24px;
line-height: 1.5;
letter-spacing: 1.5px;
`;

const CTALogoTwo = styled.img`
max-width: 600px;
margin-bottom: 20px;
display: inline-block;
vertical-align: bottom;
width: 100%;
`;

export default Login;
