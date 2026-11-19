import nookies from "nookies";
import { app } from "./firebase/firebaseAdmin";
const getProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  if (!cookies.__session) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
    return {
      props: {},
    };
  }
  try {
    return import("firebase-admin/auth").then(async ({ getAuth }) => {
      let token;
      try {
        token = await getAuth(app).verifyIdToken(cookies.__session);
      } catch (err) {
        ctx.res.writeHead(302, { Location: "/" });
        ctx.res.end();
        return {
          props: {},
        };
      }
      if (!token) {
        ctx.res.writeHead(302, { Location: "/" });
        ctx.res.end();
        return {
          props: {},
        };
      }
      // the user is authenticated!
      const { uid } = token;
      const user = await getAuth().getUser(uid);
      return {
        props: {
          isLoggedIn: true,
          user: await JSON.parse(JSON.stringify(user)),
          token,
        },
      };
    });
  } catch (error) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
    return {
      props: {
        error: String(error),
      },
    };
  }
};
export default getProps;
