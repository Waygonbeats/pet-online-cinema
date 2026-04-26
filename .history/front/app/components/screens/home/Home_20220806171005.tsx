
import { Layout } from "@/components/layout/Layout"
import { FC } from "react"
import{IHome} from "./home-interface"
 const Home:FC<IHome> = () => {
  return (
  <div>   
     <h1 >Home page</h1>
    <Layout/>

    
</div>

  )
}
export default Home

