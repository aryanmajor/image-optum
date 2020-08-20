import React, { Component } from 'react';
import { Button, Card,  ButtonGroup, Select, MenuItem } from '@material-ui/core';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import BrushIcon from '@material-ui/icons/Brush';
import { Document, Page, pdfjs } from "react-pdf";
import { drawingHandler } from './utils/drawingHandler';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


class WorkerEditor extends Component{
  constructor(props){
    super(props);
    this.state = {
      editingOption: '',
      scale: 1,
      doc: undefined,
      currentPage: 1,
      rotation: 0,
      drawSelected: false
    };
  }
  componentDidMount(){

    if(this.props.uploadedFile){

      pdfjs.getDocument(this.props.uploadedFile).promise.then((doc)=>{
        this.setState({
          renderDoc: doc
        })
        console.log('Pages : ', doc._pdfInfo.numPages);
        doc.getPage(1).then(page=>{
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
      }).catch((err)=>{
        console.log(err);
      });
    }
  }

  handleZoomAndRotation(zoom, rotate){
    var { renderDoc, scale, currentPage, rotation } = this.state;
    console.log('scale ', scale, ' rotate ', rotation)
    /*
      This function handles both zoom and rotate
      We check if the user wants to zoom or to rotate
    */
    if(zoom){
      // if zoom then zoom in or zoom out
      if(zoom==='in' && scale<=2.6){
        scale+=0.2;
      }
      else if(zoom==='out' && scale>=0.6){
        scale-=0.2;
      }
    }
    if(rotate){
      // if rotate then left or right rotation
      rotation=rotate==='l' ? (rotation-90)%360 : (rotation+90)%360;
    }
    // we set state for future usage
    this.setState({ scale ,rotation});

    console.log('Pages : ', renderDoc._pdfInfo.numPages);
    
    renderDoc.getPage(currentPage).then(page=>{
    var myCanvas = document.getElementById('my-canvas');
    var context = myCanvas.getContext("2d");
    var viewport = page.getViewport({scale, rotation});
    myCanvas.width=viewport.width;
    myCanvas.height = viewport.height;
      
      page.render({
        canvasContext: context,
        viewport: viewport
      });
      
    }).catch((err)=>{
      console.log(err);
    });
  }

  handlePageChange(value){
    this.setState(prevState=> ({ ...prevState, currentPage: value }));
  }

  renderPageNumber(){
    if(this.state.renderDoc){
      
      const pageNumbers = this.state.renderDoc._pdfInfo.numPages;
      const menuItems = Array.from({length: pageNumbers}).map((p, i)=>{
        return(<MenuItem value={i+1} key={i}>Page Number {i+1}</MenuItem>);
      });
      return menuItems;
    }
  }

  render(){
    const { currentPage, drawSelected } = this.state;
    return(
      <React.Fragment>
        <Card>

          <Button variant='text' style={{ position: 'absolute', left: '2vw' }} onClick={this.props.onBackButton}>
            <ArrowBackIcon />
          </Button>

          <Select
              value={currentPage}
              onChange={(e)=> this.handlePageChange(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {this.renderPageNumber()}
            </Select>
            <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
              <Button><SaveIcon />Save</Button>
              <Button onClick={()=>this.handleZoomAndRotation('in')}><ZoomInIcon /></Button>
              <Button onClick={()=>this.handleZoomAndRotation('out')}><ZoomOutIcon /></Button>
              <Button onClick={()=>this.handleZoomAndRotation(undefined, 'l')}><RotateLeftIcon /></Button>
              <Button onClick={()=>this.handleZoomAndRotation(undefined, 'r')}><RotateRightIcon /></Button>
              <Button onClick={()=>this.setState(state=> ({ ...state, drawSelected:!state.drawSelected }))} 
                variant={drawSelected && 'contained'}>
                  <BrushIcon />
              </Button>
            </ButtonGroup>
        </Card>
        <div style={{ marginTop: '1vh' }}>
          {drawingHandler(drawSelected)}
          <canvas id="my-canvas" style={{ cursor: drawSelected? 'crosshair' : 'default' }}></canvas>
          {/* {this.renderCanvas()} */}
        </div>
        </React.Fragment>
        
    );
  }
}

export default WorkerEditor;