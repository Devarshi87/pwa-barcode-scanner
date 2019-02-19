import React, { lazy, Component, Suspense } from 'react';
import dataHandler from '../dataHandler';

import Camera from 'react-feather/dist/icons/camera';
import ArrowDown from 'react-feather/dist/icons/arrow-down';

import ProductPreview from '../productPreview';

const Video = lazy(() => import('../Video'));

import css from './cameraHandler.css';

class CameraHandler extends Component {

  constructor(...props) {
    super(...props);

    this.state = {
      isCameraSupported: false,
      isCamEnabled: dataHandler.isCameraPermissionGranted(),
      productPreview: null
    };
  }

  onCamEnabled = () => {
    dataHandler.cameraPermissionGranted();
    this.setState({
      isCamEnabled: true
    });
  }

  onProductFound = (product) => {
    console.log('sending new product');
    this.setState({
      productPreview: product
    })
  }

  componentWillMount() {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      this.setState({
        isCameraSupported: true
      });
    }
  }

  render() {
    return (
      <>
        {this.state.isCameraSupported ?
          this.state.isCamEnabled ?
          <>
            <Suspense fallback={<div>Loading...</div>}>
              <Video onProductFound={this.onProductFound}/>
            </Suspense>
            <ProductPreview product={this.state.productPreview} />
          </>
          :
          <div className="cameraHandler__message">Enable your camera with the button below
          <br/>
          <div className="cameraHandler__messageIcon"><ArrowDown size={35}/></div>
          </div>
          :
          <div>Camera is not supported 😢</div>
        }
        {this.state.isCamEnabled ?
          ''
          :
          <button aria-label="Enable Camera" className="btn__round camera__enable" onClick={this.onCamEnabled}>
            <Camera />
          </button>
        }
      </>
    );
  }
}

export default CameraHandler;
