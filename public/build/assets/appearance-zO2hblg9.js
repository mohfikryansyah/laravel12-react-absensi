import{u as l,j as e,L as d}from"./app-Bta-wT-b.js";import{c as r}from"./utils-jAU0Cazi.js";import{c as a}from"./createLucideIcon-CVuAcCb-.js";import{S as h,H as u}from"./layout-mxFwiaZM.js";import{A as x}from"./app-layout-DGaG65JJ.js";import"./button-yj5hMQ3c.js";import"./index-8OSeXHHY.js";import"./separator-B4jVj12E.js";import"./index-DKj-CO1Z.js";import"./index-Be9ZpaHw.js";import"./index-CAD34kM0.js";import"./index-D73HEG_a.js";import"./dropdown-menu-vHaG0bkZ.js";import"./check-IbVnGVfI.js";import"./use-initials-Y_EWJVKO.js";import"./chevrons-up-down-DOgTaHrR.js";import"./app-logo-icon-DxQ8HIrN.js";import"./building-2-xoQ_6p3O.js";import"./chevron-right-BPnegaHu.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],k=a("Monitor",y);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]],b=a("Moon",g);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],f=a("Sun",j);function v({className:n="",...s}){const{appearance:o,updateAppearance:i}=l(),p=[{value:"light",icon:f,label:"Light"},{value:"dark",icon:b,label:"Dark"},{value:"system",icon:k,label:"System"}];return e.jsx("div",{className:r("inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800",n),...s,children:p.map(({value:t,icon:c,label:m})=>e.jsxs("button",{onClick:()=>i(t),className:r("flex items-center rounded-md px-3.5 py-1.5 transition-colors",o===t?"bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100":"text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60"),children:[e.jsx(c,{className:"-ml-1 h-4 w-4"}),e.jsx("span",{className:"ml-1.5 text-sm",children:m})]},t))})}const A=[{title:"Appearance settings",href:"/settings/appearance"}];function F(){return e.jsxs(x,{breadcrumbs:A,children:[e.jsx(d,{title:"Appearance settings"}),e.jsx(h,{children:e.jsxs("div",{className:"space-y-6",children:[e.jsx(u,{title:"Appearance settings",description:"Update your account's appearance settings"}),e.jsx(v,{})]})})]})}export{F as default};
