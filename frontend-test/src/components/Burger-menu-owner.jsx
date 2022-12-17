import React, {useState, Component} from 'react';
import {Contract, providers, Wallet} from 'ethers';
import Navbar from './Navbar';

function Menu_Owner(isOwner) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [numOfWinners, setNumOfWinners] = useState('');
  const [endingDay, setEndingDay] = useState('');
  const [endingHour, setEndingHour] = useState('');
  const [endingMinute, setEndingMinute] = useState('');
  const [raffleIsOpened, setRaffleStatus] = useState('');

  isOwner = true; // temporal
  async function sendTransaction() {
    const provider = new providers.Web3Provider(window.ethereum);
    const contractAddress = ""; //put contracty bytecode
    const contractAbi = [{

    }];
    const contract = new Contract(contractAddress, contractAbi, provider.getSigner());

    const transactionParams = {
      method: 'transfer',
      arguments: [/*constructor arguments*/], // we need further team talks
      gasLimit: 900000,
    };

    const transactionReceipt = await contract.executeTransaction(transactionParams);
  }
  if (isOwner) {
    return (
      <div>
        <Navbar 
        numOfWinners={numOfWinners} // passed to contract
        endingHour={endingHour}
        day_cnt={endingDay}
        hour_cnt={endingHour}
        minutes_cnt={endingMinute}
        raffleIsOpened={raffleIsOpened}
        />
      <div
        style={{
          position: 'fixed',
          top: '30%',
          right: '0',
          transform: 'translateY(-50%)'
        }}
      >
        <button
          style={{
            backgroundColor: '#FFD700', // golden
            border: 'none',
            color: '#000000', // black
            cursor: 'pointer',
            fontSize: '2em',
            outline: 'none',
            padding: '0.25em 0.5em',
            borderRadius: '0.25em',
          }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Owner Menu
        </button>
        {menuOpen && (
          <div>
            <form>
              <input type='number' placeholder='NumOfWinners' value={numOfWinners} onChange={
                (e) => setNumOfWinners(e.target.value)}/>
              <input id='timeInput' type='number' placeholder='EndingDay' value={endingDay}
              onChange={(e) => setEndingDay(e.target.value)}
              />
              <input id='timeInput' type='number' placeholder='EndingHour' value={endingHour}
              onChange={(e) => setEndingHour(e.target.value)}
              />
              <input id='timeInput' type='number' placeholder='EndingMinute' value={endingMinute}
              onChange={(e) => setEndingMinute(e.target.value)}
              />
              <button type='submit' id='deploy' disabled={!numOfWinners || !endingDay || !endingHour || !endingMinute} onClick={() => {
                sendTransaction();
                setRaffleStatus(true);
              }}>Launch Raffle</button>ç
            </form>
          </div>
        )}
      </div>
      </div>
    );
  }
}


export default Menu_Owner;