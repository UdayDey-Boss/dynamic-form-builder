import { useState } from "react";
import { ReactSortable } from "react-sortablejs";

function BuilderPage() {
  const [fields, setFields] = useState(function () {
    const savedData = localStorage.getItem("saved_form");
    if (savedData !== null) {
      return JSON.parse(savedData);
    }
    return [];
  });

  const [selectedType, setSelectedType] = useState("text");

  function addField() {
    const newField = {
      id: Math.random(),
      type: selectedType,
      label: "New " + selectedType + " field",
      required: false,
      options: [],
    };
    const newFields = fields.concat(newField);
    setFields(newFields);
  }

  function deleteField(id) {
    const newFields = fields.filter(function (field) {
      return field.id !== id;
    });
    setFields(newFields);
  }

  function changeLabel(id, newValue) {
    const newFields = fields.map(function (field) {
      if (field.id === id) {
        const changed = {
          id: field.id,
          type: field.type,
          label: newValue,
          required: field.required,
          options: field.options,
        };
        return changed;
      }
      return field;
    });
    setFields(newFields);
  }

  function changeRequired(id, newValue) {
    const newFields = fields.map(function (field) {
      if (field.id === id) {
        const changed = {
          id: field.id,
          type: field.type,
          label: field.label,
          required: newValue,
          options: field.options,
        };
        return changed;
      }
      return field;
    });
    setFields(newFields);
  }

  function changeOptions(id, newValue) {
    const newFields = fields.map(function (field) {
      if (field.id === id) {
        const optionsArray = newValue.split(",");
        const changed = {
          id: field.id,
          type: field.type,
          label: field.label,
          required: field.required,
          options: optionsArray,
        };
        return changed;
      }
      return field;
    });
    setFields(newFields);
  }

  function saveForm() {
    localStorage.setItem("saved_form", JSON.stringify(fields));
    alert("Form saved successfully!");
  }

  return (
    <div className="min-h-screen bg-violet-50">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 py-10 px-4">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Form Builder</h1>
            <p className="text-violet-100 mt-1">
              Design your custom form with drag & drop
            </p>
            <p className="text-violet-200 text-sm mt-2">
              Total fields: {fields.length}
            </p>
          </div>
          <button
            onClick={saveForm}
            className="bg-white text-violet-700 hover:bg-violet-100 px-6 py-2.5 rounded-lg font-semibold shadow-md"
          >
            Save Form
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md border border-violet-100 p-4 mb-8 flex flex-col sm:flex-row gap-3">
          <select
            value={selectedType}
            onChange={function (e) {
              setSelectedType(e.target.value);
            }}
            className="flex-1 border border-violet-200 p-2.5 rounded-lg bg-violet-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="text">Text Field</option>
            <option value="email">Email Field</option>
            <option value="number">Number Field</option>
            <option value="dropdown">Dropdown Field</option>
            <option value="checkbox">Checkbox Field</option>
          </select>

          <button
            onClick={addField}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-md"
          >
            + Add New Field
          </button>
        </div>

        <div>
          {fields.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-violet-200">
              <p className="text-violet-400 text-lg font-medium">
                No fields yet.
              </p>
              <p className="text-slate-400 text-sm">
                Add one above to get started.
              </p>
            </div>
          )}

          <ReactSortable
            list={fields}
            setList={setFields}
            handle=".drag-handle"
          >
            {fields.map(function (field) {
              return (
                <div
                  key={field.id}
                  className="bg-white border border-violet-100 border-l-4 border-l-violet-500 p-4 mb-3 rounded-lg shadow-md hover:shadow-lg flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="drag-handle cursor-grab text-violet-300 hover:text-violet-600 font-bold px-1 text-2xl select-none">
                      ⋮⋮
                    </span>

                    <input
                      type="text"
                      value={field.label}
                      onChange={function (e) {
                        changeLabel(field.id, e.target.value);
                      }}
                      className="border border-slate-200 bg-slate-50 p-2 rounded-lg flex-1 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />

                    <button
                      onClick={function () {
                        deleteField(field.id);
                      }}
                      className="bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 px-3 py-2 rounded-lg font-medium text-sm"
                    >
                      Delete
                    </button>
                  </div>

                  {field.type === "dropdown" && (
                    <div className="ml-10">
                      <p className="text-sm text-slate-500 mb-1">
                        Options (comma separated)
                      </p>
                      <input
                        type="text"
                        value={field.options.join(", ")}
                        onChange={function (e) {
                          changeOptions(field.id, e.target.value);
                        }}
                        className="border border-slate-200 p-2 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-4 ml-10 text-sm">
                    <span className="bg-violet-100 text-violet-700 px-2.5 py-1 rounded-md font-medium">
                      Type: {field.type}
                    </span>

                    <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={function (e) {
                          changeRequired(field.id, e.target.checked);
                        }}
                        className="w-4 h-4 accent-violet-600"
                      />
                      Required field
                    </label>
                  </div>
                </div>
              );
            })}
          </ReactSortable>
        </div>
      </div>
    </div>
  );
}

export default BuilderPage;
