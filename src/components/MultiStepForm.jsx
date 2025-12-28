import React, { useReducer } from "react";

/* ---------------- Initial State ---------------- */

const initialState = {
  step: 1,
  values: {
    name: "",
    email: "",
    username: "",
    password: ""
  },
  isSubmitted: false
};

/* ---------------- Reducer ---------------- */

function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value
        }
      };

    case "NEXT_STEP":
      return {
        ...state,
        step: state.step + 1
      };

    case "PREVIOUS_STEP":
      return {
        ...state,
        step: state.step - 1
      };

    case "SUBMIT_FORM":
      return {
        ...state,
        isSubmitted: true
      };

    case "RESET_FORM":
      return initialState;

    default:
      return state;
  }
}

/* ---------------- Component ---------------- */

export default function MultiStepForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { step, values, isSubmitted } = state;

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2>Step 1: Personal Details</h2>

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
            />

            <button
              disabled={!values.name || !values.email}
              onClick={() => dispatch({ type: "NEXT_STEP" })}
            >
              Next
            </button>
          </>
        );

      case 2:
        return (
          <>
            <h2>Step 2: Account Details</h2>

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
            />

            <button onClick={() => dispatch({ type: "PREVIOUS_STEP" })}>
              Back
            </button>

            <button
              disabled={!values.username || !values.password}
              onClick={() => dispatch({ type: "NEXT_STEP" })}
            >
              Next
            </button>
          </>
        );

      case 3:
        return (
          <>
            <h2>Step 3: Review & Submit</h2>

            <p><strong>Name:</strong> {values.name}</p>
            <p><strong>Email:</strong> {values.email}</p>
            <p><strong>Username:</strong> {values.username}</p>

            <button onClick={() => dispatch({ type: "PREVIOUS_STEP" })}>
              Back
            </button>

            <button onClick={() => dispatch({ type: "SUBMIT_FORM" })}>
              Submit
            </button>
          </>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div>
        <h2>✅ Registration Successful</h2>
        <button onClick={() => dispatch({ type: "RESET_FORM" })}>
          Register Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <p>Step {step} of 3</p>
      {renderStep()}
    </div>
  );
}
