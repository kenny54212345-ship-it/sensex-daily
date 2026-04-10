module.exports = async function handler(req, res) {
  const { period1, period2, interval, range } = req.query || {};
  let url = 'https://query2.finance.yahoo.com/v8/finance/chart/%5EBSESN?includePrePost=false';
  if (period1 && period2) {
    url += '&interval=' + (interval||'1wk') + '&period1=' + period1 + '&period2=' + period2;
  } else {
    url += '&interval=1d&range=' + (range||'5d');
  }
  try {
    const r = await fetch(url, {headers:{'User-Agent':'Mozilla/5.0','Accept':'application/json'}});
    if (!r.ok) throw new Error('Yahoo '+r.status);
    const data = await r.json();
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Cache-Control', period1 ? 's-maxage=3600,stale-while-revalidate=86400' : 's-maxage=10,stale-while-revalidate=30');
    res.json(data);
  } catch(e){ res.status(500).json({error:e.message}); }
};