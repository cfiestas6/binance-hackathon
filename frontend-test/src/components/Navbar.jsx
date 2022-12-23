import React, {useState, useEffect} from 'react';
import '../index.css';
import '../responsive.css';
import img from "../assets/hereticsLogo.png";
import Menu_Owner/*, sendTransaction*/ from './Burger-menu-owner';



function Navbar(props) {

  const [time, setTime] = useState(null);
  //console.log(props, "nv");
  useEffect(() => {
    console.log(props.raffleIsOpened)
    //console.log("veremos3")
    if(props.raffleIsOpened == false) {
      //console.log("veremos2")
      document.getElementById("state").innerHTML = "Cerrado";
    } else {
    //console.log("veremos")
    var day_cnt = props.day_cnt;
    var hour_cnt = props.hour_cnt;
    var minutes_cnt = props.minutes_cnt;
    var raffleIsOpened = props.raffleIsOpened; // TO-DO

    var interval = setInterval(() => {
      var now = new Date();
      var days;
      var hours;
      var minutes = minutes_cnt - now.getUTCMinutes() - 1;
      var seconds = 60 - now.getSeconds();
      if ((hour_cnt < now.getHours) || (hour_cnt == now.getHours && minutes_cnt < now.getMinutes))
        days = day_cnt - now.getDate() -1;
      else
        days = day_cnt - now.getDate();
      if (minutes_cnt < now.getMinutes)
        hours = hour_cnt - now.getHours() -1;
      else
        hours = hour_cnt - now.getHours();
      if (days < 0)
        days = 0;
      if (hours < 0)
        hours += 24;
      if (minutes < 0)
        minutes += 60;
      if(days.toString().length < 2)
        days= "0" + days;
      if(hours.toString().length < 2)
        hours = "0" + hours;
      if (minutes.toString().length < 2)
        minutes = "0" + minutes;
      if (seconds.toString().length < 2)
        seconds = "0" + seconds;
      setTime(`${days}:${hours}:${minutes}:${seconds}`);
      //console.log(day_cnt)
      //console.log(now.getUTCDate())
      //console.log(hour_cnt)
      //console.log(now.getUTCHours())
      //console.log(now.getUTCHours() + 1)
      //console.log(minutes_cnt)
      //console.log(now.getUTCMinutes())
      //console.log(raffleIsOpened)
      if (days <= now.getDate() && hours <= (now.getUTCHours() +1) && minutes <= now.getUTCMinutes() && seconds == 1){
        document.getElementById("state").innerHTML = "Cerrado";
        raffleIsOpened = false;
        const obj = require('../timer.json')
        obj.timer.deploy = false;
        const json = JSON.stringify(obj);
        fetch('http://localhost:5000/timer.json', {
          method: 'PUT',
          body: json,
          headers: {
            'Content-Type': 'application/json',
          },
          });
        /*sendTransaction();*/
        }
    }, 1000);
  }
}, [props.day_cnt, props.hour_cnt, props.minutes_cnt, props.raffleIsOpened]);

  const handleClick = () => {
    window.location.href = 'https://teamheretics.com/';
  };

  return (
    <div>
    <div class = 'div-navbar'>
    <nav class="navbar" style={{backgroundColor: '#000000'}}>
      <a id="logo-twitter" href="https://twitter.com/teamheretics" onMouseOut={() => { document.getElementById('logo-twitter').style.opacity = 1;}} onMouseOver={() => {
        document.getElementById('logo-twitter').style.opacity = 0.5;
      }}>
      <img class="logo" style={{marginTop: '15px'}} alt="Archivo:Twitter-logo.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/512px-Twitter-logo.svg.png" decoding="async" width="46" height="36" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/768px-Twitter-logo.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/1024px-Twitter-logo.svg.png 2x" data-file-width="512" data-file-height="421" />
      </a>
      <a id="logo-youtube" href="https://www.youtube.com/c/TeamHeretics" onMouseOut={() => { document.getElementById('logo-youtube').style.opacity = 1;}} onMouseOver={() => {
        document.getElementById('logo-youtube').style.opacity = 0.5;
      }}>
      <img class="logo" style={{marginTop: '15px'}} alt="Archivo:YouTube full-color icon (2017).svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/159px-YouTube_full-color_icon_%282017%29.svg.png" decoding="async" width="55" height="36" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/239px-YouTube_full-color_icon_%282017%29.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/318px-YouTube_full-color_icon_%282017%29.svg.png 2x" data-file-width="159" data-file-height="110" />
      </a >
      <a id="logo-twitch" href="https://www.twitch.tv/team/teamheretics" onMouseOut={() => { document.getElementById('logo-twitch').style.opacity = 1;}} onMouseOver={() => {
        document.getElementById('logo-twitch').style.opacity = 0.5;
      }}>
      <img class="logo" style={{marginTop: '9px'}} alt="File:Twitch logo" src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c540.png" decoding="async" width="50" height="50" srcset="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Twitch_logo.svg/683px-Twitch_logo.svg.png?20150410204019 1.5x, https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Twitch_logo.svg/910px-Twitch_logo.svg.png?20150410204019 2x" data-file-width="455" data-file-height="281" />
      </a>
      <img id="link" onMouseOut={() => { document.getElementById('link').style.opacity = 1;}} onMouseOver={() => {
        document.getElementById('link').style.opacity = 0.5;
      }}class="logo-heretics" onClick={handleClick} style={{marginTop: '9px', marginLeft: '630px', zIndex: 1}} src= {img} alt="File:Heretics logo.png" width="150" height="50"/>
      <div>
      <span id="state" >Abierto: {time}</span>
    </div>
    </nav>
    </div>
    </div>
    
  );
}

export default Navbar;