import React from 'react';
import logo from './logo.svg';
import './App.css';
import Step from './Step'
import Step3 from './Step3'
import {
  HashRouter,
  Router,
  Route
} from 'react-router-dom'
import { Button } from 'antd';

const Test = ({ history }) => {
  const jump = () => {
    history.push('/test')
  }
  return (
    <Button type="primary" onClick={jump}>jump</Button>
  )
}

function App() {
  return (
    <HashRouter>
      <div className="App">
        <header className="App-header">
            {/* <Route path='/' exact>
              <Step />
            </Route> */}
            {/* <Route path='/test'>
              <Step3 />
            </Route> */}
            <Route path="/" exact component={Test} />
            <Route path="/test" component={Step3} />
        </header>
      </div>
    </HashRouter>
  );
}

export default App;
