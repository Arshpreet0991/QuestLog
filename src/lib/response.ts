<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server";

export function successResponse<T>(status: number, message: string, data?: T) {
  return NextResponse.json(
=======
import { ApiResponse } from "@/types/ApiResponse";
import { NextResponse } from "next/server";

export function successResponse<T>(status: number, message: string, data?: T) {
  return NextResponse.json<ApiResponse<T>>(
>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948
    {
      success: true,
      message,
      data,
    },
    { status },
  );
}

export function errorResponse<T>(status: number, message: string, data?: T) {
<<<<<<< HEAD
  return NextResponse.json(
=======
  return NextResponse.json<ApiResponse<T>>(
>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948
    {
      success: false,
      message,
      data,
    },
    { status },
  );
}
