
import React from 'react';
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';

const DicebearAvatar = () => {
  const avatar = createAvatar(lorelei, {
    seed: 'John Doe',
    // ... other options
  });

  // const svg = avatar.toString();
  return(
  // <div dangerouslySetInnerHTML={{ __html: svg }} />
    <div></div>
  )

};

export default DicebearAvatar;
