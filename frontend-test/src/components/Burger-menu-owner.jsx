import React, {useState} from 'react';
import {Contract, providers} from 'ethers';
import Navbar from './Navbar';

function timer_set(change, selector)
{
  let obj = require('../timer.json')
  if (selector == 1)
    obj.timer.number = change
  if (selector == 2)
    obj.timer.day = change
  if (selector == 3)
    obj.timer.hour = change
  if (selector == 4)
    obj.timer.minute = change
  if (selector == 5)
    obj.timer.deploy = change
    const json = JSON.stringify(obj);
    fetch('http://localhost:5000/timer.json', {
    method: 'PUT',
    body: json,
    headers: {
        'Content-Type': 'application/json',
    },
    });
}

var json = require('../timer.json')
function test(isOwner){ // no se usa
  Menu_Owner(isOwner)
}

function Menu_Owner(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [numOfWinners, setNumOfWinners] = useState('');
  const [endingDay, setEndingDay] = useState('');
  const [endingHour, setEndingHour] = useState('');
  const [endingMinute, setEndingMinute] = useState('');
  const [raffleIsOpened, setRaffleStatus] = useState('');
  //async function sendTransaction() {
  //  const provider = new providers.Web3Provider(window.ethereum);
  //  const contractAddress = ""; //put contracty bytecode
  //  const contractAbi = [{
//
  //  }];
  //  const contract = new Contract(contractAddress, contractAbi, provider.getSigner());
  //  const transactionParams = {
  //    method: 'transfer',
  //  arguments: [/*constructor arguments*/], // we need further team talks
  //    gasLimit: 900000,
  //  };
  //  const transactionReceipt = await contract.executeTransaction(transactionParams);
  //}
  //console.log(props)
  if (props.isOwner) { 
    return (
      <div class ='owner-div'>
      <div>
        <Navbar
        numOfWinners={json.timer.number} // passed to contract
        day_cnt={json.timer.day}
        hour_cnt={json.timer.hour}
        minutes_cnt={json.timer.minute}
        raffleIsOpened={json.timer.deploy}
        />
      </div>
      <div id='div-menu'
        style={{
          width: menuOpen ? '15%' : '10%',
          position: 'fixed',
          top: '23%',
          right: '0',
          transform: 'translateY(-50%)'
        }}
      >
        <button id='owner-menu'class= 'owner-button'
          
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Owner Menu
        </button>
        {menuOpen && (
          <div id='params'>
            <input id="number"type='number' placeholder='NumOfWinners' value={numOfWinners} onChange={
            (e) => {
              setNumOfWinners(e.target.value)
              timer_set(e.target.value, 1)
            }
          }/>
            <input id='number' type='number' placeholder='EndingDay' value={endingDay}
            onChange={(e) => {
                setEndingDay(e.target.value)
                timer_set(e.target.value, 2)
              }
            }/>
            <input id='number' type='number' placeholder='EndingHour' value={endingHour}
            onChange={(e) => {
                setEndingHour(e.target.value);
                timer_set(e.target.value, 3)
              }
            }/>
            <input id='number' type='number' placeholder='EndingMinute' value={endingMinute}
            onChange={(e) => {
                setEndingMinute(e.target.value);
                timer_set(e.target.value, 4)
              }
            }/>
            <button type='submit' id='deploy' disabled={!numOfWinners || !endingDay || !endingHour || !endingMinute} onClick={() => {
              setRaffleStatus(true);
              timer_set(true, 5)
            }}>Launch Raffle</button>
          </div>
        )}
      </div>
      </div>
    );
  }
  
}

//trial(true)

export default Menu_Owner/*, sendTransaction*/;