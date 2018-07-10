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
import EnhancedTable from "./AdminBookingList"
import axios from "axios/index";
import logo from '../../../assets/img/wait.svg';
import * as jsPDF from "jspdf";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import CardFooter from "../../../components/Card/CardFooter";
import Menu from "@material-ui/core/es/Menu/Menu";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import Button from "@material-ui/core/es/Button/Button" ;
import {database} from "../../../firebase/index";

class AdminPage extends React.Component {
    constructor(props){
        super(props);

        this.state={
            anchorEl: null,
            anchorEl1: null,
            username:null,
            events:null,
            selectedLab:' ',
            selectedUser:' ',
            updatingState: false,
            users:[]
        }
    }


    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleClick1 = event => {
        this.setState({ anchorEl1: event.currentTarget });
    };

    handleClose1 = () => {
        this.setState({ anchorEl1: null });
    };

    updateEventsChild= (event) =>{
        const url = 'http://localhost:3001/event/'+this.state.selectedLab+'/'+this.state.selectedUser+'/';
        axios.get(url).then((result) => {
            if (result.data.length === 0) {
                this.setState({events: []});
            }
            else {
                this.setState({updatingState: true}, () => {
                    this.setState({events: result.data}, () => {
                        this.setState({updatingState: false});
                    });
                });
            }
        });
    };

    onUpdateLab = (lab) => {

        this.setState({
            selectedLab:lab
        }, () => {
            console.log(this.state.selectedLab);
            const url = 'http://localhost:3001/event/'+this.state.selectedLab+'/'+this.state.selectedUser+'/';
            axios.get(url).then((result) => {
                if (result.data.length === 0) {
                    this.setState({events: []});
                }
                else {
                    this.setState({events: result.data});
                }
            });
            this.handleClose();
        });
    };

    onUpdateUser = (user) => {
        this.setState({
            selectedUser:user
        }, () => {
            const url = 'http://localhost:3001/event/'+this.state.selectedLab+'/'+this.state.selectedUser+'/';
            axios.get(url).then((result) => {
                if (result.data.length === 0) {
                    this.setState({events: []});
                }
                else {
                    this.setState({events: result.data});
                }
            });
            this.handleClose1();
        });
    };

    componentDidMount() {

        this.setState({username: this.props.username});
        const url = 'http://localhost:3001/event/'+this.state.selectedLab+'/'+this.state.selectedUser+'/';
        axios.get(url).then((result) => {
            if (result.data.length === 0) {
                this.setState({events: []});
            }
            else {
                this.setState({events: result.data});
            }
        });

        database.getUsers()
            .then((result) => {
                var users = [];
                result.forEach(function (res) {
                    users.push(res.val().username);
                });
                this.setState({ users: users});
            });
    }

    pdfToHTML(){
        var specialElementHandlers = {
            'myId': function(element, renderer){
                return true;
            },
        };

        let doc = new jsPDF('l','pt','a4');

        var source = document.getElementById('myReport'); //$('#HTMLtoPDF')[0];
        doc.fromHTML(
            source, 20, 15, {
                'elementHandlers': specialElementHandlers
            }
        );
        doc.setFontSize(5);
        doc.save('Test.pdf');
    }

    render() {
        const { classes } = this.props;
        const imageClasses = classNames(
            classes.imgRaised,
            classes.imgRoundedCircle,
            classes.imgFluid
        );
        if(this.state.events===null || this.state.updatingState){
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
            const { anchorEl } = this.state;
            const { anchorEl1 } = this.state;
            return (
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
                                    <Card className={classes.textCenter}>
                                        <CardHeader color="info">
                                            <Button
                                                size="small"
                                                aria-owns={anchorEl ? 'select-lab' : null}
                                                aria-haspopup="true"
                                                onClick={this.handleClick}
                                            >
                                                Select Lab
                                            </Button>
                                            <Button
                                                size="small"
                                                aria-owns={anchorEl1 ? 'select-user' : null}
                                                aria-haspopup="true"
                                                onClick={this.handleClick1}
                                            >
                                                Select User
                                            </Button>
                                            <Menu
                                                id="select-lab"
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={this.handleClose}
                                            >
                                                <MenuItem onClick={(event) => this.onUpdateLab(' ')}>All</MenuItem>
                                                <MenuItem onClick={(event) => this.onUpdateLab('Lab A')}>Lab A</MenuItem>
                                                <MenuItem onClick={(event) => this.onUpdateLab('Lab B')}>Lab B</MenuItem>
                                                <MenuItem onClick={(event) => this.onUpdateLab('Lab C')}>Lab C</MenuItem>
                                                <MenuItem onClick={(event) => this.onUpdateLab('Lab D')}>Lab D</MenuItem>
                                                <MenuItem onClick={(event) => this.onUpdateLab('3rd Year Lab')}>3rd Year Lab</MenuItem>
                                                <MenuItem onClick={(event) => this.onUpdateLab('Cambio Research Lab')}>Cambio Research Lab</MenuItem>
                                            </Menu>
                                            <Menu
                                                id="select-user"
                                                anchorEl={anchorEl1}
                                                open={Boolean(anchorEl1)}
                                                onClose={this.handleClose1}
                                            >
                                                <MenuItem onClick={(event) => this.onUpdateUser(' ')}>All</MenuItem>
                                                {this.state.users
                                                    .map(user => {
                                                        return(
                                                            <MenuItem onClick={(event) => this.onUpdateUser(user)}>{user}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Menu>
                                        </CardHeader>
                                        <CardBody>
                                            <div id="myReport">
                                                <EnhancedTable events={this.state.events} updateEevnts={this.updateEventsChild.bind(this)}/>
                                                &nbsp;
                                            </div>
                                        </CardBody>
                                        <CardFooter className={classes.textMuted}>
                                            <Button color="primary"  onClick={this.pdfToHTML}>Click to Download as PDF</Button>
                                            &nbsp;
                                        </CardFooter>
                                    </Card>
                                </GridContainer>
                                &nbsp;
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default withStyles(profilePageStyle)(AdminPage);

