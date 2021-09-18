export class ZendeskAPI {
  subdomain: string;
  token: string;
  email: string;
  base64Token: string;

  constructor(subdomain: string, token: string, email: string) {
    this.subdomain = subdomain;
    this.token = token;
    this.email = email;
    this.base64Token = btoa(`${email}/token:${token}`);
  }

  private async fetch(path: string, init?: RequestInit) {
    const res = await fetch(
      `https://${this.subdomain}.zendesk.com/api/v2${path}`,
      {
        headers: {
          Authorization: `Basic ${this.base64Token}`,
          ...init?.headers,
        },
      }
    );
    return await res.json();
  }

  async usersList(): Promise<{
    users: {
      id: number;
      name: string;
    }[];
    next_page: string;
    previous_page: string;
    count: number;
  }> {
    return await this.fetch("/users");
  }
}
