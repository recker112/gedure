import React from 'react'
import HeaderPanel from './components/HeaderPanel'
import DrawerMenu from './components/DrawerMenu';
import RenderContent from './RenderContent';
import AlertsState from '../reutilizar/AlertsState';

export default function RenderPanel() {
  return (
    <div className="BoxPagePanel">
      <HeaderPanel />
      <DrawerMenu />
      <RenderContent />
      <AlertsState />
    </div>
  )
}