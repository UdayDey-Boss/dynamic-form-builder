import { useState } from "react";

function PreviewPage() {
  const [fields] = useState(function () {
    const savedData = localStorage.getItem("saved_form");
    if (savedData !== null) {
      return JSON.parse(savedData);
    }
    return [];
  });

  const [formData, setFormData] = useState({});

  function handleInputChange(fieldId, value) {
    const newData = {};
    for (let key in formData) {
      newData[key] = formData[key];
    }
    newData[fieldId] = value;
    setFormData(newData);
  }

  function isFieldVisible(field) {
    if (field.conditionFieldId === "") {
      return true;
    }

    const dependentValue = formData[field.conditionFieldId];

    let valueString = "";
    if (dependentValue !== undefined) {
      valueString = String(dependentValue).trim();
    }

    const conditionString = String(field.conditionValue).trim();

    if (valueString === conditionString) {
      return true;
    }
    return false;
  }

  function handleSubmit(e) {
    e.preventDefault();

    for (let i = 0; i < fields.length; i++) {
      let field = fields[i];

      if (isFieldVisible(field) === false) {
        continue;
      }

      let value = formData[field.id];

      if (field.regex !== "" && value) {
        let pattern = new RegExp(field.regex);
        let isValid = pattern.test(value);
        if (isValid === false) {
          alert("Invalid format for: " + field.label);
          return;
        }
      }
    }

    const existingSubmissions = localStorage.getItem("submitted_data");
    let submissionsArray = [];

    if (existingSubmissions !== null) {
      submissionsArray = JSON.parse(existingSubmissions);
    }

    const newSubmission = {
      id: Math.random(),
      data: formData,
    };

    submissionsArray = submissionsArray.concat(newSubmission);
    localStorage.setItem("submitted_data", JSON.stringify(submissionsArray));

    alert("Form submitted successfully!");
    setFormData({});
  }

  return (
    <div className="min-h-screen bg-violet-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-md border border-violet-100 p-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">
            Form Preview
          </h1>

          {fields.length === 0 && (
            <p className="text-slate-500 text-center py-8">
              No form saved yet.
            </p>
          )}

          {fields.length > 0 && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {fields.map(function (field) {
                if (isFieldVisible(field) === false) {
                  return null;
                }

                return (
                  <div key={field.id} className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-700">
                      {field.label}
                      {field.required === true && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>

                    {field.type === "text" && (
                      <input
                        type="text"
                        required={field.required}
                        value={formData[field.id] || ""}
                        onChange={function (e) {
                          handleInputChange(field.id, e.target.value);
                        }}
                        className="border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    )}

                    {field.type === "email" && (
                      <input
                        type="email"
                        required={field.required}
                        value={formData[field.id] || ""}
                        onChange={function (e) {
                          handleInputChange(field.id, e.target.value);
                        }}
                        className="border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    )}

                    {field.type === "number" && (
                      <input
                        type="number"
                        required={field.required}
                        value={formData[field.id] || ""}
                        onChange={function (e) {
                          handleInputChange(field.id, e.target.value);
                        }}
                        className="border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    )}

                    {field.type === "dropdown" && (
                      <select
                        required={field.required}
                        value={formData[field.id] || ""}
                        onChange={function (e) {
                          handleInputChange(field.id, e.target.value);
                        }}
                        className="border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      >
                        <option value="">Select an option</option>
                        {field.options.split(",").map(function (option) {
                          const cleanOption = option.trim();
                          if (cleanOption !== "") {
                            return (
                              <option key={cleanOption} value={cleanOption}>
                                {cleanOption}
                              </option>
                            );
                          }
                          return null;
                        })}
                      </select>
                    )}

                    {field.type === "checkbox" && (
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="checkbox"
                          required={field.required}
                          checked={formData[field.id] || false}
                          onChange={function (e) {
                            handleInputChange(field.id, e.target.checked);
                          }}
                          className="w-5 h-5 accent-violet-600"
                        />
                        <span className="text-sm text-slate-500">
                          Check this box
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}

              <button
                type="submit"
                className="mt-4 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
              >
                Submit Form
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default PreviewPage;
