import React from 'react';

//Componentes
import { ContentHome } from './contentChange/ContentHome';
import { ContentRegistros } from './contentChange/ContentRegistros';
import ContentConsultarModificar from './contentChange/ContentConsultarModificar';

//Redux
import { connect } from 'react-redux';
import RenderNews from '../news/RenderNews';


function RenderContent({content, privilegio}) {
  if (privilegio === 'A-'){
    return <RenderContentAdmin content={content}/>;
  }else if (privilegio === 'V-'){
    return <h1>USER</h1>;
  }else {
		return <h1>ERROR</h1>
	}
}

function RenderContentAdmin({content}) {
  if (content === "home") {
    return (
      <main>
        <ContentHome/>
      </main>
    );
  }else if (content === "news") {
    return (
      <RenderNews />
    );
  }
  else if (content === "registros") {
    return (
      <main>
        <ContentRegistros/>
      </main>
    );
  }
  else if (content === 'consultar/modificar'){
    return (
      <main>
        <ContentConsultarModificar />
      </main>
    )
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
  privilegio: state.userData.privilegio,
})

export default connect(mapStateToProps)(RenderContent);