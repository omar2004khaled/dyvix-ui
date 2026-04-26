import React from 'react';
import './dependencies/style/style.css';
import { EvaluateFailure, GaurdStatus } from '../../utils/DyvixGuard';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Version from '../../../package.json';

function DyvixFile({ label = 'Upload File', multiple=false, onUpload }) {
  const [file, Setfile] = React.useState(null);
  function handleFileChange(e) {
    const files = e.target.files;
    if(files && files[0])
    {
      let displayName;
      if(files.length === 1)
      {
        const [name, extension] = files[0].name.split('.');
        
      const maxLength = 16;
      const wordLimit = maxLength - (extension.length + 1)
      if(name.length > wordLimit) {
        displayName = name.substring(0, wordLimit - 3) + "..." + "." + extension;
      }else {
        displayName = name + '.' + extension;
      }
      }
      else
      {
        displayName = files.length + " files selected.";
      }

      Setfile(displayName);

      if(typeof onUpload === 'function')
      {
        onUpload(files.length == 1 ? files[0]: files);
      }
    }
  }


  return (
    <div className="dyvix-file-wrapper">
      <label className="dyvix-file" htmlFor="file-upload">
        <div className="dyvix-file-ui">
          <span className="dyvix-file-icon">📁</span>
          <p>{file !== null ? file :label}</p>
        </div>
        <input type="file" className="dyvix-file-hidden" id="file-upload" onChange={(e)=> handleFileChange(e)} {... multiple && {multiple}} />
      </label>
    </div>
  );
}

export default DyvixFile;
