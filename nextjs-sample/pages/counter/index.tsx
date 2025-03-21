import { atom, useAtom } from 'jotai'

// 初期値
const counter = atom(0);

/**
 * Counter component
 */
const Counter = () => {
  const [count, setCounter] = useAtom(counter);
  // クリックした時の挙動
  const onClick = () => setCounter(prev => prev + 1);
  
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={onClick}>Click</button>
    </div>
  )
};

/**
 * Page component
 * @returns 
 */
export default function Page() {
  return <Counter />;
}
