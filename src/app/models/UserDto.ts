export interface UserDto {

}

export interface User {
  email: string;
  lastName: string;
  name: string;
  roles: { idRole: number; idUser: string; }[]
  token: string;
  username: string;
}
