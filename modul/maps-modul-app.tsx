const MAPBOX_TOKEN = process.env.EXPO_PUBLIC_TOKEN_MAPBOX;

export const generateMap = (lat: number, lng: number) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
  <script src="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"></script>
  <link href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" rel="stylesheet" />
  <style>
    body { margin:0; padding:0; }
    #map { position:absolute; top:0; bottom:0; width:100%; }
    .marker {
      background-image: url('https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png');
      background-size: cover;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
    }
  </style>
</head>
<body>
<div id="map"></div>
<script>
  mapboxgl.accessToken = '${MAPBOX_TOKEN}';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [${lng}, ${lat}],
    zoom: 14
  });

  // ✅ Marker draggable
  var marker = new mapboxgl.Marker({ draggable: true })
    .setLngLat([${lng}, ${lat}])
    .addTo(map);

  function updateCoordinates(lngLat) {
    var message = {
      type: "coordinates",
      latitude: lngLat.lat,
      longitude: lngLat.lng
    };
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(message));
    }
  }

  // Saat marker digeser
  marker.on('dragend', function() {
    var lngLat = marker.getLngLat();
    updateCoordinates(lngLat);
  });

  // Saat user klik map → pindahin marker
  map.on('click', function(e) {
    marker.setLngLat(e.lngLat);
    updateCoordinates(e.lngLat);
  });

  // Kirim koordinat awal
  updateCoordinates(marker.getLngLat());
</script>
</body>
</html>
`;
