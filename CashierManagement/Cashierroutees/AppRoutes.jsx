import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import POS from "../../WelcomePage/Pos";
import OrderHistory from "../OrderHistory/OrderHistory";
import RefundPage from "../RefundManagement/RefundPage";
import Customers from "../CustomerManagement/Customers";
import ShiftSummaryPage from "../ShiftManagement/ShiftSummaryPage";
import Admin from "../../Page/Admin";
import SettingInfo from "../Settings/SettingInfo";

const CashierRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="pos" replace />} />
        <Route path="pos" element={<POS />} />
        <Route path="order-history" element={<OrderHistory />} />
        <Route path="refund" element={<RefundPage />} />
        <Route path="customers" element={<Customers />} />
        <Route path="shift-summary" element={<ShiftSummaryPage />} />
        <Route path="admin" element={<Admin />} />
        <Route path="settings" element={<SettingInfo />} />
      </Route>
    </Routes>
  );
};

export default CashierRoute;