import { formValidations } from "../../formValidation.js"

import { useState } from "react"
import { Input } from "./Input"
import { Button } from "../Button"

import arrowDown from "../../assets/images/icon-arrow.svg"

export const Form = ({ getValuesForm }) => {
  const { createInputsCollection, handleSendFormValues } = formValidations

  const [dayValue, setDayValue] = useState("")
  const [monthValue, setMonthValue] = useState("")
  const [yearValue, setYearValue] = useState("")

  const [errors, setErrors] = useState({
    form: {
      error: false,
      message: "Must be a valid date"
    },

    day: {
      error: false,
      message: "Must be a valid day",
    },

    month: {
      error: false,
      message: "Must be a valid month",
    },

    year: {
      error: false,
      message: "Must be a valid year",
    },
  })

  const inputsCollection = [
    createInputsCollection("day", "DD", dayValue, setDayValue, true, 2),
    createInputsCollection("month", "MM", monthValue, setMonthValue, true, 2),
    createInputsCollection("year", "YY", yearValue, setYearValue, true, 4),
  ]

  const resetStates = () => {
    setDayValue("")
    setMonthValue("")
    setYearValue("")

    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        const errorObj = errors[key]

        errorObj.error = false
      }
    }
  }

  const handleForm = (e) => {
    e.preventDefault()

    if (handleSendFormValues(dayValue, monthValue, yearValue, inputsCollection, errors, setErrors)) {
      getValuesForm({
        dayValue,
        monthValue,
        yearValue,
      })

      resetStates()
    }
  }

  return (
    <>
      <form className="flex flex-col gap-2" onSubmit={handleForm}>

        <div className="flex flex-col gap-6">
          <section className="flex justify-between sm:justify-start sm:gap-8">
            {
              inputsCollection.map((inputItem) => (
                <Input
                key={inputItem.input}
                input={inputItem.input}
                placeholder={inputItem.placeholder}
                value={inputItem.value}
                maxLength={inputItem.maxLength}
                setValue={inputItem.setValue}
                hasError={errors[inputItem.input]}
                hasErrorForm={errors.form.error}
                />
              ))
            }
          </section>

          {
            errors.form.error && 
              <p className="pl-1 text-error self-center sm:self-start">
                {errors.form.message}
              </p>
          }
        </div>


        <Button valueBtn={<img src={arrowDown} alt="arrow-down" className="w-8" />} />
        
        <hr className="relative top-[-2.5rem]"></hr>
      </form>

    </>
  )
}

