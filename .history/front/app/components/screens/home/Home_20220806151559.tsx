import { Layout } from "@/components/layout/Layout"
import { FC } from "react"
import{IHome} from "./home-interface"
export const Home:FC<IHome> = () => {
  return (
  <div>
    <Layout/>
    <h1 >Home page</h1>
    
</div>
  )
}

