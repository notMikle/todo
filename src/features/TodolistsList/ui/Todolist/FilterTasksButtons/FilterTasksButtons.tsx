import { Button } from "@mui/material";
import React from "react";
import { useActions } from "common/hooks";
import { FilterValuesType, TodolistDomainType, todolistsActions } from "features/TodolistsList/model/todolistsSlice";

type Props = {
  todolist: TodolistDomainType;
};

export const FilterTasksButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist;

  const { changeTodolistFilter } = useActions(todolistsActions);

  const changeTasksFilterHandler = (filter: FilterValuesType) => {
    changeTodolistFilter({ filter, id });
  };

  return (
    <>
      <Button
        variant={filter === "all" ? "outlined" : "text"}
        onClick={() => changeTasksFilterHandler("all")}
        color={"inherit"}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        onClick={() => changeTasksFilterHandler("active")}
        color={"primary"}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        onClick={() => changeTasksFilterHandler("completed")}
        color={"secondary"}
      >
        Completed
      </Button>
    </>
  );
};
