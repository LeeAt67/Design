// 路由配置文件
export const ROUTES = {
  PROJECT_LIST: "/project-list",
  ONE_GENERATE: "/one-generate",
  HIGHLY_CONFIG: "/highly-config",
  KNOWLEDGE_BASE: "/knowledge-base",
  USER_SETTING: "/user-setting",
};

// 路由和菜单项的映射关系
export const ROUTE_CONFIG = {
  [ROUTES.PROJECT_LIST]: {
    label: "项目清单",
    breadcrumb: "工作台 / 项目清单",
    menuId: "project-list",
  },
  [ROUTES.ONE_GENERATE]: {
    label: "一键生成",
    breadcrumb: "工作台 / 一键生成",
    menuId: "generate",
  },
  [ROUTES.HIGHLY_CONFIG]: {
    label: "高级配置",
    breadcrumb: "工作台 / 高级配置",
    menuId: "config",
  },
  [ROUTES.KNOWLEDGE_BASE]: {
    label: "知识库",
    breadcrumb: "工作台 / 知识库",
    menuId: "knowledge",
  },
  [ROUTES.USER_SETTING]: {
    label: "用户设置",
    breadcrumb: "工作台 / 用户设置",
    menuId: "settings",
  },
};

// 默认路由
export const DEFAULT_ROUTE = ROUTES.PROJECT_LIST;
