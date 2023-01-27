import React from 'react';

// Router
import { useLocation, Link } from 'react-router-dom';

// MUI
import { Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';

const LinkTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: '#fff',
  },
});

const LinkTab = styled((props) => <Tab component={Link} to={props.value} {...props} />)({
  '&.Mui-selected': {
    color: '#fff',
  },
});

function a11yProps(index) {
	return {
		id: `nav-tab-${index}`,
		'aria-controls': `nav-tabpanel-${index}`,
	};
}

export default function NavTabs() {
  const location = useLocation();

  const { gedure } = useSelector(state => state.auth.permissions);
  const { 
    gc_index,
    cursos_index, 
    users_disabled_index, 
    bank_account_index, 
    bank_transaction_index,
  } = gedure;

  return (
    <LinkTabs
      value={location.pathname}
      aria-label="Tabs"
      sx={{
        position: 'relative',
        zIndex: 10,
      }}
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
    >
      {
        gc_index && (
          <LinkTab 
            label='General' 
            value={'/gedure/config'}
            {...a11yProps(1)}
          />
        )
      }
      {cursos_index && (
        <LinkTab 
          label='Cursos' 
          value={'/gedure/config/cursos'}
          {...a11yProps(0)}
        />
      )}
      {(bank_account_index || bank_transaction_index) && (
        <LinkTab 
          label='Pagos' 
          value={'/gedure/config/pagos'}
          {...a11yProps(1)}
        />
      )}
      {users_disabled_index && (
        <LinkTab
          label='Usuarios' 
          value={'/gedure/config/usuarios'}
          {...a11yProps(2)}
        />
      )}
    </LinkTabs>
  )
}
