import Button from "../../components/Button/Button.jsx"
import Card from "../../components/Card/Card.jsx"

const Dashboard = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between text-white" style={{width: '100%'}}>
        <h1 className="my-auto font-bold text-2xl" style={{background: 'transparent', display: 'inline'}}>Dashboard</h1>
        <div className="">
          <Button           
            text={"Creator view"}
            bg={"transparent"}
            iconName={"ri-admin-line"}
            className={"my-8 mx-2 px-6 py-2 rounded-md font-bold border border-gray-400"}
          />
          <Button           
            text={"Enter hackathon code"}
            bg={"#ffa988"}
            iconName={"ri-add-circle-line"}
            className={"my-8 mx-2 px-6 py-2 rounded-md font-bold text-black"}
          />
        </div>
      </div>
      <div className="w-full">
        <input 
          className="w-full p-2 border rounded-lg text-white" 
          type="text" 
          placeholder="Search..."
        />
      </div>
      <div className="h-full w-full">
        <div className="w-full my-10 grid grid-cols-3 gap-8">
          <Card 
            title={"Hackathon 1"}
            description={"Hola soy una descripcion de prueba"}
            code={"asd6893a"}
          />
          <Card 
            title={"Hackathon 1"}
            description={"Hola soy una descripcion de prueba"}
            code={"asd6893a"}
          />
          <Card 
            title={"Hackathon 1"}
            description={"Hola soy una descripcion de prueba"}
            code={"asd6893a"}
          />
          <Card 
            title={"Hackathon 1"}
            description={"Hola soy una descripcion de prueba"}
            code={"asd6893a"}
          />
          <Card 
            title={"Hackathon 1"}
            description={"Hola soy una descripcion de prueba"}
            code={"asd6893a"}
          />
          <Card 
            title={"Hackathon 1"}
            description={"Hola soy una descripcion de prueba"}
            code={"asd6893a"}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard