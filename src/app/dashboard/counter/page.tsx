import { CarCounter } from "@/shopping-cart";

export const metadata = {
  title: 'Counter',
  description: 'Counter page to increment and decrement a value',
}

export default function CounterPage() {
  return (
  <div className="flex flex-col items-center justify-center w-full h-full">
      <span>Productos en el carrito</span>
      <CarCounter value={20}/>
  </div>
  );
}
