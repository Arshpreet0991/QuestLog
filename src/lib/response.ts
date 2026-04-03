import { ApiResponse } from "@/types/ApiResponse";
import { NextResponse } from "next/server";

export function successResponse<T>(status: number, message: string, data?: T) {
  return NextResponse.json<ApiResponse<T>>(
    {
      success: true,
      message,
      data,
    },
    { status },
  );
}

export function errorResponse<T>(status: number, message: string, data?: T) {
  return NextResponse.json<ApiResponse<T>>(
    {
      success: false,
      message,
      data,
    },
    { status },
  );
}
