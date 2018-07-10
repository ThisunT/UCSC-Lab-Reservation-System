import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui components
import withStyles from "material-ui/styles/withStyles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

// Sections for this page
import ProductSection from "./Sections/ProductSection.jsx";
import MyCalendar from "./Sections/BigCalendar.jsx";
import axios from "axios/index";
import logo from '../../assets/img/wait.svg';



class LandingPage extends React.Component {
  constructor(props){
    super(props);

    this.state={
      events:null
    }
  }
  componentWillMount(){
      const url = 'http://localhost:3001/event/ / /';
      axios.get(url).then((result) => {
          if (result.data.length === 0) {
              this.setState({events: []});
          }
          else {
              this.setState({events: result.data});
          }
      });
  }

  render() {
    const { classes} = this.props;
    if(this.state.events===null){
      return(
          <div>
              {/*<Parallax filter image={require("assets/img/landing-bg1.jpg")}>*/}
                  {/*<div className={classNames(classes.main, classes.mainRaised)}>*/}
                      {/*<div>*/}
                          {/*<div className={classes.container}>*/}
                              {/*<img src={logo} align="center" style={{marginLeft: '40%'}} className="App-logo" alt="logo" />*/}
                          {/*</div>*/}
                      {/*</div>*/}
                  {/*</div>*/}
              {/*</Parallax>*/}
          </div>
      )
    }
    else {
      return (
          <div>
              <Parallax filter image={require("assets/img/landing-bg1.jpg")}>
                  <div className={classes.container}>
                      <GridContainer>
                          <GridItem xs={12} sm={12} md={6}>
                              <h1 className={classes.title}>UCSC Laboratories</h1>
                              <h4 style={{color:'white'}}>
                                  Reserve and make the best happen, efficiently!
                              </h4>
                              <br />
                              {/*<Button*/}
                                  {/*color="danger"*/}
                                  {/*size="lg"*/}
                                  {/*href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"*/}
                                  {/*target="_blank"*/}
                                  {/*rel="noopener noreferrer"*/}
                              {/*>*/}
                                  {/*<i className="fas fa-play" />Watch video*/}
                              {/*</Button>*/}
                          </GridItem>
                      </GridContainer>
                  </div>
              </Parallax>
              <div className={classNames(classes.main, classes.mainRaised)}>
                  <div className={classes.container}>
                      <div className={classes.section}>
                          &nbsp;
                          <MyCalendar events={this.state.events}/>
                      </div>
                      <ProductSection />
                  </div>
              </div>
          </div>
      )
    }
  }
}

export default withStyles(landingPageStyle)(LandingPage);
