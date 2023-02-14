import nookies from "nookies";
import { firebaseAdmin } from "FirebaseAdmin";
import Layout from "components/Layout";
import Image from "next/image";
import SmallerSideBar from "components/sidebar/SmallerSideBar";
import Head from "next/head";

const Chats = ({ token }) => {
  return (
    token && (
      <>
        <Head>
          <title>Textto</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <div className="flex flex-col flex-1 items-center justify-center bg-white dark:bg-gray-800">
          <div className="hidden lg:block">
            <Image src="/chat.svg" width={300} height={300} alt="chat" />
            <h2 className="text-xl text-gray-300 text-center ">
              select chat to start
            </h2>
          </div>
          <SmallerSideBar />
        </div>
      </>
    )
  );
};
Chats.Layout = Layout;

export const getServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    return {
      props: { token: token },
    };
  } catch (err) {
    context.res.writeHead(302, { Location: "/login" });
    context.res.end();
    return { props: {} };
  }
};
export default Chats;
