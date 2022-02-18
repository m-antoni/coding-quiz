import React from 'react'

export default function AlertMessage({ type, message }) {
  return (
    <div className={`${type === 1 ? "alert alert-success alert-dismissible fade show" : "alert alert-danger alert-dismissible fade show"}`} role="alert">
        <strong>{ type === 1 ? "Success" : 'Error!'}</strong> { message }
        {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
    </div>     
  )
}
