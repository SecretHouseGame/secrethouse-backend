declare global {
  namespace NodeJS {
    interface ProcessEnv {
      db_name: string;
      db_user: string;
      db_password: string;
      db_host: string;
      db_port: string;
      secret_key: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
