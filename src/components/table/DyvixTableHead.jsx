import './dependencies/style/style.css';

function DyvixTableHead({ children, className = '', ...rest }) {
  const tableClasses = `dyvix-table-head ${className}`.trim();

  return (
    <th className={tableClasses} {...rest}>
      {children}
    </th>
  );
}

export default DyvixTableHead;
