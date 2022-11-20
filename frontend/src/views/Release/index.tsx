import { useState, FormEvent, useEffect, useContext } from "react";
import {Link, useNavigate, useSearchParams} from "react-router-dom"; 
import { paths } from "../../common/constants";
import roamService, {  } from "../../services/RoamService";
import RoamModel from "../../types/RoamModel";

const Release = () => {

    const [roamerId, setRoamerId] = useState('');
    const [bookingNumber, setBookingNumber] = useState('');
    const [email, setEmail] = useState('');


    const navigate = useNavigate();
    let [searchParams] = useSearchParams();

    const [roamData, setRoamData] = useState<RoamModel | null>();
    const [error, setError] = useState<boolean>(false);


    const handleSubmit = () => {
        roamData && roamService.releaseRoam(roamData.id, bookingNumber, email).then(
            value =>  console.log("OK", roamData)
        )
        navigate('/') 
    }


    useEffect(
        () => {roamService.getRoam(
            searchParams.get("roamId")
        ).then(
            (value) => {
                setError(false);
                setRoamData(value);

                if (value && value.available) 
                navigate('/request?roamId='+searchParams.get("roamId"))
               },
            (reason) =>  setError(true)
        )}, []
    )


    return (
        <section>
            {
                roamData && 
                <div>
            <form>
                <h1>You are about to release ROAM {roamData?.id}</h1>
                <h3>{roamData?.street_name} {roamData?.street_number}, {roamData?.pc}, {roamData?.city}</h3>
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
            </form>   <button onClick={()=>handleSubmit()} className="button">Release</button>

            </div>
    }
        </section>
    )
}

export default Release; 