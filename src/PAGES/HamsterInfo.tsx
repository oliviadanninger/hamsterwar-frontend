import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddHamsterForm from "../COMPONENTS/AddHamsterForm";
import Hamster from "../COMPONENTS/Hamster";
import { hamster, matchObjI } from "../MODELS/interfaces";
import Error from "../COMPONENTS/Error";
import { useGlobalErrorContext } from "../App";
import errorHandler from '../HELPERS/errorHandler';
import '../STYLES/HamsterInfo.css';

function HamsterInfo() {

    const location = useLocation();
    const { age, defeats, favFood, games, imgName, loves, name, wins, _id } = location.state;
    const [winnerMatches, setWinnerMatches] = useState<matchObjI[]>();
    const [defeated, setDefeated] = useState<hamster[]>([]);
    const {errObj, setErrObj} = useGlobalErrorContext();


    // 1. Hämta alla matcher hamstern vunnit (/matcWinners/:id)
    useEffect(() => {
        getMatches()
    }, [])

    async function getMatches() {
        try {
            fetch(`https://hamsterwars7.onrender.com/matchWinners/${_id}`)
                .then(response => response.json())
                .then(data => {
                    if (data.status && data.status != 404) {
                        errorHandler(setErrObj, data.error, data.status)
                    } 
                    else if(!data.status) {
                    setWinnerMatches(data)
                    }
                })
        }
        catch (err) {
            console.log(err);
            errorHandler(setErrObj) 
        }
    }

    // 2. Hämta ut alla loser id och spara dem i en array (endast unika id)
    const getLosers = () => { //useMemo i grunden
        if (winnerMatches != null && winnerMatches.length != 0) {
            console.log(winnerMatches)
            let losersIdArr: string[] = getUniqArr(winnerMatches);
            getLosersArray(losersIdArr);
        }
    }

    function getUniqArr(winnerMatches: matchObjI[]): string[] {
        let result: string[] = [];
    
        winnerMatches?.forEach((match) => {
    
            if (!result.includes(match.loserId)) {
                result.push(match.loserId);
            }
        })
        return result;
    }

    // 3. Hämta alla loser-hamstrar för att kunna mapa ut dessa
    function getLosersArray(array: string[]) {

        array.map(id => {
            getLoser(id);
        })

        function getLoser(id: string) {
            try {
                fetch(`https://hamsterwars7.onrender.com/hamsters/${id}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        setDefeated(current => [...current, data])
                    })
            }
            catch (err) {
                console.log(err);
                errorHandler(setErrObj) 
            }
        }
    }

    return (
        <section className="HamsterInfo">
            { errObj.status != 0 ? <Error message={errObj.message} status={errObj.status} /> : null }

            <h1>{name}</h1>
            <img src={require(`../ASSETS/img/${imgName}.png`)} className="big-img" />
            <article className="facts">
                <p><span>Age:</span> {age}</p>
                <p><span>Loves:</span> {loves}</p>
                <p><span>Favourite food:</span> {favFood}</p>
                <p><span>Games:</span> {games}</p>
                <p><span>Wins:</span> {wins}</p>
                <p><span>Defeats:</span> {defeats}</p>
            </article>

            <article className="defeated-container">
            {winnerMatches == undefined ? <h4>Inga vinster ännu</h4> : defeated.length == 0 ? <h4 onClick={() => getLosers()}>Se vilka hamstern besegrat</h4> :  <h2>Besegrade</h2> }
            {
                defeated.map(hamster => (
                    <Hamster hamster={hamster} />
                ))
            }
            </article>

        </section>
    );
}

export default HamsterInfo;