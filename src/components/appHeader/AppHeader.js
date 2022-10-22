import './appHeader.scss';
import {Link, NavLink} from 'react-router-dom'

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to ="/">
                    <span>Marvel</span> Твой мир супер-героев! <br />
                    У нас 5 котов и три крысы
                </Link>
            </h1>
            <nav className="app__menu">
       
                <ul>
                    <li><NavLink
                    end
                    style={({isActive}) => ({color : isActive ? 'red' : 'green'}) }
                     to ="/">Characters</NavLink></li>
                  

                    <li><NavLink
                    end
                    style={({isActive}) => ({color : isActive ? 'red' : 'green'}) }
                     to ="/comics">Comics</NavLink></li>
                    
                   
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;