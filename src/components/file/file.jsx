import React from 'react';
import './dependencies/style/style.css';
import { EvaluateFailure, GuardStatus } from '../../utils/DyvixGuard';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Version from '../../../package.json';
import { Validatefile } from './validation';

/**
 * @param {Object} props
 * @param {string} [props.label] - Label text displayed on the file picker, defaults to 'Upload File'
 * @param {string} [props.animation] - Animation name
 * @param {string} [props.className] - Label className
 * @param {('Singularity'|'Industrial'|'Ember'|'Frost'|'Blade'|'Neon'|'Aurora'|'Sunset'|'Crimson'|'Midnight')} [props.theme] - File theme
 * @param {string} [props.background] - Label background color
 * @param {string} [props.color] - Label text color
 * @param {boolean} [props.multiple] - Allow multiple file selection, defaults to false
 * @param {string} [props.accept] - Accepted file types, defaults to '*\/*'
 * @param {function} [props.onUpload] - Callback fired with the uploaded File or FileList
 * @param {Object} [props.style] - Inline styles overrides
 */
function DyvixFile({
  label = 'Upload File',
  animation = '!/',
  className = '',
  theme = '!/',
  background,
  color,
  multiple = false,
  accept = '*/*',
  onUpload,
  style,
  ...rest
}) {
  const [file, Setfile] = React.useState(null);
  const fileRef = React.useRef(null);
  const fileInputRef = React.useRef(null);
  const [configs, SetConfig] = React.useState({});
  const instanceId = React.useId();

  function handleFileChange(e) {
    const files = e.target.files;
    if (files && files[0]) {
      let displayName;
      if (files.length === 1) {
        const [name, extension] = files[0].name.split('.');

        const maxLength = 16;
        const wordLimit = maxLength - (extension.length + 1);
        if (name.length > wordLimit) {
          displayName =
            name.substring(0, wordLimit - 3) + '...' + '.' + extension;
        } else {
          displayName = name + '.' + extension;
        }
      } else {
        displayName = files.length + ' files selected.';
      }

      Setfile(displayName);

      if (typeof onUpload === 'function') {
        onUpload(files.length == 1 ? files[0] : files);
      }
    }
  }

  function handleUiClick(e) {
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const currentTheme = configs['theme'];
  const currentAnimation = animation ? configs['animation'] : null;
  React.useEffect(() => {
    async function validate() {
      const validator = await Validatefile(
        animation,
        theme,
        SetConfig,
        instanceId
      );

      if (validator.status === GuardStatus.Error) {
        return EvaluateFailure(validator.error, validator.status);
      }
    }

    validate();
    return () => {
      const key = `DYVIX_${Version['version']}_File_theme_${instanceId}`;
      const ele = document.getElementById(key);
      if (ele) ele.remove();
    };
  }, [animation, theme]);

  useGSAP(() => {
    if (!fileRef.current || !currentAnimation) return;

    gsap.fromTo(fileRef.current, currentAnimation.from, {
      ...currentAnimation.to,
      duration: currentAnimation['default-duration'],
      ease: currentAnimation.ease
    });
  }, [currentAnimation]);
  className = `dyvix-file${currentTheme ? ` ${currentTheme.class}` : ''}${className !== '' ? ` ${className}` : ''}`;
  const props = {
    className: className,
    style: {
      ...(background && { background: background }),
      ...style
    }
  };
  return (
    <div className="dyvix-file-wrapper" ref={fileRef} {...rest}>
      <label {...props} htmlFor="file-upload">
        <div className="dyvix-file-ui" onClick={handleUiClick}>
          <span className="dyvix-file-icon">📁</span>
          <p style={{ color: color }}>{file !== null ? file : label}</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="dyvix-file-hidden"
          id={`file-upload-${instanceId}`}
          accept={accept}
          onChange={(e) => handleFileChange(e)}
          {...(multiple && { multiple })}
        />
      </label>
    </div>
  );
}

export default DyvixFile;
