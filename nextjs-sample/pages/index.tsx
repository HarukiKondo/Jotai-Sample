import { atom, useAtom } from 'jotai'

// Create your atoms and derivatives
const textAtom = atom('hello');

const uppercaseAtom = atom(
  (get) => get(textAtom).toUpperCase()
)

/**
 * Use them anywhere in your app
 */
const Input = () => {
  const [text, setText] = useAtom(textAtom)

  //@ts-expect-error Type of 'e' is not defined
  const handleChange = (e) => setText(e.target.value)

  return (
    <input value={text} onChange={handleChange} />
  )
}

/**
 * Upper case component
 * @returns 
 */
const Uppercase = () => {
  const [uppercase] = useAtom(uppercaseAtom)
  return (
    <div>Uppercase: {uppercase}</div>
  )
}

/**
 * Home component
 * @returns 
 */
export default function Home() {
  return (
    <>
      <Input />
      <Uppercase />
    </>
  );
}
