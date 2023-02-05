import * as React from 'react';

// Delete me
export const Thing = () => {
  return <div>FUCK THE FUCK Kkk snozzberries like snozzberries</div>;
};

export default function useToggle(): [true | false, () => void] {
  const [value, setValue] = React.useState(false);

  return [
    value,
    () => {
      setValue((old) => !old);
    },
  ];
}
