import { Layout } from "@/components/layout/Layout"
import { FC } from "react"
import{IHome} from "./home-interface"
const HomePage:FC<IHome> = () => {
  return (
  <div>
    <Layout/>
    <h1>Home page</h1>
    
</div>
  )
}
export default HomePage
