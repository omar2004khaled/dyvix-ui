import {DyvixButton} from 'dyvix-ui';
import Wrapper from '../Wrapper';
import React from 'react';
import { DYVIX_GLOBAL_THEME, DYVIX_GLOBAL_ANIMATION } from 'dyvix-ui';

export default function ButtonPlayground() {
  const [config, setConfig] = React.useState([
    {utility: "theme", type: "select", options: DYVIX_GLOBAL_THEME, current: DYVIX_GLOBAL_THEME.OCEAN},
    {utility: "animation", type: "select", options: DYVIX_GLOBAL_ANIMATION, current: DYVIX_GLOBAL_ANIMATION.BUBBLE}
  ]);

  const theme = config.find(e => e["utility"] === "theme").current;

  return (
    <Wrapper componentConfig={config} componentCallback={setConfig}>
      <DyvixButton onClick={() => console.log('clicked')} theme={theme}>Submit</DyvixButton>
    </Wrapper>
  );
}
