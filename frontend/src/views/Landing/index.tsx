import {useEffect, useState} from "react";
import './styles.css';
import OfferModel from "../../types/RoamModel";
import Map from "../../components/Map";

const Landing = () => {

    const [offers, setOffers] = useState<OfferModel[]>(); 

    useEffect( ()=>{

    }, [])

    const location = {
        address: '1600 Amphitheatre Parkway, Mountain View, california.',
        lat: 37.42216,
        lng: -122.08427,
    }

    return (
        <div className="landing">
            <Map></Map>
        </div>
    )

}; 

export default Landing; 