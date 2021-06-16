import Layout from "../components/layout"
import { FaBomb } from "react-icons/fa"
const Custom404 = () => (
  <Layout disableCol className="flex-row items-center gap-x-2">
    <h1 className="mr-16 text-6xl font-bold">Error 404</h1>
    <FaBomb size="5rem" />
    <FaBomb size="5rem" />
  </Layout>
)

export default Custom404
