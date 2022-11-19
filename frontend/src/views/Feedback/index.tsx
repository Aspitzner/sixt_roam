import { useState, FormEvent, useEffect, useContext } from "react";
import {Link, useNavigate} from "react-router-dom"; 
import { paths } from "../../common/constants";
import './styles.css';



const Feedback = () => {

    const navigate = useNavigate(); 

    return (
        <section>
            <p className="feedback">We received your information successfully. We will contact you shortly. Thanks for trusting in the Sixt fleet. </p>
            <button className="button" onClick={() => navigate("/")}>Volver</button>
        </section>
    )
}

export default Feedback; 