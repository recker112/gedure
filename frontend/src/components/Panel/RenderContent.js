import React, {useEffect} from 'react';

//Componentes
import { ContentController } from './RenderPanel';
import { ContentHome } from './components/contentChange/ContentHome';
import { ContentRegistros } from './components/contentChange/ContentRegistros';

export function RenderContent() {
  return (
    <main>
      <Fix2 />
    </main>
  );
}

function Fix2(){
  return (
    <ContentController.Consumer>
      {(contentData) => {
        return <Fix options={contentData}/>
      }}
    </ContentController.Consumer>
  )
}

function Fix(props){
  const { content } = props.options;
  
  useEffect(()=>{
    console.log(content + " REvisa RenderContent para organizar los contenidos");
  })

  if (content === "home") {
    return (<ContentHome/>);
  }
  else if (content === "news") {
    return (<h1>News</h1>);
  }
  else if (content === "registros") {
    return (<ContentRegistros/>);
  }
  else {
    return (<h1>Error</h1>);
  }
}