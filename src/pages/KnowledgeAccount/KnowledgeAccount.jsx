import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import KnowledgeAccountMain from "../../components/KnowledgeAccountMain/KnowledgeAccountMain.js";
import "./KnowledgeAccount.scss";

const KnowledgeAccount = () => {
  return (
    <>
      <Header />
      <KnowledgeAccountMain />
      <p>Hallo</p>
      {/* <AsideFootNote /> */}
      <Footer />
    </>
  );
};

export default KnowledgeAccount;
