import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p style={{position:"relative", marginTop:"-10px"}}>Copyright ⓒ {year}</p>
      <h3>Impulsado en colaboracion con Binance y Beep Bop Beep</h3>
    </footer>
  );
}

export default Footer;