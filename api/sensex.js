export default async function handler(req, res) {
  try {
    const response = await fetch(
      'https://query2.finance.yahoo.com/v8/finance/chart/%5EBSESN?interval=1d&range=5d&includePrePost=false',
      { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 'Accept': 'application/json' } }
    );
    if (!response.ok) throw new Error('Yahoo returned ' + response.status);
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=30');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}