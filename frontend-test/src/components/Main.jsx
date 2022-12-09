import React from 'react';
import '../index.css';

function Main() {
  return (
    <main>
      

      <h2>Nuestra rifa de premios para nuestros seguidores mas fieles</h2>
      <h3>Impulsado en colaboracion con Binance y Beep Bop Beep</h3>
      <p>Para entrar al sorteo deberas seguir y ser subscriptor de Team Heretics en Twich<br/>
      y rellenar el formulario añadiendo tu correo electrónico y la dirección de tu wallet</p>

    
    <div class="texto">
    <form id="survey-form">
        <div class="form-group">
        <label id="twich-label" for="twich">Para entrar al sorteo primero tienes que conectarte con Twich:</label>
        <button id="twich" class="twich-button" href="https://id.twitch.tv/oauth2/authorize
          ?response_type=token+id_token
          &client_id=fm7mv8gwvzqqq2rjw07pvbaymox44l
          &redirect_uri=http://localhost:5500
          &scope=openid+user%3Aread%3Asubscriptions	
          &state=c3ab8aa609ea11e793ae92361f002671">
        Conectar con Twich
          </button>
        </div>
        <div class="form-group">
          <label id="email-label" for="email">Email:</label>
          <input type="email" name="email" id="email" class="form-control" placeholder="examle@example.com" required=""/>
        </div>
        <div class="form-group">
          <label id="name-label" for="name">Address:</label>
          <input type="hash" name="hash" id="hash" class="form-control" placeholder="0xYourAddress" required=""/>
        </div>
        <div class="form-group">
          <button type="submit" id="submit" class="submit-button">
            Entrar al sorteo
          </button>
        </div>
      </form>
    </div>   
    </main>
  )
}
export default Main;