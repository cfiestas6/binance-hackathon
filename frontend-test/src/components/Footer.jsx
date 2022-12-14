import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <h3 style={{position:"fixed", bottom: -10, marginTop:"125px", marginLeft:"700px", color:"grey"}}>Impulsado en colaboracion con Binance y Beep Bop Beep</h3>
      <p style={{position:"fixed", bottom: 22, marginTop:"95px", marginLeft:"880px", color:"grey"}}>Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;