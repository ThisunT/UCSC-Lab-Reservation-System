import React from 'react';

import AuthUserContext from '../Authentication/AuthUserContext';
import withAuthorization from '../Authentication/withAuthorization';

import ReservePage from "./Sections/ReservePage";
import axios from "axios/index";

class ReserveAuth extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            events:null
        };
    }
    componentDidMount(){
        const url = 'http://localhost:3001/event/'+this.props.data.location.state.lab+'/ /';
        axios.get(url).then((result) => {
            this.setState({ events: result.data });
        });
    }


    render(){
        if(this.state.events !== null){
            return(
                <AuthUserContext.Consumer>
                    {authUser =>
                        <div>
                            <ReservePage user={authUser.uid} events={this.state.events} lab={this.props.data.location.state.lab}/>
                        </div>
                    }
                </AuthUserContext.Consumer>
            )
        }
        else {
            return(
                <div></div>
            )
        }

    }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(ReserveAuth);