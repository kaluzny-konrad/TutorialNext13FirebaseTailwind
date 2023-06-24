import { IoTrashBin, IoPencil, IoCheckmarkSharp } from "react-icons/io5";

type Props = {
  todo: string;
  editedTodo: string;
  setEditedTodo: React.Dispatch<React.SetStateAction<string>>;
  editedValue: string;
  setEditedValue: React.Dispatch<React.SetStateAction<string>>;
  saveEditedTodo: () => Promise<void>;
  deleteTodo: (todo: string) => Promise<void>;
};

export default function TodoCard({
  todo,
  editedTodo,
  setEditedTodo,
  editedValue,
  setEditedValue,
  saveEditedTodo,
  deleteTodo,
}: Props) {
  return (
    <div className="p-2 relative sm:p-3 border flex items-stretch border-white border-solid">
      <div className="text-xl-flex flex-1">
        {editedTodo === todo ? (
          <>
            <input
              className="border border-solid border-slate-900 p-2 text-slate-900"
              type="text"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
            />
          </>
        ) : (
          <p className="p-2">{todo}</p>
        )}
      </div>
      <div className="flex items-center">
        {editedTodo === todo ? (
          <IoCheckmarkSharp
            className="text-3xl-flex brand-text-hover mx-2"
            onClick={saveEditedTodo}
          />
        ) : (
          <IoPencil
            onClick={() => setEditedTodo(todo)}
            className="text-3xl-flex brand-text-hover mx-2"
          />
        )}

        <IoTrashBin
          onClick={() => deleteTodo(todo)}
          className="text-3xl-flex brand-text-hover mx-2"
        />
      </div>
    </div>
  );
}
