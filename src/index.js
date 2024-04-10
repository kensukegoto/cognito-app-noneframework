import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser
} from 'amazon-cognito-identity-js';

import signIn from './signIn';
import getUser from './getUser';

window.signIn = signIn;
window.getUser = getUser;

(async () => {

  return;

  // マネコンでユーザー作った際のパスワードの変更

  let sessionUserAttributes = null;

  cognitoUser.authenticateUser(authenticationDetails, {

    onSuccess: function (result) {
      console.log(result);
      var accessToken = result.getAccessToken().getJwtToken();
      // const d = cognitoUser.getUserData();
      cognitoUser.getUserData((err,res) => {
        console.log(res);
      });
    },

    onFailure: function (err) {
      alert(err.message || JSON.stringify(err));
    },

    newPasswordRequired: function (userAttributes, requiredAttributes) {
      console.log('パスワード変更');

      console.log(userAttributes);
      // the api doesn't accept this field back
      delete userAttributes.email_verified;
      delete userAttributes.email;
      sessionUserAttributes = userAttributes;


      handleNewPassword(PASSWORD);
    },

  });

  const handleNewPassword = function (newPassword) {
    cognitoUser.completeNewPasswordChallenge(newPassword, sessionUserAttributes, {
      onSuccess: function (result) {
        console.log(result);
      },
      onFailure: function (err) {
        alert(err.message || JSON.stringify(err));
      },
    });
  }

})();