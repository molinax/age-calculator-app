//data
const currentDate = new Date()

const date = {
  day: currentDate.getDate(),
  month: currentDate.getMonth() + 1,
  year: currentDate.getFullYear(),
}

const maxDaysInMonth = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
}

const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;

//Form component
const createInputsCollection = (input, placeholder, value, setValue, isRequired, maxLength) => {
  return {
    input,
    placeholder,
    value,
    setValue,
    isRequired,
    maxLength,
  }
}

const verifyInputValue = (inputValue, input, setErrors, errorsObj) => {
  const changeToNumber = parseInt(inputValue)
  const updateErrors = { ...errorsObj }

  if (input === "day") {
    changeToNumber <= 31 && changeToNumber !== 0 ? (updateErrors[input].error = false) : (updateErrors[input].error = true)
  } else if (input === "month") {
    changeToNumber <= 12 && changeToNumber !== 0 ? (updateErrors[input].error = false) : (updateErrors[input].error = true)
  } else {
    changeToNumber <= 2023 ? (updateErrors[input].error = false) : (updateErrors[input].error = true)
  }

  setErrors(updateErrors)
}

const verifyIsDateCorrect = (day, month, year, errorsObj, setErrors) => {
  const dayToNumber = parseInt(day)
  const monthToNumber = parseInt(month)
  const yearToNumber = parseInt(year)

  const updateErrors = { ...errorsObj }
  maxDaysInMonth[2] = isLeapYear(year)

  if (dayToNumber > maxDaysInMonth[monthToNumber]) {
    updateErrors.form = { ...updateErrors.form, error: true }
    setErrors(updateErrors)
    return
  } else {
    updateErrors.form = { ...updateErrors.form, error: false }
    setErrors(updateErrors)
  }

  if (yearToNumber === date.year) {
    if (dayToNumber <= date.day && monthToNumber <= date.month) {
      updateErrors.form = { ...updateErrors.form, error: false }
      setErrors(updateErrors)
      return true
    } else {
      updateErrors.form = { ...updateErrors.form, error: true }
      setErrors(updateErrors)
      return
    }
  }

  return true
}

const handleSendFormValues = (day, month, year, inputsCollection, errorsObj, setErrors) => {
  verifyInputValue(day, inputsCollection[0].input, setErrors, errorsObj)
  verifyInputValue(month, inputsCollection[1].input, setErrors, errorsObj)
  verifyInputValue(year, inputsCollection[2].input, setErrors, errorsObj)

  let inputsCorrect = 0

  for (const key in errorsObj) {
    if (errorsObj.hasOwnProperty(key)) {
      const errorObj = errorsObj[key]

      if (key === "day" || key === "month" || key === "year") {
        !errorObj.error && inputsCorrect++
      }
    }
  }

  if (inputsCorrect === 3 && verifyIsDateCorrect(day, month, year, errorsObj, setErrors)) {
    return true
  } else {
    return false
  }
}

export const formValidations = {
  verifyInputValue,
  verifyIsDateCorrect,
  createInputsCollection,
  handleSendFormValues,
  date,
}