import { useEffect, useState } from "react";
import Hamster from "../COMPONENTS/Hamster";
import '../STYLES/Gallery.css';
import { useGlobalErrorContext } from "../App";
import errorHandler from '../HELPERS/errorHandler';
import Error from "../COMPONENTS/Error";
import AddHamsterForm from "../COMPONENTS/AddHamsterForm";
import { hamster } from "../MODELS/interfaces";

function Gallery() {

    const [hamsters, setHamsters] = useState<hamster[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const {errObj, setErrObj} = useGlobalErrorContext();

    useEffect(() => {
        try {
            fetch('https://hamsterwars7.onrender.com/hamsters')
                .then(response => response.json())
                .then(data => {
                    
                    if (data.status) {
                        errorHandler(setErrObj, data.error, data.status)
                    } 
                    else {
                        setHamsters(data)   
                    }
                });
        }
        catch (err) {
            console.log(err);
            errorHandler(setErrObj) 
        }
    }, []);

    const toggleForm = () => {
        setShowForm(!showForm);
    }

    return (
        <section className="Gallery">
                 { errObj.status != 0 ? <Error message={errObj.message} status={errObj.status} /> : null }

            <h1>Gallery</h1>

            <article className="grid-container">

                {
                    hamsters.map((hamster, i) => (
                        <Hamster hamster={hamster} key={i} gallery={true} />
                    ))
                }

            </article>

            { showForm ? <AddHamsterForm setShowForm={setShowForm}/> : <span onClick={toggleForm}>Lägg till hamster</span> }

        </section>
    );
}

export default Gallery;