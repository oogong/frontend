import React from 'react'
import './../styles/companyStock.css'

export default function CompanyStock(props) {
  return (
    <div style={{display:"flex", flexDirection:"column", paddingRight:"10px", marginRight:'10px', borderRight:"2px solid #c1c1c1"}}>
      <p className='name'>{props.name}</p>
      <p className='code'>{props.code}</p>
      <p className='price'>{props.price}</p>
    </div>
  )
}
