import{r,j as e,P as x,R as p,C as i,c as b,I as c,a as g,b as j,B as h}from"./index-Cev_r5Nr.js";const d={Node:`node_modules/
dist/
build/
.env
*.log
.DS_Store
`,Python:`__pycache__/
*.py[cod]
.venv/
venv/
.env
*.egg-info/
.pytest_cache/
`,Go:`bin/
*.exe
*.test
vendor/
`,Rust:`/target/
**/*.rs.bk
Cargo.lock
`,Java:`*.class
target/
.idea/
*.iml
`,Dotnet:`bin/
obj/
*.user
.vs/
`,macOS:`.DS_Store
.AppleDouble
.LSOverride
`,Windows:`Thumbs.db
Desktop.ini
$RECYCLE.BIN/
`,Vite:`node_modules/
dist/
.vite/
*.local
`};function C(){const[l,u]=r.useState(["Node","macOS"]),[o,m]=r.useState(""),a=r.useMemo(()=>{const t=l.map(s=>`# ${s}
${d[s].trim()}`);return o.trim()&&t.push(`# Custom
${o.trim()}`),t.join(`

`)+`
`},[l,o]);return e.jsxs("div",{className:"tool-panel",children:[e.jsx(x,{title:".gitignore Generator",description:"Combine common ignore templates into one file."}),e.jsxs(p,{gutter:[16,16],children:[e.jsxs(i,{xs:24,md:10,children:[e.jsx("label",{className:"field-label",children:"Templates"}),e.jsx(b.Group,{style:{display:"flex",flexDirection:"column",gap:8},options:Object.keys(d),value:l,onChange:t=>u(t)}),e.jsx("label",{className:"field-label",style:{marginTop:16},children:"Custom lines"}),e.jsx(c.TextArea,{rows:4,value:o,onChange:t=>m(t.target.value),placeholder:`coverage/
tmp/`})]}),e.jsxs(i,{xs:24,md:14,children:[e.jsxs("div",{className:"length-label",children:[e.jsx("label",{className:"field-label",children:".gitignore"}),e.jsxs(g,{children:[e.jsx(j,{text:a,label:"Copy"}),e.jsx(h,{onClick:()=>{const t=new Blob([a],{type:"text/plain"}),s=URL.createObjectURL(t),n=document.createElement("a");n.href=s,n.download=".gitignore",n.click(),URL.revokeObjectURL(s)},children:"Download"})]})]}),e.jsx(c.TextArea,{rows:18,value:a,readOnly:!0})]})]})]})}export{C as default};
