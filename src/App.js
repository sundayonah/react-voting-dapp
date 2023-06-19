
import './App.css';
import { Signer, ethers } from 'ethers';
import {contractAbi, contractAddress} from "./constant/constant"
import Login from './components/Login';
import { useEffect, useState } from 'react';
import Main from './components/main';

function App() {

  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setremainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState('');
  const [CanVote, setCanVote] = useState(true);



  useEffect( () => {
    // getCandidates();
    getRemainingTime();
    getCurrentStatus();
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return() => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    }
  });

function handleAccountsChanged(accounts){
  if(accounts.length > 0 && account !== accounts[0]){
  setAccount(accounts[0])
}else{
  setIsConnected(false)
  setAccount(null)
}}



async function connectWallet () {
  if(window.ethereum){
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider)
      await provider.send("eth_requestAccounts", [])
      const signer = provider.getSigner();
      const address = await signer.getAddress();
        setAccount(address)
      console.log(`Metamask Connected :${address}`)
      setIsConnected(true)
    
    } catch (error) {
      console.error(error)
    }
  }else{
    console.log("Metamask is not detected in the browser")
  }
}

async function getCurrentStatus() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contractInstance = new ethers.Contract (
    contractAddress, contractAbi, signer
  );
  const status = await contractInstance.getVotingStatus();
  console.log(status);
  setVotingStatus(status);
}

async function getRemainingTime(){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contractInstance = new ethers.Contract(
    contractAddress, contractAbi, signer
  );
  const time = await contractInstance.getRemainingTime();
  setremainingTime(parseInt(time, 16));
}


  return (
    <div className="App">
     <h1>hello</h1>
     {/* <Login connectWallet={connectWallet} /> */}

     {isConnected ? (<Main account = {account}/>) : (<Login connectWallet = {connectWallet} />)}
    </div>
  );
}

export default App;
