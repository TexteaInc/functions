import {
  Checkbox,
  FormControlLabel
} from '@mui/material'
import { baseCellTypes, createSheetFunction } from '@textea/dev-kit/sheet'

export const toUpperCase = createSheetFunction(
  '9d22aac0-07b9-4ff4-92f5-abfb91bde75b',
  'To Upper Case',
  'map',
  {
    input: {
      type: baseCellTypes.string,
      name: 'Input'
    }
  },
  {
    output: {
      type: baseCellTypes.string,
      name: 'Output'
    }
  },
  {},
  async (columns) => {
    return { output: columns.input.map((text) => text.toUpperCase()) }
  },
  undefined
)

export const toLowerCase = createSheetFunction(
  '37bf1172-94ba-42d4-8530-0316bc7e2968',
  'To Lower Case',
  'map',
  {
    input: {
      type: baseCellTypes.string,
      name: 'Input'
    }
  },
  {
    output: {
      type: baseCellTypes.string,
      name: 'Output'
    }
  },
  {},
  async (columns) => {
    return { output: columns.input.map((text) => text.toLowerCase()) }
  },
  undefined
)

export type TokenizeConfig = {
  keepContractions: boolean
}

export const tokenize = createSheetFunction(
  'caff9337-1b32-4d59-92bf-d25671b3896c',
  'Tokenize',
  'map',
  {
    input: {
      type: baseCellTypes.string,
      name: 'Input'
    }
  },
  {
    output: {
      type: baseCellTypes.array,
      name: 'Output'
    }
  },
  {
    keepContractions: false
  },
  async (columns, config) => {
    if (config.keepContractions) {
      return {
        output: columns.input.map(
          text => String(text).match(/\w[\w'-.]*[\w']|\w|[^\w\s]+/g) ?? [text])
      }
    } else {
      return {
        output: columns.input.map(
          text => String(text).match(/'?\w+|[^\w\s]+/g) ?? [text])
      }
    }
  },
  (props) => {
    return (
      <FormControlLabel
        label="keep_contractions"
        control={
          <Checkbox
            checked={props.config.keepContractions}
            onChange={(event) => {
              props.onChangeConfig((config) => ({
                ...config,
                keepContractions: event.target.checked
              }))
            }}
          />
        }
      />
    )
  }
)
