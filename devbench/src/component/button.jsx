import { DyvixButton } from 'dyvix-ui';

export function ButtonTest() {
  return (
    <DyvixButton onClick={()=> console.log("clicked")}>
      Submit
    </DyvixButton>
  );
}
