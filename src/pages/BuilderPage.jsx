import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import FieldCard from "../components/FieldCard";
import Button from "../components/Button";

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
      options: "",
      regex: "",
      conditionFieldId: "",
      conditionValue: "",
      step: 1,
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
        return {
          id: field.id,
          type: field.type,
          label: newValue,
          required: field.required,
          options: field.options,
          regex: field.regex,
          conditionFieldId: field.conditionFieldId,
          conditionValue: field.conditionValue,
          step: field.step,
        };
      }
      return field;
    });
    setFields(newFields);
  }

  function changeRequired(id, newValue) {
    const newFields = fields.map(function (field) {
      if (field.id === id) {
        return {
          id: field.id,
          type: field.type,
          label: field.label,
          required: newValue,
          options: field.options,
          regex: field.regex,
          conditionFieldId: field.conditionFieldId,
          conditionValue: field.conditionValue,
          step: field.step,
        };
      }
      return field;
    });
    setFields(newFields);
  }

  function changeOptions(id, newValue) {
    const newFields = fields.map(function (field) {
      if (field.id === id) {
        return {
          id: field.id,
          type: field.type,
          label: field.label,
          required: field.required,
          options: newValue,
          regex: field.regex,
          conditionFieldId: field.conditionFieldId,
          conditionValue: field.conditionValue,
          step: field.step,
        };
      }
      return field;
    });
    setFields(newFields);
  }

  function changeRegex(id, newValue) {
    const newFields = fields.map(function (field) {
      if (field.id === id) {
        return {
          id: field.id,
          type: field.type,
          label: field.label,
          required: field.required,
          options: field.options,
          regex: newValue,
          conditionFieldId: field.conditionFieldId,
          conditionValue: field.conditionValue,
          step: field.step,
        };
      }
      return field;
    });
    setFields(newFields);
  }

  function changeConditionFieldId(id, newValue) {
    const newFields = fields.map(function (field) {
      if (field.id === id) {
        return {
          id: field.id,
          type: field.type,
          label: field.label,
          required: field.required,
          options: field.options,
          regex: field.regex,
          conditionFieldId: newValue,
          conditionValue: field.conditionValue,
          step: field.step,
        };
      }
      return field;
    });
    setFields(newFields);
  }

  function changeConditionValue(id, newValue) {
    const newFields = fields.map(function (field) {
      if (field.id === id) {
        return {
          id: field.id,
          type: field.type,
          label: field.label,
          required: field.required,
          options: field.options,
          regex: field.regex,
          conditionFieldId: field.conditionFieldId,
          conditionValue: newValue,
          step: field.step,
        };
      }
      return field;
    });
    setFields(newFields);
  }

  function changeStep(id, newValue) {
    const newFields = fields.map(function (field) {
      if (field.id === id) {
        return {
          id: field.id,
          type: field.type,
          label: field.label,
          required: field.required,
          options: field.options,
          regex: field.regex,
          conditionFieldId: field.conditionFieldId,
          conditionValue: field.conditionValue,
          step: Number(newValue),
        };
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
      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 py-10 px-4">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">📝 Form Builder</h1>
            <p className="inline-block bg-white/20 text-white text-sm mt-2 px-3 py-1 rounded-full">
              Total fields: {fields.length}
            </p>
          </div>
          <Button color="white" onClick={saveForm}>
            💾 Save Form
          </Button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md border border-violet-100 p-4 mb-8 flex flex-col sm:flex-row gap-3">
          <select
            value={selectedType}
            onChange={function (e) {
              setSelectedType(e.target.value);
            }}
            className="flex-1 border border-violet-200 p-2.5 rounded-lg bg-violet-50 text-slate-700"
          >
            <option value="text">Text Field</option>
            <option value="email">Email Field</option>
            <option value="number">Number Field</option>
            <option value="dropdown">Dropdown Field</option>
            <option value="checkbox">Checkbox Field</option>
          </select>
          <Button onClick={addField}>+ Add New Field</Button>
        </div>

        <div>
          {fields.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-violet-200">
              <p className="text-violet-400 text-lg font-medium">
                📋 No fields yet. Add your first field above.
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
                <FieldCard
                  key={field.id}
                  field={field}
                  fields={fields}
                  onDelete={deleteField}
                  onChangeLabel={changeLabel}
                  onChangeRequired={changeRequired}
                  onChangeOptions={changeOptions}
                  onChangeRegex={changeRegex}
                  onChangeConditionFieldId={changeConditionFieldId}
                  onChangeConditionValue={changeConditionValue}
                  onChangeStep={changeStep}
                />
              );
            })}
          </ReactSortable>
        </div>
      </div>
    </div>
  );
}

export default BuilderPage;
