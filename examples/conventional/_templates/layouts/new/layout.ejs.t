---
to: src/layouts/<%=name%>.layout.tsx
---
import React from "react";
import { createLayout, LayoutComponent } from "../framework";

const <%=name%>: LayoutComponent = ({ Page }) => {
  return (
    <div><Page/></div>
  );
};

export default createLayout({
  name: "default",
  Component: <%=name%>,
});
