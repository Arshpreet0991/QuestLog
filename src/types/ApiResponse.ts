export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
<<<<<<< HEAD
=======

>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948
// data is optional, therefore the "?"
// T is the just a placeholder, widely expected by community
