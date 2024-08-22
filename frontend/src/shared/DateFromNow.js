import React from 'react'
import Moment from 'react-moment'

function DateFromNow({ value }) {
    const date = new Date(parseInt(value)).toISOString();
    return <Moment fromNow>{date}</Moment>
}

export default DateFromNow