import dynamic from 'next/dynamic';
const TableOfContents = dynamic(() => import('./TableOfContents'));
export default TableOfContents;
