import { useParams,Link } from 'react-router-dom';
import {useState,useEffect} from 'react';

import useMarvelService from '../../services/MarvelService';
 // ES6
import ErrorMeesage from '../error/ErrorMeesage';
import Spinner from '../spinner/Spinner';


import './singleComicsPage.scss'


const SingleComicsPage = () => {
    const {comicID} = useParams() ;

    
    const [comic, setComic] = useState(null);

    const {loading,error,cleareError,getComics} =  useMarvelService();

   useEffect(() => updateChar(),[comicID]);

   const updateChar = ()=>{
     cleareError()
     getComics(comicID)
     .then(onComicLoaded)   
   
 }

const  onComicLoaded = (comic) =>{
 setComic(comic);
    
}
    

    const spinner = loading?<Spinner/>:null;
    const errorMessage = error?<ErrorMeesage/>:null;
    const content = !(loading || error || !comic) ? <Viev comic = {comic}/>:null;
   
    return (
        <div className="char__info">
             {spinner}
             
             {errorMessage}
             {content}


        </div>
    )
}

const Viev = ({comic}) => {

      const {description,thumbnail,title,language,price,pageCount} = comic;



    return(
        <div className="single-comic">
        <img src={thumbnail} alt={title} className="single-comic__img"/>
        <div className="single-comic__info">
            <h2 className="single-comic__name">{title}</h2>
            <p className="single-comic__descr">{description}</p>
            <p className="single-comic__descr">{pageCount}</p>
            <p className="single-comic__descr">{language}</p>
            <div className="single-comic__price">{price}</div>
        </div>
        <Link to="/comics" className="single-comic__back">Back to all</Link>
    </div>
    )
}

export default SingleComicsPage;