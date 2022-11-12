import { useEffect, useState } from "react";
import Hamster from "../COMPONENTS/Hamster";
import { hamster } from "../MODELS/interfaces";
import Error from "../COMPONENTS/Error";
import { useGlobalErrorContext } from "../App";
import errorHandler from '../HELPERS/errorHandler';
import '../STYLES/Bottom5.css';

function Top5() {

    const [top5, setTop5] = useState<hamster[]>();
    const { errObj, setErrObj } = useGlobalErrorContext();

    useEffect(() => {
        try {
            fetch('https://hamsterwars7.onrender.com/winners')
                .then(response => response.json())
                .then(data => {
                    if (data.status) {
                        errorHandler(setErrObj, data.error, data.status)
                    }
                    else {
                        setTop5(data)
                    }
                });
        }
        catch (err) {
            console.log(err);
            errorHandler(setErrObj)
        }
    }, []);

    return (
        <section className="Top-Bottom-5">
            {errObj.status != 0 ? <Error message={errObj.message} status={errObj.status} /> : null}

            <h1>Topp 5</h1>

                <section className="five-container">
                    { top5 && top5[3] ? 
                        <article>
                            <div className="fourth">4</div>
                            <p>{top5[3].name}</p>
                            <img src={require(`../ASSETS/img/${top5[3].imgName}.png`)} className="img-small" />
                        </article> 
                    : null }
                     { top5 && top5[1] ? 
                        <article>
                            <div className="second">2</div>
                            <p>{top5[1].name}</p>
                            <img src={require(`../ASSETS/img/${top5[1].imgName}.png`)} className="img-small" />
                        </article>
                     : null }
                    { top5 && top5[0] ? 
                        <article>
                            <div className="first">1</div>
                            <p>{top5[0].name}</p>
                            <img src={require(`../ASSETS/img/${top5[0].imgName}.png`)} className="img-small" />
                        </article>
                    : null }
                    { top5 && top5[2] ? 
                        <article>
                            <div className="third">3</div>
                            <p>{top5[2].name}</p>
                            <img src={require(`../ASSETS/img/${top5[2].imgName}.png`)} className="img-small" />
                        </article>
                    : null }
                    { top5 && top5[4] ? 
                        <article>
                            <div className="fifth">5</div>
                            <p>{top5[4].name}</p>
                            <img src={require(`../ASSETS/img/${top5[4].imgName}.png`)} className="img-small" />
                        </article>
                    : null }
                </section>
        </section>
    );
}

export default Top5;