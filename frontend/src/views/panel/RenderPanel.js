import React from 'react'
import HeaderPanel from './HeaderPanel'
import DrawerMenu from './DrawerMenu';
import RenderContent from './RenderContent';
import AlertsState from '../../components/AlertsState';

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