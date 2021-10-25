export interface UserDto {

}

export interface User {
  roles: { idRole: number; idUser: string; }[]
  token: string;
  username: string;
}
