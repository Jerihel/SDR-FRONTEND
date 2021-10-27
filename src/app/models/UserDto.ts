export interface UserDto {

}

export interface User {
  roles: { idRole: number; idUser: string; }[]
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
