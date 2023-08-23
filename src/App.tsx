import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Button from './components/Button/Button';

function App() {

  const links = [
    {
      title: 'Информация о функциональном состоянии ОЭС АСПОС ОКП и ОКН',
      url: '#'
    },
    {
      title: 'Информация о результатах выполнения плана применения ОЭС АСПОС ОКП, ОКН и привлекаемых ОЭС',
      url: '#'
    },
    {
      title: 'Информация о результатах обработки измерительной информации по КО в АЦУК-М',
      url: '#'
    },
    {
      title: 'Информация о вычислительных процессах и загрузки вычислительных средств',
      url: '#'
    },
    {
      title: 'Информация о взаимодействие АЦУК-М с ГИАЦ-М, ОЭС АСПОС ОКП, ОКН и привлекаемыми ОЭС',
      url: '#'
    }
  ]

  return (
    <div className="App">
      <Header />
      <div className="main__body">
        <h1 className='title'>Программа отображения</h1>
        <div className='buttons'>
          {
            links.map((link, i) => <Button key={i} {...link} />)
          }
        </div>
      </div>
    </div>
  );
}

export default App;
