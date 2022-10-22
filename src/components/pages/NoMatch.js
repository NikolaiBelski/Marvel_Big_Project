import ErrorMeesage from "../error/ErrorMeesage"
import { NavLink } from "react-router-dom"

const NoMatch = () => {
  
return (
    <div>
        <h1>Ошибочка Вышла</h1>
        <ErrorMeesage/>
        <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Не переживай</p>
            <NavLink style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px', 'color':'blue','backgroundColor':'green'}} to="/">Пора домой</NavLink>
    </div>
)


}

export default NoMatch