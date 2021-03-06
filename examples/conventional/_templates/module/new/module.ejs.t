---
to: src/modules/<%=name%>/<%=name%>.module.ts
---
import { createModule } from "../../framework";
import { <%=name%>Module } from "./<%=name%>.types";

export default createModule({
    identifier: <%=name%>Module,
    createApi: () => ({}),
    execute: () => {
        console.log('<%=name%> module running')
    }
})
