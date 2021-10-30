---
to: src/pages/<%=name%>.page.tsx
---
import React from "react";
import { createPage } from "../framework";

const <%=name%>: React.FC = () => {
  return <div>Hello from <%=name%></div>
};

export default createPage({
  layout: "default",
  path: "/<%=name%>",
  Component: <%=name%>,
  redirects: [{ from: "/" }],
});
