import React, { useEffect } from "react";
import { Redirect } from 'react-router-dom';

//Components
import RenderNews from "./RenderNews";

function PageNews() {
  return (
    <div>
      <RenderNews />
    </div>
  );
}

export default PageNews;