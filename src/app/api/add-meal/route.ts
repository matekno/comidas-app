import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const { name, location, cost, comments } = await req.json();

    try {
        const meal = await prisma.meal.create({
            data: {
                name,
                location,
                cost: parseFloat(cost),
                comments,
            },
        });
        return NextResponse.json(meal, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error al guardar la comida" }, { status: 500 });
    }
}
