import './dependencies/style/style.css';

function DyvixLabel({ children, className = '', htmlFor, style, ...rest }) {

  className += `dyvix-label${className === '' ? '': ` ${className}`}`;
  const props = {
    className: className,
    ...(htmlFor && {htmlFor: htmlFor}),
    style,
    ...rest
  }

 return (
  <label {...props}>{children}</label>
 )
}

export default DyvixLabel;
