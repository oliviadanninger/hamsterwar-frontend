import { Link } from "react-router-dom";
import '../STYLES/Landing.css'

function Landing() {

    return (
        <section className="Landing">
            <h1>HAMSTER WARS</h1>
            <article className="info">
                <p>Krig råder i hamstervärlden. <br />
                    Hamstrar ställs mot varandra och din uppgift är att rösta på den hamster du tycker är gulligast.</p>
                <span>Du kan även lägga till en egen hamster och se hur den står sig mot de andra. </span>
            </article>

            <article className="button-container">
                <Link to="/battle"><button className="green-btn">TÄVLA</button></Link>
                <div>
                    <Link to="/gallery"><button className="pink-btn">GALLERI</button></Link>
                    <Link to="/top5"><button className="red-btn">TOPP 5</button></Link>
                </div>
                <div>
                    <Link to="/history"><button className="pink-btn">MATCH<br />HISTORIK</button></Link>
                    <Link to="/bottom5"><button className="red-btn">SÄMSTA 5</button></Link>
                </div>
            </article>
        </section>
    );
}

export default Landing;