import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
    appointmentsList: [],
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
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
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedInput = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedInput,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointments-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="add-appointm,ent-heding"> Add Appointment </h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  value={titleInput}
                  onChange={this.onChangeTitleInput}
                  className="input"
                  placeholder="title"
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                  className="input"
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>

              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-img"
              />
            </div>
            <hr className="hr" />
            <div className="header-with-filter-container">
              <h1 className="appointments-heading">Appointments</h1>
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
