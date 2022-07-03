import { Checkbox, FormControlLabel } from '@mui/material'
import type { SheetMapFunction } from '@textea/shared'

export const toUpperCase: SheetMapFunction = {
  id: '9d22aac0-07b9-4ff4-92f5-abfb91bde75b',
  type: 'map',
  name: 'To Upper Case',
  defaultConfig: {},
  func: async (array: string[]) => {
    return array.map((text) => text.toUpperCase())
  }
}

export const toLowerCase: SheetMapFunction = {
  id: '37bf1172-94ba-42d4-8530-0316bc7e2968',
  type: 'map',
  name: 'To Lower Case',
  defaultConfig: {},
  func: async (array: string[]) => {
    return array.map((text) => text.toLowerCase())
  }
}

type TokenizeConfig = {
  keepContractions: boolean
}

export const tokenize: SheetMapFunction<TokenizeConfig> = {
  id: 'caff9337-1b32-4d59-92bf-d25671b3896c',
  type: 'map',
  name: 'Tokenize',
  func: async (array: (string | number)[], config: TokenizeConfig) => {
    if (config.keepContractions) {
      return array.map(
        (text) => String(text).match(/\w[\w'-.]*[\w']|\w|[^\w\s]+/g) ?? [text])
    } else {
      return array.map(
        (text) => String(text).match(/'?\w+|[^\w\s]+/g) ?? [text])
    }
  },
  defaultConfig: {
    keepContractions: false
  },
  config: ({ config, onChangeConfig }) => {
    return (
      <FormControlLabel
        label="keep_contractions"
        control={
          <Checkbox
            checked={config.keepContractions}
            onChange={(event) => {
              onChangeConfig((config) => ({
                ...config,
                keepContractions: event.target.checked
              }))
            }}
          />
        }
      />
    )
  }
}

export const transformers: SheetMapFunction<any>[] = [
  toUpperCase,
  toLowerCase,
  tokenize
]
