import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './app/assets/i18n';
import i18n from './app/assets/i18n';
import { I18nextProvider } from 'react-i18next';

import './style.scss';
import './font.scss';
import './colors.scss';

import Header from './app/components/header/header';
import Footer from './app/components/footer/footer';

import Home from './app/pages/home/home';
import Missions from './app/pages/missions/missions';
import Mode_robot from './app/pages/mode-robot/mode-robot';
import Options from './app/pages/options/options';
import Gestion from './app/pages/gestion/gestion';

import MissionsAll from './app/pages/missions/missionsAll';
import MissionsFav from './app/pages/missions/missionsFav';
import MissionsSearch from './app/pages/missions/missionsSearch'
import MisssionsCont from './app/pages/missions/missionsCont'

import Mode_robot_followMe from './app/pages/mode-robot/mode/follow-me';
import Mode_robot_teleop from './app/pages/mode-robot/mode/teleop-move';
import Mode_robot_teleop_upper from './app/pages/mode-robot/mode/teleop-upper';
import Mode_robot_manuel from './app/pages/mode-robot/mode/manuel';

import ProtectedRoute from './app/components/ProtecteRoute/ProtecteRoute';
import Options_lock from './app/pages/options/options-lock';
import Options_lock_langue from './app/pages/options/options-lock-langue';
import Options_lock_affichage from './app/pages/options/options-lock-affichage';
import Options_lock_password from './app/pages/options/options-lock-password';


import Error from './app/components/error/error'

import Test from './app/pages/test/test'
import App from './app/App';

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
    <App/>
    <Router>
      <Header/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/test' element={<Test />} />
          <Route path='/missions' element={<Missions />} />
          <Route path='/missions/all' element={<MissionsAll />} />
          <Route path='/missions/favorite' element={<MissionsFav />} />
          <Route path='/missions/search' element={<MissionsSearch />} />
          <Route path='/missions/:id' element={<MisssionsCont />} />
          <Route path='/mode_robot' element={<Mode_robot />} />
          <Route path='/mode_robot/follow-me' element={<Mode_robot_followMe />} />
          <Route path='/mode_robot/teleop-move' element={<Mode_robot_teleop />} />
          <Route path='/mode_robot/teleop-upper' element={<Mode_robot_teleop_upper />} />
          <Route path='/mode_robot/manuel' element={<Mode_robot_manuel />} />
          <Route path='/options' element={<Options />} />
          <Route path="/options/lock" element={ <ProtectedRoute> <Options_lock /> </ProtectedRoute> } />
          <Route path='/options/lock/langue' element={<Options_lock_langue />} />
          <Route path='/options/lock/affichage' element={<Options_lock_affichage />} />
          <Route path='/options/lock/password' element={<Options_lock_password />} />
          <Route path='/gestion' element={<Gestion />} />
          <Route path="*" element={<Error />} />
        </Routes>
      <Footer/>
    </Router>
    </I18nextProvider>
  </React.StrictMode>
);
