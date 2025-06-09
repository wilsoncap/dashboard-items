'use client'

import { IoAlarm, IoCartOutline } from "react-icons/io5"
import { SimpleWidget } from "./SimpleWidget"
import { useAppSelector } from "@/store/counter/counterSlice"

const items = [
  {
        title: "Coffee",
        subTittle: "Productos agregados",
        icon: <IoCartOutline size={70} className="text-blue-700" />,
        href:"/dashboard/counter"
  },
  {
        title: "Milk",
        subTittle: "Productos Pendientes",
        icon: <IoAlarm size={70} className="text-blue-700" />,
        href:"/dashboard/counter"
  }
]

export const WidgetsGrid = () => {
  const isCart = useAppSelector(state => state.counter.count)
  return (
    <div className="flex flex-wrap p-2 items-center justify-center">
         {
        items.map(item => ( // <--- Cambia '{' por '(' y elimina el 'return' explícito si usas paréntesis
          <SimpleWidget
            key={item.title} // Asegúrate de tener una key única
            {...item}
            title={`${isCart}`}
          />
        ))
      }
        {/* <SimpleWidget
          subTittle= "Prodvtos agregados"
          title={`${isCart}`}
          label= "Contador"
          icon={<IoCartOutline size={70} className="text-blue-700" />}
        /> */}
    </div>
  )
}
