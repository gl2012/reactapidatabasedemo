import React ,{Component} from 'react';
import {ButtonToolbar, Table,Button} from 'react-bootstrap';
import {AddEmpModal} from './AddEmpModal';
import {EditEmpModal} from './EditEmpModal';
export class Employee extends Component{
  constructor(props){
          super(props);
          this.state={emps:[],addModalShow:false,editModalShow:false}
  }
  refreshlist(){

        fetch(process.env.REACT_APP_API+'employee')
        .then(Response=>Response.json())
        .then(data=>{this.setState({emps:data});})
  }
  componentDidMount(){
          this.refreshlist();
  }
  componentDidUpdate(){
          this.refreshlist();
    }
          deleteEmp(empid){
             if(window.confirm('Are you sure?')){
                 fetch(process.env.REACT_APP_API+'employee/'+empid,
                        {
                         method:'DELETE',
                         header:{'Accept':'application/json',
                           'Content-Type':'application/json'
                          }
                   })

          }
        }

          

        render(){
                const {emps,empid,empname,empdep,empdoj,empphoto}=this.state;
                let addModalClose=()=>this.setState({addModalShow:false});
                let editModalClose=()=>this.setState({editModalShow:false})
            return(
             <div >
                     <Table className="mt-3" striped bordered hover size="sm">
                             <thead>
                                     <tr>
                                             <th>EmployeeId</th>
                                     <th>EmployeeName</th>
                                     <th>DepartmentName</th>
                                     <th>DateOfJoining</th>
                                     <th>Options</th>
                                     </tr>
                             </thead>
                             <tbody>
                                     {emps.map(emp=>
                                       <tr key={emp.EmployeeId}>
                                               <td>{emp.EmployeeId}</td>
                                               <td>{emp.EmployeeName}</td>
                                               <td>{emp.Department}</td>
                                               <td>{emp.DateOfJoining}</td>

                                               <td>
                                                       <ButtonToolbar>
                                                               <Button className="mr-2" variant="info" 
                                                               onClick={()=>this.setState({editModalShow:true,empid:emp.EmployeeId,
                                                                empname:emp.EmployeeName,empdep:emp.Department,empphoto:emp.PhotoFileName,empdoj:emp.DateOfJoining   })}>Edit</Button>
                                                              
                                                              <Button className="mr-2" variant="danger" 
                                                               onClick={()=>this.deleteEmp(emp.EmployeeId)}>Delete
                                                            </Button>
                                                    
                                                     <EditEmpModal show={this.state.editModalShow}
                                                      onHide={editModalClose}
                                                      empid={empid}
                                                      empname={empname}
                                                      empdep={empdep}
                                                      empphoto={empphoto}
                                                      empdoj={empdoj}
                                                      />
                                                     </ButtonToolbar>
                                               </td>
                                       </tr> 
                                        )}
                             </tbody>

                   </Table>
                   <ButtonToolbar>
                           <Button variant='primary' onClick={()=>this.setState({addModalShow:true})}>
                                Add Employee   </Button>
                               
                                <AddEmpModal show={this.state.addModalShow} onHide={addModalClose}/>
                   </ButtonToolbar>
             </div>
           );
        }
   
   }