export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

// data is optional, therefore the "?"
// T is the just a placeholder, widely expected by community
