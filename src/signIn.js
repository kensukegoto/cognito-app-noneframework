import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser
} from 'amazon-cognito-identity-js';

function singIn ({ userName, password }) {

  const USER_NAME = userName;
  const PASSWORD = password;

  const authenticationData = {
    Username: USER_NAME,
    Password: PASSWORD
  };

  const authenticationDetails = new AuthenticationDetails(authenticationData);
  // 環境変数
  const poolData = {
    UserPoolId: USER_POOL_ID,
    ClientId: CLIENT_ID
  };
  const userPool = new CognitoUserPool(poolData);

  const userData = {
    Username: USER_NAME,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise(reso => {

    cognitoUser.authenticateUser(authenticationDetails, {

      onSuccess: function () {
        cognitoUser.getUserData((err,res) => {
          if(err) {
            // エラー処理
            reso({ success: false, message: JSON.stringify(err) });
          }
          reso({ success: true, message: '', data: res });
        });
      },
  
      onFailure: function (err) {
        reso({ success: false, message: JSON.stringify(err) });
      },

    });

  });


}

export default singIn;