export const TypeAgeResult = ({ type, value = "- -" }) => {
  return (
    <article className="text-5xl italic font-bold sm:text-6xl">
      <span className="text-purple mr-3">{value}</span>
      <span>{type}</span>
    </article>
  )
}
