import React, { useState } from 'react';
import {
  Routes, Route,
} from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import Button from './components/Button/Button';
import FrameItem from './components/FrameItem';

function App() {

  const [activeLink, setActiveLink] = useState(null as null | number)

  const links = [
    {
      title: 'Информация о функциональном состоянии ОЭС АСПОС ОКП и ОКН',
      path: 'https://omcc.ru/',
      url: 'functional-state'
    },
    {
      title: 'Информация о результатах выполнения плана применения ОЭС АСПОС ОКП, ОКН и привлекаемых ОЭС',
      path: '#',
      url: 'implementation-plan-results'
    },
    {
      title: 'Информация о результатах обработки измерительной информации по КО в АЦУК-М',
      path: '#',
      url: 'measurement-information-processing'
    },
    {
      title: 'Информация о вычислительных процессах и загрузки вычислительных средств',
      path: '#',
      url: 'computing'
    },
    {
      title: 'Информация о взаимодействие АЦУК-М с ГИАЦ-М, ОЭС АСПОС ОКП, ОКН и привлекаемыми ОЭС',
      path: '#',
      url: 'interaction'
    }
  ]

  return (
    <div className="App">
      <Header />
      <div className="main__body">
        <div className='menu'>
          <h1 className='title'>Программа отображения</h1>
          {
            links.map((link, i) => {
              const handleActiveLink = () => { setActiveLink(i) }
              return <Button key={i} {...link} isActive={i === activeLink} setActiveLink={handleActiveLink} />
            })
          }
        </div>
        <Routes>
          {links.map(link => <Route path={link.url} element={<FrameItem path={link.path} title={link.title} />} />)}
        </Routes>
      </div>
    </div>
  );
}

export default App;
