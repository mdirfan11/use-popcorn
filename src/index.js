import React from 'react';
import ReactDOM from 'react-dom/client';
import StarRating from './StarRating';
import './index.css';
import App from './App';

const messages = ["Terrible", "Bad", "Okay", "Good", "Excillent"]
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={10}/>
    <StarRating color={"green"} size={50} messages={messages} defaultRating={3}/> */}
  </React.StrictMode>
);
