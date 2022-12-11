import React from 'react';
import {MotiView} from 'moti';

const MotiContainer = ({children, ...props}) => {
  return (
    <MotiView
      from={{opacity: 0, scale: 0.9}}
      animate={{opacity: 1, scale: 1}}
      transition={{
        type: 'timing',
        duration: 400,
      }}
      exit={{
        opacity: 0,
        scale: 0,
      }}
      {...props}>
      {children}
    </MotiView>
  );
};

export default MotiContainer;
