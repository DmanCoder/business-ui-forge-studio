'use client';

import React, { cloneElement, ReactElement } from 'react';
import { useContentfulInspectorMode } from '@contentful/live-preview/react';

interface InspectorWrapperProps {
  entryId: string;
  fieldId: string;
  children: ReactElement<Record<string, unknown>>; // Expecting a single React element as a child
}

const InspectorWrapper: React.FC<InspectorWrapperProps> = ({ entryId, fieldId, children }) => {
  const inspectorProps = useContentfulInspectorMode({ entryId });

  // Clone the child element and inject inspectorProps
  return cloneElement(children, {
    ...children.props,
    ...inspectorProps({ fieldId }),
  });
};

export default InspectorWrapper;
