import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core';
import Uploader from './Uploader';
import WorkerEditor from './WorkerEditor';
import DescriptionIcon from '@material-ui/icons/Description';

class Editor extends Component{

  constructor(props){
    super(props);
    this.state = {
      uploadedFile: null,
      type: null,
      uploaded: false
    }
  }
  fileUploaded(){
    this.setState({ uploaded: true });
  }

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
          {!this.state.uploaded && (<Uploader onFileChange={(file)=> {

            this.setState({ uploadedFile: file.uploadedFile, type: file.type},()=> this.fileUploaded())
          }}
            
          />)}
          { this.state.uploaded && <WorkerEditor uploadedFile={this.state.uploadedFile} onBackButton={()=> this.setState({ uploaded: false })} />}
          
        </div>
      </React.Fragment>
    );
  }
}

export default Editor;