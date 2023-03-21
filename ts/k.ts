import fetcher from "@/app/api/fetcher";
import { TranslateConfig } from "./jotai";
import { urlAddQuery } from "./util";

export const APIURL = "https://script.google.com/macros/s/AKfycbx23Gy7UiDJEfHi7--3cjgyVoAzlM2YRV8zEmiqjrZxNNW11ZbI7m_b7rnW1e02BrfJ-g/exec"

export const fetchTranslation = (transAtom: TranslateMulti) => (target: string) => {
  const url = urlAddQuery("https://script.google.com/macros/s/AKfycbx23Gy7UiDJEfHi7--3cjgyVoAzlM2YRV8zEmiqjrZxNNW11ZbI7m_b7rnW1e02BrfJ-g/exec")(
  transAtom.from.length === 0
  ? {
    target,
    text: transAtom.text
  }
  : {
    source: transAtom.from, //指定しない場合自動で検知してくれる
    target,
    text: transAtom.text,
  })
  console.log(url)
  return fetcher<AppScriptResponse>(url)
}

export const translatePerLine = (transAtom: TranslateMulti) => (target: string) => {
  return Promise.all(
    transAtom.text.split("\n").map(line => {
      return fetchTranslation({...transAtom, text: line})(target)
    })
  ).then(ps => ps.reduce((lines, line)=> lines + AppScriptResponseToString(line) + "\n", "").slice(0,-1))
}

export const AppScriptResponseToString = (res: AppScriptResponse): string =>
  res.code == 200 ? res.text : `error(${res.code})`

export const emptyInput: TranslateConfig = {
  from: "en",
  text: "",
  to: "ja",
}
export const targetLangs = ["ja", "en"] as const
export type TargetLang = typeof targetLangs[number]
const languageObj = {
  ja: "Japanese",
  en: "English",

}
export type TranslateMulti = {
  from: string
  to: string[]
  text: string
}
export const TranslateMultiDefault: TranslateMulti = {
  from: "en"
  ,to: ["ja"]
  ,text: ""
}
export type AppScriptResponse = {
  code: number
  text: string
}