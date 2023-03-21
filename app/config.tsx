"use client"

import { appConfigAtom, atomLangSpecifiConfig, defaultAppConfig, defaultLangSpecifiConfig, LangSpecifiConfig } from "@/ts/jotai";
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select } from "@mui/material";
import { useAtom } from "jotai";
import { Controller, Path, useForm, useWatch } from "react-hook-form";
import { translateByList, translateFromMap, UIlang, UIlanguageList } from "@/ts/tagengo";
import ISO6391 from "iso-639-1"
import React, { FC, useEffect } from "react";
import { anywayAt } from "@/ts/util";

type Form = {
  lang: string
  multiline: boolean
}

export default function Config() {
  return(<>
    <AppConfig/>
    <LangSpecifiConfig/>
  </>)
}

const LangSpecifiConfig: React.FC = () => {
  type Form = LangSpecifiConfig
  const [appconfig, setAppconfig] = useAtom(appConfigAtom)
  const [specificonfig, setSpecificonfig] = useAtom(atomLangSpecifiConfig)
  const mapForTranslate = new Map<Path<Form>, string[]>([
    ["zh.pinyin", ["pinyin", "拼音"]],
    ["zh.pinyin_display", ["pinyin display", "拼音表示方式"]],
    ["zh.pinyin_position", ["pinyin position", "拼音表示位置"]]
  ])
  const {control} = useForm<Form>({
    defaultValues: specificonfig
  })
  const useWatchValue = useWatch({control})
  useEffect(()=>{
    console.log("specificonfig:", specificonfig)
    console.log("specific useWatchValue:", useWatchValue)
    setSpecificonfig({
      ...specificonfig,
      zh: {
        ...specificonfig.zh,
        pinyin: useWatchValue.zh?.pinyin ?? specificonfig.zh.pinyin
      }
    })
  }, [useWatchValue])
  const translateLabel = translateFromMap(appconfig.lang)(mapForTranslate)
  const MUIcheckbox: FC<{name: Path<Form>}> = function NamedMUIcheckbox({name}) {return (
    <Controller
      control={control}
      name={name}
      render={({field})=>(
          <FormControlLabel {...field}
            control={<Checkbox
              checked={specificonfig.zh.pinyin}
              />} label={ translateLabel(name)} />
      )}
    />
  )}


  const MUISelect = (value_display_items: [string, string][]) : FC<{name: Path<Form>}> => function NamedMUIselect({name}){return (
    <Controller
      control={control}
      name={name}
      render={({field})=>(
        <FormControl>
          <InputLabel
            id={name+"label"}
          >{translateLabel(name)}</InputLabel>
          <Select {...field}
            id={name}
            labelId={name+"label"}
          >
            {value_display_items.map(([value, display]) =>
              <MenuItem
                key={value}
                value={value}>
                  {display}
              </MenuItem>
              )}
          </Select>
        </FormControl>
      )} />
  )}
  const translateMenuitems: Map<Path<Form>, Map<string, string[]>> = new Map([
    ["zh.pinyin_display", new Map([
      ["line", ["line", "線"]],
      ["zi", ["with character", "字毎"]]
    ])],
    ["zh.pinyin_position", new Map([
      ["above", ["above", "上"]],
      ["below", ["below", "下"]],
    ])]
  ])
  const MUISelectOptionFilled: FC<{name: Path<Form>}> = ({name}) => {
    const options = [... translateMenuitems.get(name)??[]]
    .map(([value, transs])=>
      [value,
      anywayAt(value)(transs)(
        UIlanguageList.findIndex(e => e == appconfig.lang))
      ] as [string, string]
      )
    const Fc = MUISelect(options)
    return <Fc name={name} />
  }
  return(
    <Box
      component="form"
      className="specifiConfig"
    >
      <FormGroup>
        <MUIcheckbox name="zh.pinyin" />
      </FormGroup>
      <MUISelectOptionFilled name="zh.pinyin_display"/>
      <MUISelectOptionFilled name="zh.pinyin_position"/>
    </Box>
  )
}



const AppConfig: React.FC = () => {
  const [appconfig, setAppconfig] = useAtom(appConfigAtom)
  const {getValues, control, watch} = useForm<Form>({
    defaultValues: {
    lang: appconfig.lang,
    multiline: appconfig.result.multiline,
  }})
  const formValue = useWatch({
    control,
  })
  useEffect(()=>{
    console.log("config form value", formValue)
    setAppconfig({
      ...appconfig,
      lang: (formValue.lang ?? defaultAppConfig.lang) as UIlang
      ,result: {
        multiline: formValue.multiline ?? defaultAppConfig.result.multiline
      }
    })
  }, [formValue])

  const nameToLabels = (name: Path<Form>) =>
    name=="lang"
    ? ["UI language", "表示言語"]
    : [name]


  return(
    <Box
      component={"form"}
      className="appConfig"
    >
      <Controller
        control={control}
        name="lang"
        render={({field})=>(
          <FormControl>
            <InputLabel id="config.lang">
              {translateByList(appconfig.lang)(nameToLabels("lang"))}
            </InputLabel>
            <Select {...field}
              labelId="config.lang"
              value={appconfig.lang}
            >
              {UIlanguageList.map(lang =>
                <MenuItem
                  key={lang}
                  value={lang}
                >
                  {ISO6391.getNativeName(lang)}
                </MenuItem> )}
            </Select>
          </FormControl>
        )}
      />
      <FormGroup>
        <Controller
          control={control}
          name="multiline"
          render={({field})=>(
              <FormControlLabel {...field}
                control={<Checkbox  />} label={"multiline"} />

          )}
        />
      </FormGroup>
    </Box>
  )
}