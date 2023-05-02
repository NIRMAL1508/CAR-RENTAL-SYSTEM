// import React,{useState,useEffect} from 'react'
// import DefaultLayout from '../components/DefaultLayout';
// import { useParams } from 'react-router-dom';
// import {getAllCars} from '../redux/actions/carsAction'
// import { Button, Row,Col,Divider,DatePicker,Checkbox } from 'antd';
// import{useSelector,useDispatch} from "react-redux"
// import moment from'moment'
// const {RangePicker}=DatePicker
// function BookingCar(){
//     const{cars}=useSelector(state=>state.carsReducer)
//     const{loading}=useSelector(state=>state.alertsReducer)
//     const[car,setcar]=useState({})
//     const dispatch=useDispatch()
//     const {id} = useParams();
//     const[from,setFrom]=useState();
//     const[to,setTo]=useState()
//     const[totalHours,setTotalHours]=useState(0)
//     const[driver,setdriver]=useState(false)
//     const[totalAmount,setTotalAmount]=useState(0)
//     useEffect(()=>{
//         if(cars.length==0){
//             dispatch(getAllCars())
//         }
//         else 
//         {
            
//             setcar(cars.find(o=>o._id==id))
//         }
//     },[cars])
//     useEffect(()=>{
//         setTotalAmount((totalHours*car.rentPerHour)+driver&&(totalHours*30))
//     },[driver,totalHours])
//     function selectTimeSlots(values){

//         setFrom(moment(values[0]).format('MMM DD YYYY HH:mm'))
//         setTo(moment(values[1]).format('MMM DD YYYY HH:mm'))
//         setTotalHours(values[1].diff(values[0],'hours'))
//     }
//     return(
//         <DefaultLayout>
//           <Row justify="center" className="d-flex align-items-center" style={{minHeight:"80vh",fontWeight:'bold'}}>
//             <Col lg={10} sm={24} xs={24}>
//                 <img src={car.image} className="carImg2 bs1"/>
//             </Col>
//             <Col lg={10} sm={24} xs={24} className="text-right">
//                 <Divider type="horizontal" dashed>CarInfo</Divider>
//                 <div >
//                     <p>{car.name}</p>
//                     <p>Rent per hour: {car.rentPerHour}</p>
//                     <p>Fuel: {car.fuelType}</p>
//                     <p>Max persons: {car.capacity}</p>
//                 </div>
//                 <Divider type="horizontal" dashed>Select Time Slots</Divider>
//                 <RangePicker showTime={{format:'HH:mm'}}format="MMM DD YYYY HH:mm" onChange={selectTimeSlots}></RangePicker>
//             <div>
//                 <p>Hours: {totalHours}</p>
//                 <p>Rent per hour:{car.rentPerHour}</p>
//                 <Checkbox onChange={(e)=>{
//                     if(e.target.checked){
//                         setdriver(true)
//                     }
//                     else{
//                         setdriver(false)
//                     }
//                 }}>Driver Required</Checkbox>
//                 <h3>Total Amount: {totalAmount}</h3>
//             </div>
//             </Col>
//           </Row>
//             {/* <h1>{id}</h1> */}
//             <button type="submit"className="bs1">PAY</button>
//         </DefaultLayout>
        
//     )
// }
// export default BookingCar;
import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { useParams } from 'react-router-dom';
import { getAllCars } from "../redux/actions/carsAction";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
import StripeCheckout from "react-stripe-checkout";
import AOS from 'aos';

// import 'aos/dist/aos.css'; // You can also use <link> for styles
const { RangePicker } = DatePicker;
function BookingCar({ match }) {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setcar] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setdriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const {id} = useParams();
  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    } else {
      setcar(cars.find((o) => o._id == id));
    }
  }, [cars]);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    if (driver) {
      setTotalAmount(totalAmount + 30 * totalHours);
    }
  }, [driver, totalHours]);

  function selectTimeSlots(values) {
    console.log(values);
    console.log(moment(values[0]));
    setFrom((values[0]).format("MMM DD YYYY HH:mm"));
    setTo((values[1]).format("MMM DD YYYY HH:mm"));

    setTotalHours(values[1].diff(values[0], "hours"));
  }

  

  function onToken(token){
    const reqObj = {
        // token,
        user: JSON.parse(localStorage.getItem("user"))._id,
        car: car._id,
        totalHours,
        totalAmount,
        driverRequired: driver,
        bookedTimeSlots: {
          from,
          to,
        },
      };
  
      dispatch(bookCar(reqObj));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24} className='p-3'>
          <img src={car.image} className="carimg2 bs1 w-100" data-aos='flip-left' data-aos-duration='1500'/>
        </Col>

        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider type="horizontal" dashed>
            Car Info
          </Divider>
          <div style={{ textAlign: "right" }}>
            {/* <p>{car.image}</p> */}
            <p>{car.name}</p>
            <p>{car.rentPerHour} Rent Per hour /-</p>
            <p>Fuel Type : {car.fuelType}</p>
            <p>Max Persons : {car.capacity}</p>
          </div>

          <Divider type="horizontal" dashed>
            Select Time Slots
          </Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD YYYY HH:mm"
            onChange={selectTimeSlots}
          />
          <br />
          <button
            className="btn1 mt-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            See Booked Slots
          </button>
          {from && to && (
            <div>
              <p>
                Total Hours : <b>{totalHours}</b>
              </p>
              <p>
                Rent Per Hour : <b>{car.rentPerHour}</b>
              </p>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setdriver(true);
                  } else {
                    setdriver(false);
                  }
                }}
              >
                Driver Required
              </Checkbox>

              <h3>Total Amount : {totalAmount}</h3>

              {/* <StripeCheckout
                shippingAddress
                token={onToken}
                currency='inr'
                amount={totalAmount * 100}
                stripeKey="pk_test_51MmWAnSCvxlbRzsm2z1SoSqenP4boKwZ1MnW9la2qhNtAqKALQABtZ4KvnBWfowh5BSY6QhnaVkXpZTjSB8Vn7zE001JaK0pDj"
              >
                  <button className="btn1">
                Book Now
              </button>
              </StripeCheckout> */}
                <button onClick={onToken} className="btn1">
                Book Now
              </button>
              
            </div>
          )}
        </Col>

        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot) => {
                return (
                  <button className="btn1 mt-2">
                    {slot.from} - {slot.to}
                  </button>
                );
              })}

              <div className="text-right mt-5">
                <button
                  className="btn1"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Row>
    </DefaultLayout>
  );
}

export default BookingCar;