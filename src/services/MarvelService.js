import { useHttp } from "../hooks/http.hook";

    const  useMarvelService  = () => {

     const {loading,request,error,cleareError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
      
    const  _apiKey = 'apikey=aa4322fd36970f45c37d99206f4cc049';
    const _baseOffset = 210;
     
    const l = 'https://gateway.marvel.com:443/v1/public/comics?apikey=aa4322fd36970f45c37d99206f4cc049';
    
    const  getAllComics = async () => {
        const res = await request(`${l}`);
        return res.data.results.map(_transformComics);
    }

    const  getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);;
        return _transformComics(res.data.results[0])
    }



    const    getAllCharacters = async (w = _baseOffset) => {
            const res = await request(`${_apiBase}characters?limit=9&offset=${w}&${_apiKey}`);
            return res.data.results.map(_transformCharacter);
        }
    
    const    getCharacter = async (id) => {
            const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
            return _transformCharacter(res.data.results[0]);
        }

     const    getCharacterByName = async (name) => {
            const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
            return res.data.results.map(_transformCharacter);
        }
    


   const     _transformCharacter = (char) => {
            return {
                id: char.id,
                name: char.name,
                description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
                thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
                homepage: char.urls[0].url,
                wiki: char.urls[1].url,
                comics:char.comics.items
            }
        }

        const _transformComics = (comics) => {
            return {
                id: comics.id,
                title: comics.title,
                description: comics.description || 'There is no description',
                pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
                thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
                language: comics.textObjects.language || 'en-us',
                price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
            }
        }

        return {loading,error,getAllCharacters,getCharacter,cleareError,getAllComics,getComics,getCharacterByName}
    }
    
    export default useMarvelService;


