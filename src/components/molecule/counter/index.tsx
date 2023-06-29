import { CounterProvider } from '@/components/atomic/buttons';

// Exporte o componente Counter envolvido pelo CounterProvider
export function CounterPage() {
  return (
    <CounterProvider>
      <Counter />
    </CounterProvider>
  );
}