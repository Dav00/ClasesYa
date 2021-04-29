const BaseLayout = ({ children, className }) => (
  <main
    className={`flex flex-col items-center mt-4 gap-y-8 ${className ?? ""}`}
  >
    {children}
  </main>
)

export default BaseLayout
