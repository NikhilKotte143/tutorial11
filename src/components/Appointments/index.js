// Write your code here
import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    titile: '',
    date: '',
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onChangeDateInput = event => {
    this.setState({date: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titile: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefalut()
    const {titile, date} = this.state
    const formatDate = date ? format(new Date(date), 'dd MMMM yyyy, EEE') : ''
    const newAppointment = {
      id: v4(),
      titile: titile,
      date: formatDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: {...prevState.appointmentList, newAppointment},
      titile: '',
      date: '',
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return eachTransaction
  }

  render() {
    const {titile, date, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filtered' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="app-container">
        <div className="appointment-container">
          <div className="appointment-inputs-container">
            <div className="add-appointment-container">
              <form className="form">
                <h1 className="heading">Add Appointment</h1>
                <label className="text" htmlFor="title">
                  TITLE
                </label>
                <input
                  className="title-input"
                  type="text"
                  id="title"
                  value={titile}
                  placeholder="Title"
                  onChange={this.onChangeTitleInput}
                />
                <label className="text" htmlFor="date">
                  TITLE
                </label>
                <input
                  className="title-input"
                  type="date"
                  id="date"
                  value={date}
                  onChange={this.onChangeDateInput}
                />
                <button
                  type="submit"
                  className="add-button"
                  onClick={this.onAddAppointment}
                >
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
            <hr className="line" />
            <div className="appointments-starred">
              <h1 className="appointment-heading">appointments</h1>
              <button
                type="button"
                className={`filter-style ${filterClassName}`}
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
