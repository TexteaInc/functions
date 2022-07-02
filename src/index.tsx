import { Checkbox, FormControlLabel } from '@mui/material'
import {
  SheetTransformFunction
} from '@textea/shared'

export const toUpperCase: SheetTransformFunction = {
  id: '9d22aac0-07b9-4ff4-92f5-abfb91bde75b',
  type: 'transform',
  name: 'To Upper Case',
  defaultConfig: {},
  func: async (array: string[]) => {
    return array.map((text) => text.toUpperCase())
  }
}

export const toLowerCase: SheetTransformFunction = {
  id: '37bf1172-94ba-42d4-8530-0316bc7e2968',
  type: 'transform',
  name: 'To Lower Case',
  defaultConfig: {},
  func: async (array: string[]) => {
    return array.map((text) => text.toLowerCase())
  }
}

type TokenizeConfig = {
  keepContractions: boolean
}

export const tokenize: SheetTransformFunction<TokenizeConfig> = {
  id: 'caff9337-1b32-4d59-92bf-d25671b3896c',
  type: 'transform',
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

export const transformers: SheetTransformFunction<any>[] = [
  toUpperCase,
  toLowerCase,
  tokenize
]
