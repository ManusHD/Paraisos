var mymap = L.map('mapid').setView([40.117062770246385, -5.777798262674521], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

const marcadoresRutas = [];
const marcadoresPiscinas = [];
var markersPiscinas = L.layerGroup().addTo(mymap);
var markersRutas = L.layerGroup().addTo(mymap);

var iconoPiscina = L.icon({
    iconUrl: 'imagenes/icono_piscinas.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var iconoRuta = L.icon({
    iconUrl: 'imagenes/icono_rutas.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

fetch('https://sheets.googleapis.com/v4/spreadsheets/12m4yTxu6PHc7kCG_cpf9ACy1aP9sk3wu1QLTPisi-bM/values/Paraisos!A8:H?key=AIzaSyD1qXjPmgBaRtX0zJtH76nvU708Gvs3A-g')
.then(response => response.json())
.then(data => {
    const cc = data.values;

    cc.forEach(coor => {
        if(coor.length > 1 ){
            if(coor[5].charAt(0) === "-" || !isNaN(parseInt(coor[5].charAt(0)))){
                
                const nombre = coor[0];
                const imagen = coor[3]
                const coordenadas = coor[5].split(',').map(parseFloat);

                // Almacenar las coordenadas en el array de marcadores
                if(coor[7] == 'Piscina'){
                    marcadoresPiscinas.push({ nombre: nombre, imagen: imagen, coordenadas: coordenadas, icono: iconoPiscina });
                }else{
                    marcadoresRutas.push({ nombre: nombre, imagen: imagen, coordenadas: coordenadas, icono: iconoRuta });
                }

            }else{
                console.log("No entro");
            }
        }else{
            // console.log("Menor que 1");
        }
    });

    // Una vez completada la petición y se hayan almacenado todas las coordenadas
    // Mostrar los marcadores en el mapa
    marcadoresPiscinas.forEach(marcador => {
        console.log("Agrego marcador: " + marcador.coordenadas);
        // Crear el marcador con las coordenadas
        var marker = L.marker(marcador.coordenadas, {icon: marcador.icono}).addTo(markersPiscinas);
        marker.bindPopup(`<b>${marcador.nombre}</b><br><a target='blank' href="${marcador.imagen}">Ver imagen</a>`).openPopup();
    });
    marcadoresRutas.forEach(marcador => {
        console.log("Agrego marcador: " + marcador.coordenadas);
        // Crear el marcador con las coordenadas
        var marker = L.marker(marcador.coordenadas, {icon: marcador.icono}).addTo(markersRutas);
        marker.bindPopup(`<b>${marcador.nombre}</b><br><a target='blank' href="${marcador.imagen}">Ver imagen</a>`).openPopup();
    });
})
.catch(error => console.error(error));

function cambiarParaiso(paraiso){
    // if(paraiso == 0){
    //     // Se muestran las piscinas
    //     if(markersPiscinas.getLayers().length < 1){
    //         markersRutas.clearLayers();
    //         marcadoresPiscinas.forEach(marcador => {
    //             console.log("Agrego marcador: " + marcador.coordenadas);
    //             // Crear el marcador con las coordenadas
    //             var marker = L.marker(marcador.coordenadas, {icon: marcador.icono}).addTo(markersPiscinas);
    //             marker.bindPopup(`<b>${marcador.nombre}</b><br><a target='blank' href="${marcador.imagen}">Ver imagen</a>`).openPopup();
    //         });
    //     }
    // }else{
    //     // Se muestran las rutas
    //     if(paraiso == 1){
    //         if(markersRutas.getLayers().length < 1){
    //             markersPiscinas.clearLayers();
    //             marcadoresRutas.forEach(marcador => {
    //                 console.log("Agrego marcador: " + marcador.coordenadas);
    //                 // Crear el marcador con las coordenadas
    //                 var marker = L.marker(marcador.coordenadas, {icon: marcador.icono}).addTo(markersRutas);
    //                 marker.bindPopup(`<b>${marcador.nombre}</b><br><a target='blank' href="${marcador.imagen}">Ver imagen</a>`).openPopup();
    //             });
    //         }
    //     }
    // }
    switch(paraiso){
        case 0:
            markersPiscinas.remove();
            markersRutas.remove();
            markersRutas.addTo(mymap);
            markersPiscinas.addTo(mymap);
            break;
        case 1:
            markersPiscinas.remove();
            markersRutas.remove();
            markersRutas.addTo(mymap);
            break;
        case 2:
            markersRutas.remove();
            markersPiscinas.remove();
            markersPiscinas.addTo(mymap);
            break;
    }
}
