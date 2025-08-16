import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import ProjectList from "./pages/ProjectList";
import OneGenerate from "./pages/OneGenerate";
import HighlyConfig from "./pages/HighlyConfig";
import KnowledgeBase from "./pages/KnowledgeBase";
import UserSetting from "./pages/UserSetting";
import { ROUTES, DEFAULT_ROUTE } from "./config/routes";
import "./App.css";

/**
 * App主组件
 * 使用react-router-dom实现SPA单页面应用架构
 * 包含所有页面的路由配置和主布局
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* 主布局路由 - 包含Header和Sidebar */}
        <Route path="/" element={<Layout />}>
          {/* 项目清单页面 */}
          <Route path={ROUTES.PROJECT_LIST} element={<ProjectList />} />

          {/* 一键生成页面 */}
          <Route path={ROUTES.ONE_GENERATE} element={<OneGenerate />} />

          {/* 高级配置页面 - 显示技术目录功能 */}
          <Route path={ROUTES.HIGHLY_CONFIG} element={<HighlyConfig />} />

          {/* 知识库页面 */}
          <Route path={ROUTES.KNOWLEDGE_BASE} element={<KnowledgeBase />} />

          {/* 用户设置页面 */}
          <Route path={ROUTES.USER_SETTING} element={<UserSetting />} />

          {/* 根路径重定向到默认页面 */}
          <Route path="/" element={<Navigate to={DEFAULT_ROUTE} replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
