import React from 'react';
import '../index.css';
import img from "../assets/hereticsLogo.png";

function Navbar() {
  return (
    <div>
    <nav class="navbar" style={{backgroundColor: '#000000',
      color: '#ffffff',
      padding: '10px',
      display: 'flex',
      justifyContent: 'start'}}>
    
      <a href="https://twitter.com/teamheretics">
      <img class="logo" style={{marginTop: '15px'}} alt="Archivo:Twitter-logo.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/512px-Twitter-logo.svg.png" decoding="async" width="46" height="36" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/768px-Twitter-logo.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/1024px-Twitter-logo.svg.png 2x" data-file-width="512" data-file-height="421" />
      </a>
      <a href="https://www.youtube.com/c/TeamHeretics">
      <img class="logo" style={{marginTop: '15px'}} alt="Archivo:YouTube full-color icon (2017).svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/159px-YouTube_full-color_icon_%282017%29.svg.png" decoding="async" width="55" height="36" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/239px-YouTube_full-color_icon_%282017%29.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/318px-YouTube_full-color_icon_%282017%29.svg.png 2x" data-file-width="159" data-file-height="110" />
      </a>
      <a href="https://www.twitch.tv/team/teamheretics">
      <img class="logo" style={{marginTop: '9px'}} alt="File:Twitch logo" src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c540.png" decoding="async" width="50" height="50" srcset="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Twitch_logo.svg/683px-Twitch_logo.svg.png?20150410204019 1.5x, https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Twitch_logo.svg/910px-Twitch_logo.svg.png?20150410204019 2x" data-file-width="455" data-file-height="281" />
      </a>
      <div>
        <a href="https://teamheretics.com/">
          <img class="logo" style={{marginTop: '9px', marginLeft: '630px'}} src= {img} alt="File:Heretics logo.png" width="150" height="50"/>
        </a>
      </div>
    </nav>
    </div>
  );
}

export default Navbar;