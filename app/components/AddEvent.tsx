import * as React from 'react';
import '../css/custom.css';
import * as moment from 'moment'
import { any } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { perviousEvent, ActionType, nextEvent, todayEvent, addNewEvent, editEvent, updateEvent } from '../action/EventAction';
import store from '../store';


interface Props {
    editRecord: any
    addNewEvent: Function
    match: any
    editOldEvent: Function
    updateRecord:Function

}
interface State {
    title: string,
    startTime: string,
    endTime: string,
    addDate: string,
    action:string


}



class AddEvent extends React.Component<Props, State> {
   
    constructor(props: any) {
        super(props);

        this.state = {
            title: '', startTime: '', endTime: '', addDate: '', action:''
        };
        

    }
    componentDidMount=()=> {
        const id = this.props.match.params.data;
        this.props.editOldEvent(id);
       
    }
    componentDidUpdate=(previousProps:any)=> {
     
          
               if(this.props.match.params.data){
                   if(previousProps.editRecord == null  ){
                    this.setState({ title: this.props.editRecord.title });
                    this.setState({ startTime: this.props.editRecord.startTime });
                    this.setState({ endTime: this.props.editRecord.endTime });
                   
                   }
               }
         
            
          //this.setState({ button: 'add()' });
        
     }
    titleChange = (event: any) => {
        this.setState({ title: event.target.value });
    }
    startTimeChange(event: any) {
        console.log(event.target.value);
        this.setState({ startTime: event.target.value });
    }
    endTimeChange(event: any) {
        this.setState({ endTime: event.target.value });
    }
    add() {
        let id = moment(this.state.startTime).valueOf();
        let eventStartTime = moment(new Date(this.state.startTime));
        let eventEndTime = moment(new Date(this.state.endTime));
        this.props.addNewEvent(id, this.state.title, eventStartTime, eventEndTime);
        window.history.back()

    }
    edit(){
       
        let id = this.props.match.params.data;
         let eventStartTime = moment(new Date(this.state.startTime));
         //console.log(eventStartTime);
         let eventEndTime = moment(new Date(this.state.endTime));
         this.props.updateRecord(id, this.state.title, eventStartTime, eventEndTime);
    }
        openCalenderStartTime(){
            let showTime = document.getElementById("showStartTime");
            let cal =document.getElementById("calStartTime");
            showTime.style.display = "none";
            cal.style.display = "block";
            cal.setAttribute("type","datetime-local");
        }
        openCalenderEndTime(){
            let showTime = document.getElementById("showEndTime");
            let cal =document.getElementById("calEndTime");
            showTime.style.display = "none";
            cal.style.display = "block";
            cal.setAttribute("type","datetime-local");
        }
        save(){
            if(this.props.match.params.data){
           this.edit();
            }else{
                this.add();
            }
        }

    render() {
        const { params } = this.props.match
        const { editRecord } = this.props
       // console.log(params)
        if (!params.data || (editRecord)) {

           //console.log(editRecord.id)
            return (
                <div className="add-container">
                    Title:<br />
                    <input type="text" className="inputBox" value={this.state.title} onChange={(event) => this.titleChange(event)} id="title" />
                    <br />
                    Start Time:<br />
                    <input type="text" id="showStartTime" className="inputBox" value={moment(this.state.startTime).format("YYYY-MM-DD HH:mm")} onChange={() => this.openCalenderStartTime()}  />
                    <input type="hidden" id="calStartTime" className="inputBox" value={this.state.startTime} onChange={(even) => this.startTimeChange(event)} required />

                    <br />
                    End Time:<br />
                    <input type="text" id="showEndTime" className="inputBox" value={moment(this.state.endTime).format("YYYY-MM-DD HH:mm")} onChange={() => this.openCalenderEndTime()}  />
                    <input type="hidden" id="calEndTime" value={this.state.endTime} onChange={(event) => this.endTimeChange(event)} className="inputBox"  required />
                    <br /><br />
                    <button type='button' className="button" onClick={(e) => this.save()}>Save</button>
    
                </div>
            );
        }
        return <div></div>
    }
    
}

const mapStateToProps = (state: any) => {
    //  console.log(state.events.editRecord)
    return {
        editRecord: state.events.editRecord
        
    }
}
const mapDispatchToProps = {
    addNewEvent: addNewEvent,
    editOldEvent: editEvent,
    updateRecord: updateEvent
}


export default connect(mapStateToProps, mapDispatchToProps)(AddEvent)