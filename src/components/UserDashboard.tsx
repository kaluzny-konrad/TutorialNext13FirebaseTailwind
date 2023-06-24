"use client";

import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import { FaSpinner } from "react-icons/fa";

type Props = {};

export default function UserDashboard({}: Props) {
  const { currentUser } = useAuth();
  const [newTodo, setNewTodo] = useState("");

  const [editedTodo, setEditedTodo] = useState("");
  const [editedValue, setEditedValue] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todoRef = doc(firestore, "users", currentUser!.uid);
        const todoDoc = await getDoc(todoRef);
        if (todoDoc.exists()) {
          setTodos(todoDoc.data().todos);
        }
      } catch (error: any) {
        setError(error);
      }

      setLoading(false);
    };

    setLoading(true);
    setTodos([]);
    getTodos();
  }, [currentUser]);

  async function saveEditedTodo() {
    setError("");
    if (!editedValue) return;
    if (editedTodo !== editedValue && todos.includes(editedValue)) return setError("Todo already exists");
    const userRef = doc(firestore, "users", currentUser!.uid);
    await setDoc(
      userRef,
      {
        todos: todos.map((todo) => (todo === editedTodo ? editedValue : todo)),
      },
      { merge: true }
    );
    setEditedTodo("");
    setEditedValue("");
    setTodos(todos.map((todo) => (todo === editedTodo ? editedValue : todo)));
  }

  useEffect(() => {
    if (editedTodo) {
      setEditedValue(editedTodo);
    }
  }, [editedTodo]);

  async function createNewTodo() {
    setError("");
    if (!newTodo) return;
    if (todos.includes(newTodo)) return setError("Todo already exists");
    setNewTodo("");
    const userRef = doc(firestore, "users", currentUser!.uid);
    await setDoc(userRef, { todos: [...todos, newTodo] }, { merge: true });
    setTodos([...todos, newTodo]);
  }

  async function deleteTodo(todo: string) {
    setError("");
    const userRef = doc(firestore, "users", currentUser!.uid);
    await setDoc(
      userRef,
      {
        todos: todos.filter((t) => t !== todo),
      },
      { merge: true }
    );
    setTodos(todos.filter((t) => t !== todo));
  }

  return (
    <>
      {currentUser && (
        <div className="w-full max-w-[65ch] text-sm-flex mx-auto flex flex-col gap-5-flex p-2">
          <input
            type="text"
            placeholder="Add a new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="border border-solid border-slate-900 p-2 text-slate-900"
          />
          {loading ? (
            <>
              <FaSpinner className="animate-spin text-3xl-flex mx-auto" />
            </>
          ) : (
            <>
              <button
                className="brand-big-border text-uppercase-center opacity-flex py-2"
                onClick={createNewTodo}
              >
                Create New Todo
              </button>
            </>
          )}

          {error && (
            <div className="text-red-500 text-center">{error}</div>
          )}

          <div className="flex flex-col gap-2">
            {todos.map((todo) => (
              <TodoCard
                todo={todo}
                editedTodo={editedTodo}
                setEditedTodo={setEditedTodo}
                editedValue={editedValue}
                setEditedValue={setEditedValue}
                saveEditedTodo={saveEditedTodo}
                deleteTodo={deleteTodo}
                key={todo}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
