import React from 'react'
import Header from '../header/Headerr'
import Edit from '../products/Edit'

export const ProductPage = () => {
  return (
    <>
    <Header/>
    <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Məhsullar</h1>
        <Edit />
      </div>
    
    </>
  )
}
