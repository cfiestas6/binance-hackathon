import React, {useState, useEffect} from 'react';

function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div class = 'big-burger-div'
      style={{
        width: menuOpen ? '15%' : '3.5%',
        position: 'fixed',
        top: '47%',
        right: '0',
        transform: 'translateY(-50%)',
      }}
    >
      <button
        style={{
          backgroundColor: '#FFD700',  // golden
          border: 'none',
          color: '#000000',  // black
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
        <div class='burger-div'>
          <h3 class='burger-title'>Sistema de Puntos</h3>
          <p class='p-burger'>Twitch Sub: +5</p>
          <p class='p-burger'>Extra red social: +1</p>
        </div>
      )}
    </div>
  );
}


export default Menu;