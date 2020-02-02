import React from 'react';
import { ContentController } from './RenderPanel';
import { ContentHome } from './components/contentChange/ContentHome';

export function RenderContent() {
  return (
    <main>
      <ContentController.Consumer>
        {(contentData) => {
          const { content } = contentData;
          console.log(content + " REvisa RenderContent para organizar los contenidos");
          if (content === "home") {
            return (<ContentHome/>);
          }
          else if (content === "news") {
            return (<h1>News</h1>);
          }
          else if (content === "registros") {
            return (<h1>Registros</h1>);
          }
          else {
            return (<h1>Error</h1>);
          }
        }}
      </ContentController.Consumer>
    </main>
  );
}