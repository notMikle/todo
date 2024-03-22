import React, { useEffect } from "react";
import { TodolistDomainType } from "features/TodolistsList/model/todolistsSlice";
import { tasksThunks } from "features/TodolistsList/model/tasksSlice";
import { useActions } from "common/hooks";
import { AddItemForm } from "common/components";
import { TaskType } from "features/TodolistsList/api/tasks/tasksApi.types";
import { FilterTasksButtons } from "features/TodolistsList/ui/Todolist/FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "features/TodolistsList/ui/Todolist/Tasks/Tasks";
import { TodoTitle } from "features/TodolistsList/ui/Todolist/TodoTitle/TodoTitle";

type PropsType = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist = React.memo(function (props: PropsType) {
  const { fetchTasks, addTask } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(props.todolist.id);
  }, []);

  const addTaskCallback = (title: string) => {
    return addTask({ title, todolistId: props.todolist.id }).unwrap();
  };

  return (
    <div>
      <TodoTitle todolist={props.todolist} />
      <AddItemForm addItem={addTaskCallback} disabled={props.todolist.entityStatus === "loading"} />
      <Tasks todolist={props.todolist} tasks={props.tasks} />
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={props.todolist} />
      </div>
    </div>
  );
});
