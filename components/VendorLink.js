"use client";
import { track } from "../lib/analytics";
export default function VendorLink({href,tool,children,className=""}) {
 return <a className={className} href={href} target="_blank" rel="nofollow sponsored noopener" onClick={()=>track("vendor_clicked",{tool,href})}>{children}</a>
}