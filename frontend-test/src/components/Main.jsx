import { id } from 'ethers/lib/utils';
import React from 'react';
import Menu_Owner from './Burger-menu-owner';
import '../index.css';
import Navbar from './Navbar';
import { useState } from 'react';
const client_id = "fm7mv8gwvzqqq2rjw07pvbaymox44l"

let owners = {
  253156717:"Diego",
  149156587: "Alex",
  500012077: "Team Heretics"
}

function Main() {
  const [showMenu, setMenu] = useState(false);
  //console.log(res)
  //document.getElementById("demo").innerHTML = res
  function getName()
  {
    var res = document.location.hash
    var res1 = res.slice(14,44)
    var res = `Bearer ${res1}`
      let url = "https://id.twitch.tv/oauth2/userinfo";
  
      let headers = {
    "Content-Type": "application/json",
      "Authorization": res,
      };
  
      fetch(url, {
      headers,
      })
      .then((res) => res.json())
      .then((data) =>
    {
          var name_person = JSON.parse(JSON.stringify(data))
          getId(name_person.preferred_username, res)
    })
  }
  
  function getId(nombre, res) {
    let url = `https://api.twitch.tv/helix/users?login=${nombre}`;
  
      let headers = {
    "Authorization": res,
      "Client-Id": client_id,
      };
  
      fetch(url, {
      headers,
      })
      .then((res) => res.json())
      .then((data) =>
    {
      parseId(JSON.stringify(data), res)
    })
  }
  
  function parseId(data, res)
  {
    var id_person = JSON.parse(data)
    //console.log(id_person.data[0].id)
    var id = id_person.data[0].id
    if (id == 253156717 || id == 149156587)
    {
      setMenu(true)
      document.getElementById("follower").innerHTML = `Bienvenido ${owners[id]}`;
    } 
    else
     get_if_in(id_person.data[0].id, res) 
  }
  
  function get_if_in(id, res) {
    let url = `https://api.twitch.tv/helix/users/follows?from_id=${id}&to_id=500012077`
      let headers = {
    "Authorization": res,
      "Client-Id": client_id,
      };
  
      fetch(url, {
      headers,
      })
      .then((res) => res.json())
      .then((data) => checkSub(id, JSON.stringify(data)), res)
  }
  
  function checkSub(id, follow, res)
  {
      let url = `https://api.twitch.tv/helix/subscriptions/user?broadcaster_id=500012077&user_id=${id}`
      var status_res;
      let headers = {
          "Authorization": res,
          "Client-Id": client_id,
      };
      fetch(url, {
          headers,
      })
      .then((res) => status_res = res.status)
      .then((data) => 
      {
          if (status_res !== 200)
              checkData(follow, 0, id) 
          else
              checkData(follow, JSON.stringify(data), id)
                
      })
  
  }
  
  function checkData(follow, sub, id)
 {
    var follow = JSON.parse(follow)
    if (follow.total === 0)
    {
      document.getElementById("follower").innerHTML = "No sigues a Team Heretics en Twitch!";
      return;
    }
    if (sub === 0)
    {
        // Enviar al smart contract solo una vez el address
        document.getElementById("follower").innerHTML = "¡Enhorabuena eres elegible para participar en el sorteo!";
        var boton = document.getElementById("submit");
        boton.addEventListener("click", () => {
          var hash = document.getElementById("hash").value
          if (hash)
          {
            document.getElementById("follower").innerHTML = "Ya estás dentro del sorteo ¡Mucha suerte!";
            console.log(hash)
          }
          else
            document.getElementById("follower").innerHTML = "¡Debes introducir tu wallet!";
      })
        //console.log(hash)
        //console.log(hash)
        return;
    }
	if (follow.total > 0 && sub.data !== 0)
    {
        // Enviar al smart contract dos veces al ser sub
        document.getElementById("follower").innerHTML = "¡Enhorabuena eres elegible para participar en el sorteo!";
        var boton = document.getElementById("submit");
        boton.addEventListener("click", () => {
          var hash = document.getElementById("hash").value
          if (hash)
          {
            document.getElementById("follower").innerHTML = "Ya estás dentro del sorteo ¡Mucha suerte!";
            console.log(hash)
          }
          else
            document.getElementById("follower").innerHTML = "¡Debes introducir tu wallet!";
      })
        return;
    }
  }

  return (
    <main>
      {showMenu ?
        <Menu_Owner isOwner={true} mn="tst"/>
        :
        <Navbar/>
      }
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    <div class="texto">
      <div class='div-form'>
      <form id="survey-form">
        <div class="form-group">
        <label id="twich-label" for="twich">Para poder entrar al sorteo:</label>
        <a id="twich" class="twich-button" href="https://id.twitch.tv/oauth2/authorize
?response_type=token+id_token
&client_id=fm7mv8gwvzqqq2rjw07pvbaymox44l
&redirect_uri=http://localhost:3000
&scope=openid+user%3Aread%3Asubscriptions	
&state=c3ab8aa609ea11e793ae92361f002671">
        Conecta con Twich
          </a>
        </div>
        <div class="form-group">
          <label id="name-label" for="name">Address:</label>
          <input type="hash" name="hash" id="hash" class="form-control" placeholder="0xYourAddress" required="true"/>
        </div>
        <div class="form-group">
          <button type="button" id="submit" class="submit-button" onClick={getName()}>
            Entra al sorteo
          </button>
          </div>
        </form>
        </div>
      <p id="follower" style={{color: "#daa520"}}></p>
    </div>
    </main>
  )
}

export default Main;