import './app.less';

import React from 'react';
import TestFunc from 'Components/Header';

interface IProps {
  name: string,
  age: number
}

function App(props: IProps) {
  const { name, age } = props;

  return <div className='App'>
    <span>{`Hello! I'm ${name}, ${age} years old 333`}</span>
    <TestFunc />
  </div>
}

export default App;
