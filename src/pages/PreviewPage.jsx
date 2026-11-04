import { useState } from "react";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

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
                  <FormInput
                    key={field.id}
                    field={field}
                    value={formData[field.id]}
                    handleInputChange={handleInputChange}
                  />
                );
              })}

              <div className="flex justify-between mt-4">
                {currentStep > 1 && (
                  <Button type="button" color="gray" onClick={goBack}>
                    ← Back
                  </Button>
                )}

                {currentStep < getMaxStep() && (
                  <Button type="button" onClick={goNext}>
                    Next →
                  </Button>
                )}

                {currentStep === getMaxStep() && (
                  <Button type="submit" color="green">
                    ✅ Submit Form
                  </Button>
                )}
              </div>
            </form>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md border border-violet-100 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-violet-800">
              📥 Total Submissions: {submissions.length}
            </h2>
            <Button color="dark" onClick={exportJSON}>
              Export JSON
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewPage;
