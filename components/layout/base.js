const BaseLayout = ({ children, className, disableCol }) => (
  <>
    <main
      className={`flex  ${
        !disableCol ? "flex-col" : ""
      } items-center my-4 gap-y-8 max-w-screen-md w-full justify-center px-16 ${
        className ?? ""
      }`}
    >
      {children}
    </main>
  </>
)

export default BaseLayout
