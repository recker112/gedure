//React
import React, { useEffect } from 'react';

//Componentes
import {Noticia} from './Noticia';

//Redux
import { connect } from 'react-redux';
import { updateNewsNoticias } from '../../store/action/news/updateNews';

export function ListNoticias({list, updateNewsNoticias}) {
  useEffect(() => {
    const fetchData = async ()=>{
      const res = await fetch('https://my-json-server.typicode.com/recker112/candelariaweb/noticias')
      .then(response => response.json())
      .then(json => json)

      if (res !== 'no_connect'){
      }

      updateNewsNoticias(res);
    }

    let cancel = false;
    if (!cancel) {
      fetchData();
    }
    
    //Al desmontar
    return ()=> {
      cancel=true;
    }
  }, [updateNewsNoticias])
  
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