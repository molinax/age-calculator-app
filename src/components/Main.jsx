import { useState } from "react"
import { Form } from "./FormComponents/Form"
import { AgeResults } from "./ResultAgeComponents/AgeResults"

export const Main = () => {
  const [result, setResult] = useState([])
  
  const getValuesForm = (obj) => {
    setResult([obj])
  }

  return (
    <main className="min-h-screen w-full bg-light-grey flex items-center justify-center">
      <section className= "card-container py-12 px-4 rounded-2xl rounded-br-[6rem] flex flex-col items-center justify-center gap-6 sm:rounded-br-[10rem] sm:gap-0 sm:px-6 md:px-8">
        <header className="w-full">
          <Form getValuesForm={getValuesForm} />
        </header>

        <AgeResults dateResults={result} />
      </section>
    </main>
  )
}
