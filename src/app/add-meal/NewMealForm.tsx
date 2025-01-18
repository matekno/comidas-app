// src/app/add-meal/NewMealForm.tsx
"use client";

import { useState } from "react";

export default function NewMealForm() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    cost: "",
    comments: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    const res = await fetch("/api/add-meal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Comida añadida con éxito");
      setForm({ name: "", location: "", cost: "", comments: "" });
    } else {
      alert("Error al añadir la comida");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Nombre de la comida"
        value={form.name}
        onChange={handleChange}
        className="p-2 border rounded"
      />
      <input
        type="text"
        name="location"
        placeholder="Ubicación (nombre del lugar)"
        value={form.location}
        onChange={handleChange}
        className="p-2 border rounded"
      />
      <input
        type="number"
        name="cost"
        placeholder="Costo"
        value={form.cost}
        onChange={handleChange}
        className="p-2 border rounded"
      />
      <textarea
        name="comments"
        placeholder="Comentarios"
        value={form.comments}
        onChange={handleChange}
        className="p-2 border rounded"
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Guardar
      </button>
    </form>
  );
}
