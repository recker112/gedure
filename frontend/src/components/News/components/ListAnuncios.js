import React, { useEffect } from 'react';

//Material-UI
import { Paper, Grow } from '@material-ui/core';

//redux
import { connect } from 'react-redux';
import { updateNewsAnuncios } from '../../store/action/updateNews';

//Componentes
import { Anuncio } from './Anuncio';

function ListAnuncios({list, updateNewsAnuncios}) {

  useEffect(() => {
    const time = setTimeout(() => {
      updateNewsAnuncios();
    }, 10000);

    //Al desmontar
    return ()=> {
      clearTimeout(time);
    }
  }, [updateNewsAnuncios])

  return (
  <aside id="test" className="BoxAnuncios">
    <Grow in={true}>
    <Paper variant="outlined">
      <div className="AHead">
        <span>Anuncios</span>
      </div>
    </Paper>
    </Grow>
    <Anuncio option={list} />
  </aside>);
}

const mapStateToProps = (state) => ({
  list: state.news.dataN,
})

const mapDispatchToProps = {
  updateNewsAnuncios,
}

export default connect(mapStateToProps,mapDispatchToProps)(ListAnuncios);