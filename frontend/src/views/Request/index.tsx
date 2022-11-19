import { useState, FormEvent, useEffect, useContext } from "react";
import {Link, useNavigate, useSearchParams} from "react-router-dom"; 
import { paths } from "../../common/constants";
import roamService, {  } from "../../services/RoamService";
import RoamModel from "../../types/RoamModel";

const Request = () => {

    const [roamerId, setRoamerId] = useState('');
    const [bookingNumber, setBookingNumber] = useState('');
    const [email, setEmail] = useState('');

    let [searchParams] = useSearchParams();
    const [roamData, setRoamData] = useState<RoamModel | null>();
    const [error, setError] = useState<boolean>(false);


    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        navigate("/"); 
    }

    roamService.getRoam(
        searchParams.get("roamId")
    ).then(
        (value) => {
            setError(false);
            setRoamData(value)
        },
        (reason) =>  setError(true)
    )


    return (
        <div>
            {
            ( !error  || <h3>401 - Bad Request</h3> )
            && 
            roamData && 
            <form onSubmit={handleSubmit}>
                <h1>ACTIVATE ROAM {searchParams.get("roamId")}</h1>
                <h3><u>Location</u>:   {roamData.street_name} {roamData.street_number}, {roamData.pc}, {roamData.city}</h3>
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
                <button className="button">Activate</button>
            </form>
            }
        </div>
    )
}

export default Request; 