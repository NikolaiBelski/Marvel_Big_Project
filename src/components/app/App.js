import AppHeader from "../appHeader/AppHeader";
import SingleCharacterLayout from '../pages/singleCharacterlayout/SingleCharacterLayout'
import SingleComicLayout from '../pages/singleComicsLayout/SingleComicLayout'
import SinglePage from "../pages/Singlepage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage,ComicsPage,NoMatch } from "../pages";






const  App  = () => {

   return (
     <Router>
        <div className="app">
            <AppHeader/>
            <main>
         <Routes>
        
            <Route  path="/" element = {<MainPage/>}/>
         
            <Route  path="/comics" element = { <ComicsPage/>}/>

            {/*<Route  path="/comics/:comicID" element = { <SingleComicsPage/>}/>*/}

            <Route path="/comics/:id" element = {<SinglePage Component={SingleComicLayout} dataType='comic'/>}>

            </Route>

            <Route path="/characters/:id" element = {<SinglePage Component={SingleCharacterLayout} dataType='character'/>}>

            </Route>

            <Route  path="*" element = { <NoMatch/>}/>

         </Routes>


           </main>
        </div>
     </Router>
    )
}

export default App;