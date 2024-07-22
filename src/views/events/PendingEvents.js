/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CModal, CModalHeader, CModalTitle, CModalBody } from '@coreui/react';
import EventForm from './EventForm';
import axios from 'axios'

const PendingEvents = () => {
  const [visibleModal, setVisibleModal] = useState(false)
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://puoldschool-be.onrender.com/api/event/getEventsAll');
        setEvents(response.data.data)
      } catch (error) {
        console.error('Error Fetching Events : ', error)
      }
    }
    fetchData()
  }, []);
  const handleDelete = async (eventId) => {
    try {
      const response = await axios.post(`https://puoldschool-be.onrender.com/api/event/deleteEvent/${eventId}`);
      console.log(response);
      const updatedEvents = events.filter(event => event._id !== eventId);
      setEvents(updatedEvents);
      return response;
    } catch (error) {
      console.error('Error Deleting Events : ', error);
    }
  }
  return (
    <div className="container-fluid">
      <CCard>
        <CCardHeader>
          <h1 className="sub-header">Pending Events</h1>
        </CCardHeader>
        <CCardBody>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Event Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>View</th>
                  <th>Rejected</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{event.eventName}</td>
                    <td>{new Date(event.fromDate).toLocaleDateString()} {event.fromTime}</td>
                    <td>{new Date(event.toDate).toLocaleDateString()} {event.toTime}</td>
                    <td>{event.isApproved ? 'Approved' : 'Approve'}</td>
                    <td>
                      <CButton color="info" onClick={() => setVisibleModal(!visibleModal)}>
                        View Event
                      </CButton>
                      <EventForm
                        visibleModal={visibleModal}
                        setVisibleModal={setVisibleModal}
                        event={event}
                      />
                    </td>
                    <td>
                      <CButton color="danger" onClick={() => handleDelete(event._id)}>Delete</CButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default PendingEvents
