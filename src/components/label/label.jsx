function DyvixLabel({ children, className = '', htmlFor, style, ...props }) {

  className += `dyvix-label${className === '' ? '': ` ${className}`}`;
  const props = {
    className: className,
    ...(htmlFor && {htmlFor: htmlFor}),
    style,
    ...props
  }

 return (
  <label {...props}>{children}</label>
 )
}

export default DyvixLabel;
