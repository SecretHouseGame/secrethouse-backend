export type UserData = {
    username: string;
    email: string;
    password: string;
}

export function castToUserData(value:any): UserData | null {
  let data: UserData;
  try {
    data = value as UserData;
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}
