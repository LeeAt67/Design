import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../TechnicalCatalog/Header";
import Sidebar from "../TechnicalCatalog/Sidebar";
import { ROUTE_CONFIG } from "../../config/routes";
import "./index.css";

/**
 * 主布局组件
 * 包含Header、Sidebar和主内容区域
 * 根据当前路由动态更新Header的面包屑导航和Sidebar的激活状态
 */
const Layout = () => {
  const location = useLocation();

  // 根据当前路由获取配置信息
  const currentRoute = ROUTE_CONFIG[location.pathname];
  const breadcrumbText = currentRoute?.breadcrumb || "工作台";
  const activeMenuItem = currentRoute?.label || "";

  return (
    <div className="app-layout">
      {/* 顶部导航 - 固定在页面顶部 */}
      <Header breadcrumbText={breadcrumbText} />

      {/* 下方内容区域 - 水平布局 */}
      <div className="layout-body">
        {/* 侧边栏 */}
        <Sidebar activeItem={activeMenuItem} />

        {/* 主内容区域 */}
        <main className="layout-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
