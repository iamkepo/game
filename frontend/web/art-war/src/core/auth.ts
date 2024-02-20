
export async function checkLocal({ token, type, expiry }: { token: string | null; type: string | null; expiry: string | null }): Promise<string | boolean> {
    let stock = { token, type, expiry };
    if (stock.expiry != null && stock.token != null && stock.type != null) {
      if (new Date().getTime() > parseInt(stock.expiry) === true) {
        // try {
        //   const res = await Api.refresh();
        //   await this.setLocal(res);
        //   stock = this.getLocal();
        // } catch (error) {
        //   if (error.response.status === 401) {
        //     try {
        //       const res = await Api.logout();
        //       await this.removeLocal();
        //     } catch (err) {
        //       console.log(err);
        //     }
        //   }
        // }
      }
      return `${stock.type} ${stock.token}`;
    } else {
      return false;
    }
  };

export async function setLocal(res: any): Promise<void> {
    const expiry = new Date().getTime() + parseInt(res.expires_in);

    localStorage.setItem("art-war_token", res.access_token);
    localStorage.setItem("art-war_token_type", res.token_type);
    localStorage.setItem("art-war_token_expiry", expiry.toString());
  };

export function getLocal(): { token: string | null; type: string | null; expiry: string | null } {
    const token = localStorage.getItem("art-war_token");
    const type = localStorage.getItem("art-war_token_type");
    const expiry = localStorage.getItem("art-war_token_expiry");

    return { token, type, expiry };
  };

export async function removeLocal(): Promise<void> {
    localStorage.removeItem("art-war_token");
    localStorage.removeItem("art-war_token_type");
    localStorage.removeItem("art-war_token_expiry");
  };