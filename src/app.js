import React from 'react';
import ReactDOM from 'react-dom';
import MapView from './mainView/MapView';

class App extends React.Component {
  render() {
    return (
      <div>
        <MapView />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main-app'));
