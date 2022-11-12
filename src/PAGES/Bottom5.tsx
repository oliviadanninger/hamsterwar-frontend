import { useEffect, useState } from "react";
import Hamster from "../COMPONENTS/Hamster";
import { hamster } from "../MODELS/interfaces";
import Error from "../COMPONENTS/Error";
import { useGlobalErrorContext } from "../App";
import errorHandler from '../HELPERS/errorHandler';
import '../STYLES/Bottom5.css';

function Bottom5() {
    const [bottom5, setBottom5] = useState<hamster[]>();
    const {errObj, setErrObj} = useGlobalErrorContext();

    useEffect(() => {
        try {
            fetch('https://hamsterwars7.onrender.com/losers')
                .then(response => response.json())
                .then(data => {
                    if (data.status) {
                        errorHandler(setErrObj, data.error, data.status)
                    } else {
                        setBottom5(data)
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

        <h1>Sämsta 5</h1>
       
            <section className="five-container">
            { bottom5 && bottom5[3] ? 
                        <article>
                            <div className="fourth">4</div>
                            <p>{bottom5[3].name}</p>
                            <img src={require(`../ASSETS/img/${bottom5[3].imgName}.png`)} className="img-small" />
                        </article> 
                    : null }
                     { bottom5 && bottom5[1] ? 
                        <article>
                            <div className="second">2</div>
                            <p>{bottom5[1].name}</p>
                            <img src={require(`../ASSETS/img/${bottom5[1].imgName}.png`)} className="img-small" />
                        </article>
                     : null }
                    { bottom5 && bottom5[0] ? 
                        <article>
                            <div className="first">1</div>
                            <p>{bottom5[0].name}</p>
                            <img src={require(`../ASSETS/img/${bottom5[0].imgName}.png`)} className="img-small" />
                        </article>
                    : null }
                    { bottom5 && bottom5[2] ? 
                        <article>
                            <div className="third">3</div>
                            <p>{bottom5[2].name}</p>
                            <img src={require(`../ASSETS/img/${bottom5[2].imgName}.png`)} className="img-small" />
                        </article>
                    : null }
                    { bottom5 && bottom5[4] ? 
                        <article>
                            <div className="fifth">5</div>
                            <p>{bottom5[4].name}</p>
                            <img src={require(`../ASSETS/img/${bottom5[4].imgName}.png`)} className="img-small" />
                        </article>
                    : null }
            </section>
            </section>
     );
}

export default Bottom5;