/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CImage,
  CModalFooter,
  CButton,
} from '@coreui/react';
import axios from 'axios';

const EventForm = ({ visibleModal, setVisibleModal, event }) => {
  const [approvalMessage, setApprovalMessage] = useState('');
  const handleApprove = async () => {
    try {
      if (!event.isApproved) {
        const eventData = {
          isApproved: true,
        };
        const response = await axios.patch(`https://puoldschool-be.onrender.com/api/event/updateEvent/${event._id}`, eventData);
        console.log(response.data);
        if (response.data.success) {
          event.isApproved = true;
          setApprovalMessage('Event Approved Successfully!')
          alert('Event Approved Successfully!')
        } else {
          setApprovalMessage('Failed to aprove event. Please Try again later.');
          alert('Failed to aprove event. Please Try again later.');
        }
      } else {
        setApprovalMessage('Event is Already Approved.');
        alert('This event is already approved.');
      }
    } catch (error) {
      console.error('Error Approving Event: ', error);
      setApprovalMessage('Failed to approve Event. Please try again later.')
    }
  };
  return (
    <>
      <CModal
        scrollable
        visible={visibleModal}
        onClose={() => setVisibleModal(false)}
        aria-labelledby="OptionalSizesExample2"
      >
        <CModalHeader>
          <CModalTitle id="OptionalSizesExample2">Event Preview</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {event && (
            <div className="ms-2 me-2">
              <div className="d-flex justify-content-center">
                <CImage
                  src={event.imageUrl}
                  alt="Event"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
              <div className="mt-3">
                <h3>Event Name : {event.eventName}</h3>
                <p>Category: {event.category}</p>
                <p>Location: {event.location}</p>
                <p>Event Details: {event.eventDetails}</p>
                <p>
                  Date: {new Date(event.fromDate).toLocaleDateString()} to{' '}
                  {new Date(event.toDate).toLocaleDateString()}
                </p>
                <p>
                  Time: {event.fromTime} to {event.toTime}
                </p>
              </div>
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={handleApprove} disabled={event.isApproved} > Approve </CButton>
          <CButton color="danger" onClick={() => setVisibleModal(false)}>
            Reject
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
export default EventForm
