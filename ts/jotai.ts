import { atom, useAtom } from "jotai"
import { fetchTranslation, TranslateMulti } from "./k"
import { UIlang } from "./tagengo"

export type TranslateLanguages = {
  from: string
  to: string
}
export type TranslateConfig = {
  text: string
} & TranslateLanguages

export type AppConfig = {
  lang: UIlang
  form: {
    limit: number
  }
  result: {
    multiline: boolean
  }
}
export const defaultAppConfig: AppConfig = {
  lang: "ja",
  form: {
    limit: 200
  },
  result: {
    multiline: false
  }
}
export const appConfigAtom = atom
<AppConfig>(defaultAppConfig)
export const defaultInput: TranslateMulti = {
  text: "",
  from: "",
  to: ["ja"]
}
export const translateCurrentAtom = atom<TranslateMulti>(defaultInput)

export type LangSpecifiConfig = {
  zh: {
    pinyin: boolean
    pinyin_display: "line"|"zi"
    pinyin_position: "above"|"below"
  }
}
export const defaultLangSpecifiConfig: LangSpecifiConfig =
{
  zh: {
    pinyin: true,
    pinyin_display: "line",
    pinyin_position: "below"
  },
}

export const atomLangSpecifiConfig = atom<LangSpecifiConfig>(defaultLangSpecifiConfig)












export type StringsMap = Map<string, string[]>

export const nameToCodesByLang: Record<string, StringsMap> = {
  ja: jpToCodes,
  en: enToCodes,
}
export const langNameByLang = new Map(
  Object.entries(nameToCodesByLang).map(([lang, toCodes])=>
    [lang,
      new Map(
      [...toCodes].flatMap(([jp, codes])=> codes.map(code => [code, jp] as [string, string])))
    ] as [string, Map<string, string>]
  )
)




export const jpnamesToCodesAtom = atom<StringsMap>(jpToCodes)
export const codeToJpnameAtom = atom<Map<string, string>>(
  // new Map()
  new Map(
    [...jpToCodes].flatMap(([jp, codes])=> codes.map(code => [code, jp] as [string, string])))
)

export const availableLanguagesAtom = atom<string[]>(
  // []
  (()=>{
    const s = new Set(Array.from(jpToCodes.values()).flatMap(codes => codes[0]))
    // s.delete("zh-CN")
    return [...s]
  })()
)

import ISO6391 from "iso-639-1"
import { jpToCodes } from "@/langs/jats"
import { enToCodes } from "@/langs/ents"
import { idf, ifelse } from "./util"
export const getLanguageName =
// (codeToJpname: Map<string, string>) =>
(code: string) => (displayLangCode: UIlang) => {
  return langNameByLang.get(displayLangCode)?.get(code)
  ?? ifelse(ISO6391.getName(code))(n => n.length == 0)(n => code)(idf)

  // switch (displayLangCode) {
  //   case "ja": return codeToJpname.get(code) ?? code
  //   case "en":
  //     return (["zh", "zh-CN"].includes(code))
  //     ? "Simplified Chinese"
  //     : code == "zh-TW"
  //     ? "Traditional Chinese"
  //     : ISO6391.getName(code)
  //   default: return ISO6391.getNativeName(code)
  // }
}
export const langNameTranslate = (name: string) => (to: string) => {
  return fetchTranslation({
    from: "",
    to: [to],
    text: name
  })(to).then(res => res.text)
}
export const nonAlphabeticalLanguageMenuItem = (getLangName: (code: string) => (displayLangCode: UIlang) => string) => (code: string) => (displayLangCode: UIlang): string =>
  ["ja", "zh", "zh-TW", "zh-CN",].includes(displayLangCode)
  ? getLangName(code)("en") + ` ` + getLangName(code)(displayLangCode)
  : getLangName(code)("en")
