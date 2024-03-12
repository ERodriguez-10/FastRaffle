const Card = ({ title, description, code }) => {
  return (
    <div className="w-full h-32 p-6 pr-12 text-start border border-gray-400 rounded-xl">
      <h2 className="text-white font-bold text-xl">{title}</h2>
      <p className="text-gray-400">{description}</p>
      <div>
        <p className="text-white font-bold inline">Participation Code: </p>
        <p className="text-gray-400 inline">{code}</p>
      </div>
    </div>
  )
}

export default Card