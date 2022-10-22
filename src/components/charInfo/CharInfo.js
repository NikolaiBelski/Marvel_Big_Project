
import {useState,useEffect} from 'react';


import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
 // ES6
import ErrorMeesage from '../error/ErrorMeesage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';


const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const {loading,error,getCharacter,cleareError} =  useMarvelService();

   useEffect(() => updateChar(),[props.charId]);

   const updateChar = ()=>{
       const {charId} = props;
       if(!charId) {
           return
        }
        
        cleareError()
        getCharacter(charId)
        .then(onCharLoaded)   
      
    }

  const  onCharLoaded = (char) =>{
    setChar(char);
       
 }
    

    

    
        const skeleton = char||loading||error?null:<Skeleton/>

        const spinner = loading?<Spinner/>:null;
        const errorMessage = error?<ErrorMeesage/>:null;
        const content = !(loading || error || !char) ? <Viev char = {char}/>:null;
       
        return (
            <div className="char__info">
                 {spinner}
                 {skeleton}
                 {errorMessage}
                 {content}

 
            </div>
        )
    
   
}

const Viev = ({char})=>{
    const {name,description,thumbnail,homepage,wiki,comics} = char;

    let imgStyle = {'objectFit' : 'cover'};

    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
    }
   
      return (
        <>

                <div className="char__basics">
                    <img src={thumbnail} alt={name} style={imgStyle}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0 ?null:'Нет комиксов с этим персонажем'}

                {
                    comics.map((item, i) => {
                          // eslint-disable-next-line
                        if(i>9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }                
            </ul>
                
                </>
    )
}


CharInfo.propTypes = {
    charId:PropTypes.number
}
export default CharInfo;