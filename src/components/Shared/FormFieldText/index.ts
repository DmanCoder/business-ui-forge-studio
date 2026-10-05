import dynamic from 'next/dynamic';
const FormFieldText = dynamic(() => import('./FormFieldText'));
export default FormFieldText;
