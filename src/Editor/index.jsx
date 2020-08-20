import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Uploader from './Uploader';
import WorkerEditor from './WorkerEditor';
import DescriptionIcon from '@material-ui/icons/Description';

class Editor extends Component{

  constructor(props){
    super(props);
    this.state = {
      uploadedFile: null,
      type: null,
      uploaded: false,
      snack:true
    }
  }
  fileUploaded(){
    this.setState({ uploaded: true });
  }

  render(){
    const { snack } = this.state;
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
          {!this.state.uploaded && (<Uploader onFileChange={(file)=> {

              this.setState({ 
                snack:{open: true, message: 'File Uploaded', severity: 'success'},
                uploadedFile: file.uploadedFile,
                type: file.type
              },()=> this.fileUploaded())
            }}
            errorUploading = {()=>{
              this.setState({ 
                snack:{open: true, message: 'Error Occurred', severity: 'error'}
              })
            }}
          
          />)}
          { this.state.uploaded && <WorkerEditor uploadedFile={this.state.uploadedFile} onBackButton={()=> this.setState({ uploaded: false })} />}
          
        </div>
      
        <Snackbar open={snack.open} autoHideDuration={6000} onClose={()=> this.setState({ snack: {open: false} })}>
          <MuiAlert onClose={()=> this.setState({ snack: {open: false} })} severity={snack.severity} elevation={6} variant="filled" >
            {snack.message}
          </MuiAlert>
        </Snackbar>
      </React.Fragment>
    );
  }
}

export default Editor;