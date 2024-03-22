import React, {ComponentPropsWithoutRef} from 'react'
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "features/auth/model/auth.selectors";
import {selectAppStatus} from "app/app.selectors";
import {useActions} from "common/hooks";
import {authThunks} from "features/auth/model/auth.slice";

type propsType = {
    // children: ReactNode
    position?: string
} & ComponentPropsWithoutRef<'div'>

export const AppBarMUI = React.memo((props: propsType) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const status = useSelector(selectAppStatus);
    const {logout} = useActions(authThunks);
    const logoutHandler = () => logout();
    return (
        <AppBar position="static">

            <Toolbar>
                <Container fixed>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="b" sx={{flexGrow: 1}}>
                        Todolist
                    </Typography>
                    {isLoggedIn && (
                        <Button color="inherit" onClick={logoutHandler}>
                            Log out
                        </Button>
                    )}
                </Container>
            </Toolbar>
            {status === "loading" && <LinearProgress/>}
        </AppBar>
    )
})
