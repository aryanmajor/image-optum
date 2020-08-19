import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class Uploader extends Component{
  
  newFile(url){
    var fReader = new FileReader();
    fReader.readAsDataURL(url);
    fReader.onloadend = function(event){
        console.log(event.target.result)
    }
  }

  render(){
    return(
      <React.Fragment>
        <Button
          variant="contained"
          component="label"
        >
          Upload File
          <input
            type="file"
            style={{ display: "none" }}
            onChange={(e)=> this.newFile(e.target.value)}
          />
        </Button>
      </React.Fragment>
        
    );
  }
}

export default Uploader;