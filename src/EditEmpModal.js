import { Component } from "react";
import React from  'react';
import {Modal,Button,Row,Col,Form,Image} from 'react-bootstrap';

export class EditEmpModal extends Component{

    constructor(props){
        super(props);
        this.initialState={EmployeeName:''}
        this.state = {deps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
       
    }
    photofilename=this.props.empphoto;
    imagesrc=process.env.REACT_APP_PHOTOPATH+this.photofilename;
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState({
          [name]: value
        })
      }
    componentDidMount(){

        fetch(process.env.REACT_APP_API+'department')
            .then(Response=>Response.json())
            .then(data=>{this.setState({deps:data});});
        
    }
  handleSubmit(event){
       event.preventDefault(); 
      fetch(process.env.REACT_APP_API+'employee',{

          method:'PUT',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
             EmployeeId:event.target.EmployeeId.value,
             EmployeeName:event.target.EmployeeName.value,
             Department:event.target.Department.value,
             DateOfJoining:event.target.DateOfJoining.value,
             photofilename:this.photofilename

            
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
     handleFileSelected(event){
          event.preventDefault();
          this.photofilename=event.target.files[0].name;
          const formData=new FormData();
          formData.append(
              "myFile",
              event.target.files[0],
              event.target.files[0].name
          );
          fetch(process.env.REACT_APP_API+'Employee/SaveFile',{
              method:'POST',
              body:formData
          })
          .then(res=>res.json())
          .then((result)=>{
              this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
             
          },
          (error)=>{alert('Failed')}
          )
     }
    render(){
        return(
            <div className="container">
                <Modal
                       {...this.props}
                       size="lg" aria-label="contained-modal-title-vcenter" centered>
                           <Modal.Header closeButton>
                               <Modal.Title id="contained-modal-title-vcenter">
                                   Update Employee
                               </Modal.Title>
                           </Modal.Header>
                           <Modal.Body>
                               <Row >
                                     <Col sm={6}>
                                            <Form onSubmit={this.handleSubmit}>
                                            <Form.Group controlId="EmployeeId">
                                                     <Form.Label>EmployeeId</Form.Label>
                                                     <Form.Control type="text"  name="EmployeeId" disabled defaultValue={this.props.empid} disable required placeholder="EmployeeName"/>

                                                 </Form.Group>
                                                 <Form.Group controlId="EmployeetName">
                                                     <Form.Label>EmployeeName</Form.Label>
                                                     <Form.Control type="text"  name="EmployeeName" defaultValue={this.props.empname} required placeholder="EmployeeName"/>

                                                 </Form.Group>
                                                 <Form.Group controlId="Department">
                                                     <Form.Label>Department</Form.Label>
                                                     <Form.Control as="select"  defaultValue={this.props.empdep}>
                                                     {this.state.deps.map(dep=>
                                                            <option key={dep.DepartmentId}>{dep.DepartmentName}</option>)}
                                                     </Form.Control>

                                                 </Form.Group>

                                                 <Form.Group controlId="DateOfJoining">
                                                     <Form.Label>DateOfJoining</Form.Label>
                                                     <Form.Control type="date"  name="DateOfJoining" required  defaultValue={this.props.empdoj} placeholder="DateOfJoining" />

                                                 </Form.Group>
                                                 <Form.Group>
                                                     <Button variant="primary" type="submit">Update Employee</Button>
                                                 </Form.Group>
                                            </Form>
                                            
                                     </Col>
                                     <Col sm={6}> 
                                       <Image width="200px" height="200px" src={this.imagesrc}/> 
                                       <input onChange={this.handleFileSelected} type="File" />
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