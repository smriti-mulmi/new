import React from "react"
import Tdata from "./Tdata"
import Card from "./Card"
import "./Testimonial.css"


const AllItem = () => {
  return (
    <>
    <section className='Testimonial mtop'>
        <div className="container grid1">
            {Tdata.map((value, index) =>{
                return <Card key={index} {...value} />
            })}

        </div>
    </section>

    </>
  )
}

export default AllItem