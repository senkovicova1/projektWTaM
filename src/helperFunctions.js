import React from 'react';

export const isEmail = (email) => (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)

export const timestampToString = (timestamp) => {
  let date = (new Date(timestamp));
  return date.getHours()+":"+(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()+" "+date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear();
}

export const timestampToInput = (timestamp)=>{
  return timestamp!==null && timestamp!=='' && timestamp!==undefined ?new Date(timestamp).toISOString().replace('Z',''):''
}

export const inputToTimestamp = (input)=>{
  return isNaN(new Date(input).getTime())|| input === '' ? '' : (new Date(input).getTime())
}
