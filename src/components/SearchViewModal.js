import React from 'react';
import { Modal } from 'react-bootstrap';

function SearchViewModal({ search, show, onHide }) {
  return (
    <Modal dialogClassName="modal-container-style"  show={show} onHide={onHide} size="md" animation={true}>
        <Modal.Header closeButton dialogClassName="p-0">
        <Modal.Title>
          <h5>Search Content</h5>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='container'>
                <div><b>English:</b> {search.english}</div>
                <hr/>
                <div><b>Tagalog:</b> {search.tagalog}</div>
            </div>
        </Modal.Body>
    </Modal>
  )
}

export default SearchViewModal

