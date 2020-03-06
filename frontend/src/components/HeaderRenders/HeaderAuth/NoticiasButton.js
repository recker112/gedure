import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import AnnouncementIcon from '@material-ui/icons/Announcement';

//Redux
import { connect } from 'react-redux';
import updatePanelContent from '../../../actions/panel/updatePanelContent';
import updateIndexDrawer from '../../../actions/panel/updateIndexDrawer';

function NoticiasButton({updatePanelContent, updateIndexDrawer}) {
  return (
    <Tooltip title="Noticias" arrow enterDelay={1000}>
      <IconButton onClick={()=>{
				updatePanelContent("news");
				updateIndexDrawer(null);
			}}>
        <AnnouncementIcon />
      </IconButton>
    </Tooltip>
  );
}

const mapDispatchToProps = {
  updatePanelContent,
	updateIndexDrawer
}

export default connect(null,mapDispatchToProps)(NoticiasButton);