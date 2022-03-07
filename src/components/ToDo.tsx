import React from 'react';
import { IToDo, toDoState } from '../atoms';
import { useSetRecoilState } from 'recoil';

function ToDo({ text, id, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name }
    } = event;
    setToDos(oldToDos => {
      const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
      const newToDo = { text, id, category: name as IToDo['category'] };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1)
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== 'DOING' && <button name="DOING" onClick={onClick}>Doing</button>}
      {category !== 'TO_DO' && <button name="TO_DO" onClick={onClick}>To Do</button>}
      {category !== 'DONE' && <button name="DONE" onClick={onClick}>Done</button>}
    </li>
  );
}

export default ToDo;