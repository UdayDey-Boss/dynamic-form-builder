import { useState } from "react";

function PreviewPage() {
  const [fields] = useState(function () {
    const savedData = localStorage.getItem("saved_form");
    if (savedData !== null) {
      return JSON.parse(savedData);
    }
    return [];
  });

  const [submissions, setSubmissions] = useState(function () {
    const savedData = localStorage.getItem("submitted_data");
    if (savedData !== null) {
      return JSON.parse(savedData);
    }
    return [];
  });

  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

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

  function getMaxStep() {
    let max = 1;
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].step > max) {
        max = fields[i].step;
      }
    }
    return max;
  }

  function goNext() {
    for (let i = 0; i < fields.length; i++) {
      let field = fields[i];
      if (
        field.step === currentStep &&
        field.required === true &&
        isFieldVisible(field) === true
      ) {
        let value = formData[field.id];
        if (value === undefined || value === "") {
          alert("Please fill: " + field.label);
          return;
        }
      }
    }
    setCurrentStep(currentStep + 1);
  }

  function goBack() {
    setCurrentStep(currentStep - 1);
  }

  function handleSubmit(e) {
    e.preventDefault();

    for (let i = 0; i < fields.length; i++) {
      let field = fields[i];
      if (
        field.step === currentStep &&
        field.required === true &&
        isFieldVisible(field) === true
      ) {
        let value = formData[field.id];
        if (value === undefined || value === "") {
          alert("Please fill: " + field.label);
          return;
        }
      }

      let value = formData[field.id];
      if (isFieldVisible(field) === true && field.regex !== "" && value) {
        let pattern = new RegExp(field.regex);
        if (pattern.test(value) === false) {
          alert("Invalid format for: " + field.label);
          return;
        }
      }
    }

    const newSubmission = {
      id: Math.random(),
      data: formData,
    };

    const newSubmissions = submissions.concat(newSubmission);
    setSubmissions(newSubmissions);
    localStorage.setItem("submitted_data", JSON.stringify(newSubmissions));

    alert("Form submitted successfully!");
    setFormData({});
    setCurrentStep(1);
  }

  function exportJSON() {
    if (submissions.length === 0) {
      alert("No submissions to export.");
      return;
    }

    const dataString = JSON.stringify(submissions);
    const blob = new Blob([dataString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "form_submissions.json";
    link.click();
  }

  const inputClass =
    "border border-slate-300 p-2.5 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-violet-500";

  return (
    <div className="min-h-screen bg-violet-50">
      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 py-10 px-4 text-center">
        <h1 className="text-3xl font-bold text-white">📝 Form Preview</h1>
        <p className="text-violet-100 text-sm mt-2">
          Step {currentStep} of {getMaxStep()}
        </p>
        <div className="max-w-xs mx-auto bg-white/30 rounded-full h-2 mt-4">
          <div
            className="bg-white h-2 rounded-full transition-all"
            style={{ width: (currentStep / getMaxStep()) * 100 + "%" }}
          ></div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md border border-violet-100 border-t-4 border-t-violet-500 p-8 mb-6">
          {fields.length === 0 && (
            <p className="text-slate-500 text-center py-8">
              📭 No form saved yet.
            </p>
          )}

          {fields.length > 0 && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {fields.map(function (field) {
                if (field.step !== currentStep) {
                  return null;
                }
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
                        value={formData[field.id] || ""}
                        onChange={function (e) {
                          handleInputChange(field.id, e.target.value);
                        }}
                        className={inputClass}
                      />
                    )}

                    {field.type === "email" && (
                      <input
                        type="email"
                        value={formData[field.id] || ""}
                        onChange={function (e) {
                          handleInputChange(field.id, e.target.value);
                        }}
                        className="border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 "
                        className={inputClass}
                      />
                    )}

                    {field.type === "number" && (
                      <input
                        type="number"
                        value={formData[field.id] || ""}
                        onChange={function (e) {
                          handleInputChange(field.id, e.target.value);
                        }}
                        className={inputClass}
                      />
                    )}

                    {field.type === "dropdown" && (
                      <select
                        value={formData[field.id] || ""}
                        onChange={function (e) {
                          handleInputChange(field.id, e.target.value);
                        }}
                        className={inputClass}
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

              <div className="flex justify-between mt-4">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="bg-slate-500 hover:bg-slate-600 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md"
                  >
                    ← Back
                  </button>
                )}

                {currentStep < getMaxStep() && (
                  <button
                    type="button"
                    onClick={goNext}
                    className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md ml-auto"
                  >
                    Next →
                  </button>
                )}

                {currentStep === getMaxStep() && (
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md ml-auto"
                  >
                    ✅ Submit Form
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md border border-violet-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-violet-800">
              📥 Submissions ({submissions.length})
            </h2>
            <button
              onClick={exportJSON}
              className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Export JSON
            </button>
          </div>

          {submissions.length === 0 && (
            <p className="text-slate-500 text-sm">No submissions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PreviewPage;
