---
to: src/modules/<%=name%>/<%=name%>.types.ts
---
import { ModuleIdentifier } from "../../framework";

export interface <%=name%>API {}

export const <%=name%>Module: ModuleIdentifier<<%=name%>API> = {
    symbol: Symbol.for('<%=name%>')
}