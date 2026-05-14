import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Version from '../../../package.json';
import './dependencies/style/style.css'
import React from 'react';

function DyvixInput({
  type,
  background,
  animation = '!/',
  className = '',
  color
}) {

  const inputRef = React.useRef(null);

  return (
    <div className='dyvix-input-wrapper' ref={inputRef}>
      <input className='dyvix-input' type='text'></input>
    </div>
  )
}

export default DyvixInput