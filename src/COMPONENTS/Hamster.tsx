import '../STYLES/Hamster.css';
import Error from './Error';
import { useGlobalErrorContext } from "../App";
import errorHandler from '../HELPERS/errorHandler';
import { Link } from 'react-router-dom';
import { hamster } from '../MODELS/interfaces';

function Hamster(props: { hamster: hamster, result?: boolean, gallery?: boolean }) {

   const { age, defeats, favFood, games, imgName, loves, name, wins, _id } = props.hamster;
   const result = props.result;
   const gallery = props.gallery;
   const { errObj, setErrObj } = useGlobalErrorContext();

   async function deleteHandler() {
      try {
         await fetch(`https://hamsterwars7.onrender.com/hamsters/${_id}`, {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
            },
         })
            .then((response) => response.json())
            .then((response) => {
               if (response.status) {
                  if(response.status != 200){
                     console.log(response.error)
                     errorHandler(setErrObj, response.error, response.status)
                  }
                  else {
                     window.location.reload();
                  }
               }
            })
      }
      catch (err) {
         console.log(err);
         errorHandler(setErrObj)
      }
   }

   return (
      <section className='Hamster'>
         {errObj.status != 0 ? <Error message={errObj.message} status={errObj.status} /> : null}

         <h3>{name}</h3>

         {gallery ?
            <Link to="/hamster" state={props.hamster}>
               <img src={require(`../ASSETS/img/${imgName}.png`)} />
            </Link>
            :
            <img src={require(`../ASSETS/img/${imgName}.png`)} />
         }

         {result ?
            <article className='results-container'>
               <p><span>Vinster:</span> {wins}</p>
               <p><span>Förluster:</span> {defeats}</p>
            </article>
            : null}

         {gallery ?
            <button onClick={deleteHandler}>&#10005;</button>
            : null}
      </section>
   );
}

export default Hamster;