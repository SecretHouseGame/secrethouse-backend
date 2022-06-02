export type LoginData = {
    email: string;
    password: string;
}

export function castToLoginData(value:any):LoginData | null {
  let data;
  try {
    data = value as LoginData;
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}
