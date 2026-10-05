import { GetButtonReturnTypes } from './utils.types';

// Update the function with the return type
const getButtonStyleProps = (type: 'primary' | 'secondary' | 'tertiary'): GetButtonReturnTypes => {
  switch (type) {
    case 'secondary':
      return { secondary: true };
    case 'tertiary':
      return { tertiary: true };
    default:
      return { primary: true };
  }
};

export default getButtonStyleProps;
