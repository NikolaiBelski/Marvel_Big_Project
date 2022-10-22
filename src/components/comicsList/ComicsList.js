import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import { useState, useCallback,useEffect, useRef } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMeesage from '../error/ErrorMeesage';
import Spinner from '../spinner/Spinner';
import { Link,NavLink } from 'react-router-dom';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);


    const {loading, error, getAllComics} = useMarvelService();

  

        useEffect(() => {
            onRequest(offset,true)
        },[])

  
    const  onRequest = (offset,initial) => {
        initial ?setnewItemLoading(false):setnewItemLoading(true)
                getAllComics(offset)
                .then(onComicsListLoaded)
                
        }

            const onComicsListLoaded = (newComicsList) => {
                let ended = false;
                if (newComicsList.length < 8) {
                    ended = true;
                }
        
            
        setComicsList([...comicsList, ...newComicsList]); 
        setnewItemLoading(false);
        setComicsEnded(ended);
        setOffset( offset + 8)
        
 }
    

 function  renderItems (arr) {
    const items =  arr.map((item,i) => {
        console.log(item)
        return (
            <li className="comics__item" key={i}>
                      <Link to = {`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
        )
    });
 
    return (
        <ul className="comics__grid">
            {items}
        </ul>
    )
}

const items = renderItems(comicsList);

const errorMessage = error ? <ErrorMeesage/> : null;
const spinner = loading && !newItemLoading ? <Spinner/> : null;


    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button  disabled={newItemLoading} 
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;