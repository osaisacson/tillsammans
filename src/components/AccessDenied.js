import React from 'react'

const AccessDenied = () => {
    return (
        <div className="page-layout centered">
            <h3>Tillträde beviljas ej</h3>
            <p>
                You don't have the required privileges to access this page.
            </p>
        </div>
    )
}

export default AccessDenied;
