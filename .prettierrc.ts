import type { Config } from "prettier";
import type { SqlFormatOptions } from "prettier-plugin-sql";

const sqlOptions: SqlFormatOptions = {
  formatter: "sql-formatter",

  language: "postgresql",
  keywordCase: "lower",
  dataTypeCase: "lower",
  functionCase: "upper",
  identifierCase: "upper",
  indentStyle: "standard",
  linesBetweenQueries: 3,
};

const config: Config = {
  experimentalTernaries: true,
  plugins: ["prettier-plugin-sql"],
  ...sqlOptions,
};

export default config;
