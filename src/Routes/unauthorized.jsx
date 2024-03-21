import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.svg';
import RiverBg from "../components/riverBg";
import Cop from "../assets/cop.png"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <>
            <RiverBg />
            <section>
                <div className="unauthorized-container">
                    <img src={logo} className="unauth-logo" />
                    <h1>Unauthorized !</h1>
                    <img src={Cop} className="unauth-cop" />
                    <br />
                    <p>You do not have access to the requested page.</p>
                    <div>
                        <button className="button-primary" onClick={goBack}>Go Back</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Unauthorized;