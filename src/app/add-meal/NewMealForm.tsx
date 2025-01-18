"use client";
import React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, Star, Users } from "lucide-react";

interface RatingSectionProps {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const RatingSection: React.FC<RatingSectionProps> = ({
  label,
  value,
  onChange,
  name,
}) => (
  <div className="space-y-2">
    <Label className="flex items-center gap-2">
      <Star className="w-4 h-4" />
      {label}: {value}
    </Label>
    <Slider
      value={[value]}
      onValueChange={(vals) =>
        onChange({
          target: {
            name,
            value: vals[0].toString(), // Convert number to string here
          } as unknown as HTMLInputElement, // Simulate the event's target
        } as React.ChangeEvent<HTMLInputElement>)
      }
      max={10}
      step={1}
      className="w-full"
    />
  </div>
);

const NewMealForm = () => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    locationLat: "",
    locationLng: "",
    cost: "",
    currency: "",
    tasteRating: 0,
    presentationRating: 0,
    ambianceRating: 0,
    qualityPriceRating: 0,
    comments: "",
    timeOfDay: "",
    recommendationSource: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleGetLocation = async () => {
    if (!navigator.geolocation) {
      alert("La geolocalización no es soportada por tu navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setForm({
          ...form,
          locationLat: latitude.toString(),
          locationLng: longitude.toString(),
        });
      },
      (error) => {
        console.error("Error obteniendo la ubicación:", error);
        alert("No se pudo obtener la ubicación.");
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/add-meal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Comida añadida con éxito");
        setForm({
          name: "",
          location: "",
          locationLat: "",
          locationLng: "",
          cost: "",
          currency: "",
          tasteRating: 0,
          presentationRating: 0,
          ambianceRating: 0,
          qualityPriceRating: 0,
          comments: "",
          timeOfDay: "",
          recommendationSource: "",
        });
      } else {
        throw new Error("Error en la respuesta del servidor");
      }
    } catch (error: any) {
      alert("Error al añadir la comida: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 p-4">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-purple-800">
            Registrar comida
          </CardTitle>
          <CardDescription>Guardar los detalles de la masacre.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sección básica */}
            <div className="space-y-4">
              <div>
                <Label>Nombre del Plato</Label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="ej: Pizza Margarita"
                  className="mt-1"
                />
              </div>

              {/* Sección de ubicación */}
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Ubicación
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Nombre del restaurante"
                    className="mt-1 flex-grow"
                  />
                  <Button
                    type="button"
                    onClick={handleGetLocation}
                    className="px-4 py-2 text-white bg-violet-500 rounded hover:bg-violet-600"
                  >
                    Obtener ubicación
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    name="locationLat"
                    value={form.locationLat}
                    onChange={handleChange}
                    placeholder="Latitud"
                    className="mt-1"
                  />
                  <Input
                    name="locationLng"
                    value={form.locationLng}
                    onChange={handleChange}
                    placeholder="Longitud"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Sección de costo */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Costo
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    name="cost"
                    value={form.cost}
                    onChange={handleChange}
                    placeholder="Cantidad"
                    className="mt-1"
                  />
                  <Select
                    name="currency"
                    value={form.currency}
                    onValueChange={(value) =>
                      handleChange({
                        target: { name: "currency", value },
                      } as unknown as React.ChangeEvent<HTMLSelectElement>)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Moneda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="YEN">YEN</SelectItem>
                      <SelectItem value="WON">WON</SelectItem>
                      <SelectItem value="ARS">ARS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Sección de horario */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Momento del Día
                </Label>
                <Select
                  name="timeOfDay"
                  value={form.timeOfDay}
                  onValueChange={(value) =>
                    handleChange({
                      target: { name: "timeOfDay", value },
                    } as unknown as React.ChangeEvent<HTMLSelectElement>)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el momento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desayuno">Desayuno</SelectItem>
                    <SelectItem value="almuerzo">Almuerzo</SelectItem>
                    <SelectItem value="cena">Cena</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Sección de ratings */}
            <div className="space-y-6 py-4 border-t border-b">
              <RatingSection
                label="Sabor"
                value={form.tasteRating}
                onChange={handleChange}
                name="tasteRating"
              />
              <RatingSection
                label="Presentación"
                value={form.presentationRating}
                onChange={handleChange}
                name="presentationRating"
              />
              <RatingSection
                label="Ambiente"
                value={form.ambianceRating}
                onChange={handleChange}
                name="ambianceRating"
              />
              <RatingSection
                label="Calidad/Precio"
                value={form.qualityPriceRating}
                onChange={handleChange}
                name="qualityPriceRating"
              />
            </div>

            {/* Sección final */}
            <div className="space-y-4">
              <div>
                <Label>Comentarios</Label>
                <Textarea
                  name="comments"
                  value={form.comments}
                  onChange={handleChange}
                  placeholder="Escribir reseña..."
                  className="mt-1"
                  rows={4}
                />
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Fuente de Recomendación
                </Label>
                <Input
                  name="recommendationSource"
                  value={form.recommendationSource}
                  onChange={handleChange}
                  placeholder="ej: Google Maps, Amigos, TikTok, vi en la calle, etc."
                  className="mt-1"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Guardar Experiencia
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewMealForm;
