import React from 'react';

// Router
import { useLocation, Link } from 'react-router-dom';

// MUI
import { Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';

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
  console.log(location.pathname);

  return (
    <LinkTabs
      value={location.pathname}
      aria-label="Tabs"
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
    >
      <LinkTab 
        label='General' 
        value={'/gedure/config'}
        data-tour='general'
        {...a11yProps(0)}
      />
      <LinkTab 
        label='Cursos' 
        value={'/gedure/config/cursos'}
        data-tour='cursos'
        {...a11yProps(1)}
      />
      <LinkTab 
        label='Pagos' 
        value={'/gedure/config/pagos'}
        data-tour='pagos'
        {...a11yProps(1)}
      />
      <LinkTab
        label='Usuarios desactivados' 
        value={'/gedure/config/usuarios-desactivados'}
        data-tour='usuarios'
        {...a11yProps(2)}
      />
    </LinkTabs>
  )
}
