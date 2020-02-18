import React from 'react';

//Componentes
import ReloginVerify from '../../components/ReloginVerify';
import HeaderMenu from '../../components/HeaderMenu';
import DrawerMenu from './DrawerMenu';
import RenderContent from './RenderContent';

export default function RenderPanel() {
	return (
		<ReloginVerify>
			<div className="BoxPagePanel">
				<HeaderMenu />
				<DrawerMenu />
				<RenderContent />
			</div>
		</ReloginVerify>
	);
}