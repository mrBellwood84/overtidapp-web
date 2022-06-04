import { List, ListItem, ListSubheader } from "@mui/material"
import { useDispatch } from "react-redux"
import { accountAgent } from "../../ApiAgent/UserData/accountAgent"
import { IAccount } from "../../Data/Account/IAccount"
import { ISigninDto } from "../../Data/Account/ISigninDto"
import { accountStateActions } from "../../StoreManagement/Account/accountStateActions"
import { tokenStorageHandler } from "../../Utils/Misc/tokenStorageHandler"

const users: ISigninDto[] = [
    {
        email: "john@app.com",
        password: "Password123",
    },    {
        email: "jane@app.com",
        password: "Password123",
    },    {
        email: "admin@app.com",
        password: "Password123",
    }
]

export const DevQuickSignIn = () => {

    const dispatch = useDispatch()

    const signIn = async (dto: ISigninDto) => {
        let result = await accountAgent.signIn(dto);

        if (typeof(result) === "number") {
            console.log("could not log in. response was ", result);
            return
        }

        let account: IAccount = {
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            userName: result.userName,
            role: result.role
        }

        tokenStorageHandler.set(result.token)
        dispatch(accountStateActions.signIn(account))
    }

    return (
        <List sx={{height: 'max-content', width: "max-content", border: "2px solid lightgrey", margin: 2}}>
            <ListSubheader color="primary">DEV :: Quick Signin</ListSubheader>
            {users.map(x => (
                <ListItem key={x.email} button onClick={() => signIn(x)}>
                    {x.email}
                </ListItem>
            )) }
        </List>
    )


}