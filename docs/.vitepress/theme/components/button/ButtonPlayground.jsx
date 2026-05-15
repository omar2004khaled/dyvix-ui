import { DyvixButton } from 'dyvix-ui';
import Wrapper from '../Wrapper';
import React from 'react';
import { DYVIX_GLOBAL_THEME, DYVIX_GLOBAL_ANIMATION } from 'dyvix-ui';

export default function ButtonPlayground() {
  const [config, setConfig] = React.useState([
    {
      utility: 'theme',
      type: 'select',
      options: DYVIX_GLOBAL_THEME,
      current: DYVIX_GLOBAL_THEME.OCEAN
    },
    {
      utility: 'animation',
      type: 'select',
      options: DYVIX_GLOBAL_ANIMATION,
      current: DYVIX_GLOBAL_ANIMATION.BUBBLE
    },
    {
      utility: 'background',
      type: 'color',
      current: null
    },
    {
      utility: 'color',
      type: 'color',
      current: null
    }
  ]);

  const theme = config.find((e) => e['utility'] === 'theme').current;
  const animation = config.find((e) => e['utility'] === 'animation').current;
  const background = config.find((e) => e['utility'] === 'background').current;
  const color = config.find((e) => e['utility'] === 'color').current;

  const probs = {
    ...(theme && {theme: theme}),
    ...(animation && {animation: animation}),
    ...(background && {background: background}),
    ...(color && {color: color}),

  }
  return (
    <Wrapper componentConfig={config} componentCallback={setConfig}>
      <DyvixButton onClick={() => console.log('clicked')} {...probs}>
        Submit
      </DyvixButton>
    </Wrapper>
  );
}
