import React, { useEffect, useState } from "react";
import axios from "axios";

const module = "AssetManagement";

const SettingsPanel: React.FC = () => {
  const [settings, setSettings] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/settings/${module}`).then(res => {
      const item = res.data.find((s: any) => s.key === "fieldVisibility");
      setSettings(item?.value || {});
      setLoading(false);
    });
  }, []);

  const toggleField = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const saveSettings = () => {
    axios.post("/api/settings", {
      module,
      key: "fieldVisibility",
      value: settings,
      updatedBy: "mazhar.admin"
    }).then(() => {
      alert("✅ Settings saved!");
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto" }}>
      <h2>Asset Field Visibility</h2>
      {Object.entries(settings).map(([field, visible]) => (
        <div key={field}>
          <label>
            <input
              type="checkbox"
              checked={visible}
              onChange={() => toggleField(field)}
            />
            {field}
          </label>
        </div>
      ))}
      <button onClick={saveSettings}>💾 Save</button>
    </div>
  );
};

export default SettingsPanel;
