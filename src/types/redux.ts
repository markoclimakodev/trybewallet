export interface UserLoginData {
  email: string,
  password:string,
}

export interface RootReducerState {
  user: UserLoginData
}
