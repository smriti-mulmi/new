import React from 'react';

function Error({ message }) {
    return <div className="alert alert-danger">{message || 'Something went wrong!'}</div>;
}

export default Error;
