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
	var id_person = JSON.parse(data)
	get_if_follow(id_person.data[0].id)
}

function get_if_follow(data) {
	let url = `https://api.twitch.tv/helix/users/follows?from_id=${data}&to_id=500012077`;

    let headers = {
	"Authorization": res,
    "Client-Id": client_id,
    };

    fetch(url, {
    headers,
    })
    .then((res) => res.json())
    .then((data) => checkData(JSON.stringify(data)))
}

function checkData(data)
{
	var id_person = JSON.parse(data)
	if (id_person.total == 0)
		document.getElementById("follow").innerHTML = "No sigues a Team Heretics en Twitch!";
	else
		document.getElementById("follow").innerHTML = "Enhorabuena estas dentro";
}
