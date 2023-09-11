import { formValidations } from "../../formValidation"
import { TypeAgeResult } from "./TypeAgeResult"

export const AgeResults = ({ dateResults }) => {    
  const { date } = formValidations
 
  const handleDateResults = () => {
    if (dateResults.length === 0) { return [] }
    
    const [ obj ] = dateResults
    const { dayValue, yearValue, monthValue } = obj

    return [
      {
        type: "years",
        value: yearValue > date.year ? yearValue - date.year : date.year - yearValue,
      },

      {
        type: "months",
        value: monthValue > date.month ? monthValue - date.month : date.month - monthValue,
      },

      {
        type: "days",
        value: dayValue > date.day ? dayValue - date.day : date.day - dayValue,
      },
    ]
  }

  const dateCollection = handleDateResults();

  return (
    <section className="flex flex-col self-start gap-2">
      {
        dateResults.length === 0 
          ?
            <>
              <TypeAgeResult type="years" />
              <TypeAgeResult type="months" />
              <TypeAgeResult type="days" />
            </>
          :
            dateCollection.map(dateItem => (
              <TypeAgeResult
                key={dateItem.type}
                type={dateItem.type}
                value={dateItem.value}
              />
            ))
      }
    </section>
  )
}
