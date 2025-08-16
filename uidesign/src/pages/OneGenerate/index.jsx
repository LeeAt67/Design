import React, { useState } from "react";
import "./index.css";

/**
 * 一键生成页面
 * 提供快速生成文档的功能，支持多种文档类型和模板
 */
const OneGenerate = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    documentType: "",
    language: "zh-CN",
    includeImages: true,
    includeExamples: true,
  });
  const [isGenerating, setIsGenerating] = useState(false);

  // 文档模板配置
  const templates = [
    {
      id: "api-doc",
      name: "API接口文档",
      description: "自动生成RESTful API接口文档",
      icon: "🔗",
      estimatedTime: "5-10分钟",
    },
    {
      id: "user-manual",
      name: "用户操作手册",
      description: "生成详细的用户操作指导文档",
      icon: "📖",
      estimatedTime: "10-15分钟",
    },
    {
      id: "tech-spec",
      name: "技术规范文档",
      description: "创建完整的技术规范和架构文档",
      icon: "⚙️",
      estimatedTime: "15-20分钟",
    },
    {
      id: "quick-guide",
      name: "快速入门指南",
      description: "生成简洁的快速入门教程",
      icon: "⚡",
      estimatedTime: "3-5分钟",
    },
  ];

  // 处理模板选择
  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setFormData({
        ...formData,
        documentType: template.name,
      });
    }
  };

  // 处理表单输入
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // 开始生成文档
  const handleGenerate = async () => {
    if (!selectedTemplate || !formData.title.trim()) {
      alert("请选择模板并填写文档标题");
      return;
    }

    setIsGenerating(true);

    // 模拟生成过程
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      alert("文档生成成功！");
      // 这里可以跳转到生成结果页面或下载文档
    } catch (error) {
      alert("生成失败，请重试");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="one-generate-container">
      <div className="page-header">
        <h1>一键生成</h1>
        <p>选择模板，快速生成高质量的技术文档</p>
      </div>

      <div className="generate-content">
        {/* 模板选择区域 */}
        <div className="template-section">
          <h2>选择文档模板</h2>
          <div className="templates-grid">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`template-card ${
                  selectedTemplate === template.id ? "selected" : ""
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <div className="template-icon">{template.icon}</div>
                <h3>{template.name}</h3>
                <p>{template.description}</p>
                <div className="template-meta">
                  <span className="estimated-time">
                    预计用时：{template.estimatedTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 配置区域 */}
        {selectedTemplate && (
          <div className="config-section">
            <h2>文档配置</h2>
            <div className="config-form">
              <div className="form-row">
                <div className="form-group">
                  <label>文档标题 *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="请输入文档标题"
                  />
                </div>
                <div className="form-group">
                  <label>文档语言</label>
                  <select
                    value={formData.language}
                    onChange={(e) =>
                      handleInputChange("language", e.target.value)
                    }
                  >
                    <option value="zh-CN">中文</option>
                    <option value="en-US">English</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>文档描述</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="请简要描述文档内容和用途"
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="checkbox-group">
                  <label className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.includeImages}
                      onChange={(e) =>
                        handleInputChange("includeImages", e.target.checked)
                      }
                    />
                    <span>包含示例图片</span>
                  </label>
                  <label className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.includeExamples}
                      onChange={(e) =>
                        handleInputChange("includeExamples", e.target.checked)
                      }
                    />
                    <span>包含代码示例</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 操作区域 */}
        {selectedTemplate && (
          <div className="action-section">
            <div className="action-buttons">
              <button className="preview-btn" disabled={isGenerating}>
                预览配置
              </button>
              <button
                className="generate-btn"
                onClick={handleGenerate}
                disabled={isGenerating || !formData.title.trim()}
              >
                {isGenerating ? (
                  <span>
                    <span className="loading-spinner"></span>
                    生成中...
                  </span>
                ) : (
                  "开始生成"
                )}
              </button>
            </div>
            <div className="action-tips">
              <p>💡 提示：生成过程中请不要关闭页面</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OneGenerate;
