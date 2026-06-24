import './dependencies/style/style.css';

function DyvixTableBody({ children, className = '', ...rest }) {
  const tableClasses = `dyvix-table-body ${className}`.trim();

  return (
    <tbody className={tableClasses} {...rest}>
      {children}
    </tbody>
  );
}

export default DyvixTableBody;
