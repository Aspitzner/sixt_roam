import { useState, FormEvent, useEffect, useContext } from "react";
import {Link, useNavigate} from "react-router-dom"; 
import { paths } from "../../common/constants";

const Release = () => {

    const [roamerId, setRoamerId] = useState('');
    const [bookingNumber, setBookingNumber] = useState('');
    const [email, setEmail] = useState('');


    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        navigate("/"); 
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <h1>You are about to release ROAM DX12</h1>
                <h3>Willi-Graf-Strasse 17, 8085, Munchen</h3>
                <input
                    placeholder="Booking number"
                    type="text"
                    id="bookingNumber"
                    autoComplete="off"
                    onChange={(e) => setBookingNumber(e.target.value)}
                    value={bookingNumber}
                    required
                />
                <input
                    placeholder="Email"
                    type="text"
                    id="email"
                    autoComplete="on"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <button className="button">Release</button>
            </form>
        </section>
    )
}

export default Release; 