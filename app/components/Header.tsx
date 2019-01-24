import * as React from 'react';
import '../css/custom.css';
import * as moment from 'moment'
import { any } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { perviousEvent, ActionType, nextEvent, todayEvent } from '../action/EventAction';
import store from '../store';


interface State {
  currentDate: any
}

interface Props {
  events: Event[]
  previousDateEvent: Function,
  nextDateEvent: Function,
  todayDateEvent: Function

}

class Header extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { currentDate: moment().format('ll') };
  }

  todayDate() {
    let today = document.getElementById("today");
    today.innerHTML = this.state.currentDate;
    this.setState({ currentDate: moment().format('ll') });
    let day = moment();
    this.props.todayDateEvent(day);

  }
  previousDate() {
    const stateDate = this.state.currentDate;
    let peviousDate = moment(stateDate).subtract(1, 'days');
    let today = document.getElementById("today");
    today.innerHTML = peviousDate.format('ll');
    this.setState({ currentDate: peviousDate.format('ll') });
    this.props.previousDateEvent(peviousDate);
  }
  nextDate() {
    const stateDate = this.state.currentDate;
    let nextDate = moment(stateDate).add(1, 'days')
    let today = document.getElementById("today");
    today.innerHTML = nextDate.format('ll');
    this.setState({ currentDate: nextDate.format('ll') });
    this.props.nextDateEvent(nextDate);
  }

  render() {
  
    return (
      <div className="container">
        <button type='button' className="button" onClick={(e) => this.todayDate()}>Today</button>
        <button type='button' className="navButton" onClick={(e) => this.previousDate()}><i className="fa fa-chevron-left" aria-hidden="true"></i></button>
        <button type='button' className="navButton" onClick={(e) => this.nextDate()}><i className="fa fa-chevron-right" aria-hidden="true"></i></button>
        <label className="dateLabel" id="today">{this.state.currentDate}</label>
        <Link  to="add">
          <button type='button' id="add" className="button">Add</button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = {
  previousDateEvent: perviousEvent,
  nextDateEvent: nextEvent,
  todayDateEvent: todayEvent
}

export default connect(null, mapDispatchToProps)(Header)