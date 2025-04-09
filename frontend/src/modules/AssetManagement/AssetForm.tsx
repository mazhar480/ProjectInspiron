import React, { useEffect, useState } from "react";
import axios from "axios";

const AssetForm: React.FC = () => {
  const [fieldGroups, setFieldGroups] = useState<any>({});
  const [fieldMeta, setFieldMeta] = useState<any>({});
  const [formData, setFormData] = useState<any>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    axios.get("/api/settings/AssetManagement").then(res => {
      const allSettings = res.data;
      console.log("📦 Settings fetched:", allSettings);
  
      const groups = allSettings.find((s: any) => s.key === "fieldGroups")?.value || {};
      const meta = allSettings.find((s: any) => s.key === "fieldMeta")?.value || {};
  
      console.log("📁 fieldGroups:", groups);
      console.log("🧩 fieldMeta:", meta);
  
      setFieldGroups(groups);
      setFieldMeta(meta);
      setExpanded(
        Object.keys(groups).reduce((acc: any, g: string) => {
          acc[g] = true;
          return acc;
        }, {})
      );
    });
  }, []);

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const renderField = (field: string) => {
    const meta = fieldMeta[field] || { label: field, type: "text" };

    if (meta.type === "dropdown") {
      return (
        <select
          value={formData[field] || ""}
          onChange={(e) => handleChange(field, e.target.value)}
          className="border px-2 py-1 rounded w-full"
        >
          <option value="">Select {meta.label}</option>
          {meta.options?.map((opt: string) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      );
    }

    if (meta.type === "date") {
      return (
        <input
          type="date"
          className="border px-2 py-1 rounded w-full"
          value={formData[field] || ""}
          onChange={(e) => handleChange(field, e.target.value)}
        />
      );
    }

    return (
      <input
        type="text"
        className="border px-2 py-1 rounded w-full"
        value={formData[field] || ""}
        onChange={(e) => handleChange(field, e.target.value)}
      />
    );
  };

  const handleSubmit = () => {
    console.log("Submitted:", formData);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Asset Registration</h2>
      {Object.entries(fieldGroups).map(([group, fields]: any) => (
        <div key={group} className="mb-6 border rounded p-4 shadow-sm">
          <div
            className="font-semibold text-lg cursor-pointer mb-2"
            onClick={() => setExpanded(prev => ({ ...prev, [group]: !prev[group] }))}
          >
            {group} {expanded[group] ? "▾" : "▸"}
          </div>
          {expanded[group] &&
            Object.entries(fields).map(([field, isVisible]: any) =>
              isVisible ? (
                <div key={field} className="mb-3">
                  <label className="block mb-1 font-medium">{fieldMeta[field]?.label || field}</label>
                  {renderField(field)}
                </div>
              ) : null
            )}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default AssetForm;
