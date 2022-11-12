import { useEffect, useState } from "react";
import Match from "../COMPONENTS/Match";
import { match } from "../MODELS/interfaces";
import Error from "../COMPONENTS/Error";
import { useGlobalErrorContext } from "../App";
import errorHandler from '../HELPERS/errorHandler';
import '../STYLES/History.css';


function History() {

    const [matches, setMatches] = useState<match[]>([]);
    const { errObj, setErrObj } = useGlobalErrorContext();

    useEffect(() => {
        try {
            fetch('https://hamsterwars7.onrender.com/matches')
                .then(response => response.json())
                .then(data => {

                    if (data.status) {
                        errorHandler(setErrObj, data.error, data.status)
                    }
                    else {
                        setMatches(data)
                    }
                });
        }
        catch (err) {
            console.log(err);
            errorHandler(setErrObj)
        }
    }, []);

    return (
        <section className="History">
            {errObj.status != 0 ? <Error message={errObj.message} status={errObj.status} /> : null}

            <h1>Matchhistorik</h1>

            <article className="matches-container">
                {matches.map((match) => (
                    <Match match={match} key={match._id} setMatches={setMatches} matches={matches} />
                ))
                }
            </article>
        </section>
    );
}

export default History;