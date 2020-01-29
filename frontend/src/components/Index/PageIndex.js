import React, { Component } from 'react';
import InfoText from './components/InfoText';
import RotateFondo from './components/RotateFondo';

class PageIndex extends Component {
  render() {
    return(
      <div>
        <RotateFondo />
        <InfoText />
      </div>
    )
  }
}

export default PageIndex;