//React
import React, { useEffect } from 'react';

//Material-UI
import { Grid } from '@material-ui/core';

//Components
import { RenderInputs } from '../../../RendersGlobal';

//Redux
import { connect } from 'react-redux';
import updateValue from '../../../../actions/updateValue';

function ContentPassword({ data, updateValue, loading }) {
  const { passA, passN, passR, error } = data;
  useEffect(() => {
    const clearAllStateData = () => {
      //CustomInput
      const inputs = [
        {
          target: {
            name: 'passA',
            value: '',
          }
        },
        {
          target: {
            name: 'passN',
            value: '',
          }
        },
        {
          target: {
            name: 'passR',
            value: '',
          }
        }
      ];
      inputs.map((input) => {
        updateValue(input, 'PASSWORD');
        return null;
      });
    };
		
    clearAllStateData();
  }, [loading, updateValue]);

  const handleChange = (e) => {
    updateValue(e, 'PASSWORD');
  };
  
  return (<React.Fragment>
    <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        <RenderInputs data={{ val: passA, name: 'passA', label: 'Contraseña actual' }} accion={handleChange} error={error.passA} size="small" visibleToggle={true} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <RenderInputs data={{ val: passN, name: 'passN', label: 'Nueva contraseña' }} accion={handleChange} error={error.passN} size="small" visibleToggle={true} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <RenderInputs data={{ val: passR, name: 'passR', label: 'Repetir nueva contraseña' }} accion={handleChange} error={error.passR} size="small" visibleToggle={true} />
      </Grid>
    </Grid>
  </React.Fragment>);
}

const mapStateToProps = (state) => ({
  data: state.panelSettings.menuUser.sections.password,
	loading: state.panelSettings.menuUser.loading
})

const mapDispatchToProps = {
  updateValue
}


export default connect(mapStateToProps,mapDispatchToProps)(ContentPassword);