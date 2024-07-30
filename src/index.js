import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/controller';

import './css/fontstyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './component/scss/common.scss';
import 'swiper/css';

import Mrc from './Mrcmain';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Mrc />
    </Router>
);