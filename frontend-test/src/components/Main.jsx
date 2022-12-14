import React from 'react';
import '../index.css';
import createUser from '../scripts/db';


function Main() {
  var res = document.location.hash
  var res1 = res.slice(14,44)
  var client_id = "fm7mv8gwvzqqq2rjw07pvbaymox44l"
  var res = `Bearer ${res1}`
  //console.log(res)
  //document.getElementById("demo").innerHTML = res

  function getName()
  {
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
          getId(name_person.preferred_username)
    })
  }
  
  function getId(nombre) {
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
      parseId(JSON.stringify(data))
    })
  }
  
  function parseId(data)
  {
      //console.log(data)
    var id_person = JSON.parse(data)
    get_if_in(id_person.data[0].id)
  }
  
  function get_if_in(id) {
    let url = `https://api.twitch.tv/helix/users/follows?from_id=${id}&to_id=500012077`
  
      let headers = {
    "Authorization": res,
      "Client-Id": client_id,
      };
  
      fetch(url, {
      headers,
      })
      .then((res) => res.json())
      .then((data) => checkSub(id, JSON.stringify(data)))
  }
  
  function checkSub(id, follow)
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
      if (follow.total == 0)
      {
              if (sub == 0)
              {
              document.getElementById("follower").innerHTML = "No sigues a Team Heretics en Twitch ni eres subcriptor!";
                  return;
              }
              document.getElementById("follower").innerHTML = "No sigues a Team Heretics en Twitch!";
              return;
      }
      if (sub == 0)
      {
          document.getElementById("follower").innerHTML = "No eres subcriptor de Team Heretics en Twitch!";
          return;
      }
    if (follow.total > 0 && sub.data != 0)
      {
          document.getElementById("follower").innerHTML = "Enhorabuena estas dentro!";
          const hash = document.getElementById("hash")
          createUser(id, hash)
      }
  }
  return (
    <main>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    <div class="texto">
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
          <input type="hash" name="hash" id="hash" class="form-control" placeholder="0xYourAddress" required=""/>
        </div>
        <div class="form-group">
          <button type="submit" id="submit" class="submit-button" onClick={getName()}>
            Entra al sorteo
          </button>
        </div>
      </form>
      <p id="follower" style={{color: "#daa520"}}></p>
    </div>   
    </main>
  )
}
export default Main;