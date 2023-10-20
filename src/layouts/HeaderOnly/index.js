import Header from "~/layouts/components/Header";

function HeaderOnly({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default HeaderOnly;
