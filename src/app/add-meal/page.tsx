// src/app/add-meal/page.tsx
import NewMealForm from "./NewMealForm";

export default function AddMealPage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Agregar una nueva comida</h1>
      <NewMealForm />
    </main>
  );
}
