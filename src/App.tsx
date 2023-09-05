import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import FrameItem from './components/FrameItem';
import FuncState from './components/FuncState/FuncState';
import InfoProcess from './components/InfoProcess/InfoProcess';
import Chart from './components/Chart.tsx/Chart';
import InfoText from './components/InfoText';
import { INFO_DATA, IS_PAGES_DEPLOY } from './assets/constans';
import ShowObservatory from './Ksoes/ShowObservatory/ShowObservatory';

// url to all, path to frame
export const links = [
  {
    title: 'Функциональное состояние ОЭС',
    path: 'https://omcc.ru/',
    url: IS_PAGES_DEPLOY ? '#/functional-state' : 'functional-state'
  },
  {
    title: 'Результаты выполнения плана применения',
    path: 'https://plan.ksoes.ru/?s',
    url: IS_PAGES_DEPLOY ? '#/implementation-plan-results' : 'implementation-plan-results'
  },
  {
    title: 'Результаты обработки измерительной информации по КО',
    path: '#',
    url: IS_PAGES_DEPLOY ? '#/measurement-information-processing' : 'measurement-information-processing'
  },
  {
    title: 'Вычислительные процессы и загрузка вычислительных средств',
    path: '#',
    url: IS_PAGES_DEPLOY ? '#/computing' : 'computing'
  },
  {
    title: 'Информационное взаимодействие АЦУК-М',
    path: '#',
    url: IS_PAGES_DEPLOY ? '#/interaction' : 'interaction'
  }

]
// type linksType = typeof links

function App() {

  return (
    <div className="App">
      <Header />
      <div className="main">
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path={links[0].url} element={<FuncState />} />
          <Route path={links[1].url} element={<FrameItem title={links[1].title} path={links[1].path} />} />
          <Route path={links[2].url} element={<InfoProcess />} />
          <Route path={links[3].url} element={<Chart />} />
          <Route path={links[4].url} element={<ShowObservatory />} />

          {/* <Route path={'/test'} element={<FuncState />} /> */}
          <Route path='*' element={<InfoText infoData={INFO_DATA.notFound} />} />
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
        links.map((link, i) => <Link key={i} to={'/'} className={`link`}
          onClick={() => window.open(link.url)}
        >{link.title} </Link>)
      }
      {/* !!!!test */}
      {/* <Link to={'/'} className={`link link__test`}
        onClick={() => window.open('/test')}
      >test chart </Link> */}
    </div>
  </div>
}