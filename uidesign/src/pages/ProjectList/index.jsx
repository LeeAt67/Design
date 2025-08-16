import React, { useState } from "react";
import "./index.css";

/**
 * 项目清单页面
 * 显示用户的所有项目列表，支持创建、编辑、删除项目
 */
const ProjectList = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "技术文档项目",
      description: "编写完整的技术文档系统",
      status: "进行中",
      createTime: "2024-01-15",
      updateTime: "2024-01-20",
    },
    {
      id: 2,
      name: "用户手册编写",
      description: "产品用户操作手册编写",
      status: "已完成",
      createTime: "2024-01-10",
      updateTime: "2024-01-18",
    },
    {
      id: 3,
      name: "API接口文档",
      description: "系统API接口详细文档",
      status: "待开始",
      createTime: "2024-01-12",
      updateTime: "2024-01-12",
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
  });

  // 创建新项目
  const handleCreateProject = () => {
    if (newProject.name.trim()) {
      const project = {
        id: Date.now(),
        name: newProject.name,
        description: newProject.description,
        status: "待开始",
        createTime: new Date().toISOString().split("T")[0],
        updateTime: new Date().toISOString().split("T")[0],
      };
      setProjects([...projects, project]);
      setNewProject({ name: "", description: "" });
      setShowCreateModal(false);
    }
  };

  // 删除项目
  const handleDeleteProject = (id) => {
    if (window.confirm("确定要删除此项目吗？")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  // 获取状态样式
  const getStatusClass = (status) => {
    switch (status) {
      case "进行中":
        return "status-progress";
      case "已完成":
        return "status-completed";
      case "待开始":
        return "status-pending";
      default:
        return "";
    }
  };

  return (
    <div className="project-list-container">
      <div className="page-header">
        <h1>项目清单</h1>
        <p>管理您的所有文档项目</p>
      </div>

      <div className="toolbar">
        <button className="create-btn" onClick={() => setShowCreateModal(true)}>
          + 创建新项目
        </button>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <h3>{project.name}</h3>
              <span className={`status ${getStatusClass(project.status)}`}>
                {project.status}
              </span>
            </div>
            <p className="project-description">{project.description}</p>
            <div className="project-meta">
              <div className="meta-item">
                <span className="label">创建时间：</span>
                <span>{project.createTime}</span>
              </div>
              <div className="meta-item">
                <span className="label">更新时间：</span>
                <span>{project.updateTime}</span>
              </div>
            </div>
            <div className="project-actions">
              <button className="edit-btn">编辑</button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteProject(project.id)}
              >
                删除
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 创建项目模态框 */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>创建新项目</h3>
              <button
                className="close-btn"
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>项目名称</label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) =>
                    setNewProject({ ...newProject, name: e.target.value })
                  }
                  placeholder="请输入项目名称"
                />
              </div>
              <div className="form-group">
                <label>项目描述</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      description: e.target.value,
                    })
                  }
                  placeholder="请输入项目描述"
                  rows="3"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => setShowCreateModal(false)}
              >
                取消
              </button>
              <button className="confirm-btn" onClick={handleCreateProject}>
                创建
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
