var mymap = L.map('mapid').setView([40.117062770246385, -5.777798262674521], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mymap);
  
const marcadores = [];

fetch('https://sheets.googleapis.com/v4/spreadsheets/12m4yTxu6PHc7kCG_cpf9ACy1aP9sk3wu1QLTPisi-bM/values/Paraisos!A8:F?key=AIzaSyD1qXjPmgBaRtX0zJtH76nvU708Gvs3A-g')
.then(response => response.json())
  .then(data => {
    const cc = data.values;

    cc.forEach(coor => {
        if(coor.length > 1 ){
            if(coor[5].charAt(0) === "-" || !isNaN(parseInt(coor[5].charAt(0)))){
                
                const nombre = coor[0];
                const imagen = coor[3]
                const coordenadas = coor[5].split(',').map(parseFloat);


                console.log("Agrego marcador: " + coordenadas);
                // Crear el marcador con las coordenadas
                var marker = L.marker(coordenadas).addTo(mymap);
                marker.bindPopup(`<b>${nombre}</b><br><a target='blank' href="${imagen}">Ver imagen</a>`).openPopup();

            }else{
                console.log("No entro");
            }
        }else{
            // console.log("Menor que 1");
        }
    });
    
})
.catch(error => console.error(error));