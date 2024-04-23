// var mymap = L.map('mapid').setView([40.117062770246385, -5.777798262674521], 5);
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(mymap);

// const marcadores = [];

// // Array para almacenar las promesas de fetch
// const promesas = [];

// // Primer fetch
// promesas.push(fetch('URL_DE_PRIMERA_API')
//     .then(response => response.json())
//     .then(data => {
//         const cc = data.values;

//         cc.forEach(coor => {
//             // Procesar los datos de la primera API y almacenar los marcadores en el array
//             if(coor.length > 1 ){
//                 if(coor[5].charAt(0) === "-" || !isNaN(parseInt(coor[5].charAt(0)))){
//                     const nombre = coor[0];
//                     const imagen = coor[3]
//                     const coordenadas = coor[5].split(',').map(parseFloat);
//                     marcadores.push({ nombre: nombre, imagen: imagen, coordenadas: coordenadas });
//                 } else {
//                     console.log("No entro");
//                 }
//             }
//         });
//     })
//     .catch(error => console.error(error)));

// // Segundo fetch
// promesas.push(fetch('URL_DE_SEGUNDA_API')
//     .then(response => response.json())
//     .then(data => {
//         // Procesar los datos de la segunda API y almacenar los marcadores en el array
//         // Suponiendo que la estructura de datos sea similar a la primera API
//         const cc = data.values;

//         cc.forEach(coor => {
//             if(coor.length > 1 ){
//                 if(coor[5].charAt(0) === "-" || !isNaN(parseInt(coor[5].charAt(0)))){
//                     const nombre = coor[0];
//                     const imagen = coor[3]
//                     const coordenadas = coor[5].split(',').map(parseFloat);
//                     marcadores.push({ nombre: nombre, imagen: imagen, coordenadas: coordenadas });
//                 } else {
//                     console.log("No entro");
//                 }
//             }
//         });
//     })
//     .catch(error => console.error(error)));

// // Esperar a que se completen ambas promesas antes de mostrar los marcadores
// Promise.all(promesas)
//     .then(() => {
//         // Una vez completadas las dos peticiones y se hayan almacenado todas las coordenadas
//         // Mostrar los marcadores en el mapa
//         marcadores.forEach(marcador => {
//             var marker = L.marker(marcador.coordenadas).addTo(mymap);
//             marker.bindPopup(`<b>${marcador.nombre}</b><br><a target='blank' href="${marcador.imagen}">Ver imagen</a>`).openPopup();
//         });
//     });
