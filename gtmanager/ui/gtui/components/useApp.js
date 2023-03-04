import { useEffect, useState } from "react";
import * as Realm from "realm-web";

export function useApp() {
  const [app, setApp] = useState(null);
  // Run in useEffect so that App is not created in server-side environment
  useEffect(() => {
    setApp(Realm.getApp("gtmgrbackend-qymjf"));
  }, []);
  return app;
}
