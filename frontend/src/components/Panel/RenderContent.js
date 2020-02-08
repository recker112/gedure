import React from 'react';

//Componentes
import { ContentHome } from './components/contentChange/ContentHome';
import { ContentRegistros } from './components/contentChange/ContentRegistros';

//Redux
import { connect } from 'react-redux';

function RenderContent({content}) {
  console.log(content);
  if (content === "home") {
    return (
      <main>
        <ContentHome/>
      </main>
    );
  }else if (content === "news") {
    return (
      <main>
        <h1>News</h1>
      </main>
    );
  }
  else if (content === "registros") {
    return (
      <main>
        <ContentRegistros/>
      </main>
    );
  }
  else {
    return (
      <main>
        <h1>Error</h1>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  content: state.panelSettings.content,
})

export default connect(mapStateToProps)(RenderContent);