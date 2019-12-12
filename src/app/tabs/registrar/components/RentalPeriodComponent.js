import React, { Component } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import {
  Col, InputGroup, FormControl, Button, Row, Spinner,
} from 'react-bootstrap';


class RentalPeriodComponent extends Component {
  constructor(props) {
    super(props);
    const { duration } = this.props;

    this.state = {
      duration,
    };

    this.handleChangeDuration = this.handleChangeDuration.bind(this);
    this.decrement = this.decrement.bind(this);
    this.increment = this.increment.bind(this);
  }

  componentDidMount() {
    this.handleChangeDuration();
  }

  handleChangeDuration() {
    const { getCost } = this.props;
    const { duration } = this.state;
    getCost(duration);
  }

  decrement() {
    const { duration } = this.state;
    if (duration <= 1) {
      return;
    }
    this.setState({ duration: duration - 1 }, this.handleChangeDuration);
  }

  increment() {
    const { duration } = this.state;
    this.setState({ duration: duration + 1 }, this.handleChangeDuration);
  }

  render() {
    const {
      strings, getting, rifCost, committing, committed,
    } = this.props;

    const { duration } = this.state;

    const counter = (
      <div>
        <Row className="justify-content-md-center">
          <Col xs="2">
            {strings.rental_period}
            <InputGroup>
              <InputGroup.Append>
                <Button size="sm" disabled={committing || committed} onClick={this.decrement}>-</Button>
              </InputGroup.Append>
              <FormControl
                value={duration}
                readOnly
              />
              <InputGroup.Append>
                <Button size="sm" disabled={committing || committed} onClick={this.increment}>+</Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
      </div>
    );

    return (
      <div>
        <p>
          1. For how long do you want your name?
          <br />
        </p>
        {counter}
        {
          getting
            ? <Spinner animation="grow" variant="primary" />
            : <b>{`price: ${rifCost} RIF`}</b>
        }
        <br />
        <i>50% discount per year from the third year</i>
      </div>
    );
  }
}

RentalPeriodComponent.propTypes = {
  strings: propTypes.shape({
    rental_period: propTypes.string.isRequired,
  }).isRequired,
  getting: propTypes.bool.isRequired,
  rifCost: propTypes.number,
  duration: propTypes.number,
  getCost: propTypes.func.isRequired,
  committing: propTypes.bool.isRequired,
  committed: propTypes.bool.isRequired,
};

RentalPeriodComponent.defaultProps = {
  rifCost: 0,
  duration: 1,
};

export default multilanguage(RentalPeriodComponent);