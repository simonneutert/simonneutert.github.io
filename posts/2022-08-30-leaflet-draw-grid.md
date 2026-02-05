+++
layout = "post"
title = "Draw a grid on your leaflet map"
+++

What3Words didn't invent the wheel, but they sure put in the computation power
and infrastructure to build a unique product.

The magic words google needs to hear, are:
[slippy map tilenames](https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames).

This is a short and shabby code stub to render a grid, but it should get you
going in the right direction.

```javascript
// please, remember, add/write code to limit the rendering of the grid
// to certain zoom levels of the map. BECAUSE, when you show the world,
// continents or countries, this does not make sense computationally

function lon2tile(lon, zoom) {
  return Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
}
function lat2tile(lat, zoom) {
  return Math.floor(
    ((1 -
      Math.log(
          Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180),
        ) /
        Math.PI) /
      1) *
      Math.pow(2, zoom),
  );
}

function tile2long(x, z) {
  return (x / Math.pow(2, z)) * 360 - 180;
}
function tile2lat(y, z) {
  var n = Math.PI - (2 * Math.PI * y) / Math.pow(2, z);
  return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
}

function reverseTile(x, y, zoom) {
  return { lat: tile2lat(y, z), lon: tile2long(x, zoom) };
}

function tilename(lon, lat, zoom) {
  return { x: lon2tile(lon, zoom), y: lat2tile(lat, zoom) };
}

function fromTo(start, end) {
  let counter = start;
  const result = [];
  while (counter < end) {
    result.push(counter);
    counter++;
  }
  return result;
}

// the doing stuff, experiment with this

const bounds = map.getBounds();
const nE = bounds._northEast;
const sW = bounds._southWest;

const tileNorthEast = tilename(nE.lng, nE.lat, 14);
const tileSouthWest = tilename(sW.lng, sW.lat, 14);

const rangeXTiles = fromTo(tileSouthWest.x, tileNorthEast.x);
const rangeYTiles = fromTo(tileSouthWest.y, tileNorthEast.y);

const geo = {
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [],
  },
};

for (const tile of rangeXTiles) {
  const { lat, lon } = reverseTile(tile.x, tile.y, 14);
  geo.geometry.coordinates.push([lat, lon]);
}

L.geoJSON(geo);
```
