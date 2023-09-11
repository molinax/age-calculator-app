export const Input = ({ input, placeholder, value, setValue, isRequired, maxLength, hasError, hasErrorForm }) => {
  const numberRegex = /^[0-9]+$/

  const handleInputValue = (value) => numberRegex.test(value) ? setValue(value) : setValue("")

  return (
    <article className="flex flex-col w-24 sm:w-28">
      <label className={`text-sm uppercase tracking-widest mb-1 w-max ${(hasError.error || hasErrorForm) ? "text-light-red/90" : "text-smokey-grey"}`}>
        {input}
      </label>

      <input
        className={`input-style ${(hasError.error || hasErrorForm) && "border-light-red/50 focus:border-light-red"}`}
        input={input}
        value={value}
        placeholder={placeholder}
        required={isRequired}
        maxLength={maxLength}
        onChange={(e) => handleInputValue(e.target.value)}
      />

      {
        hasError.error &&
          <p className="mt-2 pl-1 text-error">
            {hasError.message}
          </p>
      }
    </article>
  )
}
