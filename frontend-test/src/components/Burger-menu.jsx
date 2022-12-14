import React, {useState, useEffect} from 'react';

function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        right: '0',
        transform: 'translateY(-50%)'
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
        <div>
          <h3>Sistema de Puntos</h3>
          <p>Twitch Sub: +5</p>
          <p>Extra red social: +1</p>
        </div>
      )}
    </div>
  );
}


export default Menu;