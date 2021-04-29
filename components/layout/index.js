import BaseLayout from "./base"
import Header from "./header"

const Layout = ({ children, title, className, disableHeader }) => (
  <>
    {!disableHeader && <Header />}

    <BaseLayout className={className}>
      {title && <h1 className="text-3xl">{title}</h1>}

      {children}
    </BaseLayout>
  </>
)

export default Layout
