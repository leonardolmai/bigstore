
'use-client'
import { LocalStorageData } from '@/components/organisms/cart';

import React, { useEffect } from 'react';


export default function CartPage() {
  return (
    <div>
      <LocalStorageData />
    </div>
  );
}
