import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
//引入ui框架的全局样式
import 'antd-mobile/dist/antd-mobile.css'

// const root = ReactDOM.createRoot(document.getElementById('root'));

ReactDOM.render(
    <App />,document.getElementById( 'root' )
);

reportWebVitals();
