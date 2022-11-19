import { useState, FormEvent, useEffect, useContext } from "react";
import {Link, useNavigate} from "react-router-dom"; 
import { paths } from "../../common/constants";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Roamer = () => {

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        navigate("/"); 
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <h1>BECOME A ROAMER</h1>
                <p className="subtitle">Interested in renting your EV charger? Fill this form and we will contact you shortly.</p>
                <input
                    placeholder="Charger type"
                    type="text"
                    id="phonenumber"
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <input
                    placeholder="First name"
                    type="text"
                    id="firstname"
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <input
                    placeholder="Last name"
                    type="text"
                    id="lastname"
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <input
                    placeholder="Postal code"
                    type="text"
                    id="postalcode"
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <input
                    placeholder="Email address"
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <input
                    placeholder="Phone number"
                    type="text"
                    id="phonenumber"
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <p>This site is protected by reCAPTCHA and Google Privacy Policy and Terms of Service apply</p>
                <button>Submit</button>
            </form>
        </section>
    )
}

export default Roamer; 