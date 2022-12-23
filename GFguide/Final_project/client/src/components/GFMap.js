import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function GFMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(34.781769);
  const [lat, setLat] = useState(32.085300);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
    // fetch markers lng and lat from db
    const marker = new mapboxgl.Marker({
      color: "red",
      draggable: false
      }).setLngLat([34.781769, 32.085300])
      .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"))
      .addTo(map.current);
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import ReactMapGL, { Marker, Popup } from "react-map-gl";
// import 'mapbox-gl/dist/mapbox-gl.css';



// export default function Map() {
//   const [viewport, setViewport] = useState({
//     latitude: 32.085300,
//     longitude: 34.781769,
//     width: "100vw",
//     height: "100vh",
//     zoom: 10
//   });

//   return (
//     <div>
//       <ReactMapGL
//         {...viewport}
//         mapboxApiAccessToken='pk.eyJ1IjoiaW5lc3NhODgiLCJhIjoiY2xiejkyajZlMDZ5bzNvbzlhMTd2Z2RiZiJ9.19wJ7LCYAxTKUdbSHeE3yw'
//         mapStyle="mapbox://styles/leighhalliday/cjufmjn1r2kic1fl9wxg7u1l4"> My Mapppppp</ReactMapGL>
//     </div>
//   );
// }



// import React, { Component } from 'react';
// import ReactMapGl from 'react-map-gl'
// import 'mapbox-gl/dist/mapbox-gl.css';

// const mapboxToken = 'pk.eyJ1IjoiaW5lc3NhODgiLCJhIjoiY2xiemFkemR3MHkzMjN4bzVxM3U4Ymp1cCJ9.9G3CyCWWYZsl6iPX3_JlOw'
// console.log(mapboxToken);
// class Map extends Component {
//   constructor() {
//     super()
//     this.state = {
//       viewport: {
//         width: '50vw',
//         height: '50vh',
//         latitude: 40.78343,
//         longitude: -73.96625,
//         zoom: 11
//       }
//     }
//     this.handleViewportChange = this.handleViewportChange.bind(this)
//   }
//   handleViewportChange(viewport) {
//     this.setState(prevState => ({
//       viewport: {...prevState.viewport, ...viewport}
//     }))
//   }
//   render() {
//     return (
//       <ReactMapGl
//         {...this.state.viewport}
//         onViewportChange={viewport => this.setState({viewport})}
//         mapboxApiAccessToken={mapboxToken}
//         mapStyle="mapbox://styles/mapbox/streets-v10"
//       />
//     )
//   }
// }

// export default Map;
