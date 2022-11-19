import { useState, FormEvent, useEffect, useContext } from "react";
import {Link, useNavigate} from "react-router-dom"; 
import { paths } from "../../common/constants";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Roamer = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [chargerType, setChargerType] = useState('');


    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        navigate("/roamer/success"); 
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <h1>BECOME A ROAMER</h1>
                <p className="subtitle">Interested in renting your EV charger? Fill this form and we will contact you shortly.</p>
                <input
                    placeholder="First name"
                    type="text"
                    id="firstname"
                    autoComplete="off"
                    onChange={(e) => setFirstname(e.target.value)}
                    value={firstname}
                    required
                />
                <input
                    placeholder="Last name"
                    type="text"
                    id="lastname"
                    autoComplete="off"
                    onChange={(e) => setLastname(e.target.value)}
                    value={lastname}
                    required
                />
                <input
                    placeholder="Postal code"
                    type="text"
                    id="postalcode"
                    autoComplete="off"
                    onChange={(e) => setPostalCode(e.target.value)}
                    value={postalCode}
                    required
                />
                <input
                    placeholder="Email address"
                    type="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <input
                    placeholder="Phone number"
                    type="text"
                    id="phonenumber"
                    autoComplete="off"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    required
                />
                <select
                    placeholder="EV Charger Type"
                    onChange = {e => setChargerType(e.target.value)}
                >
                    <option value="grapefruit">Grapefruit</option>
                    <option value="lime">Lime</option>
                    <option selected value="coconut">Coconut</option>
                    <option value="mango">Mango</option>
                </select>
                <p>This site is protected by reCAPTCHA and Google Privacy Policy and Terms of Service apply</p>
                <button className="button">Submit</button>
            </form>
        </section>
    )
}

export default Roamer; 