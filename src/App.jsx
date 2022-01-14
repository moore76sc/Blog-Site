
import React from "react";
import { hot } from 'react-hot-loader/root';
import MainContainer from './components/MainContainer'
import "./styles.scss";

class App extends React.Component {
  render() {
    //const { name } = this.props;
    return (
      <div>
        <MainContainer />
      </div>
    );
  }
}

export default hot(App);
