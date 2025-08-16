import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./index.css";
import projectListIcon from "../../../assets/project-list-icon.svg";
import generateIcon from "../../../assets/generate-icon.svg";
import configIcon from "../../../assets/config-icon.svg";
import knowledgeIcon from "../../../assets/knowledge-icon.svg";
import settingsIcon from "../../../assets/settings-icon.svg";
import { ROUTES } from "../../../config/routes";

/**
 * Sidebar组件 - 侧边栏导航
 * @param {string} activeItem - 当前激活的菜单项（从Layout传入）
 */
const Sidebar = ({ activeItem }) => {
  const location = useLocation();

  // 菜单项配置，包含路由路径
  const menuItems = [
    {
      id: "project-list",
      label: "项目清单",
      icon: projectListIcon,
      path: ROUTES.PROJECT_LIST,
    },
    {
      id: "generate",
      label: "一键生成",
      icon: generateIcon,
      path: ROUTES.ONE_GENERATE,
    },
    {
      id: "config",
      label: "高级配置",
      icon: configIcon,
      path: ROUTES.HIGHLY_CONFIG,
    },
    {
      id: "knowledge",
      label: "知识库",
      icon: knowledgeIcon,
      path: ROUTES.KNOWLEDGE_BASE,
    },
    {
      id: "settings",
      label: "用户设置",
      icon: settingsIcon,
      path: ROUTES.USER_SETTING,
    },
  ];

  return (
    <aside className="sidebar">
      {menuItems.map((item) => {
        // 根据当前路由判断是否为激活状态
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={item.id}
            to={item.path}
            className={`sidebar-item ${isActive ? "highlight" : ""}`}
            style={{ textDecoration: "none" }}
          >
            <div className="sidebar-icon">
              <img src={item.icon} alt={`${item.label}图标`} />
            </div>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </aside>
  );
};

export default Sidebar;
