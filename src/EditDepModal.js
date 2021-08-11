import { Component } from "react";
import React from  'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';

export class EditDepModal extends Component{

    constructor(props){
        super(props);
        
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

          method:'PUT',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
             DepartmentId:event.target.DepartmentId.value,
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
                                            <Form.Group controlId="DepartmentId">
                                                     <Form.Label>DepartmentId</Form.Label>
                                                     <Form.Control type="text"  name="DepartmentId"  required 
                                                       disabled defaultValue={this.props.depid}
                                                     />

                                                 </Form.Group>
                                                 <Form.Group controlId="DepartmentName">
                                                     <Form.Label>DepartmentName</Form.Label>
                                                     <Form.Control type="text"  name="DepartmentName" 
                                                     defaultValue={this.props.depname} required placeholder="DepartmentName"/>

                                                 </Form.Group>
                                                 <Form.Group>
                                                     <Button variant="primary" type="submit">Update Department</Button>
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