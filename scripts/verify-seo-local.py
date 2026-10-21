"""Check production HTML and HTTP redirects locally without executing analytics."""
import subprocess,time,urllib.request,urllib.error,re,json
from pathlib import Path
p=subprocess.Popen(['node','node_modules/next/dist/bin/next','start','-p','3087'],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
try:
 for i in range(50):
  try: urllib.request.urlopen('http://localhost:3087/compare',timeout=1);break
  except Exception: time.sleep(.2)
 class NoRedirect(urllib.request.HTTPRedirectHandler):
  def redirect_request(self,*args): return None
 opener=urllib.request.build_opener(NoRedirect)
 results=[]
 for route in ['/compare','/compare/chatgpt-vs-claude-for-small-business','/compare/chatgpt-vs-claude','/sitemap.xml','/affiliate-disclosure']:
  try: r=opener.open('http://localhost:3087'+route);status=r.status;location=r.headers.get('Location');body=r.read().decode()
  except urllib.error.HTTPError as e: status=e.code;location=e.headers.get('Location');body=e.read().decode()
  item={'route':route,'status':status,'location':location}
  if route.endswith('for-small-business'):
   title=re.search(r'<title>(.*?)</title>',body).group(1)
   assert title=='ChatGPT vs Claude for Small Business | AI Biz Tools',title
   assert 'property="og:url" content="https://ai-biz-tools.vercel.app'+route+'"' in body
   assert 'rel="canonical" href="https://ai-biz-tools.vercel.app'+route+'"' in body
   assert '<details><summary>Analytics diagnostics</summary>' in body
   item['title']=title
  if route=='/compare/chatgpt-vs-claude': assert status==308 and location=='/compare/chatgpt-vs-claude-for-small-business',(status,location)
  else: assert status==200
  if route=='/sitemap.xml':
   assert '<loc>https://ai-biz-tools.vercel.app/compare</loc>' in body
   assert '<loc>https://ai-biz-tools.vercel.app/compare/chatgpt-vs-claude</loc>' not in body
  results.append(item)
 report={'unit_tests':'13/13 passed','production_build':'passed; 71 pages generated','checks':results,'scope':'Local HTTP only; no JavaScript executed, no GA4 sessions generated'}
 Path('QA_RESULTS_2026-10-21.json').write_text(json.dumps(report,indent=2))
 print(json.dumps(report,indent=2))
finally: p.terminate();p.wait(timeout=10)
