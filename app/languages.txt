// "use client"
// import { jpToCodes } from "@/langs/jats"
// import { availableLanguagesAtom, codeToJpnameAtom, jpnamesToCodesAtom } from "@/ts/jotai"
// import { readFile, readFileSync } from "fs"
// import { useAtom } from "jotai"
// import React from "react"
// import { filetoMap, filetoMapRegExp } from "../ts/util"
// import Config from "./config"
// import Translate from "./translate"

// const FiletoAtom: React.FC = () => {
//   const [avl, setAvlangAtom] = useAtom(availableLanguagesAtom)
//   const [cjatom, setCodeJPnAtom] = useAtom(codeToJpnameAtom)
//   const [jcatom, setJPnCodeAtom] = useAtom(jpnamesToCodesAtom)

//   const jpnamesToCodes =
//     jpToCodes
//     // readLanguageList("../langs/ja.txt")
//   const codeToJpname =
//     new Map(
//       [...jpnamesToCodes].flatMap(([jp, codes])=> codes.map(code => [code, jp] as [string, string])))

//   const availableLanguages = Array.from(jpnamesToCodes.values()).flat()

//   setAvlangAtom(availableLanguages)
//   setJPnCodeAtom(jpnamesToCodes)
//   setCodeJPnAtom(codeToJpname)

//   return(<>
//     server side component
//   </>)

// }

// const readLanguageList = (filename: string) => {
//   let m = new Map<string,string[]>()
//   readFile(filename, (err, data)=>{
//     if (err) console.error(err)
//     else {
//       m = filetoMapRegExp(/\s+/)(data)
//     }
//   })
//   return m
// }

// export default FiletoAtom
export {}