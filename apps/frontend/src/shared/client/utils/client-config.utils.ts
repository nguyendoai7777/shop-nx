const ClientConfig = {
  token: '',
  api: '',
};

const ClientConfigCollection = new Map<string, any>();

export class ClientConfiguration {
  private static isReady = false;
  private static readyResolve?: () => void;
  private static readyPromise: Promise<void> = new Promise((resolve) => {
    this.readyResolve = resolve;
  });

  private static markReady() {
    if (!this.isReady && this.readyResolve) {
      this.isReady = true;
      this.readyResolve();
    }
  }

  static set = (key: keyof typeof ClientConfig, value: string) => {
    ClientConfig[key] = value;
    this.markReady();
  };

  static setMultiple = <Obj extends Record<keyof typeof ClientConfig, string>>(obj: Obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      this.set(key as keyof typeof ClientConfig, value);
    });
    this.markReady();
  };

  static async getAll() {
    if (!this.isReady) {
      await this.readyPromise;
    }
    return ClientConfig;
  }

  static async get(key: keyof typeof ClientConfig) {
    if (!this.isReady) {
      await this.readyPromise;
    }
    return ClientConfig[key];
  }
}
