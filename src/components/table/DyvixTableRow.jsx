import './dependencies/style/style.css';

function DyvixTableRow({ children, className = '', ...rest }) {
  const tableClasses = `dyvix-table-row ${className}`.trim();

  return (
    <tr className={tableClasses} {...rest}>
      {children}
    </tr>
  );
}

export default DyvixTableRow;
