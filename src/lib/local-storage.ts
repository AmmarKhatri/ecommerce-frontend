export class CurrentToken {
    static accessKey: string = "accessToken";
  
    get = (): { accessToken?: string } => {
      if (typeof document !== "undefined") {
        const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
        let accessToken;
  
        cookies.forEach((cookie) => {
          const [name, value] = cookie.split("=");
          if (name === CurrentToken.accessKey) {
            accessToken = JSON.parse(decodeURIComponent(value)).accessToken;
          }
        });
  
        if (accessToken) {
          return {
            accessToken,
          };
        }
      }
      return {};
    };
  
    set = ({ accessToken }: { accessToken: string }) => {
      if (typeof document !== "undefined") {
        const accessTokenCookie = `${CurrentToken.accessKey}=${encodeURIComponent(
          JSON.stringify({ accessToken })
        )}; path=/`;
  
        document.cookie = accessTokenCookie;
      }
    };
  
    remove = () => {
      if (typeof document !== "undefined") {
        document.cookie = `${CurrentToken.accessKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
      }
    };
  }
  