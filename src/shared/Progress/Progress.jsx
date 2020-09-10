import React from 'react';
import './Progress.css'

const Progress = ({ info }) => {
  return (
    <div className="progress-bar">
      <span className="next">Next level: {info.nextText}</span>
      <progress className="nes-progress is-primary" value={info.current} max={info.max}></progress>
      <span className="min">{info.minText}</span>
      <span className="max">{info.maxText}</span>
    </div>
  );
}

export default Progress;