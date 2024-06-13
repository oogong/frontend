import React from 'react'
import './../styles/companyStock.css'

export default function CompanyStock(props) {
  return (
    <>
      <p className='name'>{props.name}</p>
      <p className='code'>{props.code}</p>
      <p className='price'>{props.price}</p>
    </>
  )
}
