import dynamic from 'next/dynamic';
const Recaptcha = dynamic(() => import('./Recaptcha'));
export default Recaptcha;
