import React from 'react';
import Image from 'grommet/components/Image';

let styleSheet = document.styleSheets[0];
let keyframes =
    `@keyframes pulse {
      0% { box-shadow: 0 0 0 3px #ffd602 }
      50% { box-shadow: 0 0 0 9px #ffd602 }
      100% { box-shadow: 0 0 0 3px #ffd602 }
    }`;

    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

    let style = {
      animation: 'pulse 2s infinite ease-in-out',
      width: '16px',
      height: '16px',
      background: '#ffd602',
      position: 'absolute',
      borderRadius: '50%',
      top: '34px',
      left: '-4px'
    }

const UserImage = ({ url, handRaised, isFirst, clickHandler}) => {
  isFirst = true
  return (
    <div style={{position: 'relative'}}>
      <img 
        src={url || "https://ca.slack-edge.com/T2SUXDE72-U8SAGQ1E0-8fa5cea28518-72"} 
        style={{height: '50px', width: '50px', borderRadius: '50%'}}
        onClick={clickHandler}
      />
      { handRaised &&
      <div 
      style={
        isFirst ? style :
        {
          width: '16px',
          height: '16px',
          background: '#ffd602',
          position: 'absolute',
          borderRadius: '50%',
          top: '34px',
          left: '-4px'
        }}
      >
      </div> }
    </div>
  )
}
 
export default UserImage;