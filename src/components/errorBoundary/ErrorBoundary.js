import { Component } from "react";
import ErrorMeesage from '../error/ErrorMeesage';


class ErrorBoundary extends Component {

state = {
    error:false
}

componentDidCatch(error,errorinfo) {
    console.log (errorinfo,error);
    this.setState({error:true})

};

render () {
if(this.state.error) {
    return <ErrorMeesage/>
}

return this.props.children


}

}

export default ErrorBoundary