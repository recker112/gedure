import React from 'react';

//Componentres
import RenderTableOk from './RenderTableOk';
import RenderTableSearch from './RenderTableSearch';
import RenderTableError from './RenderTableError';

export function TableShow(props) {
  //Destructurar props.
  const {Req, search} = props.options;
  const {query, data} = Req;

  //Verificar si existe query.status
  let error = (query !== undefined && query.status) ? false : true;

  if (!search && !error) {
    return <div><RenderTableOk data={data} /></div>
  }else {
    if (!search){
      return <div><RenderTableError /></div>;
    }else {
      return <div><RenderTableSearch /></div>;
    }
  }
}