import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {BaseResponseType} from "common/types";

type Props = {
    addItem: (title: string) => Promise<unknown>;
    disabled?: boolean;
    label?: string
};

export const AddItemForm = React.memo(function ({addItem, label, disabled = false}: Props) {
    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    const addItemHandler = () => {
        if (title.trim() !== "") {
            addItem(title)
                .then((res) => {
                    setTitle("");
                })
                .catch((err: BaseResponseType) => {
                    if (err?.resultCode) {
                        setError(err.messages[0]);
                    }
                });
        } else {
            setError("Title is required");
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItemHandler();
        }
    };

    return (
        <div>
            <TextField
                variant="outlined"
                disabled={disabled}
                error={!!error}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                label={`${label ? label : 'title'}`}
                helperText={error}
            />
            <IconButton color="primary" onClick={addItemHandler} disabled={disabled}>
                <AddBox/>
            </IconButton>
        </div>
    );
});
