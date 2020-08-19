import React, { Component } from 'react';
import { Button, Card,  ButtonGroup } from '@material-ui/core';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import SaveIcon from '@material-ui/icons/Save';

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


class WorkerEditor extends Component{

  state={
    editingOption: '',
    scale: 1
  };

  componentDidMount(){
    console.log('Componet On');
    pdfjs.getDocument('/2.pdf').promise.then((doc)=>{
      console.log('Pages : ', doc._pdfInfo.numPages);
      this.setState({
        uploadedDoc:doc
      })
    }).catch((err)=>{
      console.log(err);
    })
  }

  renderCanvas(){
    this.state.uploadedDoc && this.state.uploadedDoc.getPage(1).then(page=>{
      var myCanvas = document.getElementById('my-canvas');
      var context = myCanvas.getContext("2d");
      var viewport = page.getViewport({scale: this.state.scale});
      myCanvas.width=viewport.width;
      myCanvas.height = viewport.height;
      
      page.render({
        canvasContext: context,
        viewport: viewport
      });
      
    });
  }

  handleZoom(zoomIn){
    console.log(zoomIn)
    this.setState(prevState=>{
      return({
        ...prevState,
        scale: (prevState.scale + 1) ? zoomIn : (prevState.scale - 0.5) 
      })
    })
  }

  render(){
    return(
      <React.Fragment>
        <Card>
        <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
          <Button><SaveIcon />Save</Button>
          <Button onClick={()=>this.handleZoom(true)}><ZoomInIcon /></Button>
          <Button onClick={()=>this.handleZoom(false)}><ZoomOutIcon /></Button>
          <Button><RotateLeftIcon /></Button>
          <Button><RotateRightIcon /></Button>
        </ButtonGroup>
        </Card>
        <div style={{ marginTop: '1vh' }}>
          <canvas id="my-canvas"></canvas>
          {this.renderCanvas()}
        </div>
        </React.Fragment>
        
    );
  }
}

export default WorkerEditor;