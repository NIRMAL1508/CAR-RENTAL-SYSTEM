import React from 'react'
import {Row,Col,Form,Input} from 'antd'
import {Link} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { userLogin } from '../redux/actions/userActions';
function Login(){
    const dispatch=useDispatch()
    function onFinish(values){
        dispatch(userLogin(values))
        console.log(values)
    }
    return(
        <div className="login">
            <Row gutter={16} className="d-flex align-items-center">
                <Col lg={16} >
                    {/* <img src="https://media.istockphoto.com/id/1134703571/photo/front-view-of-fictitious-car.jpg?b=1&s=170667a&w=0&k=20&c=Nz0-eUCs_FhPYW96j9f7PFOg9RiFvpDIIc6o9_pijhs="/> */}
                </Col>
                <Col lg={8} className='text-left p-5'>
                    <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>
                        <h1>Car Rental System</h1>
                        <h1>Login</h1>
                        <hr/>
                        <Form.Item name='username' label='Username' rules={[{required:true}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name='password' label='Password' rules={[{required:true}]}>
                            <Input/>
                        </Form.Item>
                        <button className='btn1 mt-2 mb-3'>Login</button>
                        <br/>
                        <Link to="/register">Click here to Register</Link>
                    </Form>
                </Col>
            </Row>
            
        </div>
    )
}
export default Login;