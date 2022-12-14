//import createUser from "./db"
if (process.browser)
{
    var res = document.location.hash
    var res1 = res.slice(14,44)
    var client_id = "fm7mv8gwvzqqq2rjw07pvbaymox44l"
    var res = `Bearer ${res1}`
}

console.log(res)
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
            document.getElementById("follower").innerHTML = "No sigues a Team Heretics en Twitch!";
            return;
    }
    if (sub == 0)
    {
        // Enviar al smart contract solo una vez el address
        document.getElementById("follower").innerHTML = "Enhorabuena estas dentro!";
        //createUser(id,"0x388a244FC351e4C77F778F1B63CdB8f200616434")
        return;
    }
	if (follow.total > 0 && sub.data != 0)
    {
        // Enviar al smart contract dos veces al ser sub
        document.getElementById("follower").innerHTML = "Enhorabuena estas dentro!";
        //createUser(id,"0x388a244FC351e4C77F778F1B63CdB8f200616434")
        return;
    }
}

export default getName;