// import React from "react";
// import { connect } from 'react-redux';
// import { getMovies } from '../../Ducks/adminReducer';
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import IconButton from "@material-ui/core/IconButton";


// const options = [
//   "None",
//   "Atria",
//   "Callisto",
//   "Dione",
//   "Ganymede",
//   "Hangouts Call",
//   "Luna",
//   "Oberon",
//   "Phobos",
//   "Pyxis",
//   "Sedna",
//   "Titania",
//   "Triton",
//   "Umbriel"
// ];

// const ITEM_HEIGHT = 48;

// class LongMenu extends React.Component {
//   state = {
//     anchorEl: null
//   };

//   componentDidMount() {
//     this.props.getMovies();
//   }

//   handleClick = event => {
//     this.setState({ anchorEl: event.currentTarget });
//   };

//   handleClose = () => {
//     this.setState({ anchorEl: null });
//   };

//   render() {
//     const { anchorEl } = this.state;
//     const { movies } = this.props;
//     setTimeout(console.log(this.props && movies.title), 1000);
//     const open = Boolean(anchorEl);
//     // let options = movies;
//     return (
//       <div>
//         <IconButton
//           aria-label="More"
//           aria-owns={open ? "long-menu" : null}
//           aria-haspopup="true"
//           onClick={this.handleClick}
//         >
//           <MoreVertIcon />
//         </IconButton>
//         <Menu
//           id="long-menu"
//           anchorEl={anchorEl}
//           open={open}
//           onClose={this.handleClose}
//           PaperProps={{
//             style: {
//               maxHeight: ITEM_HEIGHT * 4.5,
//               width: 200
//             }
//           }}
//         >
//           {options.map(option => (
//             <MenuItem
//               key={option}
//               selected={option === "Pyxis"}
//               onClick={this.handleClose}
//             >
//               {option}
//             </MenuItem>
//           ))}
//         </Menu>
//       </div>
//     );
//   }
// }

// const mapStateToProps = ({ userReducer, adminReducer }) => ({
//   ...userReducer,
//   ...adminReducer
// });

// export default connect(mapStateToProps, { getMovies })(LongMenu);
