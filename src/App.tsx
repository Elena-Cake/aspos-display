import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import FrameItem from './components/FrameItem';

// url to all, path to frame
export const links = [
  {
    title: 'Информация о функциональном состоянии ОЭС АСПОС ОКП и ОКН',
    path: '#',
    url: 'https://omcc.ru/'
  },
  {
    title: 'Информация о результатах выполнения плана применения ОЭС АСПОС ОКП, ОКН и привлекаемых ОЭС',
    path: 'https://plan.ksoes.ru/?&dark',
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
    path: '#s',
    url: 'interaction'
  }
]
type linksType = typeof links

function App() {

  return (
    <div className="App">
      <Header />
      <div className="main">
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path={links[1].url} element={<FrameItem title={links[1].title} path={links[1].path} />} />
          <Route path='*' element={<>Такой страницы не существует</>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

const Main: React.FC<{}> = () => {

  return <div className="menu">
    <div className='buttons'>
      {
        links.map(link => <Link to={link.url} className={`link`} target="_blanck">{link.title} </Link>)
      }
    </div>
  </div>
}