import * as React from 'react';
import '../css/custom.css';
import { connect } from 'react-redux';
import * as moment from 'moment'
import { Link } from 'react-router-dom';
import Event from './../models/EventModel'
import { deleteEvent } from '../action/EventAction';


interface Props {
  events: any,
  date: any,
  delete: Function
}

interface state {
  eventList: []
}

class Events extends React.Component<Props, state, {}> {
  constructor(props: any) {
    super(props);

    this.state = {
      eventList: []
    }
  }
  removeEvent(id: number) {
    this.props.delete(id);
  }
  setEvent = () => {
    return (this.props.events || []).map((data: any, index: any) => {
      // let sTime=moment(data.startTime).format("hh.mm a"); 
      // let eTime=moment(data.endTime).format("hh.mm a");
      // let defaultTime =moment("09.00 am").format("hh.mm a");
      // let  duration = moment.duration(sTime.diff(defaultTime));

      let sTime=new Date(data.startTime).getHours(); 
      let eTime=new Date(data.endTime).getHours();
      let  duration = sTime - 9;
      let pxl =(duration*40)+105;
      let pxls =pxl+"px";
      let diff = eTime-sTime;
      let box =(diff*40)+40;
      let boxPx =box+"px";
      console.log(diff)
      let styleValue={
        top:pxls,
        height:boxPx,
      }
      return (
        <table id="table" style={styleValue } className="event">
          <tbody>
            <tr key={index} className="row">
              <td >{data.title}
                <Link to={`/edit/${data.id}`} className="tdButton">
                  <button type='button' className="actionButton"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                </Link>
                <button type='button' value={data.id} onClick={() => this.removeEvent(data.id)} className="actionButton"><i className="fa fa-times" aria-hidden="true"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      )

    }

    )
    // let setStyle;
    // <table id="table">
    //   <tbody>
    // return(

    //     {(this.props.events || []).map((data: any, index: any) =>

    //       <tr key={index} className="row">
    //        {/* {moment(data.startTime)} */}
    //         <td >{data.title}
    //         <Link  to={`/edit/${data.id}`}  className="tdButton">  
    //           <button type='button'  className="actionButton"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
    //           </Link>
    //           <button type='button' value={data.id} onClick={() => this.removeEvent(data.id)} className="actionButton"><i className="fa fa-times" aria-hidden="true"></i></button>
    //         </td>
    //       </tr>
    //     )}

    // )
    // </tbody>
    // </table>
  }

  render() {
    let time = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PAM', '6PM', '7PM'];
    return (
      <div className="eventContainer">
        <table id="defaultTable">
          <tbody>
            {(time || []).map((timeLine, index) =>
              <tr className="row" key={index}>
                <td className="eventTime">{timeLine}</td>
                <td className="eventDetails"></td>
              </tr>
            )}
          </tbody>
        </table>
        {this.setEvent()}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  // console.log()
  return {
    events: state.events.events.filter((ev: Event) =>
      ev.startTime.toString().slice(0, 16) == state.events.date.toString().slice(0, 16)
    ),
    date: state.events.date
  }
}

const mapDispatchToProps = {
  delete: deleteEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)