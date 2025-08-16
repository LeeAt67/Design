import React, { useState } from "react";
import "./index.css";

/**
 * 知识库页面
 * 管理和搜索知识库文档，支持分类浏览和全文搜索
 */
const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid 或 list

  // 知识库分类
  const categories = [
    { id: "all", name: "全部", count: 24 },
    { id: "api", name: "API文档", count: 8 },
    { id: "tutorial", name: "教程指南", count: 6 },
    { id: "specification", name: "技术规范", count: 5 },
    { id: "manual", name: "操作手册", count: 3 },
    { id: "faq", name: "常见问题", count: 2 },
  ];

  // 知识库文档数据
  const [documents] = useState([
    {
      id: 1,
      title: "React开发入门指南",
      category: "tutorial",
      description: "从零开始学习React开发的完整教程",
      tags: ["React", "JavaScript", "前端"],
      lastModified: "2024-01-20",
      author: "张三",
      views: 1205,
      status: "published",
    },
    {
      id: 2,
      title: "RESTful API设计规范",
      category: "specification",
      description: "标准的RESTful API设计原则和最佳实践",
      tags: ["API", "REST", "规范"],
      lastModified: "2024-01-18",
      author: "李四",
      views: 856,
      status: "published",
    },
    {
      id: 3,
      title: "数据库操作手册",
      category: "manual",
      description: "数据库安装、配置和基本操作指南",
      tags: ["数据库", "SQL", "操作"],
      lastModified: "2024-01-15",
      author: "王五",
      views: 623,
      status: "draft",
    },
    {
      id: 4,
      title: "用户认证API文档",
      category: "api",
      description: "用户登录、注册、权限验证相关API接口文档",
      tags: ["API", "认证", "安全"],
      lastModified: "2024-01-22",
      author: "赵六",
      views: 942,
      status: "published",
    },
    {
      id: 5,
      title: "部署常见问题解答",
      category: "faq",
      description: "项目部署过程中遇到的问题和解决方案",
      tags: ["部署", "问题", "解决方案"],
      lastModified: "2024-01-12",
      author: "钱七",
      views: 387,
      status: "published",
    },
    {
      id: 6,
      title: "前端组件库使用指南",
      category: "tutorial",
      description: "UI组件库的安装、配置和使用方法",
      tags: ["组件", "UI", "前端"],
      lastModified: "2024-01-19",
      author: "孙八",
      views: 754,
      status: "published",
    },
  ]);

  // 过滤文档
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 获取状态样式
  const getStatusClass = (status) => {
    return status === "published" ? "status-published" : "status-draft";
  };

  // 获取状态文本
  const getStatusText = (status) => {
    return status === "published" ? "已发布" : "草稿";
  };

  return (
    <div className="knowledge-base-container">
      <div className="page-header">
        <h1>知识库</h1>
        <p>搜索和管理您的技术文档知识库</p>
      </div>

      <div className="knowledge-content">
        {/* 搜索和工具栏 */}
        <div className="search-toolbar">
          <div className="search-box">
            <input
              type="text"
              placeholder="搜索文档标题、内容或标签..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>

          <div className="toolbar-actions">
            <div className="view-mode">
              <button
                className={`mode-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                📱
              </button>
              <button
                className={`mode-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
              >
                📋
              </button>
            </div>
            <button className="add-btn">+ 添加文档</button>
          </div>
        </div>

        <div className="main-content">
          {/* 左侧分类导航 */}
          <div className="sidebar-categories">
            <h3>文档分类</h3>
            <div className="categories-list">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`category-item ${
                    selectedCategory === category.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="category-name">{category.name}</span>
                  <span className="category-count">{category.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧文档列表 */}
          <div className="documents-area">
            <div className="results-header">
              <span className="results-count">
                找到 {filteredDocuments.length} 个文档
              </span>
            </div>

            <div className={`documents-${viewMode}`}>
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="document-item">
                  <div className="document-header">
                    <h3>{doc.title}</h3>
                    <span className={`status ${getStatusClass(doc.status)}`}>
                      {getStatusText(doc.status)}
                    </span>
                  </div>

                  <p className="document-description">{doc.description}</p>

                  <div className="document-tags">
                    {doc.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="document-meta">
                    <div className="meta-left">
                      <span className="author">作者：{doc.author}</span>
                      <span className="modified">更新：{doc.lastModified}</span>
                    </div>
                    <div className="meta-right">
                      <span className="views">👁 {doc.views}</span>
                    </div>
                  </div>

                  <div className="document-actions">
                    <button className="view-btn">查看</button>
                    <button className="edit-btn">编辑</button>
                    <button className="share-btn">分享</button>
                  </div>
                </div>
              ))}
            </div>

            {filteredDocuments.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">📄</div>
                <h3>未找到相关文档</h3>
                <p>尝试调整搜索词或选择其他分类</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
