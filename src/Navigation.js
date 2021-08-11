import React,{Component} from 'react';
import {NavLink,Link} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';
function Navigation() {
   
     return(

        <Navbar bg="dark" expend="lg">
           <Navbar.Toggle aria-controls="basic-navbar-nav"/>
           <Navbar.Collapse id="basic-nabvar-nav">
            <Nav>
                <NavLink className="d-inline p-2 bg-dark text-white"  to="/">
                   Home
                </NavLink>
                <Link className="d-inline p-2 bg-dark text-white" to="/department">
                   Department
                </Link>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/employee">
                   Employee
                </NavLink>
            </Nav>
            </Navbar.Collapse>
         </Navbar>
     )


   


}
export default Navigation;