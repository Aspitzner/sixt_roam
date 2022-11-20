import React, { useEffect, useState } from "react";
import { GoogleMap, InfoWindow, LoadScript, Marker } from "@react-google-maps/api";
import './styles.css';


import icons from "../../assets";
import roamService from "../../services/RoamService";
const Map = () => {

  const stations = require("./stations.json"); 


  const [roams, setRoams] = useState(); 
  const [activeInfoWindow, setActiveInfoWindow] = useState("");


  const initialMarkers = [
    {
        position: {
            lat: 48.1357,
            lng: 11.5718
        },
        // label: { color: "white", text: "Papapa" },
        icon: icons.calloutRoam, 
        draggable: false
    }, 
    {
      position: {
        lat: 48.1365,
        lng: 11.5718
      },
      // label: { color: "white", text: "P1" },
      icon: icons.calloutSixt, 
      draggable: true
    }, 
    {
      position: {
        lat: 48.1365,
        lng: 11.5770
      },
      // label: { color: "white", text: "P1" },
      icon: icons.calloutCharger, 
      draggable: true
    }, 

];
  const [markers, setMarkers] = useState(initialMarkers);

  useEffect( () => {
    roamService.getRoams()
    .then(
      (value) => {
        setRoams(value);
        
        
        const roamMarkers = value.map(
          r =>  {
            return {
              original: r, 
              position: {
                lat: r.latitude, 
                lng: r.longitude
              }, 
              icon: icons.calloutRoam, 
              draggable: false
            }
          }
        ); 

        setMarkers(roamMarkers); 
        console.log(value); 
      }, 
      (reason) => {
        
      }
    )
  }, [])

    


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
                            style={{backgroundColor: "red"}}
                            key={index} 
                            onHov
                            icon={marker.original?.available ? icons.calloutRoam : icons.calloutRoam2}
                            position={marker.position}
                            label={marker.label}
                            draggable={marker.draggable}
                            cursor={marker.original?.available ? '': 'not-allowed'}
                            onDragEnd={event => markerDragEnd(event, index)}
                            onClick={event => marker.original?.available ? markerClicked(marker, index): null} 
                        >
                            {
                                (activeInfoWindow === index)
                                &&
                                <InfoWindow position={marker.position}>
                                  <div>
                                    <b>ROAM {marker.original.id}</b>
                                    <p>{marker.original.street_name} {marker.original.street_number}, {marker.original.pc}</p>
                                  </div>
                                </InfoWindow>
                            }  
                        </Marker>
                    ))}
                    {
                      stations.map( (station, index) => (
                        <Marker 
                        key={"A"+index} 
                        icon={icons.calloutCharger}
                        position={  {lng: station.longitude, lat: station.latitude }}
                        onDragEnd={event => markerDragEnd(event, index)}
                        onClick={event => markerClicked(station, "A"+index)} 
                      >
              
                        {
                            (activeInfoWindow === ('A'+index))
                            &&
                            <InfoWindow position={{lng: station.longitude, lat: station.latitude }}>
                                <b>{station.street_name} {station.street_number}, 80805</b>
                            </InfoWindow>
                        }  
                      </Marker>
                      )
                      )
                    }

                </GoogleMap>
            </LoadScript>
        
    );
};

export default Map;
