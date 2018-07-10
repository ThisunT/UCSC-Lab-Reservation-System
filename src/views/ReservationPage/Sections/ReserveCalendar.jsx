import React, {Component} from "react";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios/index';
import Button from "../../../components/CustomButtons/Button";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import IconButton from "../../../components/CustomButtons/IconButton";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import TextField from "@material-ui/core/es/TextField/TextField";
import Primary from "components/Typography/Primary.jsx";
import Success from "components/Typography/Success.jsx";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import Slide from "@material-ui/core/es/Slide/Slide";
import Close from "@material-ui/icons/es/Close";
import withStyles from "@material-ui/core/es/styles/withStyles";
import modalStyle from "assets/jss/material-kit-react/modalStyle.jsx";

import withRouter from "react-router-dom/es/withRouter";
import './customAnimation.css';
import {auth, database} from "../../../firebase/index";
import Danger from "../../../components/Typography/Danger";

BigCalendar.momentLocalizer(moment);


class ReserveBigCalendar extends Component {
    constructor(props){
        super(props);
        this.state={
            myEventsList:null
        };
    }
    componentWillMount(){
        let responseEvents = this.props.events, myEventsList=[];
        for (let i=0; i<responseEvents.length; i++){
            myEventsList.push({
                'title': responseEvents[i].eventname,
                'bookedby': responseEvents[i].bookedby,
                'description':responseEvents[i].description,
                'startDate': new Date(responseEvents[i].starttime),
                'endDate': new Date(responseEvents[i].endtime)
            })
        }
        this.setState({
            myEventsList: myEventsList
        })
    }

    checkForOverlaps = function(starttime, endtime, slotInfo){
        var bit = true;
        for(var i =0;i<this.props.events.length;i++){
            var eventStart = new Date(this.props.events[i].starttime);
            var eventEnd = new Date(this.props.events[i].endtime);

            if(((eventStart>starttime)&&(eventStart<endtime))||((eventEnd>starttime)&&(eventEnd<endtime))){
                bit = false;
                this.props.updateSlotInfo(slotInfo, true);
                break;
            }
        }
        if(bit){
            this.props.updateSlotInfo(slotInfo, false);
        }

    };

    render(){
        return(
            <div>
                <BigCalendar
                    events={this.state.myEventsList}
                    startAccessor='startDate'
                    endAccessor='endDate'
                    defaultDate={new Date()}
                    selectable
                    onSelectEvent={event => window.alert( event.description + '\n' + event.bookedby)}
                    onSelectSlot={slotInfo =>
                        this.checkForOverlaps(slotInfo.start,slotInfo.end,slotInfo)
                    }
                />
            </div>
        )

    }

}

function Transition(props) {
    return <Slide direction="down" {...props} />;
}
const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class ReserveCalendar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title:null,
            description:null,
            slotInfo:null,
            startTime:null,
            endTime:null,
            overlapping:false,
            modal: false
        };
    }
    updateSlotInfo(value,overlapping) {
        this.setState({
            slotInfo: value,
            startTime:value.start.toLocaleString(),
            endTime:value.end.toLocaleString(),
            modal: true,
            overlapping: overlapping
        });
    }
    handleClickOpen(modal) {
        var x = [];
        x[modal] = true;
        this.setState(x);
    }
    handleClose(modal) {
        var x = [];
        x[modal] = false;
        this.setState(x);
    }


    sendEventRequest = function (lab, eventname, description, starttime, endtime, user){

        const {
            history
        } = this.props;

        user
            .then(function (result) {
                const url = 'http://localhost:3001/event/';
                const config = {
                    headers: {
                        'content-type': 'application/json'
                    }
                };
                const eventData = {
                    lab:lab,
                    eventname:eventname,
                    description: description,
                    starttime: starttime,
                    endtime: endtime,
                    user: result.username
                };

                axios.post(url,eventData,config)
                    .then(function (response) {
                        if(response.data.state){
                            history.push("/");
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            });
    };

    onSubmit = (event)=>{
        this.handleClose("modal");
        this.sendEventRequest(this.props.lab, this.state.title, this.state.description, this.state.startTime , this.state.endTime, database.onceGetUsers(auth.getUser().uid));
    };

    render(){
        const { classes } = this.props;
        return(
            <div>
                <ReserveBigCalendar lab={this.props.lab} events={this.props.events} updateSlotInfo={this.updateSlotInfo.bind(this)}/>
                <div>
                    <Dialog
                        classes={{
                            root: classes.center,
                            paper: classes.modal
                        }}
                        open={this.state.modal}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={() => this.handleClose("modal")}
                        aria-labelledby="modal-slide-title"
                        aria-describedby="modal-slide-description">
                        <DialogTitle
                            id="classic-modal-slide-title"
                            color="Primary"
                            className={classes.modalHeader}>
                            <IconButton
                                className={classes.modalCloseButton}
                                key="close"
                                aria-label="Close"
                                color="primary"
                                onClick={() => this.handleClose("modal")}>
                                <Close className={classes.modalClose} />
                            </IconButton>
                            <Primary >Reserve here..</Primary>
                        </DialogTitle>
                        <DialogContent
                            id="modal-slide-description"
                            className={classes.modalBody}>
                            <div>
                                <Primary>Start Time: <Success>{this.state.startTime}</Success></Primary>
                                <Primary>End Time: <Success>{this.state.endTime}</Success></Primary>
                                <TextField
                                    label="Event Title"
                                    placeholder="Event Title"
                                    className={classes.textField}
                                    margin="normal"
                                    onChange={event => this.setState(byPropKey('title', event.target.value))}
                                /><br />
                                <TextField
                                    label="Description"
                                    placeholder="Description"
                                    className={classes.textField}
                                    margin="normal"
                                    onChange={event => this.setState(byPropKey('description', event.target.value))}
                                /><br />
                            </div>
                            <div className={this.state.overlapping?'fadeIn':'fadeOut'}>
                                <Danger>Time slot is not available</Danger>
                            </div>
                        </DialogContent>
                        <DialogActions
                            className={classes.modalFooter +" " +classes.modalFooterCenter}>
                            <Button round
                                onClick={() => this.handleClose("modal")}
                            >
                                Cancel
                            </Button>
                            <Button round
                                disabled={this.state.overlapping}
                                onClick={() => this.onSubmit()}
                                color="primary">
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        )
    }
}

export default withRouter(withStyles(modalStyle)(ReserveCalendar));