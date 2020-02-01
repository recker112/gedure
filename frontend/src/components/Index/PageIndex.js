import React, { useEffect } from 'react';
import HeaderNoPanel from '../reutilizar/HeaderNoPanel';
import LockIcon from '@material-ui/icons/Lock';
import Grow from '@material-ui/core/Grow';
import Zoom from '@material-ui/core/Zoom';
import { Form } from './components/Form';


function PageIndex() {
  useEffect(() => {
    document.title = "La Candelaria - Login";
  }, [])
  return(
    <div className="BoxPageIndex">
      <HeaderNoPanel />
      <Grow in={true}>
        <main>
          <Zoom in={true} timeout={500}>
          <div className="HeadMain">
            <span className="IconBoxIndex">
              <LockIcon style={{ fontSize: 40 }} />
            </span>
            <span className="TitleIndex">La Candelaria</span>
          </div>
          </Zoom>
          <Form />
        </main>
      </Grow>
    </div>
  )
}

export default PageIndex;