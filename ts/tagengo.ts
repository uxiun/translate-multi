import { defaultAppConfig } from "./jotai"
import { anywayAt, ifelse } from "./util"

export type UIid =
  "input-label"
  |"controller.required"
  |"target.lang.label"
  |"form.select.from.label"
  |"form.select.multi.required"
  |"form length limit"
  |"translate"

export const UIlanguageList: UIlang[] = ["en", "ja"]
// export type UIlang = typeof UIlanguageList[number]
export type UIlang = "en"|"ja"
const translateUIrecord: Record<UIid, string[]> = {
  "input-label": ["text to translate", "翻訳対象"]
  ,"controller.required": ["type something", "入力してください"]
  ,"target.lang.label": ["target language", "目標言語"]
  ,"form.select.multi.required": ["select at least one language", "最低一つは言語を選択してください"]
  ,"form.select.from.label": ["source language", "原始言語（翻訳元）"]
  ,"form length limit": [`within ${defaultAppConfig.form.limit} characters`, `${defaultAppConfig.form.limit}字以内に収めてください`]
  ,"translate": ["translate", "翻訳"]
}
export const translateUI = (lang: UIlang) => (id: UIid) : string => {
  return ifelse(UIlanguageList.findIndex(e => e == lang))(i => i >= 0)
    (i => translateUIrecord[id].at(i) ?? "undefined")
    (i => "language not found")
}

export const translateByList =
(lang: UIlang) =>
(translationList: string[]) =>
  ifelse(UIlanguageList.findIndex(d => d == lang))
  (i => i >= 0)
  (i => anywayAt("")(translationList)(i))
  (i => "")

export const translateFromMap = (lang: UIlang) => <T>(hashmap: Map<T, string[]>) => (key: T) => {
  return anywayAt("no translation")
  (hashmap.get(key)??[])
  (UIlanguageList.findIndex(d => d == lang))
}
