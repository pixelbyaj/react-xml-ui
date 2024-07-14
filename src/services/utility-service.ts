const UtilityService = {
    isArray: (myKey: unknown | Array<unknown>): boolean => {
      if (myKey instanceof Array) {
        return true;
      }
      return false;
    },
  
    isObject: (object: unknown | Array<unknown>): boolean => {
      if (!(object instanceof Array) && object instanceof Object) {
        return true;
      }
      return false;
    },
    getKeys: (object: unknown): string[] => {
      if (object) {
        return Object.keys(object);
      }
      return [];
    },
  
    getKeyName: (object: unknown): string => {
      if (object) {
        return Object.keys(object)[0];
      }
      return "";
    },
  
    copyToClipboard: (value: string) => {
      navigator.clipboard.writeText(value);
    }
  };
  
  export default UtilityService;