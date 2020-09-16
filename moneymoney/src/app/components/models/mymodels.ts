export class LoginModel {
    username: string;
    password: string;
}

export interface UserResponse {
    id: number;
    first_name: string;
    last_name: string;
    role: number;
}
