import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import FrameItem from './components/FrameItem';
import FuncState from './components/FuncState/FuncState';

// url to all, path to frame
export const links = [
  {
    title: 'Функциональное состояние ОЭС',
    path: 'functional-state',
    url: 'https://omcc.ru/'
  },
  {
    title: 'Результаты выполнения плана применения',
    path: 'https://plan.ksoes.ru/?&dark',
    url: 'implementation-plan-results'
  },
  {
    title: 'Результаты обработки измерительной информации по КО',
    path: '#',
    url: 'measurement-information-processing'
  },
  {
    title: 'Вычислительные процессы и загрузка вычислительных средств',
    path: '#',
    url: 'computing'
  },
  {
    title: 'Информационное взаимодействие АЦУК-М',
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
          <Route path={'/test'} element={<FuncState />} />
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
        links.map(link => <Link to={link.url} className={`link`}
          target="_blanck"
          onClick={() => window.open(link.url)}
        >{link.title} </Link>)
      }
    </div>
  </div>
}