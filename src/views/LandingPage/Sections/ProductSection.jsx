import React from "react";
// material-ui components
import withStyles from "material-ui/styles/withStyles";

import {Link} from "react-router-dom";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import Button from "../../../components/CustomButtons/Button";
// core components

class ProductSection extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Our Labs</h2>
            <h5 className={classes.description}>
              Improved, fast.
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
                <Card style={{width: "20rem"}}>
                    <img
                        style={{height: "180px", width: "100%", display: "block"}}
                        className={classes.imgCardTop}
                        src={require('assets/img/lab-photos/labA.jpg')}
                        alt="Card-img-cap"
                    />
                    <CardBody>
                        <h4 className={classes.cardTitle}>LAB A</h4>
                        <p>42 Machines</p>
                        <Link to={{pathname: '/reserve-page', state: { lab: 'Lab A'}}}><Button color="primary">Reserve</Button></Link>
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
                <Card style={{width: "20rem"}}>
                    <img
                        style={{height: "180px", width: "100%", display: "block"}}
                        className={classes.imgCardTop}
                        src={require('assets/img/lab-photos/labB.jpg')}
                        alt="Card-img-cap"
                    />
                    <CardBody>
                        <h4 className={classes.cardTitle}>LAB B</h4>
                        <p>50 Machines</p>
                        <Link to={{pathname: '/reserve-page', state: { lab: 'Lab B'}}}><Button color="primary">Reserve</Button></Link>
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
                <Card style={{width: "20rem"}}>
                    <img
                        style={{height: "180px", width: "100%", display: "block"}}
                        className={classes.imgCardTop}
                        src={require('assets/img/lab-photos/labC.jpg')}
                        alt="Card-img-cap"
                    />
                    <CardBody>
                        <h4 className={classes.cardTitle}>LAB C</h4>
                        <p>30 Machines</p>
                        <Link to={{pathname: '/reserve-page', state: { lab: 'Lab C'}}}><Button color="primary">Reserve</Button></Link>
                    </CardBody>
                </Card>
            </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                  <Card style={{width: "20rem"}}>
                      <img
                          style={{height: "180px", width: "100%", display: "block"}}
                          className={classes.imgCardTop}
                          src={require('assets/img/lab-photos/labD.jpg')}
                          alt="Card-img-cap"
                      />
                      <CardBody>
                          <h4 className={classes.cardTitle}>LAB D</h4>
                          <p>20 Machines</p>
                          <Link to={{pathname: '/reserve-page', state: { lab: 'Lab D'}}}><Button color="primary">Reserve</Button></Link>
                      </CardBody>
                  </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                  <Card style={{width: "20rem"}}>
                      <img
                          style={{height: "180px", width: "100%", display: "block"}}
                          className={classes.imgCardTop}
                          src={require('assets/img/lab-photos/lab3.jpg')}
                          alt="Card-img-cap"
                      />
                      <CardBody>
                          <h4 className={classes.cardTitle}>3rd Year Lab</h4>
                          <p>30 Machines</p>
                          <Link to={{pathname: '/reserve-page', state: { lab: '3rd Year Lab <3'}}}><Button color="primary">Reserve</Button></Link>
                      </CardBody>
                  </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                  <Card style={{width: "20rem"}}>
                      <img
                          style={{height: "180px", width: "100%", display: "block"}}
                          className={classes.imgCardTop}
                          src={require('assets/img/lab-photos/labB.jpg')}
                          alt="Card-img-cap"
                      />
                      <CardBody>
                          <h4 className={classes.cardTitle}>Cambio Research Lab</h4>
                          <p>30 Machines</p>
                          <Link to={{pathname: '/reserve-page', state: { lab: 'Cambio Research Lab'}}}><Button color="primary">Reserve</Button></Link>
                      </CardBody>
                  </Card>
              </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(ProductSection);
