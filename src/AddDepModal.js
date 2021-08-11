import { Component } from "react";
import React from  'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';

export class AddDepModal extends Component{

    constructor(props){
        super(props);
        this.initialState={DepartmentName:''}
        this.state = this.initialState;
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState({
          [name]: value
        })
      }
    
  handleSubmit(event){
       event.preventDefault(); 
      fetch(process.env.REACT_APP_API+'department',{

          method:'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
            //  DepartmentId:null,
             DepartmentName:event.target.DepartmentName.value
            
          })
      })
      .then(res=>res.json())
      .then((result)=>{
          //this.setState({response:result});
          alert(result);
        },
      (error)=>{
          alert('Failed');
        })
       
    }
    render(){
        return(
            <div className="container">
                <Modal
                       {...this.props}
                       size="lg" aria-label="contained-modal-title-vcenter" centered>
                           <Modal.Header closeButton>
                               <Modal.Title id="contained-modal-title-vcenter">
                                   Add Department
                               </Modal.Title>
                           </Modal.Header>
                           <Modal.Body>
                               <Row >
                                     <Col sm={6}>
                                            <Form onSubmit={this.handleSubmit}>
                                                 <Form.Group controlId="DepartmentNme">
                                                     <Form.Label>DepartmentName</Form.Label>
                                                     <Form.Control type="text"  name="DepartmentName" value={this.state.DepartmentName}
                                                     onChange={this.handleChange} required placeholder="DepartmentName"/>

                                                 </Form.Group>
                                                 <Form.Group>
                                                     <Button variant="primary" type="submit">Add Department</Button>
                                                 </Form.Group>
                                            </Form>
                                            
                                     </Col>
                               </Row>
                           </Modal.Body>
                           <Modal.Footer>
                               <Button variant="danger" onClick={this.props.onHide}> close</Button>
                           </Modal.Footer>

                </Modal>
            </div>

        )

    }
}