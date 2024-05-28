import { Route, Routes, useParams } from "react-router-dom";
import Orders from "../../Pages/Orders/OrderRequest";
import EditMenu from "../../Pages/EditMenu/EditMenu";
import ManageInfo from "../../Pages/ManageInfo/ManageInfo";


function AppRoutes( {id}) {
    console.log(id)
    return (
        <Routes>
            <Route path="/" element={<Orders id={id} />}></Route>
            <Route path="/editmenu" element={<EditMenu id ={id}/>}></Route>
            <Route path="/manageinfo" element={<ManageInfo id={id}/>}></Route>
        </Routes>
    );

}
export default AppRoutes;