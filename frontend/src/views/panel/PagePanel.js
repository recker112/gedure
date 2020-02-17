import React from 'react';

//Componentes
import ReloginVerify from '../../components/ReloginVerify';
import HeaderMenu from '../../components/HeaderMenu';
import DrawerMenu from './DrawerMenu';
import RenderContent from './RenderContent';
import AlertsState from '../../components/AlertsState';

export default function RenderPanel() {
	return (
		<ReloginVerify>
			<div className="BoxPagePanel">
				<HeaderMenu />
				<DrawerMenu />
				<RenderContent />
				<AlertsState />
			</div>
		</ReloginVerify>
	);
}