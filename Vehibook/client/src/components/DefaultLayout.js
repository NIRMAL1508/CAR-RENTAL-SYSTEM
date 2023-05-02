import React from 'react'
import { Menu,Button, Dropdown, Space,Row,Col } from 'antd';
function DefaultLayout(props){
    const user=JSON.parse(localStorage.getItem('user'))
    const items = [
        {
            key: '1',
            label: (
              <a href="/">
                Home
              </a>
            ),
          },
        {
          key: '2',
          label: (
            <a href="/userbookings">
              Bookings
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <div onClick={()=>{
                localStorage.removeItem('user')
                window.location.href='/login';
            }
            }>
              <li>Logout</li>
              </div>
          ),
        },
      ];
    // const menu=(
    //     <Menu>
    //         <Menu.Item>
    //             <a target="__blank" rel="noopener noreferrer" href="www.google.com">
    //                 1st menu item
    //             </a>
    //         </Menu.Item>
    //         <Menu.Item>
    //             <a target="__blank" rel="noopener noreferrer" href="www.google.com">
    //                 2nd menu item
    //             </a>
    //         </Menu.Item>
    //         <Menu.Item>
    //             <a target="__blank" rel="noopener noreferrer" href="www.google.com">
    //                 3rd menu item
    //             </a>
    //         </Menu.Item>
    //     </Menu>
    // );
    return(
        <>
        <div className='header bs1'>
            <Row gutter={16} justify="center">
                <Col lg={20} sm={24} xs={24}>
                <div className='d-flex justify-content-between'>
                <h1>Car Rental System</h1>
                <Dropdown
        menu={{
          items,
        }}
        placement="bottom"
      >
        <Button>{user.username}</Button>
      </Dropdown>
            
            </div>
                </Col>
            </Row>

        </div>
        <div className='content'>
            {props.children}
        </div>
        <div className="footer text-center">
          <p>Designed and Developed by</p>
          <p>Team 7</p>
        </div>
        </>
    )
}
export default DefaultLayout;