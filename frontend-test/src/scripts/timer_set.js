fetch('http://localhost:5000/timer.json', {
        method : 'GET',
    })
    .then((response) => response.json())
    .then((obj) => {
        //console.log(obj.timer.deploy)
        // Modificar el objeto según sea necesario
        console.log(obj)
        obj.timer.number = '34'
        console.log(obj)
        // Convertir el objeto modificado de nuevo a JSON
        const json = JSON.stringify(obj);

        //Enviar una solicitud HTTP para actualizar el archivo en el servidor
        fetch('http://localhost:5000/timer.json', {
        method: 'PUT',
        body: json,
        headers: {
            'Content-Type': 'application/json',
        },
        });
    });