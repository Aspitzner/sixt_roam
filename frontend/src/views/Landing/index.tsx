import {useEffect, useState} from "react";
import './styles.css';
import OfferModel from "../../types/OfferModel";

const Landing = () => {

    const [offers, setOffers] = useState<OfferModel[]>(); 

    useEffect( ()=>{

    }, [])

    return (
        <div className="landing">
        </div>
    )

}; 

export default Landing; 