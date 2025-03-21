import type { FormEvent } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { animated, useTransition } from '@react-spring/web'
import { Radio } from 'antd'
import { Provider, atom, useAtom, useSetAtom } from 'jotai'
import type { PrimitiveAtom } from 'jotai'

type Todo = {
  title: string
  completed: boolean
}

type RemoveFn = (item: PrimitiveAtom<Todo>) => void

type TodoItemProps = {
  atom: PrimitiveAtom<Todo>
  remove: RemoveFn
}

type FilteredType = {
  remove: RemoveFn
}

// Atomを宣言
const filterAtom = atom('all')
const todosAtom = atom<PrimitiveAtom<Todo>[]>([])
const filteredAtom = atom<PrimitiveAtom<Todo>[]>((get) => {
  // filterAtomとtodosAtomの値を取得
  const filter = get(filterAtom)
  const todos = get(todosAtom)

  if (filter === 'all') return todos
  // filterがcompletedの場合、completedがtrueのものを返す
  else if (filter === 'completed')
    return todos.filter((atom) => get(atom).completed)
  else return todos.filter((atom) => !get(atom).completed)
})

/**
 * TodoItem component
 */
const TodoItem = ({ atom, remove }: TodoItemProps) => {
  const [item, setItem] = useAtom(atom)

  /**
   * トグルを変更した時に呼び出すメソッド
   * @returns 
   */
  const toggleCompleted = () =>
    setItem((props) => ({ ...props, completed: !props.completed }))

  return (
    <>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={toggleCompleted}
      />
      <span style={{ textDecoration: item.completed ? 'line-through' : '' }}>
        {item.title}
      </span>
      <CloseOutlined onClick={() => remove(atom)} />
    </>
  )
}

/**
 * Filter Component
 */
const Filter = () => {
  const [filter, set] = useAtom(filterAtom)
  return (
    <Radio.Group onChange={(e) => set(e.target.value)} value={filter}>
      <Radio value="all">All</Radio>
      <Radio value="completed">Completed</Radio>
      <Radio value="incompleted">Incompleted</Radio>
    </Radio.Group>
  )
}

/**
 * Filtered Component
 */
const Filtered = (props: FilteredType) => {
  // フィルタリングされたTodoリストを取得
  const [todos] = useAtom(filteredAtom)

  const transitions = useTransition(todos, {
    keys: (todo) => todo.toString(),
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: 40 },
    leave: { opacity: 0, height: 0 },
  })

  return transitions((style, atom) => (
    //@ts-expect-error test
    <animated.div className="item" style={style}>
      <TodoItem atom={atom} {...props} />
    </animated.div>
  ))
}

/**
 * TodoList Component
 */
const TodoList = () => {
  // const [, setTodos] = useAtom(todosAtom)
  const setTodos = useSetAtom(todosAtom)

  // 取り除く
  const remove: RemoveFn = (todo) =>
    setTodos((prev) => prev.filter((item) => item !== todo))

  // 追加する
  const add = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const title = e.currentTarget.inputTitle.value
    e.currentTarget.inputTitle.value = ''
    setTodos((prev) => [...prev, atom<Todo>({ title, completed: false })])
  }

  return (
    <form onSubmit={add}>
      <Filter />
      <input name="inputTitle" placeholder="Type ..." />
      <Filtered remove={remove} />
    </form>
  )
}

/**
 * App Component
 * @returns 
 */
function App() {
  return (
    <Provider>
      <h1>Jōtai</h1>
      <TodoList />
    </Provider>
  )
}

export default App
