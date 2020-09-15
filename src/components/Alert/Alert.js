import React from 'react'


const Alert = ({isVisible, isError, errorMsg}) => {

    const errorClass = "text-danger fontmsg";
    const successClass = "text-success fontmsg";

    return (
        <>  
         { 
        isVisible ?  <p className={isError ? errorClass : successClass}> {errorMsg}</p> : "" } 
        </>
    )
}

export default Alert
