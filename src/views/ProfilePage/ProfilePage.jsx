import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui components
import withStyles from "material-ui/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import profile from "assets/img/faces/christian.jpg";

import profilePageStyle from "assets/jss/material-kit-react/views/profilePage.jsx";
import EnhancedTable from "./BookingList"
import axios from "axios/index";
import logo from '../../assets/img/wait.svg';
import AdminPage from "./Admin/AdminPage";

class ProfilePage extends React.Component {
    constructor(props){
        super(props);

        this.state={
            username:null,
            admin:false,
            events:null
        }
    }

    componentDidMount(){
        this.props.username
            .then((user) => {
                this.setState({username: user.username, admin: user.admin});

                if(user.admin){
                    this.setState({ events: [] });
                    //do nothing, passing this this to admin page
                }
                else {
                    const url = 'http://localhost:3001/event/'+' /'+this.state.username;
                    axios.get(url).then((result) => {
                        if(result.data.length===0){
                            this.setState({ events: [] });
                        }
                        else {
                            this.setState({ events: result.data });
                        }
                    });
                }

            });
    }

    render() {
        const { classes } = this.props;
        const imageClasses = classNames(
            classes.imgRaised,
            classes.imgRoundedCircle,
            classes.imgFluid
        );
        if(this.state.events===null){
            return(
                <div>
                    <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
                    <div className={classNames(classes.main, classes.mainRaised)}>
                        <div>
                            <div className={classes.container}>
                                <img src={logo} align="center" style={{marginLeft: '40%'}} className="App-logo" alt="logo" />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            if(this.state.admin){
                return (
                    <AdminPage username={this.state.username}/>
                );
            }
            else {
                return(
                    <div>
                        <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
                        <div className={classNames(classes.main, classes.mainRaised)}>
                            <div>
                                <div className={classes.container}>
                                    <GridContainer justify="center">
                                        <GridItem xs={12} sm={12} md={6}>
                                            <div className={classes.profile}>
                                                <div>
                                                    <img src={localStorage.getItem("photo")?localStorage.getItem("photo"):profile} alt="..." className={imageClasses} />
                                                </div>
                                                <div className={classes.name}>
                                                    <h3 className={classes.title}>{localStorage.getItem("Name")?localStorage.getItem("Name"): this.state.username}</h3>
                                                </div>
                                            </div>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer justify="center">
                                        <div id="myReport">
                                            <EnhancedTable events={this.state.events}/>
                                            &nbsp;
                                        </div>
                                    </GridContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
}

export default withStyles(profilePageStyle)(ProfilePage);