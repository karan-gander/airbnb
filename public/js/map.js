// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: listing.geometry.coordinates || [73.0243, 26.2389], // starting position [lng, lat]
    zoom: 9 // starting zoom
});

console.log(listing)


const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset:25,className: 'my-class',closeButton:false,closeOnClick:false  }).setHTML(`<h3>${listing.title}</h3><br><h5> Exact Location will be provided after booking`).setMaxWidth("300px </h5>")
    )

    .addTo(map);