import FormikAutocomplete from './Autocomplete'
import FormikCheckbox from './Checkbox'
import FormikDatePicker from './DatePicker'
import FormikDateRangePicker from './DateRangePicker'
import FormikDateTimePicker from './DateTimePicker'
import FastFieldWrapper from './FastField'
import FieldWrapper from './Field'
import FormikRadioButton from './RadioButton'
import FormikRadioGroup from './RadioGroup'
import FormikSwitch from './Switch'
import FormikTextField from './TextField'
import FormikTimePicker from './TimePicker'

export const Field = {
  TextField: FieldWrapper(FormikTextField),
  Checkbox: FieldWrapper(FormikCheckbox),
  DatePicker: FieldWrapper(FormikDatePicker),
  DateRangePicker: FieldWrapper(FormikDateRangePicker),
  Autocomplete: FieldWrapper(FormikAutocomplete),
  RadioButton: FieldWrapper(FormikRadioButton),
  RadioGroup: FieldWrapper(FormikRadioGroup),
  Switch: FieldWrapper(FormikSwitch),
  DateTimePicker: FieldWrapper(FormikDateTimePicker),
}

export const FastField = {
  TextField: FastFieldWrapper(FormikTextField),
  Checkbox: FastFieldWrapper(FormikCheckbox),
  DatePicker: FastFieldWrapper(FormikDatePicker),
  DateRangePicker: FastFieldWrapper(FormikDateRangePicker),
  Autocomplete: FastFieldWrapper(FormikAutocomplete),
  RadioButton: FieldWrapper(FormikRadioButton),
  RadioGroup: FastFieldWrapper(FormikRadioGroup),
  Switch: FastFieldWrapper(FormikSwitch),
  TimePicker: FastFieldWrapper(FormikTimePicker),
  DateTimePicker: FieldWrapper(FormikDateTimePicker),
}
