import React, { useCallback } from 'react';

import { useRouteMatch } from 'react-router-dom';

import { 
	useScrollTrigger, 
	Slide, 
	Zoom,
	Fab,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

// Components
import HeaderNoAuth from './Header/HeaderNoAuth';
import HeaderAuth from './Header/HeaderAuth';

// Redux
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export function HiddeOnScroll(props) {
	const { children } = props;

	const trigger = useScrollTrigger();

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
}

function ScrollTop(props) {
  const { children } = props;
	
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 800,
  });
	
	const classes = useStyles();

  const handleClick = useCallback((event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

function Header() {
	const { auth } = useSelector((state) => ({
		auth: state.userData.auth,
	}));

	const match1 = useRouteMatch({
		path: '/entrar',
		exact: true,
	});

	const match2 = useRouteMatch({
		path: '/recuperar',
		exact: true,
	});
	
	const match3 = useRouteMatch({
		path: '/solicitud',
		exact: true,
	});
	
	const match4 = useRouteMatch({
		path: '/gedure/monedero/verificar-pago',
		exact: true,
	});

	return (
		<React.Fragment>
			{(!auth && (!match1 && !match2 && !match3)) && <HeaderNoAuth />}
			{(auth && !match4) && <HeaderAuth />}
			<ScrollTop>
				<Fab color="secondary" size="small">
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
		</React.Fragment>
	);
}

export default Header;