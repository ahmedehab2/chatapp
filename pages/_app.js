import { AuthContext } from "context/AuthContext";
import { ChatContext } from "context/ChatContext";
import { Fragment, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import "../styles/global.css";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }) {
  const Layout = Component.Layout || Fragment;

  const isdesktop = useMediaQuery({ minWidth: 1024 });

  /////////////////////// fixing hydrating error

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  ////////////////////
  //  add Sidebar layout when device width >1024
  return (
    <AuthContext>
      <ChatContext>
        <ThemeProvider attribute="class">
          {isdesktop ? (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Component {...pageProps} />
          )}
        </ThemeProvider>
      </ChatContext>
    </AuthContext>
  );
}
