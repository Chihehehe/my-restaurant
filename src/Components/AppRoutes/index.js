import { Route, Routes } from "react-router-dom";
import Orders from "../../Pages/Orders";
import EditMenu from "../../Pages/EditMenu";
import ManageInfo from "../../Pages/ManageInfo";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Orders />}></Route>
            <Route path="/editmenu" element={<EditMenu />}></Route>
            <Route path="/manageinfo" element={<ManageInfo />}></Route>
        </Routes>
    );

}
export default AppRoutes;