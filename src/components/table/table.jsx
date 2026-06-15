import React from 'react';
import './dependencies/style/style.css';
import DyvixTableHeader from './DyvixTableHeader';
import DyvixTableHead from './DyvixTableHead';
import DyvixTableRow from './DyvixTableRow';
import DyvixTableBody from './DyvixTableBody';
import DyvixTableCell from './DyvixTableCell';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ValidateTable } from './validation';
import { GuardStatus } from '../../utils/DyvixGuard';

function DyvixTable({
  children,
  className = '',
  animation = 'fade',
  columns,
  data
}) {
  const tableClasses = `dyvix-table ${className}`.trim();
  const instanceId = React.useId();
  const [configs, SetConfig] = React.useState({});
  const tableRef = React.useRef();
  const props = {
    className: tableClasses
  };

  const currentAnimation = animation ? configs['animation'] : null;

  const ConstructTable = () => {
    const bodyRows = data.map((row) => columns.map((col) => row[col.key]));
    return (
      <>
        <DyvixTableHeader>
          <DyvixTableRow>
            {columns.map((col, i) => {
              return (
                <DyvixTableHead key={col.key || i}>
                  {typeof col === 'string' ? col : col.label}
                </DyvixTableHead>
              );
            })}
          </DyvixTableRow>
        </DyvixTableHeader>
        <DyvixTableBody>
          {bodyRows.map((row, i) => {
            return (
              <DyvixTableRow key={i}>
                {row.map((col, j) => (
                  <DyvixTableCell key={`${i}-${j}`}>{col}</DyvixTableCell>
                ))}
              </DyvixTableRow>
            );
          })}
        </DyvixTableBody>
      </>
    );
  };

  const resultJSX = React.useMemo(
    () => (columns ? ConstructTable() : null),
    [columns]
  );
  children = children ? children : resultJSX;

  React.useEffect(() => {
    async function validate() {
      const validator = await ValidateTable(
        animation,
        '',
        SetConfig,
        instanceId
      );

      if (validator.status === GuardStatus.Error) {
        return EvaluateFailure(validator.error, validator.status);
      }
    }

    validate();
  }, [animation]);
  useGSAP(() => {
    if (!tableRef.current || !currentAnimation) return;

    gsap.fromTo(tableRef.current, currentAnimation.from, {
      ...currentAnimation.to,
      duration: currentAnimation['default-duration'],
      ease: currentAnimation.ease
    });
  }, [currentAnimation]);
  return (
    <div className="dyvix-table-wrapper" ref={tableRef}>
      <table {...props}>{children}</table>
    </div>
  );
}

export default DyvixTable;
