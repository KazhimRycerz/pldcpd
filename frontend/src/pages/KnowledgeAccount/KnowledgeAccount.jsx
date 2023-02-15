import "./KnowledgeAccount.scss";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import KnowledgeAccountMain from "../../components/KnowledgeAccountMain/KnowledgeAccountMain.js";
import AccountAside from "../../components/AccountInfoAside/AccountInfoAside.js";

const KnowledgeAccount = () => {
  return (
    <>
      <Header />
      <AccountAside />
      <KnowledgeAccountMain />
      <Footer />
    </>
  );
};

export default KnowledgeAccount;
