import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import AnnouncementIcon from '@material-ui/icons/Announcement';

//Redux
import { connect } from 'react-redux';
import updatePanelContent from '../../../actions/panel/updatePanelContent';

function NoticiasChangeContent({updatePanelContent}) {
  return (
    <Tooltip title="Noticias" arrow>
      <IconButton onClick={()=>{updatePanelContent("news")}}>
        <AnnouncementIcon />
      </IconButton>
    </Tooltip>
  );
}

const mapDispatchToProps = {
  updatePanelContent,
}

export default connect(null,mapDispatchToProps)(NoticiasChangeContent);