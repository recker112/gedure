import React from 'react';

//Componentes
import ReloginVerify from '../../components/ReloginVerify';
import DrawerMenu from './DrawerMenu';
import RenderContent from './RenderContent';
import ShowInfoContent from '../../components/ShowInfoContent';

export default function RenderPanel() {
	return (
		<ReloginVerify>
			<div className="BoxPagePanel">
				<DrawerMenu />
				<RenderContent />
				<ShowInfoContent />
			</div>
		</ReloginVerify>
	);
}