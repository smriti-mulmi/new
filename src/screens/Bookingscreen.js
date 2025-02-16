import React, { useEffect , useState } from 'react'
import axios from "axios";
import Loader from '../components/Loader';

function Bookingscreen({match}) {
    const[loading, setloading]=useState(true);
    const[error, seterror]=useState(false)
    const[room , setroom]=useState();
    useEffect(async() => {
        
        try {
            setloading(true);
            const data = await (await axios.post("/api/rooms/getroombyid" , {roomid: match.params.roomid})).data;
            console.log(data); 
            setroom(data);
            setloading(false);
            
          } catch (error) {
            setloading(false);
            seterror(true);
          }
          
    }, []);

    return (
        <div className='m-5'>
            
            {loading ? (<Loader/>) : error ? (<Error/>) : (

                <div className="row p-3 mb-5 bs" data-aos='flip-right' duration='2000'>

                      <div className="col-md-6 my-auto">
                        
                         <div>
                         <h1> {room.name}</h1>
                           <img src={room.imageurls[0]} style={{height:'400px'}} />
                         </div>

                      </div>
                      <div className="col-md-6 text-right">
                           <div>
                           <h1><b>Booking Details</b></h1>
                           <hr />

                           <p><b>Name</b> : {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                           <p><b>From Date</b> : {match.params.fromdate}</p>
                           <p><b>To Date</b> : {match.params.todate}</p>
                           <p><b>Max Count </b>: {room.maxcount}</p>
                           </div>
                           
                           <div className='mt-5'>
                           <h1><b>Amount</b></h1>
                           <hr />
                           <p>Total Days : <b>{totalDays}</b></p>
                           <p>Rent Per Day : <b>{room.rentperday}</b></p>
                           <h1><b>Total Amount : {totalAmount} /-</b></h1>

                           <StripeCheckout
            amount={totalAmount*100}
            shippingAddress
            token={tokenHander}
            stripeKey='pk_test_51IYnC0SIR2AbPxU0TMStZwFUoaDZle9yXVygpVIzg36LdpO8aSG8B9j2C0AikiQw2YyCI8n4faFYQI5uG3Nk5EGQ00lCfjXYvZ'
            currency='INR'
            >

                  
                  <button className='btn btn-primary'>Pay Now</button>

            </StripeCheckout>
                           </div>
                          

                           
                      </div>

                </div>

            )}
        
        </div>
    )
}

export default Bookingscreen
