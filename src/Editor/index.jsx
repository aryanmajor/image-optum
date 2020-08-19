import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core';
// import Uploader from './Uploader';
import WorkerEditor from './WorkerEditor';
import DescriptionIcon from '@material-ui/icons/Description';

class Editor extends Component{
  
  render(){
    return(
      <React.Fragment>
        <AppBar position="static" style={{ backgroundColor: '#1D2A34' }}>
        <Toolbar>
            <NavLink to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
              <Typography variant="h5">
                Image Editor (cool name)
              </Typography>
              
            </NavLink>
            <span style={{ marginLeft: 'auto' }}>
              <NavLink to="/list" style={{ color: 'inherit', textDecoration: 'none' }}>
                <Button color="inherit">
                  <DescriptionIcon  />
                    View Profile
                </Button>
              </NavLink>
            </span>
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: '0vh' }}>
          {/* <Uploader /> */}
          <WorkerEditor />
          {/* <Switch>
            <Route path='/new-patient' component={NewPatient} />
            <Route path='/patient/:id' component={PatientDetails} />
            <Route path='/list' component={PatientList} />
            <Route path='/' component={Dashboard} />
          </Switch> */}
        </div>
      </React.Fragment>
    );
  }
}

export default Editor;