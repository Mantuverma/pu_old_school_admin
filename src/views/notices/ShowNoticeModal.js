import React from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CImage,
  CModalFooter,
  CButton,
} from '@coreui/react'

const ShowNoticeModal = ({ visibleModal, setVisibleModal, notice }) => {

  return (
    <>
      <CModal
        scrollable
        visible={visibleModal}
        onClose={() => setVisibleModal(false)}
        aria-labelledby="OptionalSizesExample2"
      >
        <CModalHeader>
          <CModalTitle id="OptionalSizesExample2">notice Preview</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {notice && (
            <div className="ms-2 me-2">
              <div className="d-flex justify-content-center">

                <CImage
                  src={notice.noticeImage}

                  alt="notice"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
              <div className="mt-3">
                <h3>notice Name : {notice.title}</h3>
                <p>Description : {notice.shortDec}</p>
                <p>
                  Date: {notice.createdAt.toLocaleDateString()} to{' '}
                  {notice.createdAt.toLocaleDateString()}
                </p>
                <p>
                  Time: {notice.fromTime} to {notice.toTime}
                </p>
              </div>
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => setVisibleModal(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
export default ShowNoticeModal