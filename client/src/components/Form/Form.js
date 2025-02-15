import React, { useState } from "react";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import styles from "./Form.module.css";

const Form = ({ fields, handleSubmit }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <form   onSubmit={onSubmit}>
      {fields.map(({ label, type, name }) => (
        <div key={name}>
          <TextInput
            type={type}
            label={label}
            onChange={handleChange}
            name={name}
            value={formData[name]}
          />
        </div>
      ))}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Form;
