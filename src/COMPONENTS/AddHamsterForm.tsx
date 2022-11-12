import { useRef, useState } from "react";
import Error from './Error';
import { useGlobalErrorContext } from "../App";
import errorHandler from '../HELPERS/errorHandler';
import { hamster, inputI } from "../MODELS/interfaces";
import '../STYLES/AddHamsterForm.css'

function AddHamsterForm(props: { setShowForm: React.Dispatch<React.SetStateAction<boolean>> }) {

    const [input, setInput] = useState<inputI>({
        name: "",
        age: 0,
        favFood: "",
        loves: "",
        imgName: "testImg"
    })
    const { errObj, setErrObj } = useGlobalErrorContext();
    const ref1 = useRef<null | HTMLInputElement>(null);
    const ref2 = useRef<null | HTMLInputElement>(null);
    const ref3 = useRef<null | HTMLInputElement>(null);
    const ref4 = useRef<null | HTMLInputElement>(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!input.name || !input.age || !input.favFood || !input.loves) {
            alert('Alla inputfält måste fyllas i.')
        }
        else {
            addHamster();
        }
    }

    async function addHamster() {
        try {
            const response = await fetch('https://hamsterwars7.onrender.com/hamsters', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(input)
            })
            const data = await response.json();

            if (data.acknowledged == true) {
                if (ref1.current !== null && ref2.current !== null && ref3.current !== null && ref4.current !== null) {
                    ref1.current.value = '';
                    ref2.current.value = '';
                    ref3.current.value = '';
                    ref3.current.value = '';

                    props.setShowForm(false);
                    window.location.reload();
                }
            }
            if (data.status) {
                errorHandler(setErrObj, data.error, data.status)
            }
        }
        catch (err) {
            console.log(err)
            errorHandler(setErrObj)
        }
    }

    return (
        <section className="AddHamsterForm">

            {errObj.status != 0 ? <Error message={errObj.message} status={errObj.status} /> : null}

            <form onSubmit={handleSubmit}>
                <h1>Lägg till Hamster</h1>

                <label>NAME
                    <input
                        ref={ref1}
                        type="text"
                        name="name"
                        onChange={(e) => setInput({ ...input, name: e.target.value })}
                    />
                </label>
                <label>AGE
                    <input
                        ref={ref2}
                        type="number"
                        name="age"
                        onChange={(e) => setInput({ ...input, age: e.target.valueAsNumber })}
                    />
                </label>
                <label>FAVOURITE FOOD
                    <input
                        ref={ref3}
                        type="text"
                        name="favFood"
                        onChange={(e) => setInput({ ...input, favFood: e.target.value })}
                    />
                </label>
                <label>LOVES
                    <input
                        ref={ref4}
                        type="text"
                        name="loves"
                        onChange={(e) => setInput({ ...input, loves: e.target.value })}
                    />
                </label>
                <button type="submit" className="button-19">Lägg till</button>
            </form>
        </section>
    );
}

export default AddHamsterForm;