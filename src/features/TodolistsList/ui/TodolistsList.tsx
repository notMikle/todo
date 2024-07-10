import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {todolistsThunks} from "features/TodolistsList/model/todolistsSlice";
import {selectTasks} from "features/TodolistsList/model/tasksSlice";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "common/components";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";
import {useActions} from "common/hooks";
import {selectIsLoggedIn} from "features/auth/model/auth.selectors";
import {selectTodolists} from "features/TodolistsList/model/todolists.selectors";
import {FlexWrapper} from "common/components/flexWrapper/FlexWrapper";

export const TodolistsList = () => {
    const todolists = useSelector(selectTodolists);
    const tasks = useSelector(selectTasks);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const {addTodolist, fetchTodolists} = useActions(todolistsThunks);

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        fetchTodolists();
    }, []);

    const addTodolistCallback = (title: string) => {
        return addTodolist(title).unwrap();
    };

    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>;
    }

    return (
        <>
            <FlexWrapper justify={'space-between'} align={'center'}>
                <AddItemForm addItem={addTodolistCallback} label={'add new todolist'}/>
            </FlexWrapper>
            <Grid container spacing={3}>
                {todolists.map((tl) => {
                    let allTodolistTasks = tasks[tl.id];
                    return (
                        <Grid item key={tl.id}>
                            <Paper style={{padding: "10px"}}>
                                <Todolist todolist={tl} tasks={allTodolistTasks}/>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};
