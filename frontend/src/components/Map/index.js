import React, { useState } from "react";
import { GoogleMap, InfoWindow, LoadScript, Marker } from "@react-google-maps/api";
import './styles.css';

const Map = () => {
    const initialMarkers = [
        {
            position: {
                lat: 28.625485,
                lng: 79.821091
            },
            label: { color: "white", text: "P1" },
            draggable: true
        },
        {
            position: {
                lat: 28.625293,
                lng: 79.817926
            },
            label: { color: "white", text: "P2" },
            draggable: false
        },
        {
            position: {
                lat: 28.625182,
                lng: 79.81464
            },
            label: { color: "white", text: "P3" },
            draggable: true
        },
    ];
    
    const [activeInfoWindow, setActiveInfoWindow] = useState("");
    const [markers, setMarkers] = useState(initialMarkers);

    const containerStyle = {
        width: "100%",
        height: "1000px",
    }

    const center = {
        lat: 48.137154,
        lng: 11.576124,
    }

    const mapClicked = (event) => { 
        console.log(event.latLng.lat(), event.latLng.lng()) 
    }

    const markerClicked = (marker, index) => {  
        setActiveInfoWindow(index)
        console.log(marker, index) 
    }

    const markerDragEnd = (event, index) => { 
        console.log(event.latLng.lat())
        console.log(event.latLng.lng())
    }


    const styles = [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ]

    return (
            <LoadScript googleMapsApiKey='AIzaSyANJdtSz3eBDGrcn1TOxXaRp0iZ7CqWaSc'>
                <GoogleMap 
                 onLoad={(map) => {
                    map.setOptions({styles: styles})
                   }}
                    clickableIcons={false}
                    mapContainerStyle={containerStyle} 
                    center={center} 
                    zoom={15}
                    onClick={mapClicked}
                >
                    {markers.map((marker, index) => (
                        <Marker 
                            key={index} 
                            position={marker.position}
                            label={marker.label}
                            draggable={marker.draggable}
                            onDragEnd={event => markerDragEnd(event, index)}
                            onClick={event => markerClicked(marker, index)} 
                        >
                            {
                                (activeInfoWindow === index)
                                &&
                                <InfoWindow position={marker.position}>
                                    <b>{marker.position.lat}, {marker.position.lng}</b>
                                </InfoWindow>
                            }  
                        </Marker>
                    ))}
                </GoogleMap>
            </LoadScript>
        
    );
};

export default Map;
