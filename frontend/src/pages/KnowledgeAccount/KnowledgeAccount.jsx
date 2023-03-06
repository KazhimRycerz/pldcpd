import "./KnowledgeAccount.scss";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import KnowledgeAccountMain from "../../components/KnowledgeAccountMain/KnowledgeAccountMain.jsx";
import AccountAside from "../../components/AccountInfoAside/AccountInfoAside.jsx";

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
