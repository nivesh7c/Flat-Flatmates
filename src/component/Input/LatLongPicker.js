

import React, { useState, useEffect, Component } from 'react';
import LocationPicker from 'react-location-picker';

/* Default position */
const defaultPosition = {
  lat: 28.5079669,
  lng: 77.0638486
};


// export default function LatLongMapPicker() {

//   const [state, setState] = useState({
//     address: "Kala Pattar Ascent Trail, Khumjung 56000, Nepal",
//       position: {
//          lat: 0,
//          lng: 0
//       }
//   })

//   function handleLocationChange ({ position, address, places }) {

//     // Set new location
//     console.log(position, address);
//     setState({
//         position: position,
//         address: address
//     });
   
//   }

//     return (
//       <div>
//         <h1>{state?.address}</h1>
//         <div>
//           <LocationPicker
//             containerElement={ <div style={ {height: '100%'} } /> }
//             mapElement={ <div style={ {height: '400px'} } /> }
//             defaultPosition={defaultPosition}
//             onChange={handleLocationChange}
//           />
//         </div>
//       </div>
//     )
//   }

class LatLongMapPicker extends Component {
    constructor (props) {
      super(props);
  
      this.state = {
        address: "Kala Pattar Ascent Trail, Khumjung 56000, Nepal",
        position: {
           lat: props.lat,
           lng: props.long
        }
      };
  
      // Bind
      this.handleLocationChange = this.handleLocationChange.bind(this);
    }
  
    handleLocationChange (data) {
        // console.log("AAAA", data);
      // Set new location
    //   this.setState({ position, address });
    }
  
    render () {
      return (
        <div>
          
            <LocationPicker
              containerElement={ <div style={ {height: '100%'} } /> }
              mapElement={ <div style={ {height: '400px'} } /> }
              defaultPosition={this.state.position}
              zoom={16}
              radius={-1}
            />
        </div>
      )
    }
  }

  export default LatLongMapPicker;


  