export interface UserDto {

}

export interface User {
  roles: { idRole: number; idUser: string; }[]
  username: string;
}

export interface UserResponse extends User {
  token?: string;
}
