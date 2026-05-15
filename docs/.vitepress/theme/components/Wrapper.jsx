import React from 'react';
import './style.css';
import ButtonPlayground from './button/ButtonPlayground';
import reactElementToJSXString from 'react-element-to-jsx-string';

export default function Wrapper({
  children,
  componentConfig,
  componentCallback
}) {

  React.useEffect(() => {
    const curr = reactElementToJSXString(children);
    setSnippet(curr);
  }, [componentConfig])
  return (
    <>
      <div className="dyvix-playground-wrapper">
        <div className="dyvix-hud-overlay">
          {componentConfig.map((ele) => {
            if (ele.type === 'select') {
              return (
                <select
                  className="playground-select"
                  key={ele.utility}
                  value={ele.current}
                  onChange={(e) =>
                    componentCallback((prev) =>
                      prev.map((item) =>
                        item.utility === ele.utility
                          ? { ...item, current: e.target.value }
                          : item
                      )
                    )
                  }
                >
                  <option value={null}>None</option>
                  {Object.entries(ele.options).map(([key, value]) => (
                    <option key={key} value={value}>
                      {key}
                    </option>
                  ))}
                </select>
              );
            }
            else if (ele.type = "color")
            {
              return <input type='color' className="playground-color" onChange={(e) => 
                componentCallback((prev) => prev.map((item) => item.utility === ele.utility
                ? {...item, current: e.target.value}
                : item  
              ))
              }></input>
            }
            return null;
          })}
        </div>

        <div className="dyvix-render-zone">
          {React.cloneElement(children, {
            ...componentConfig.reduce(
              (acc, curr) => ({
                ...acc,
                [curr.utility]: curr.current
              }),
              {}
            )
          })}
        </div>
      </div>
    </>
  );
}
