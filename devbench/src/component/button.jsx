import { DyvixButton } from 'dyvix-ui';

export function ButtonTest() {
  return (
    <>
    <DyvixButton onClick={() => console.log('clicked')} animation={'bubble'} theme={"Singularity"}>
      Submit
    </DyvixButton>
      <DyvixButton onClick={() => console.log('clicked')} animation={'bubble'} theme={"Industrial"}>
      Submit
    </DyvixButton>
    </>
  );
}
