# Design system

`devos/project.json` `ui` is false. Hello CLI has no screen, no page, and no visual state.
`docs/method/DESIGN_METHOD.md` §1 does not apply. `docs/design/UI_ACCEPTANCE.md` is not written.
T01 is not a UI fence and has no `- Screens:` line.

No token, component, theme, motion, or breakpoint is specified, because none can appear.

## Resources

`docs/method/DESIGN_METHOD.md` §5, each rejected. Nothing is installed.

| Resource | Decision | Reason |
|---|---|---|
| Motion | Reject | No interface. |
| shadcn/ui | Reject | No interface. The stack is not React. |
| GSAP and `@gsap/react` | Reject | No interface. |
| React Bits | Reject | No interface. |
| React Three Fiber and Spline | Reject | No interface. The brief does not ask for 3D. |
| Storybook and the a11y addon | Reject | No components. |
| Lenis and Rive | Reject | No interface. |

A fence that builds a screen would need a change request, `ui` set to true, and this document
rewritten as the §1 contract before any page.
