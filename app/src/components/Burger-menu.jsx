import React, {useState, useEffect} from 'react';

function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div class = 'big-burger-div'
      style={{
        width: menuOpen ? '15%' : '4%',
        position: 'fixed',
        top: '50%',
        right: '0',
        transform: 'translateY(-50%)',
        paddingRight: '30px'
      }}
    >
      <button id='burger-div'
        style={{
          //backgroundColor: '#FFD700',  // golden
          border: 'none',
          color: 'white',  // black
          cursor: 'pointer',
          fontSize: '2em',
          outline: 'none',
          padding: '0.25em 0.5em',
          borderRadius: '0.25em'
        }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>
      {menuOpen && (
        <div id='mobile-burger-div'class='burger-div'>
          <h3 id ='mobile-burger-title' class='burger-title'>Sistema de Puntos</h3>
          <p id='mobile-burger-p'class='p-burger'>Twitch Sub: +5</p>
          <p id='mobile-burger-p'class='p-burger'>Twitch Follower: +1</p>
        </div>
      )}
    </div>
  );
}


export default Menu;