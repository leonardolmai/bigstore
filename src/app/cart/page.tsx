
'use-client'
import { LocalStorageData } from '@/components/organisms/cart';

import React, { useEffect } from 'react';


export default function CartPage() {
  return (
    <div>
      <h1>Página do Carrinho</h1>
      <LocalStorageData />
    </div>
  );
}
