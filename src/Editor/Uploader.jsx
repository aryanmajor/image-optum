import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class Uploader extends Component{

  
  
  sendFeedback(files){
    this.props.onFileChange(files);

  }

  readFileFromURL(file){
    return new Promise((resolve, reject)=>{
      var fReader = new FileReader();
      // fReader.readAsDataURL(url);
      fReader.onloadend = function(event){
          // console.log(event.target.result);
           resolve(event.target.result);
      }
      fReader.onerror = function(err){
        reject(err);
      }
      fReader.readAsDataURL(file);
    });
  }

  newFile(e){
    console.log(e.target.files[0]);
    const type = e.target.files[0].type;
    this.readFileFromURL(e.target.files[0]).then((file)=>{
     
      this.props.onFileChange({ uploadedFile: file, type });

    }).catch((err)=>{
      console.log(err);

    });

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
            onChange={(e)=> this.newFile(e)}
          />
        </Button>
      </React.Fragment>
        
    );
  }
}

export default Uploader;