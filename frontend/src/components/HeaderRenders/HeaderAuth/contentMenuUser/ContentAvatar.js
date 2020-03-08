//React
import React, { useState } from 'react';

//Material-UI
import { Grid, Avatar } from '@material-ui/core';

//Components
import LoadArchives from '../../../LoadArchives';

//Redux
import { connect } from 'react-redux';
import updateInputValue from '../../../../actions/updateInputValue';


function ContentAvatar({ data, response, updateInputValue, currentAvatar, name }) {
  const { file } = data;
  const [imgPreview, setImgPreview] = useState(currentAvatar);

  return (<React.Fragment>
    <Grid container spacing={2} justify="center">
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <LoadArchives 
          accepted="image/*"
          reset={response} 
          files={file} 
          action={updateInputValue} 
          updatePreview={{ update: setImgPreview, currentAvatar }} 
          multiple={false} 
          maxSizeFile={{ unique: "5MB", multiple: "5MB" }} 
          label={{ unique: 'foto', multiple: 'foto' }} 
          name="file"
          idName="avatarUser"
          type="AVATAR"
        />
      </Grid>
      <Avatar alt="Avatar" style={{
        backgroundColor: '#B46BD6',
        height: '150px',
        width: '150px'
      }} src={imgPreview}>{name.substring(0, 1).toUpperCase()}</Avatar>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <span>Vista Previa</span>
      </Grid>
    </Grid>
  </React.Fragment>);
}

//REDUX
const mapStateToProps = (state) => ({
  data: state.panelSettings.menuUser.sections.avatar,
  currentAvatar: state.userData.avatar,
  name: state.userData.name,
})

const mapDispatchToProps = {
  updateInputValue
}

export default connect(mapStateToProps,mapDispatchToProps)(ContentAvatar);