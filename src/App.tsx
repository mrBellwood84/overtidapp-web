import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { LanguageSelectDialog } from "./Components/Misc/Dialogs/SelectLanguageDialog";
import { accountStateActions } from "./StoreManagement/Account/accountStateActions";
import { AppState } from "./StoreManagement/rootStore";
import { AdminViewRoot } from "./Views/AdminViewRoot";
import { NoUserViewRoot } from "./Views/NoUserViewRoot";
import { UserViewRoot } from "./Views/UserViewRoot";

const App = () => {

  const account = useSelector((state: AppState) => state.account)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(accountStateActions.loadStateFromSession())
  },[dispatch])

  return (
    <div className="App">
      <LanguageSelectDialog />
      { !account.signedIn && <NoUserViewRoot />}
      { account.signedIn && account.activeRole === "admin" && <AdminViewRoot /> }
      { account.signedIn && account.activeRole === "user" && <UserViewRoot /> }
    </div>
  )
}
export default App;
