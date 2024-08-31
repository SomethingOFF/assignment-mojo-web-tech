import { useEffect, useState } from "react";
import FacebookLoginButton from "./components/Login";
import UserProfile from "./components/user-profile"
import PageSelector from "./components/pages";
import PageInsights from "./components/page-insights";
function App() {
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [accessPageToken, setAccessPageToken] = useState(null);

  useEffect(() => {
    const loadFacebookSdk = () => {
      if (window.FB) {
        return;
      }

      window.fbAsyncInit = function () {
        window.FB.init({
          appId: "1885054775311044",
          cookie: true,
          xfbml: true,
          version: 'v17.0'
        });

        window.FB.AppEvents.logPageView();
      };

      (function (d, s, id) {
        let js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    };

    loadFacebookSdk();
  }, [])

  console.log(accessPageToken)

  return (
    <>
      <div className="app">
        <h1>Facebook Insights App</h1>
        <FacebookLoginButton onLoginSuccess={setAccessToken} />
        {accessToken && (
          <>
            <UserProfile accessToken={accessToken} />
            <PageSelector accessToken={accessToken} setAccessPageToken={setAccessPageToken} onPageSelect={setSelectedPageId} />
            <PageInsights pageId={selectedPageId} accessToken={accessToken} accessPageToken={accessPageToken} />
          </>
        )}
      </div>

    </>
  )
}

export default App
