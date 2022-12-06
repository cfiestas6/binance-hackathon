import React from "react";

function BlackBackground() {
    return (
      <div style={{
        backgroundColor: 'black',
        display: 'flex',
        position: 'relative',
      }}>
        <div style={{
          height: 100,
          width: 100,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          <div style={{
            ::before: {
              content: '',
              borderTop: '50px solid transparent',
              borderBottom: '50px solid transparent',
              borderLeft: '50px solid black',
              position: 'absolute',
              top: '-50px',
              left: '0',
            },
            ::after: {
              content: '',
              borderTop: '50px solid transparent',
              borderBottom: '50px solid transparent',
              borderLeft: '50px solid black',
              position: 'absolute',
              top: '-50px',
              right: '0',
            },
          }}>
          </div>
        </div>
      </div>
    );
  }
  
  export default BlackBackground;