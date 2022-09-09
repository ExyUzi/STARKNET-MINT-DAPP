import './App.css';
import logo from "./img/StarkNetlogo.png"

import { useEffect, useState } from "react";
// Import My Json
import ExyJson from "./abi/ExyNFT.json";

// Argent Wallet connect 
import { connect } from "@argent/get-starknet"

import {Contract} from 'starknet';

// My Smart contract Address
const MyContractAddress = "0x018743ab8fd75ed0fcfe5581aca191bc166f0997cb9851710679adf8972faa35";



function App() {
  const [address, setAddress] = useState(); // Address variable
  const [isConnected, setConnected] = useState(false); // Status check
  const [account, setAccount] = useState();

  const connectWallet = async () => {
    // Using connect function from @argent/get-starknet to connect our Argent X wallet to our DAPP
    const windowStarknet = await connect()
    await windowStarknet?.enable({ starknetVersion: "v4" })
    
    setAccount(windowStarknet.account) // Set our account variable to windowStarknet.account (address, provider and the signer)
    console.log(windowStarknet.account)
    setAddress(windowStarknet.selectedAddress) // Set our address variable to windowStarknet.selectedAddress
    setConnected(true) // isConnected = true, the page will changed according to the boolean
    return windowStarknet 
  }

  const mintNFT = async () => {
    const contractConnect = new Contract(ExyJson, MyContractAddress, account); // We set our Contract passing our Json, ContractAddress
    //                                                          and our Account (address, provider and the signer) 
    console.log(contractConnect);
    return contractConnect.mint(); // Call the mint function of our contract 
  }

  return (
    <div className="App">
      <h1>StarkNet Dapp</h1>
      <img src={logo} width="200px"/>
      {isConnected ? ( // If the user is connected, we show :
        <>
          <h3 style={{ margin: 0 }}>
            Wallet address: <code>{address}</code>
          </h3>
          <h2 >Mint My NFT</h2>
          <button onClick={()=> mintNFT()}> 
            Mint NFT
          </button>
        </>
      ) : ( // Else we show the connect button
        <>
        <br/>
          <button onClick={() => connectWallet()}>
            Connect Wallet
          </button>
        </>
      )}
    </div>
  );
}

export default App;
