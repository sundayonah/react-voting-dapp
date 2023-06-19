
import './App.css';
import { Signer, ethers } from 'ethers';
import {contractAbi, contractAddress} from "./constant/constant"
import Login from './components/Login';
import { useState } from 'react';

function App() {

  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setremainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState('');
  const [CanVote, setCanVote] = useState(true);


async function connectWallet () {
  if(window.ethereum){
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider)
      await provider.send("eth_requestAccounts", [])
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(`Metamask Connected :${address}`)
    
    } catch (error) {
      console.error(error)
      
    }
  }
}

  return (
    <div className="App">
     <h1>hello</h1>
     <Login />
    </div>
  );
}

export default App;
