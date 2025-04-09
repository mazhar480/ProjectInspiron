import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

const AdminSettings: React.FC = () => {
  const [fieldGroups, setFieldGroups] = useState<any>({});
  const [fieldMeta, setFieldMeta] = useState<any>({});
  const [activeTab, setActiveTab] = useState<"assetForm" | "meta">("assetForm");
  const [previewMode, setPreviewMode] = useState(false);
  const [newField, setNewField] = useState({ group: "", name: "", label: "", type: "", options: "" });
  const [newGroupName, setNewGroupName] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    axios.get("/api/settings/AssetManagement").then((res) => {
      const groups = res.data.find((s: any) => s.key === "fieldGroups")?.value || {};
      const meta = res.data.find((s: any) => s.key === "fieldMeta")?.value || {};
      setFieldGroups(groups);
      setFieldMeta(meta);
    });
  }, []);

  const handleDragEnd = (event: any, group: string) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const updatedFields = arrayMove(
        Object.keys(fieldGroups[group]),
        Object.keys(fieldGroups[group]).indexOf(active.id),
        Object.keys(fieldGroups[group]).indexOf(over.id)
      );
      const updatedGroup = updatedFields.reduce((acc, key) => {
        acc[key] = fieldGroups[group][key];
        return acc;
      }, {});
      setFieldGroups({ ...fieldGroups, [group]: updatedGroup });
    }
  };

  const handleMetaChange = (field: string, prop: string, value: any) => {
    setFieldMeta((prev: any) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [prop]: value,
      },
    }));
  };

  const addNewGroup = () => {
    const name = newGroupName.trim();
    if (!name || fieldGroups[name]) return;
    setFieldGroups((prev: any) => ({ ...prev, [name]: {} }));
    setNewGroupName("");
  };

  const addNewField = () => {
    const { group, name, label, type, options } = newField;
    if (!group || !name || !label || !type) return;
    setFieldGroups((prev: any) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [name]: true,
      },
    }));
    setFieldMeta((prev: any) => ({
      ...prev,
      [name]: {
        label,
        type,
        ...(type === "dropdown" ? { options: options.split(",").map((o) => o.trim()) } : {}),
      },
    }));
    setNewField({ group: "", name: "", label: "", type: "", options: "" });
  };

  const saveAll = async () => {
    await axios.post("/api/settings", {
      module: "AssetManagement",
      key: "fieldGroups",
      value: fieldGroups,
      updatedBy: "mazhar.admin",
    });

    await axios.post("/api/settings", {
      module: "AssetManagement",
      key: "fieldMeta",
      value: fieldMeta,
      updatedBy: "mazhar.admin",
    });

    alert("✅ Settings saved!");
  };

  const renderPreview = () => {
    if (!Object.keys(fieldGroups).length || !Object.keys(fieldMeta).length) {
      return <div className="text-gray-500 italic">⚠️ No preview available. Add fields or groups to see preview.</div>;
    }

    return (
      <div className="space-y-6">
        {Object.entries(fieldGroups).map(([group, fields]: any) => (
          <details key={group} className="bg-white shadow rounded p-4">
            <summary className="cursor-pointer font-bold text-lg mb-2">{group}</summary>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {Object.entries(fields).map(([field, visible]: any) => {
                if (!visible || !fieldMeta[field]) return null;
                const meta = fieldMeta[field];
                return (
                  <div key={field}>
                    <label className="block text-sm font-medium mb-1">{meta.label}</label>
                    {meta.type === "text" && <input type="text" className="border p-2 w-full" disabled />}
                    {meta.type === "date" && <input type="date" className="border p-2 w-full" disabled />}
                    {meta.type === "dropdown" && (
                      <select className="border p-2 w-full" disabled>
                        {meta.options?.map((opt: string, idx: number) => (
                          <option key={idx} value={opt}>{opt}</option>
                        ))}
                      </select>
                    )}
                  </div>
                );
              })}
            </div>
          </details>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin Settings</h2>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={previewMode} onChange={() => setPreviewMode(!previewMode)} />
          Preview Mode
        </label>
      </div>

      <div className="flex space-x-4 mb-4">
        <button onClick={() => setActiveTab("assetForm")} className={activeTab === "assetForm" ? "font-bold underline" : ""}>Asset Form</button>
        <button onClick={() => setActiveTab("meta")} className={activeTab === "meta" ? "font-bold underline" : ""}>Field Meta</button>
      </div>

      {previewMode ? renderPreview() : (
        <>
          {activeTab === "assetForm" && (
            <>
              <div className="mt-4 border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">➕ Add New Group</h3>
                <div className="flex gap-4 items-center">
                  <input type="text" className="border p-2 w-full" placeholder="Group Name (e.g., Deployment Info)" value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} />
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded" onClick={addNewGroup} disabled={!newGroupName.trim()}>Add</button>
                </div>
              </div>

              {Object.entries(fieldGroups).map(([group, fields]: any) => (
                <div key={group} className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">{group}</h3>
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(event) => handleDragEnd(event, group)}>
                    <SortableContext items={Object.keys(fields)} strategy={verticalListSortingStrategy}>
                      {Object.entries(fields).map(([field, visible]: any) => (
                        <SortableItem key={field} id={field} visible={visible} onToggle={() => handleMetaChange(field, "visible", !visible)} />
                      ))}
                    </SortableContext>
                  </DndContext>
                </div>
              ))}

              <div className="mt-6 border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">➕ Add New Field</h3>
                <div className="grid grid-cols-2 gap-4">
                  <select className="border p-2" value={newField.group} onChange={(e) => setNewField({ ...newField, group: e.target.value })}>
                    <option value="">Select Group</option>
                    {Object.keys(fieldGroups).map((group) => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                  <input className="border p-2" placeholder="Field Name" value={newField.name} onChange={(e) => setNewField({ ...newField, name: e.target.value })} />
                  <input className="border p-2" placeholder="Label" value={newField.label} onChange={(e) => setNewField({ ...newField, label: e.target.value })} />
                  <select className="border p-2" value={newField.type} onChange={(e) => setNewField({ ...newField, type: e.target.value })}>
                    <option value="">Field Type</option>
                    <option value="text">Text</option>
                    <option value="date">Date</option>
                    <option value="dropdown">Dropdown</option>
                  </select>
                  {newField.type === "dropdown" && (
                    <input className="border p-2 col-span-2" placeholder="Options (comma separated)" value={newField.options} onChange={(e) => setNewField({ ...newField, options: e.target.value })} />
                  )}
                </div>
                <button onClick={addNewField} className="mt-4 bg-green-600 text-white px-4 py-2 rounded" disabled={!newField.group || !newField.name || !newField.label || !newField.type}>➕ Add Field</button>
              </div>
            </>
          )}

          {activeTab === "meta" && (
            <>
              {Object.entries(fieldMeta).map(([field, meta]: any) => (
                <div key={field} className="mb-4 border-b pb-2">
                  <div className="font-semibold">{field}</div>
                  <label className="block mb-1">Label:
                    <input className="border ml-2 px-2" value={meta.label} onChange={(e) => handleMetaChange(field, "label", e.target.value)} />
                  </label>
                  <label className="block mb-1">Type:
                    <select className="border ml-2 px-2" value={meta.type} onChange={(e) => handleMetaChange(field, "type", e.target.value)}>
                      <option value="text">Text</option>
                      <option value="date">Date</option>
                      <option value="dropdown">Dropdown</option>
                    </select>
                  </label>
                  {meta.type === "dropdown" && (
                    <label className="block">Options (comma separated):
                      <input className="border ml-2 px-2 mt-1 w-full" value={meta.options?.join(", ") || ""} onChange={(e) => handleMetaChange(field, "options", e.target.value.split(",").map((o) => o.trim()))} />
                    </label>
                  )}
                </div>
              ))}
            </>
          )}
        </>
      )}

      <button onClick={saveAll} className="mt-6 bg-blue-600 text-white px-4 py-2 rounded">💾 Save Settings</button>
    </div>
  );
};

export default AdminSettings;
