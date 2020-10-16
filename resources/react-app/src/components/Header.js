import React, { useCallback } from 'react';

import { useRouteMatch } from 'react-router-dom';

import {
	useScrollTrigger,
	Slide,
	Fab,
	Zoom,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import HeaderNoAuth from './Header/HeaderNoAuth';
import HeaderAuth from './Header/HeaderAuth';

import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
	margin: {
		marginTop: `${theme.spacing(2)}px`
	}
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
	
	const classes = useStyles();
	
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 800,
  });

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

function Header({auth}) {
	const match1 = useRouteMatch({
		path: '/entrar',
		exact: true
	});
	
	const match2 = useRouteMatch({
		path: '/recovery',
		exact: true
	});
	
	return (
		<React.Fragment>
			{(!auth && (!match1 && !match2)) && <HeaderNoAuth />}
			{auth && <HeaderAuth />}
			<ScrollTop>
				<Fab color="secondary" size="small">
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
		</React.Fragment>
	);
}

//REDUX
const mapStateToProps = (state) => ({
	auth: state.userData.auth,
});

export default connect(mapStateToProps, null)(Header);