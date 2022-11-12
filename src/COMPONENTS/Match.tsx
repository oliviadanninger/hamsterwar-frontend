import { useEffect, useState } from "react";
import { hamster, match } from "../MODELS/interfaces";
import Error from './Error';
import { useGlobalErrorContext } from "../App";
import errorHandler from '../HELPERS/errorHandler';
import '../STYLES/Match.css';

function Match(props: { match: match, setMatches: React.Dispatch<React.SetStateAction<match[]>>, matches: match[] }) {

    const [winner, setWinner] = useState<hamster| null>();
    const [loser, setLoser] = useState<hamster| null>();
    const { errObj, setErrObj } = useGlobalErrorContext();

    useEffect(() => {
        getHamster(props.match.winnerId, true)
        getHamster(props.match.loserId, false)
    }, []);

    const getHamster = async (_id: string, winner: boolean) => {
        try {
            const response = await fetch(`https://hamsterwars7.onrender.com/hamsters/${_id}`);
            const data = await response.json();

            if (data.status) {
                errorHandler(setErrObj, data.error, data.status)
            } 

            else if (winner) {
                setWinner(data)
            } else {
                setLoser(data)
            }
        }
        catch (err) {
            console.log(err);
            errorHandler(setErrObj) 
        }
    }

    const deleteHandler = async () => {
        try {
            await fetch(`https://hamsterwars7.onrender.com/matches/${props.match._id}`, {
               method: "DELETE",
               headers: {
                  "Content-Type": "application/json",
               },
            })
               .then((response) => response.json())
               .then((response) => {
                  if (response.status) {
                     errorHandler(setErrObj, response.error, response.status)
                  }
               })
            removeFromState();
         }
         catch (err) {
            console.log(err);
            errorHandler(setErrObj)
         }
    }

    const removeFromState = () => {
        setWinner(null)
        props.setMatches(props.matches.filter(matchObj => matchObj._id !== props.match._id));
      };

    return (
        <section className="Match">
            { errObj.status != 0 ? <Error message={errObj.message} status={errObj.status} /> : null }

            { winner && loser ?
                <article className="match-container">
                    <article>
                        <p>{winner.name}</p>
                        <img src={require(`../ASSETS/img/${winner.imgName}.png`)} className="winner" />
                    </article>
                    <p>vs</p>
                    <article>
                        <p>{loser.name}</p>
                        <img src={require(`../ASSETS/img/${loser.imgName}.png`)} className="loser" />
                    </article>
                </article>
                : null }

            <button onClick={deleteHandler}>&#10005;</button>

        </section>
    );
}

export default Match;