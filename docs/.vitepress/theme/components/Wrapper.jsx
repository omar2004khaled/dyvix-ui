import React from "react";
import './style.css'
import ButtonPlayground from "./button/ButtonPlayground";

export default function Wrapper({children, componentConfig, componentCallback}) {
  

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
                onChange={(e) => componentCallback((prev) => prev.map((item) => item.utility === ele.utility ? {...item, current: e.target.value}: item))}
              >
                {Object.entries(ele.options).map(([key, value]) => (
                  <option key={key} value={value}>
                    {key}
                  </option>
                ))}
              </select>
            );
          }
          return null;
        })}
      </div>
      
      <div className="dyvix-render-zone">
        {React.cloneElement(children, {
          ...componentConfig.reduce((acc, curr) => ({
            ...acc, [curr.utility]: curr.current
          }), {})
        })}
      </div>
    </div>
  </>
);
}