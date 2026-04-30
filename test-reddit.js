const res = await fetch('https://www.reddit.com/r/popular.json');
const data = await res.json();
const firstFew = data.data.children.slice(0, 10).map(c => ({
    thumbnail: c.data.thumbnail,
    url: c.data.url,
    post_hint: c.data.post_hint
}));
console.log(JSON.stringify(firstFew, null, 2));