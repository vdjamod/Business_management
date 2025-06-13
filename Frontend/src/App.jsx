import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

//owner
import OwnerRegistration from "./components/Owner/OwnerRegistration.jsx";
import OwnerLogin from "./components/Owner/OwnerLogin.jsx";
import OwnerHome from "./components/Owner/OwnerHome.jsx";
import OTP from "./components/Owner/OTP.jsx";
import ForgetPassword from "./components/Owner/ForgetPassword.jsx";
import OwnerEdit from "./components/Owner/OwnerEdit.jsx";

//business
import BussinessInputForm from "./components/Bussiness/BusinessInputForm.jsx";
import Business from "./components/Bussiness/Business.jsx";
import BusinessEdit from "./components/Bussiness/BusinessEdit.jsx";
import Manage from "./components/Management/Manage.jsx";
import Analyse from "./components/Analyse/Analyse.jsx";

//Product
import Product from "./components/Management/Product/Product.jsx";
import ProductInputForm from "./components/Management/Product/ProductInputForm.jsx";
import EditForm from "./components/Management/Product/EditForm.jsx";

//Employee
import EmployeeHome from "./components/Management/Employee/EmployeeHome.jsx";
import EditEmployee from "./components/Management/Employee/EditEmployee.jsx";
import EmployeeData from "./components/Management/Employee/EmployeeData.jsx";
import Employee from "./components/Management/Employee/Employee.jsx";
import AddEmployee from "./components/Management/Employee/AddEmployee.jsx";
import EmployeeLogin from "./components/Management/Employee/EmployeeLogin.jsx";

//inventory
import Inventory from "./components/Management/Inventory/Inventory.jsx";
import AddInventory from "./components/Management/Inventory/AddInventory.jsx";

//Sale
import Sale from "./components/Management/Sale/Sale.jsx";
import DaySaleInput from "./components/Management/Sale/SaleInput.jsx";

//Utils
import Home from "./components/Utils/Home/Home.jsx";
import PageNotFound from "./components/Utils/404PageNotFound.jsx";
import AuthLayout from "./components/Utils/AuthLayout.jsx";
import NeedAccess from "./components/Utils/NeedAccess.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Owner */}
          <Route path="/owner/registration" element={<OwnerRegistration />} />
          <Route path="/owner/forget-password" element={<ForgetPassword />} />
          <Route path="/owner/get-otp" element={<OTP />} />
          <Route path="/owner/login" element={<OwnerLogin />} />
          <Route
            path="/owner"
            element={
              <AuthLayout>
                <NeedAccess>
                  <OwnerHome />
                </NeedAccess>
              </AuthLayout>
            }
          />

          <Route
            path="/owner/edit"
            element={
              <AuthLayout>
                <NeedAccess>
                  <OwnerEdit />
                </NeedAccess>
              </AuthLayout>
            }
          />

          {/* Business Route */}

          <Route
            path="/owner/business/:bid/edit"
            element={
              <AuthLayout>
                <NeedAccess>
                  <BusinessEdit />
                </NeedAccess>
              </AuthLayout>
            }
          />

          <Route
            path="/owner/business/:bid/manage"
            element={
              <AuthLayout>
                <NeedAccess>
                  <Manage />
                </NeedAccess>
              </AuthLayout>
            }
          />

          <Route
            path="/owner/business/:bid/analyse"
            element={
              <AuthLayout>
                <NeedAccess>
                  <Analyse />
                </NeedAccess>
              </AuthLayout>
            }
          />

          <Route
            path="/owner/business/new"
            element={
              <AuthLayout>
                <NeedAccess>
                  <BussinessInputForm />
                </NeedAccess>
              </AuthLayout>
            }
          />
          <Route
            path="/owner/business/:bid"
            element={
              <AuthLayout>
                <NeedAccess>
                  <Business />
                </NeedAccess>
              </AuthLayout>
            }
          />

          {/* Employee */}
          <Route path="/employee/login" element={<EmployeeLogin />} />
          <Route
            path="/owner/business/:bid/manage/employee"
            element={
              <AuthLayout>
                <NeedAccess requiredWorkpage="employee">
                  <EmployeeHome />
                </NeedAccess>
              </AuthLayout>
            }
          />

          <Route
            path="/employee/:eid"
            element={
              <AuthLayout>
                <Employee />
              </AuthLayout>
            }
          />

          <Route
            path="/owner/business/:bid/manage/employee/new"
            element={
              <AuthLayout>
                <NeedAccess requiredWorkpage="employee">
                  <AddEmployee />
                </NeedAccess>
              </AuthLayout>
            }
          />
          <Route
            path="/owner/business/:bid/manage/employee/:eid/edit"
            element={
              <AuthLayout>
                <NeedAccess requiredWorkpage="employee">
                  <EditEmployee />
                </NeedAccess>
              </AuthLayout>
            }
          />

          <Route
            path="/employee/:eid/edit"
            element={
              <AuthLayout>
                <NeedAccess requiredWorkpage="employee">
                  <EditEmployee />
                </NeedAccess>
              </AuthLayout>
            }
          />
          <Route
            path="/owner/business/:bid/manage/employee/:eid"
            element={
              <AuthLayout>
                <NeedAccess requiredWorkpage="employee">
                  <EmployeeData />
                </NeedAccess>
              </AuthLayout>
            }
          />

          {/* Product */}
          <Route
            path="/owner/business/:bid/manage/product"
            element={
              <AuthLayout>
                <NeedAccess requiredWorkpage="product">
                  <Product />
                </NeedAccess>
              </AuthLayout>
            }
          />

          <Route
            path="/owner/business/:bid/manage/product/new"
            element={
              <AuthLayout>
                <NeedAccess requiredWorkpage="product">
                  <ProductInputForm />
                </NeedAccess>
              </AuthLayout>
            }
          />

          <Route
            path="/owner/business/:bid/manage/product/:pdctid/edit"
            element={
              <AuthLayout>
                <NeedAccess requiredWorkpage="product">
                  <EditForm />
                </NeedAccess>
              </AuthLayout>
            }
          />

          {/* Sale */}
          <Route
            path="/owner/business/:bid/manage/sale"
            element={
              <AuthLayout>
                <NeedAccess requiredWorkpage="sale">
                  <Sale />
                </NeedAccess>
              </AuthLayout>
            }
          />

          <Route
            path="/owner/business/:bid/manage/sale/add"
            element={
              <AuthLayout>
                <NeedAccess requiredWorkpage="sale">
                  <DaySaleInput />
                </NeedAccess>
              </AuthLayout>
            }
          />

          {/* Inventory */}
          <Route
            path="/owner/business/:bid/manage/inventory"
            element={
              <AuthLayout>
                <NeedAccess requiredWorkpage="inventory">
                  <Inventory />
                </NeedAccess>
              </AuthLayout>
            }
          />
          <Route
            path="/owner/business/:bid/manage/inventory/add"
            element={
              <AuthLayout>
                <NeedAccess requiredWorkpage="inventory">
                  <AddInventory />
                </NeedAccess>
              </AuthLayout>
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
