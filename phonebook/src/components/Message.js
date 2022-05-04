import React from 'react'

const Message = ({message, errorMessage}) => {
  
  return (
    <>
    {message !== null &&
      <div className="message">{message}</div>
    }

    {errorMessage !== null &&
      <div className="errormessage">{errorMessage}</div>
    }
    </>
    
  )
}

export default Message