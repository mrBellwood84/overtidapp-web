/** interface for supported languages object */
export interface ILanguage {
  lang: string;
  code: string;
}

export const languagesSupported: ILanguage[] = [
  {
    lang: "English",
    code: "en",
  },
  {
    lang: "Norsk",
    code: "no",
  },
];
