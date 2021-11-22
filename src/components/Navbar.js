import React from 'react'
import PropTypes from 'prop-types';
//import { Link, useHistory, useLocation} from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = (props) => {

    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
         <Link className="navbar-brand" to="/">{props.title}</Link>
         {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
             <span className="navbar-toggler-icon"></span>
         </button> */}

         <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <Link className="active" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
          
             <li className="nav-item px-3">
                 <Link to="/about">{props.aboutText}</Link>
             </li>
             </ul>  
         </div>
        </nav>            
     </div>
    )
}

Navbar.propTypes = {
    title : PropTypes.string.isRequired, //pts
    aboutText : PropTypes.string.isRequired
}

Navbar.defaultProps = {
    title : "Set title here",
    aboutText : "Set aboutText here"
}

export default Navbar
