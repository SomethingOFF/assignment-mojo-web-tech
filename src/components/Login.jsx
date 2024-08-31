

const FacebookLogin = ({ onLoginSuccess }) => {
    const handleLogin = () => {
        window.FB.login(function(response) {
          if (response.authResponse) {
            onLoginSuccess(response.authResponse.accessToken);
          } else {
            console.log('User cancelled login or did not fully authorize.');
          }
        }, {scope: 'public_profile,pages_show_list,pages_read_engagement,pages_read_user_content'});
      };

    return (
        <button onClick={handleLogin}>Login with Facebook</button>
    );
};

export default FacebookLogin;
