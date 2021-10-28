export interface UserDto {
  name: string;
  lastName: string;
  roles: { idRole: number; idUser: string; }[];
  state: number;
}

export interface User {
  roles: { idRole: number; idUser: string; }[];
  username: string;
}

export interface UserResponse extends User {
  token?: string;
}

export interface UserProfile extends User {
  name?: string;
  lastName?: string;
  email?: string;
  state?: number;
}

export interface UserDetail {
  username: string;
  name: string;
  email: string;
  workload: string;
  state: string;
}

export interface UserCreated {
  email: string;
  password: string;
  username: string;
}
