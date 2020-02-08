import React, { useEffect } from 'react';

//Components
import RenderNews from './RenderNews';
import HeaderNoPanel from '../reutilizar/HeaderNoPanel';

function PageNews() {
  useEffect(() => {
    document.title = "La Candelaria - News";
  })
  return (
    <div>
      <HeaderNoPanel />
      <RenderNews />
    </div>
  )
}

export default PageNews;