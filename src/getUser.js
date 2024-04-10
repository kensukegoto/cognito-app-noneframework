import {
  CognitoUserPool
} from 'amazon-cognito-identity-js';

function getUser () {

  const poolData = {
    UserPoolId: USER_POOL_ID,
    ClientId: CLIENT_ID
  };

  const userPool = new CognitoUserPool(poolData);

  // トークン取得
  // localStrageから取得
  const user = userPool.getCurrentUser();

  return new Promise(reso => {

    if(!user) reso({ success: false });

    // Cognitoに通信している
    // localStrageを消すと user 自体も取れなくなる
    // localStrageのJWTの有効期限も更新される
    user.getSession((err, session) => {

      if(err) {
        reso({ success: false });
      }

      console.log(session.getAccessToken());

      user.getUserData((err, data) => {
        if(err) {
          reso({ success: false });
        }
        reso({ success: true, data });
      });

    });

  });

}

export default getUser;