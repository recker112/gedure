//React
import React, { useEffect } from 'react';

//Componentes
import {Noticia} from './Noticia';

//Redux
import { connect } from 'react-redux';
import { updateNewsNoticias } from '../../store/action/updateNews';

export function ListNoticias({list, updateNewsNoticias}) {
  useEffect(() => {
    const time =  setTimeout(() => {
      updateNewsNoticias();
    }, 10000);
    
    //Al desmontar
    return ()=> {
      clearTimeout(time);
    }
  }, [updateNewsNoticias, list])
  
  return (
  <article className="BoxNoticias">
    <Noticia options={list} />
  </article>
  );
}

const mapStateToProps = (state) => ({
  list: state.news.dataN,
})

const mapDispatchToProps = {
  updateNewsNoticias,
}


export default connect(mapStateToProps,mapDispatchToProps)(ListNoticias);