import React, { useState, useEffect } from 'react';
  
const App = () => {

    const [message, setMessage] = useState('');

    useEffect(() => {
        // Effectuer une requête GET vers le backend
        fetch('http://localhost:5001')
        .then(response => response.text())
        .then(data => setMessage(data));
    }, []);

    
    return (
        <>
            <div className='sherpa-content'>
            </div>
        </>
    )
}
  
export default App;

// import React from "react";
// import RosConnection from "./RosConnection"; 

// const App = () => {

//   return (
//     <>
//       {/* Section pour la connexion ROS2 */}
//       <div>
//         <RosConnection />
//       </div>
//     </>
//   );
// };

// export default App;