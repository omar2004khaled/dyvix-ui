import './dependencies/style/style.css';

function DyvixTableCell({ children, className = '', ...rest }) {
  const tableClasses = `dyvix-table-cell ${className}`.trim();

  return (
    <td className={tableClasses} {...rest}>
      {children}
    </td>
  );
}

export default DyvixTableCell;
