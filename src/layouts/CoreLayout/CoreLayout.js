import React, { PropTypes } from 'react';
import '../../styles/core.scss';
import logo from './hs-swirl-logo.svg';
import classes from './CoreLayout.scss';
import github from './GitHub-Mark.png';

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Stateless Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of its props, so we can
// define it with a plain javascript function...
function CoreLayout ({ children }) {
  return (
    <div className={classes.pageWrap}>
      <nav className='blue grey darken-4'>
        <div className='nav-wrapper'>
          <a href='#' className={classes.logo}><img className={classes.shadowfilter} src={logo}
                                                    alt='Hearthstone collection manager'/></a>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            <li><a>To</a></li>
            <li><a>Be</a></li>
            <li><a>Added</a></li>
          </ul>
        </div>
      </nav>

      <div className={classes.viewContainer}>
        {children}
      </div>

      <footer className='page-footer grey darken-4'>
        <div className='footer-copyright'>
          <div className='container'>
            © 2016 Who Cares
            <a className={classes.githubLink + ' grey-text text-lighten-4 right'} href='https://github.com/heartless7/hs-collection-manager' target='_blank'><img
              src={github} alt='Github'/>Github</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

CoreLayout.propTypes = {
  children: PropTypes.element
};

export default CoreLayout;
