// this is the file where the (owner/streamer) can start the raffle + see how many people are participaiting + more possible features

import React from 'react';

class OwnerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Initialize any state variables here
    };
  }

  startProcess = () => {
    // Add code to start the process here (start the ruffle)
  }

  render() {
    return (
      <div className="owner-page">
        <h1>Raffle Page</h1>
        <button onClick={this.startProcess}>Start Process</button>
      </div>
    );
  }
}

export default OwnerPage;
