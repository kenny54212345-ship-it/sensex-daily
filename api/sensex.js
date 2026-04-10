export default async function handler(req, res) {
  try {
    const r = await fetch('https://query2.finance.yahoo.com/v8/finance/chart/%5EBSESN?interval=1d&range=5d&includePrePost=false',
      {headers:{'User-Agent':'Mozilla/5.0','Accept':'application/json'}});
    if(!r.ok) throw new Error('Yahoo '+r.status);
    const data = await r.json();
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Cache-Control','s-maxage=10,stale-while-revalidate=30');
    res.json(data);
  } catch(e){ res.status(500).json({error:e.message}); }
}