import { useState, useEffect, useContext } from "react";
import Error from "../COMPONENTS/Error";
import Hamster from "../COMPONENTS/Hamster";
import { bodyObjLoser, bodyObjMatch, bodyObjWinner, hamster } from "../MODELS/interfaces";
import { useGlobalErrorContext } from "../App";
import '../STYLES/Battle.css';
import errorHandler from '../HELPERS/errorHandler';


function Battle() {

    const [hamster1, setHamster1] = useState<hamster>();
    const [hamster2, setHamster2] = useState<hamster>();
    const [result, setResult] = useState<boolean>(false);
    const [clicked1, setClicked1] = useState<boolean>(false)
    const [clicked2, setClicked2] = useState<boolean>(false)
    const {errObj, setErrObj} = useGlobalErrorContext();

    async function getRandomHamsters() {

        try {
        Promise.all([
            fetch('https://hamsterwars7.onrender.com/hamsters/random'),
            fetch('https://hamsterwars7.onrender.com/hamsters/random')
        ])
            .then(([res1, res2]) =>
                Promise.all([res1.json(), res2.json()])
            ).then(([data1, data2]) => {
                if (data1.status) {
                    errorHandler(setErrObj, data1.error, data1.status)
                }
                if (data2.status) {
                    errorHandler(setErrObj, data2.error, data2.status)
                }
                if (data1.name == data2.name) {
                    getRandomHamsters();
                } else {
                    setHamster1(data1);
                    setHamster2(data2);
                }
            })
        }
        catch (err) {
            //Om oväntat fel
            console.error(err);
            errorHandler(setErrObj)
        }
    }

    useEffect(() => {
        newMatch();
    }, [])

    const newMatch = () => {
        setClicked1(false);
        setClicked2(false);
        setResult(false);
        getRandomHamsters();
    }
    
    async function winnerPickedFunc(winner: hamster) {
        if (!result) {
            setResult(true);

            let winnerId: string | undefined;
            let loserId: string | undefined;
            let bodyWinner: bodyObjWinner | undefined;
            let bodyLoser: bodyObjLoser | undefined;
            let bodyMatch: bodyObjMatch | undefined;

            if (winner === hamster1 && hamster1 != null && hamster2 != null) {
                setClicked1(true);

                winnerId = hamster1._id;
                loserId = hamster2._id;

                bodyWinner = {
                    wins: hamster1.wins + 1,
                    games: hamster1.games + 1
                }
                bodyLoser = {
                    defeats: hamster2.defeats + 1,
                    games: hamster2.games + 1
                }
                bodyMatch = {
                    winnerId: hamster1._id,
                    loserId: hamster2._id
                }
            }

            if (winner === hamster2&& hamster1 != null && hamster2 != null) {
                setClicked2(true);

                winnerId = hamster2._id;
                loserId = hamster1._id;

                bodyWinner = {
                    wins: hamster2.wins + 1,
                    games: hamster2.games + 1
                }
                bodyLoser = {
                    defeats: hamster1.defeats + 1,
                    games: hamster1.games + 1
                }
                bodyMatch = {
                    winnerId: hamster2._id,
                    loserId: hamster1._id
                }
            }

            //PUT winner
            try {
                await fetch(`https://hamsterwars7.onrender.com/hamsters/${winnerId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bodyWinner),
                })
                    .then((response) => response.json())
                    .then((response) => {
                        if (response.status) {
                            errorHandler(setErrObj, response.error, response.status)
                        }
                    })
            }
            catch (err) {
                console.log(err)
                errorHandler(setErrObj)
            }

            //PUT loser
            try {        
                await fetch(`https://hamsterwars7.onrender.com/hamsters/${loserId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bodyLoser),
                })
                    .then((response) => response.json())
                    .then((response) => {
                        if (response.status) {
                            errorHandler(setErrObj, response.error, response.status)
                        }
                    })
            }
            catch (err) {
                console.log(err)
                errorHandler(setErrObj)
            }

            //POST matchobjekt  
            try {
                await fetch('https://hamsterwars7.onrender.com/matches', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bodyMatch),
                })
                    .then((response) => response.json())
                    .then((response) => {
                        if (response.status) {
                            errorHandler(setErrObj, response.error, response.status)
                        }
                    })
            }
            catch (err) {
                console.log(err);
                errorHandler(setErrObj)
            }
        }
    }

    return (
        <section className="Battle">
            { errObj.status != 0 ? <Error message={errObj.message} status={errObj.status} /> : null }

            <h1>Battle</h1>

            <article className="flex-container">

                {result ? <h2>Resultat</h2> : <h2>Fight!</h2>}
                
                {
                    hamster1 && hamster2 ?
                        <section className="fighters-container">
                            <article className={clicked1 ? 'hamster-clicked' : "hamster"} onClick={() => winnerPickedFunc(hamster1)} >
                                <Hamster hamster={hamster1} result={result}/>
                            </article>

                            <article>
                                <h3>vs</h3>
                            </article>

                            <article className={clicked2 ? 'hamster-clicked' : "hamster"} onClick={() => winnerPickedFunc(hamster2)} >
                                <Hamster hamster={hamster2} result={result}/>
                            </article>
                        </section>
                        : null
                }

                {result ? <button onClick={newMatch}>NY MATCH</button> : <span>Klicka på den hamster du tycker är gulligast</span>}
            </article>
        </section>
    );
}

export default Battle;