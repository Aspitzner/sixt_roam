import { useState, FormEvent, useEffect, useContext } from "react";
import {Link, useNavigate, useSearchParams} from "react-router-dom"; 
import { paths } from "../../common/constants";

const Request = () => {

    const [roamerId, setRoamerId] = useState('');
    const [bookingNumber, setBookingNumber] = useState('');
    const [email, setEmail] = useState('');

    let [searchParams, setSearchParams] = useSearchParams();


    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        navigate("/"); 
    }

    return (
        <section>
            {
            searchParams.get("roamId") && 
                <form onSubmit={handleSubmit}>
                    <h1>ACTIVATE ROAM {searchParams.get("roamId")}</h1>
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
                    <p className="subtitle">Charging costs will be credited to your Sixt reservation as soon as you activate the Roam. Remember to reenter your data when charging is done.</p>
                    <button className="button" onClick={()=>console.log(searchParams.get("roamId"))}>Activate</button>
                </form>
            || <h3>401 - Bad Request</h3>
            }
        </section>
    )
}

export default Request; 