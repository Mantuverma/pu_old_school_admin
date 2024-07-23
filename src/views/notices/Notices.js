import React, { useState, useEffect } from 'react'
import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import Modal from 'react-modal'
import axios from 'axios'
import ShowNoticeModal from './ShowNoticeModal'
// Make sure to set appElement to avoid accessibility issues
// Modal.setAppElement('#root')

const Notices = () => {
  const [visibleModal, setVisibleModal] = useState(false)

  const [notices, setNotices] = useState([])

  // const handleModalOpen = () => setShowModal(true)
  // const handleModalClose = () => setShowModal(false)
  const handleDelete = async (noticeId) => {
    try {
      const response = await axios.delete(`https://puoldschool-be.onrender.com/api/notice/deletenotice/${noticeId}`);
      console.log(response);
      console.log(response.data)
      const updatedNotices = notices.filter(notice => notice._id !== noticeId);
      setNotices(updatedNotices);
      return response;
    } catch (error) {
      console.error('Error Deleting Notice : ', error);
    }
  }

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('https://puoldschool-be.onrender.com/api/notice/getnotice')
        const formattedNotices = response.data.data.map((notice) => ({
          ...notice,
          createdAt: new Date(notice.createdAt),
          updatedAt: new Date(notice.updatedAt),
        }))
        setNotices(formattedNotices)
        console.log(response)
      } catch (error) {
        console.error('error fetching notices ', error)
      }
    }
    fetchNotices()
  }, [])
  return (
    <>
      <div className="container-fluid">
        <CCard>
          <CCardHeader>
            <h1 className="sub-header" style={{ textAlign: 'center' }}>
              Notices
            </h1>
          </CCardHeader>
          <CCardBody>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Notice</th>
                  <th>Issued Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>View</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {notices.map((notice, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{notice.title}</td>
                    <td>{notice.createdAt.toLocaleDateString()}</td>
                    <td>{notice.updatedAt.toLocaleDateString()}</td>
                    <td>Approved</td>
                    <td>
                      <CButton color="info" onClick={() => setVisibleModal(!visibleModal)}>
                        View Event
                      </CButton>
                      <ShowNoticeModal
                        visibleModal={visibleModal}
                        setVisibleModal={setVisibleModal}
                        notice={notice}
                      />
                    </td>
                    <td>
                      <CButton color="danger" onClick={() => handleDelete(notice._id)}>Delete</CButton>
                    </td>
                  </tr>
                ))}
                {/* Other rows */}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </div>

      {/* <div>
        <Modal
          isOpen={showModal}
          onRequestClose={handleModalClose}
          contentLabel="View Image"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            content: {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '90vw', // Limit the width to 90% of the viewport width
              maxHeight: '90vh', // Limit the height to 90% of the viewport height
              border: 'none',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
              borderRadius: '5px',
              overflow: 'auto',
            },
          }}
        >
          <div>
            <img
              src="src/assets/brand/Logo.png"
              alt="View Image"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
          <button onClick={handleModalClose}>Close</button>
        </Modal>
      </div> */}
    </>
  )
}

export default Notices
