import React, { useState, useEffect } from 'react';
import { Noticia } from './Noticia';

export function ListNoticias() {
  const [ListNoticias, setListNoticias] = useState([]);

  const test = [{
    id: '2',
    name: 'Henrry',
    title: 'Ayer vi a un ave',
    content: 'Yep, si la vi y no pude ver mas porque se fue. :u',
    imgList: [{title: 'Imagen47'}, 
      {title: 'Imagen47'},
      {title: 'Imagen47'},
      {title: 'Imagen47'},
      {title: 'Imagen47'}
    ],
  },{
    id: '2',
    name: 'Henrry',
    title: 'Ayer vi a un ave',
    content: 'Yep, si la vi y no pude ver mas porque se fue. :u',
    imgList: [{title: 'Imagen47'}, 
      {title: 'Imagen47'},
      {title: 'Imagen47'},
      {title: 'Imagen47'},
      {title: 'Imagen47'}
    ],
  },...ListNoticias];

  const getReq = () => {
    setListNoticias(test);
  }

  useEffect(() => {
    setTimeout(() => {
      setListNoticias(test);
    }, 10000);
  }, [test])
  
  return (
  <article className="BoxNoticias" onClick={getReq}>
    <Noticia options={ListNoticias} />
  </article>
  );
}