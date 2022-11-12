import '../STYLES/Error.css';
import { useGlobalErrorContext } from "../App";

function Error(props: { message: string, status: number }) {

    const { message, status } = props;
    const {errObj, setErrObj} = useGlobalErrorContext();
    let explanation;

    if (status == 400) {
        explanation = 'Din webbläsare skickade en begäran som servern inte kunde förstå.'
    }
    else if (status == 404) {
        explanation = 'Sidan kunde tyvärr inte hittas.'
    }
    else if (status == 500) {
        explanation = 'Hoppsan, det är visst något fel med servern.'
    }
    else {
        explanation = 'Något oväntat fel har inträffat'
    }

    const clickHandler = () => {
        setErrObj(null);
    }

    return (
        <section className="overlay"> 
            <article className="modal">
                <h1>ERROR: {message.toUpperCase()}</h1>
                <p>{explanation}</p>
                <article className="refresh-btn-container">
                    <button onClick={clickHandler}>FÖRSÖK IGEN</button>
                </article>
            </article>
        </section>
    );
}

export default Error;