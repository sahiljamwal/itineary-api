import NodeCache from "node-cache";

class Cache {
  private static instance: NodeCache;

  private constructor() {}

  public static getInstance(): NodeCache {
    if (!Cache.instance) {
      Cache.instance = new NodeCache();
    }

    return Cache.instance;
  }
}

export default Cache.getInstance();
