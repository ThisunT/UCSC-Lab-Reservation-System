import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui components
import withStyles from "material-ui/styles/withStyles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

// Sections for this page
import ReserveCalendar from "./ReserveCalendar";


class ReservePage extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Parallax filter image={require("assets/img/landing-bg1.jpg")}>
                    <div className={classes.container}>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                                <h1 className={classes.title}>{this.props.lab}</h1>
                                <br />
                            </GridItem>
                        </GridContainer>
                    </div>
                </Parallax>
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div className={classes.container}>
                        &nbsp;
                        <ReserveCalendar lab={this.props.lab} events={this.props.events}/>
                        &nbsp;
                        &nbsp;
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(landingPageStyle)(ReservePage);
