"use client";
import { track } from "../lib/analytics";

export default function VendorLink({ href, tool, source = "tool_review", children, className = "", rel = "nofollow sponsored noopener", target = "_blank" }) {
  return <a className={className} href={href} target={target} rel={rel} onClick={() => track("vendor_clicked", { tool, source, href })}>{children}</a>;
}
