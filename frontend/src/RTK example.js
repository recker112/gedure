import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetch } from './store/slices/contadores';

export default function App() {
  const value = useSelector((state) => state.contadores.value)
  const dispatch = useDispatch();

  return (
    <div>
      {value}
      <button onClick={() => dispatch(fetch())}>Aumentar</button>
    </div>
  );
}
