import { NextRequest, NextResponse } from "next/server";

export function successResponse<T>(status: number, message: string, data?: T) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status },
  );
}

export function errorResponse<T>(status: number, message: string, data?: T) {
  return NextResponse.json(
    {
      success: false,
      message,
      data,
    },
    { status },
  );
}
